import styles from "./celestial.module.css";

// A subtle, tileable film/paper grain — black grain whose alpha comes from
// fractal noise, laid faintly over the whole page for texture. In dark mode the
// grain is inverted to light specks (see --grain-* in globals.css).
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.62' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0'/></filter><rect width='180' height='180' filter='url(#n)'/></svg>`;
const NOISE_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

export default function Celestial() {
  return (
    <div className={styles.layer} aria-hidden>
      <div className={styles.noise} style={{ backgroundImage: NOISE_URL }} />
    </div>
  );
}
