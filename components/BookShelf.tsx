"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { books } from "@/lib/books";
import styles from "./bookshelf.module.css";

// Marquee + focus tuning. Only the focal book moves: it rises up and slightly
// toward you, KEEPING the shelf's lean. Staying parallel to its neighbours means
// it can never clip into them. Neighbours stay perfectly still.
const SPEED = 0.45; // base marquee px per frame (leftward)
const LIFT = 60; // px: the focal book rises up off the row — the headline move
const POP = 48; // px: lift it forward along the shelf normal so it sits cleanly in front
const SCALE = 0.06; // a small scale bump as it rises
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
  const focus = useRef<number[]>([]); // focal weight — 1 for the book under the cursor
  const slow = useRef(0); // smoothed marquee slowdown, 0..1

  // The quiet caption that names the focal book beneath the shelf. Refs let the
  // proximity loop write text directly (no React re-render per frame); shownKey
  // tracks which real book is currently named so the DOM is only touched on change.
  const captionRef = useRef<HTMLDivElement>(null);
  const capTitleRef = useRef<HTMLSpanElement>(null);
  const capAuthorRef = useRef<HTMLSpanElement>(null);
  const shownKey = useRef(-1);

  // Render the set several times so the track always overflows the viewport and
  // loops seamlessly. The measure below keys off one set width (books.length), so
  // any repeat count ≥ 2 works; four keeps a comfortable margin on wide screens.
  const rendered = Array.from({ length: 4 }, () => books).flat();

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

    const tick = () => {
      const els = bookEls.current;
      const p = pointer.current;
      const f = focus.current;

      // --- read: ask the browser which book is actually under the cursor. This
      // honours the 3D tilt, overlap and occlusion, so the focal book is exactly
      // the one you see there — and it re-checks every frame, so focus hands off
      // correctly as the marquee slides books under a still cursor. (One hit-test
      // is the frame's only forced layout; all writes happen below.) ---
      const hit = p
        ? Number(
            (document.elementFromPoint(p.x, p.y) as HTMLElement | null)?.closest<HTMLElement>(
              "[data-book-index]"
            )?.dataset.bookIndex ?? -1
          )
        : -1;

      // --- caption: the focal book quietly names itself beneath the shelf.
      // The track renders `books` ×3, so hit % books.length is the real book.
      // Placeholders (no title) leave the caption blank, so only real books
      // announce themselves — and it eases in/out exactly as focus hands off
      // from one book to the next under a still cursor. DOM is touched only when
      // the named book changes, not every frame. ---
      const realIdx = hit >= 0 ? hit % books.length : -1;
      const focal = realIdx >= 0 ? books[realIdx] : null;
      const key = focal?.title ? realIdx : -1;
      if (key !== shownKey.current) {
        shownKey.current = key;
        const cap = captionRef.current;
        if (cap) {
          if (focal?.title) {
            if (capTitleRef.current) capTitleRef.current.textContent = focal.title;
            if (capAuthorRef.current)
              capAuthorRef.current.textContent = focal.author ?? "";
            cap.classList.add(styles.captionShow);
          } else {
            cap.classList.remove(styles.captionShow);
          }
        }
      }

      // --- compute eased targets: only the book under the cursor reacts
      // (target 1); every other book eases back to rest (target 0). ---
      let peak = 0;
      for (let i = 0; i < els.length; i++) {
        const targetF = i === hit ? 1 : 0;
        f[i] = lerp(f[i] ?? 0, targetF, EASE);
        if (f[i] > peak) peak = f[i];
      }
      slow.current = lerp(slow.current, p ? peak : 0, EASE);

      // --- write transforms (writes only). The focal book rises (--lift) and
      // lifts forward along the shelf normal (--pop) so it sits cleanly in front
      // of its still neighbours, keeping its shelf lean (no turn → stays parallel,
      // so it never clips). ---
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        const fi = f[i];
        el.style.setProperty("--lift", `${(-LIFT * fi).toFixed(2)}px`);
        el.style.setProperty("--pop", `${(POP * fi).toFixed(2)}px`);
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

  // Pointer in / out. onDown is what makes the rise work on touch: a finger has
  // no hover, so we seed the pointer on press — the book under the thumb lifts
  // and the marquee eases to a near-stop, the same headline move as a desktop
  // hover. A lifted tap still fires the link; up / cancel (a release, or the
  // gesture turning into a page scroll) hands the marquee back.
  const onMove = (e: React.PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const onDown = (e: React.PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const onLeave = () => {
    pointer.current = null;
  };

  return (
    <div
      className={styles.shelf}
      onPointerMove={onMove}
      onPointerDown={onDown}
      onPointerUp={onLeave}
      onPointerCancel={onLeave}
      onPointerLeave={onLeave}
    >
      <div className={styles.stage}>
        <div className={styles.tilt}>
          <div className={styles.track} ref={trackRef}>
            {rendered.map((b, i) => {
              const setRef = (el: HTMLElement | null) => {
                if (el) bookEls.current[i] = el;
              };
              // Varied, mismatched heights so the row reads as real books.
              const style = {
                "--cover": b.color,
                "--h": `${b.h}px`,
                "--t": `${b.t}px`,
              } as React.CSSProperties;

              // Every book is a focusable, clickable link to its page, with the
              // title set as a typographic cover on the spine face.
              return (
                <Link
                  key={i}
                  ref={setRef}
                  href={`/book/${b.slug}`}
                  className={`${styles.book} ${styles.linked}`}
                  style={style}
                  data-book-index={i}
                  aria-label={`${b.title} by ${b.author}`}
                  draggable={false}
                >
                  <span className={`${styles.cover} ${styles.spine}`}>
                    <span className={styles.spineTitle}>{b.title}</span>
                  </span>
                  <span className={styles.pages} />
                  <span className={styles.topface} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* Flat caption, OUTSIDE the 3D .tilt so it reads upright. Decorative: the
          linked book's aria-label already names it, so this is aria-hidden, and
          pointer-events:none keeps it from ever swallowing a tap. */}
      <div className={styles.caption} ref={captionRef} aria-hidden>
        <span className={styles.captionTitle} ref={capTitleRef} />
        <span className={styles.captionAuthor} ref={capAuthorRef} />
      </div>
    </div>
  );
}
