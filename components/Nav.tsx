import Link from "next/link";
import styles from "./Nav.module.css";
import GlitchLogo from "./GlitchLogo";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <GlitchLogo />
      <nav className={styles.links}>
        <Link href="/collection" className={styles.link}>
          Collection
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
