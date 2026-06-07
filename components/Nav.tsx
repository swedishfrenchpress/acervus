import styles from "./Nav.module.css";
import GlitchLogo from "./GlitchLogo";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <GlitchLogo />
      <nav className={styles.links}>
        <a href="#" className={styles.link}>
          About us
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
