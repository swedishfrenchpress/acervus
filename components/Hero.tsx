import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>Free to read. Free to keep.</p>

      {/* Stacked so each line can rise on its own beat. Screen readers still
          read it as one continuous heading. */}
      <h1 className={styles.title}>
        <span className={styles.line}>One</span>
        <span className={styles.line}>cypherpunk&rsquo;s</span>
        <span className={styles.line}>library</span>
      </h1>

      <div className={styles.aside}>
        <p className={styles.subtitle}>
          A personal collection of good public-domain reads, curated by some
          random cypherpunk. Nothing for sale, nothing to take down.
        </p>
        <div className={styles.actions}>
          <a href="#" className={styles.primary}>
            Browse the collection
          </a>
        </div>
        <p className={styles.footnote}>
          This shelf is public domain end to end. For everything else,
          there&rsquo;s{" "}
          <a href="https://annas-archive.gl/" target="_blank" rel="noreferrer">
            Anna&rsquo;s Archive
          </a>
          ,{" "}
          <a href="https://libgen.is" target="_blank" rel="noreferrer">
            LibGen
          </a>
          , and the torrents.
        </p>
      </div>
    </section>
  );
}
