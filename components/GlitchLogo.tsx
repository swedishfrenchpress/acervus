"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

// Alpha-Lyrae carries its glitch in OpenType features: calt (subtle, automatic),
// ss03/ss04 (glitched glyphs), ss05 (pixels displaced for a motion feel).
const BASE = '"calt" 1';
const BURST_SETS = ['"ss03" 1', '"ss04" 1', '"ss05" 1'];
const HOLD_SET = '"ss05" 1'; // held while hovered — the displaced-pixel look

export default function GlitchLogo() {
  const [ff, setFf] = useState(BASE);
  const [bursting, setBursting] = useState(false);
  const [held, setHeld] = useState(false);
  const timers = useRef<number[]>([]);
  const hovering = useRef(false);
  const scheduleRef = useRef<() => void>(() => {});

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const clear = () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // One burst = a short flicker through the glitch sets, then settle back.
    const burst = () => {
      if (hovering.current) return schedule();
      setBursting(true);
      const order = [...BURST_SETS].sort(() => Math.random() - 0.5);
      let i = 0;
      const step = () => {
        if (hovering.current) {
          setBursting(false);
          setFf(BASE);
          return schedule();
        }
        setFf(`${BASE}, ${order[i % order.length]}`);
        i += 1;
        if (i <= 4) {
          timers.current.push(window.setTimeout(step, rand(45, 85)));
        } else {
          timers.current.push(
            window.setTimeout(() => {
              setFf(BASE);
              setBursting(false);
              schedule();
            }, 60)
          );
        }
      };
      step();
    };

    const schedule = () => {
      timers.current.push(window.setTimeout(burst, rand(3500, 7500)));
    };

    // Under reduced motion, never auto-burst — hover still reveals the set.
    scheduleRef.current = reduce ? () => {} : schedule;
    if (!reduce) schedule();

    return clear;
  }, []);

  const onEnter = () => {
    hovering.current = true;
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    setBursting(false);
    setHeld(true);
    setFf(`${BASE}, ${HOLD_SET}`);
  };

  const onLeave = () => {
    hovering.current = false;
    setHeld(false);
    setFf(BASE);
    scheduleRef.current();
  };

  const cls =
    styles.logo +
    (bursting ? " " + styles.bursting : "") +
    (held ? " " + styles.held : "");

  return (
    <Link
      href="/"
      aria-label="The Cypherpunk Library — home"
      className={cls}
      style={{ fontFeatureSettings: ff }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      {/* Stacked two-line wordmark, echoing the Hero and the OG image. Screen
          readers get the full name from aria-label above. */}
      <span className={styles.logoLine}>Cypherpunk</span>
      <span className={styles.logoLine}>Library</span>
    </Link>
  );
}
