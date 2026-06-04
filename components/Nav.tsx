import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <a href="#" className={styles.logo}>
        Acervus
      </a>
      <nav className={styles.links}>
        <a href="#" className={styles.link}>
          About us
        </a>
      </nav>
    </header>
  );
}
