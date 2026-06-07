"use client";

import styles from "./ThemeToggle.module.css";

// The theme lives as [data-theme] on <html> (first set by the inline script in
// layout.tsx, before paint). This control just flips that attribute and persists
// the choice — it keeps no React state, so there's no hydration mismatch and no
// first-paint icon flicker. Both icons are always rendered; CSS shows the one for
// the action you can take (moon in light mode → go dark, sun in dark → go light),
// keyed off the same [data-theme] the rest of the palette reads.
export default function ThemeToggle() {
  const toggle = () => {
    const el = document.documentElement;
    const next = el.getAttribute("data-theme") === "dark" ? "light" : "dark";
    el.setAttribute("data-theme", next);
    el.style.colorScheme = next;
    // Keep the browser-chrome colour on the live theme (the meta is seeded by the
    // init script in layout.tsx). Values mirror --bg in globals.css.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#14130c" : "#ffffe1");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable (private mode / blocked) — theme still applies for the session */
    }
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      title="Toggle theme"
    >
      {/* moon — shown in light mode (the next step is dark) */}
      <svg
        className={`${styles.icon} ${styles.moon}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      {/* sun — shown in dark mode (the next step is light) */}
      <svg
        className={`${styles.icon} ${styles.sun}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.6v2.4M12 19v2.4M2.6 12H5M19 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
      </svg>
    </button>
  );
}
