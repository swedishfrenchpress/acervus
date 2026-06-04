"use client";

import { useEffect, useRef } from "react";
import { books } from "@/lib/books";
import styles from "./bookshelf.module.css";

// Hover-spread tuning (matches the reference build session).
const PUSH_PX = 130; // how far the immediate neighbour is shoved
const FALLOFF = 0.55; // each farther neighbour moves FALLOFF× as much
const REACH = 7; // neighbours affected on each side
const SPEED = 0.45; // marquee px per frame (leftward)

export default function BookShelf() {
  const trackRef = useRef<HTMLDivElement>(null);
  const bookEls = useRef<HTMLDivElement[]>([]);
  const paused = useRef(false);

  // Render the set three times so the track always overflows the viewport and
  // there is room to loop seamlessly.
  const rendered = [...books, ...books, ...books];

  // ---- infinite marquee ------------------------------------------------
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

    const tick = () => {
      if (!paused.current) {
        offset -= SPEED;
        if (-offset >= setWidth) offset += setWidth;
        track.style.transform = `translate3d(${offset}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ---- hover spread ----------------------------------------------------
  const resetTimer = useRef<number | null>(null);

  const applySpread = (hovered: number) => {
    bookEls.current.forEach((el, i) => {
      if (!el) return;
      let push = 0;
      if (hovered >= 0 && i !== hovered) {
        const d = i - hovered;
        const ad = Math.abs(d);
        if (ad <= REACH) push = Math.sign(d) * PUSH_PX * FALLOFF ** (ad - 1);
      }
      el.style.setProperty("--push", `${push}px`);
      el.dataset.hover = hovered === i ? "true" : "false";
    });
  };

  const clearReset = () => {
    if (resetTimer.current !== null) {
      clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
  };

  const reset = () => {
    clearReset();
    paused.current = false;
    applySpread(-1);
  };

  // Hovering a book pauses the marquee and spreads its neighbours.
  const onBookEnter = (i: number) => {
    clearReset();
    paused.current = true;
    applySpread(i);
  };

  // Snap back as soon as the cursor leaves a book. The tiny delay only bridges
  // the instant when sliding from one adjacent book to the next.
  const onBookLeave = () => {
    clearReset();
    resetTimer.current = window.setTimeout(reset, 80);
  };

  useEffect(() => clearReset, []);

  return (
    <div className={styles.shelf} onMouseLeave={reset}>
      <div className={styles.floor} />
      <div className={styles.stage}>
        <div className={styles.tilt}>
          <div className={styles.track} ref={trackRef}>
            {rendered.map((b, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) bookEls.current[i] = el;
                }}
                className={styles.book}
                data-hover="false"
                onMouseEnter={() => onBookEnter(i)}
                onMouseLeave={onBookLeave}
                style={
                  {
                    "--cover": b.color,
                    "--h": `${b.h}px`,
                    "--t": `${b.t}px`,
                  } as React.CSSProperties
                }
              >
                <span className={styles.cover} />
                <span className={styles.pages} />
                <span className={styles.topface} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
