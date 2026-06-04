import styles from "./celestial.module.css";

// A subtle, tileable film/paper grain — black grain whose alpha comes from
// fractal noise, laid faintly over the whole page for texture.
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.62' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0'/></filter><rect width='180' height='180' filter='url(#n)'/></svg>`;
const NOISE_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

// A faint engraved star-chart on the paper: graduated rings, a few tilted
// orbits, a small sun. Drawn in ink at low opacity so it reads as texture, not
// decoration. The two rotation groups turn in opposite directions (the dormant
// spin-cw / spin-ccw keyframes) for a slow parallax. Purely ornamental — the
// global prefers-reduced-motion rule freezes both.
export default function Celestial() {
  return (
    <div className={styles.layer} aria-hidden>
      <svg
        className={styles.chart}
        viewBox="0 0 1000 1000"
        fill="none"
        stroke="currentColor"
      >
        {/* outer group — graduations + wide orbits, turning slowly clockwise */}
        <g className={styles.outer}>
          <circle cx="500" cy="500" r="478" strokeWidth="1" />
          <circle cx="500" cy="500" r="466" strokeWidth="6" strokeDasharray="1.5 13.5" />
          <circle cx="500" cy="500" r="430" strokeWidth="2" strokeDasharray="2 30" />
          <circle cx="500" cy="500" r="382" strokeWidth="1" />
          {/* tilted orbits, like an orrery */}
          <ellipse cx="500" cy="500" rx="470" ry="184" strokeWidth="1.2" transform="rotate(24 500 500)" />
          <ellipse cx="500" cy="500" rx="470" ry="184" strokeWidth="1.2" transform="rotate(-38 500 500)" />
          <ellipse cx="500" cy="500" rx="430" ry="300" strokeWidth="1" transform="rotate(72 500 500)" />
          {/* a lone planet riding the first orbit */}
          <circle cx="970" cy="500" r="7" fill="currentColor" stroke="none" transform="rotate(24 500 500)" />
        </g>

        {/* inner group — concentric rings + sun, drifting counter-clockwise */}
        <g className={styles.inner}>
          <circle cx="500" cy="500" r="300" strokeWidth="1" />
          <circle cx="500" cy="500" r="210" strokeWidth="1" strokeDasharray="2 22" />
          <circle cx="500" cy="500" r="120" strokeWidth="1.5" />
          {/* the sun: a small disc with a thin halo and four cardinal rays */}
          <circle cx="500" cy="500" r="26" fill="currentColor" stroke="none" />
          <circle cx="500" cy="500" r="58" strokeWidth="1" />
          <line x1="500" y1="396" x2="500" y2="442" strokeWidth="1.5" />
          <line x1="500" y1="558" x2="500" y2="604" strokeWidth="1.5" />
          <line x1="396" y1="500" x2="442" y2="500" strokeWidth="1.5" />
          <line x1="558" y1="500" x2="604" y2="500" strokeWidth="1.5" />
        </g>
      </svg>

      <div
        className={styles.noise}
        style={{ backgroundImage: NOISE_URL }}
      />
    </div>
  );
}
