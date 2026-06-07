import styles from "./Hero.module.css";

// The editorial wordmark headline. Stacked so each line can rise on its own
// beat; screen readers still read it as one continuous heading. It shares the
// shelf's grid cell on desktop (top-left, in front of the books) and leads the
// single column on mobile — see Hero.module.css / page.module.css.
export default function Masthead() {
  return (
    <h1 className={styles.title}>
      <span className={styles.line}>A</span>
      <span className={styles.line}>cypherpunk&rsquo;s</span>
      <span className={styles.line}>library</span>
    </h1>
  );
}
