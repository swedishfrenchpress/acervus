import Link from "next/link";
import styles from "./Hero.module.css";

// The supporting column: the one-line framing, the call to action, and the
// principled footnote. On desktop it rests bottom-right just above the covers;
// on mobile it follows the shelf so the collection speaks first.
export default function Intro() {
  return (
    <div className={styles.aside}>
      <p className={styles.subtitle}>
        A personal collection of good public-domain reads. Nothing for sale,
        nothing to take down.
      </p>
      <div className={styles.actions}>
        <Link href="/collection" className={styles.primary}>
          Browse the collection
        </Link>
      </div>
      <p className={styles.footnote}>
        This shelf is public domain end to end. For everything else, there&rsquo;s{" "}
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
  );
}
