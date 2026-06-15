import Link from "next/link";
import styles from "./Hero.module.css";
import { ui, type Locale } from "@/lib/i18n";

// The supporting column: the one-line framing, the call to action, and the
// principled footnote. On desktop it rests bottom-right just above the covers;
// on mobile it follows the shelf so the collection speaks first. The footnote
// keeps its links, so it's branched in JSX rather than pulled from a flat string.
export default function Intro({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  return (
    <div className={styles.aside}>
      <p className={styles.subtitle}>{t.subtitle}</p>
      <div className={styles.actions}>
        <Link
          href={locale === "fr" ? "/fr/collection" : "/collection"}
          className={styles.primary}
        >
          {t.browse}
        </Link>
      </div>
      {locale === "fr" ? (
        <p className={styles.footnote}>
          Cette étagère est entièrement composée d’œuvres du domaine public. Pour
          tout le reste, il y a{" "}
          <a href="https://annas-archive.gl/" target="_blank" rel="noreferrer">
            Anna’s Archive
          </a>
          ,{" "}
          <a
            href="https://shadowlibraries.github.io/DirectDownloads/libgen/"
            target="_blank"
            rel="noreferrer"
          >
            LibGen
          </a>
          , et les torrents.
        </p>
      ) : (
        <p className={styles.footnote}>
          This shelf is public domain end to end. For everything else,
          there&rsquo;s{" "}
          <a href="https://annas-archive.gl/" target="_blank" rel="noreferrer">
            Anna&rsquo;s Archive
          </a>
          ,{" "}
          <a
            href="https://shadowlibraries.github.io/DirectDownloads/libgen/"
            target="_blank"
            rel="noreferrer"
          >
            LibGen
          </a>
          , and the torrents.
        </p>
      )}
    </div>
  );
}
