import styles from "./Nav.module.css";
import GlitchLogo from "./GlitchLogo";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <GlitchLogo />
      <nav className={styles.links}>
        <a href="#" className={styles.link}>
          About us
        </a>
      </nav>
    </header>
  );
}
