import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>One cypherpunk&rsquo;s library</h1>
      <p className={styles.subtitle}>
        A personal collection of good reads, curated by some random cypherpunk.
        Everything here is in the public domain &mdash; free to read, free to
        keep, and nothing anyone can take down.
      </p>
      <div className={styles.actions}>
        <a href="#" className={styles.primary}>
          <span className={styles.dot} aria-hidden />
          Browse the collection
        </a>
        <a
          href="https://annas-archive.org"
          target="_blank"
          rel="noreferrer"
          className={styles.secondary}
        >
          Anna&rsquo;s Archive &#8599;
        </a>
      </div>
      <p className={styles.footnote}>
        Public domain only here &mdash; nothing to take down. For everything
        else, there&rsquo;s{" "}
        <a href="https://libgen.is" target="_blank" rel="noreferrer">
          LibGen
        </a>{" "}
        and the torrents.
      </p>
    </section>
  );
}
