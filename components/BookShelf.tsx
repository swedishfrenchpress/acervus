"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { books } from "@/lib/books";
import styles from "./bookshelf.module.css";

// Marquee + proximity tuning.
const SPEED = 0.45; // base marquee px per frame (leftward)
const RADIUS = 230; // px: horizontal reach of the cursor's influence
const VRADIUS = 260; // px: vertical reach (the band is tall — fall off above the row)
const SHARP = 2.4; // gaussian sharpness; higher = tighter, more selective focus
const PART = 200; // px: how far the row parts around the cursor
const LIFT = 26; // px: the focal book rises
const POP = 74; // px: the focal book comes toward you (translateZ)
const TURN = 24; // deg: the focal book turns to face you (net rotateY ~ 0)
const SCALE = 0.08; // focal book scale bump
const SLOW = 1; // how much peak focus slows the marquee (1 = full stop)
const EASE = 0.16; // per-frame approach to target — the "breathing" smoothness

export default function BookShelf() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Holds both placeholder <div>s and the real book's <a> — the proximity loop
  // only reads getBoundingClientRect / style, which every HTMLElement has.
  const bookEls = useRef<HTMLElement[]>([]);

  // Pointer in client coords; null when the cursor isn't over the shelf.
  const pointer = useRef<{ x: number; y: number } | null>(null);

  // Smoothed per-book state, eased toward target every frame.
  const focus = useRef<number[]>([]); // even gaussian — how "looked at" a book is
  const push = useRef<number[]>([]); // signed parting offset in px
  const slow = useRef(0); // smoothed marquee slowdown, 0..1

  // Render the set three times so the track always overflows the viewport and
  // there is room to loop seamlessly.
  const rendered = [...books, ...books, ...books];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let raf = 0;
    let offset = 0;

    // The exact width of one set = the layout distance between the first book
    // of set 1 and the first book of set 2. Using offsetLeft (not scrollWidth)
    // makes the wrap point land precisely, so the loop never visibly jumps.
    const measure = () => {
      const a = bookEls.current[0];
      const b = bookEls.current[books.length];
      return a && b ? b.offsetLeft - a.offsetLeft : track.scrollWidth / 3;
    };
    let setWidth = measure();

    const onResize = () => {
      setWidth = measure();
    };
    window.addEventListener("resize", onResize);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    // Normalizer so the odd "parting" curve peaks at ~1 before scaling by PART.
    const ODD_NORM = Math.sqrt(2 * SHARP * Math.E);

    const tick = () => {
      const els = bookEls.current;
      const p = pointer.current;
      const f = focus.current;
      const pr = push.current;

      // --- pass 1: read every book's on-screen centre (reads only, no writes,
      // so the layout is flushed exactly once per frame) ---
      const cx: number[] = [];
      const cy: number[] = [];
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) {
          cx[i] = NaN;
          continue;
        }
        const r = el.getBoundingClientRect();
        cx[i] = r.left + r.width / 2;
        cy[i] = r.top + r.height / 2;
      }

      // --- compute eased targets ---
      let peak = 0;
      for (let i = 0; i < els.length; i++) {
        let targetF = 0;
        let targetPush = 0;
        if (p && !Number.isNaN(cx[i])) {
          const ux = (p.x - cx[i]) / RADIUS;
          const uy = (p.y - cy[i]) / VRADIUS;
          // even gaussian in 2D: the book under the cursor peaks at 1
          targetF = Math.exp(-(ux * ux + uy * uy) * SHARP);
          // odd gaussian-derivative: zero at the cursor, parts books away from it.
          // Damp by (1 - targetF) so the book directly under the cursor — the one
          // you're aiming at — isn't shoved sideways out from under you; only its
          // neighbours part to open the gap.
          const odd = -ux * Math.exp(-(ux * ux) * SHARP) * ODD_NORM;
          targetPush = Math.max(-1, Math.min(1, odd)) * PART * (1 - targetF);
        }
        f[i] = lerp(f[i] ?? 0, targetF, EASE);
        pr[i] = lerp(pr[i] ?? 0, targetPush, EASE);
        if (f[i] > peak) peak = f[i];
      }
      slow.current = lerp(slow.current, p ? peak : 0, EASE);

      // --- pass 2: write transforms (writes only) ---
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        const fi = f[i];
        el.style.setProperty("--push", `${pr[i].toFixed(2)}px`);
        el.style.setProperty("--lift", `${(-LIFT * fi).toFixed(2)}px`);
        el.style.setProperty("--pop", `${(POP * fi).toFixed(2)}px`);
        el.style.setProperty("--turn", `${(TURN * fi).toFixed(2)}deg`);
        el.style.setProperty("--scale", (1 + SCALE * fi).toFixed(3));
        el.style.setProperty("--foc", fi.toFixed(3));
        el.style.zIndex = fi > 0.02 ? String(5 + Math.round(fi * 12)) : "";
      }

      // Advance the marquee; it eases toward a near-stop as you focus a book,
      // then drifts back up to speed when the cursor leaves.
      offset -= SPEED * (1 - SLOW * slow.current);
      if (-offset >= setWidth) offset += setWidth;
      track.style.transform = `translate3d(${offset.toFixed(2)}px,0,0)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onMove = (e: React.PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const onLeave = () => {
    pointer.current = null;
  };

  return (
    <div
      className={styles.shelf}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className={styles.stage}>
        <div className={styles.tilt}>
          <div className={styles.track} ref={trackRef}>
            {rendered.map((b, i) => {
              const setRef = (el: HTMLElement | null) => {
                if (el) bookEls.current[i] = el;
              };
              const style = {
                "--cover": b.color,
                "--h": `${b.h}px`,
                "--t": `${b.t}px`,
              } as React.CSSProperties;
              const faces = (
                <>
                  {b.cover ? (
                    // Decorative — the <a>'s aria-label carries the name. Rides the
                    // same .cover 3D face (sheen, shadow, brightness) as placeholders.
                    <img
                      className={styles.cover}
                      src={b.cover}
                      alt=""
                      aria-hidden
                      draggable={false}
                    />
                  ) : b.slug && b.title ? (
                    // Real book, art pending: set the title on the cover face so the
                    // spine reads as an intentional typographic cover until art lands.
                    <span className={`${styles.cover} ${styles.spine}`}>
                      <span className={styles.spineTitle}>{b.title}</span>
                    </span>
                  ) : (
                    <span className={styles.cover} />
                  )}
                  <span className={styles.pages} />
                  <span className={styles.topface} />
                </>
              );

              // A `slug` makes the book real: a focusable, clickable link.
              return b.slug ? (
                <Link
                  key={i}
                  ref={setRef}
                  href={`/book/${b.slug}`}
                  className={`${styles.book} ${styles.linked}`}
                  style={style}
                  aria-label={`${b.title} by ${b.author}`}
                  draggable={false}
                >
                  {faces}
                </Link>
              ) : (
                <div
                  key={i}
                  ref={setRef}
                  className={styles.book}
                  style={style}
                  aria-hidden
                >
                  {faces}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
