import type { ComponentType } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Celestial from "@/components/Celestial";
import type { Book } from "@/lib/books";
import { ui, type Locale } from "@/lib/i18n";
import styles from "@/app/book/[slug]/page.module.css";

// The shared book reader, rendered by both the English route (app/book/[slug])
// and the French one (app/fr/book/[slug]). It is purely presentational: every
// locale-dependent value (title, blurb, prose, source credit, back-link,
// switcher target) is resolved by the route and handed in, so this component
// holds no i18n logic — it just renders what it's given, exactly as the single
// English page did before it was extracted.
type Props = {
  book: Book;
  /** Resolved title — English title, or the French override. */
  title: string;
  /** Resolved blurb — English description, or the French override. */
  description: string;
  /** Resolved prose component (French if available, else English), if any. */
  Text?: ComponentType;
  /** Page locale: drives the <html>-subtree lang and the chrome. */
  locale: Locale;
  /** Language of the rendered prose — flags the article when it differs from the
   *  page locale (a French page falling back to the English text). */
  contentLocale: Locale;
  /** The URL of this exact page in the other language, for the Nav switcher. */
  altHref: string;
  backHref: string;
  backLabel: string;
  /** Set on a French page with no translation yet — shown above the English prose. */
  untranslatedNote?: string;
  /** Translated attribution lead-in, shown before the linked source name;
   *  replaces the English "Reproduced from …" credit. */
  frSourceIntro?: string;
};

export default function BookView({
  book,
  title,
  description,
  Text,
  locale,
  contentLocale,
  altHref,
  backHref,
  backLabel,
  untranslatedNote,
  frSourceIntro,
}: Props) {
  // Book-length PDFs read badly trapped in a tall inline iframe, so we lead with
  // open/download and make the inline reader opt-in. Short ones (Finney's 7pp)
  // stay inline. Unknown page count is treated as long, to be safe.
  const isLongPdf = !!book.pdf && (book.pages == null || book.pages > 50);

  return (
    <div
      className={styles.shell}
      lang={locale === "fr" ? "fr" : undefined}
    >
      <Celestial />
      <Nav locale={locale} altHref={altHref} />
      <main className={styles.page}>
        <Link href={backHref} className={styles.back}>
          {backLabel}
        </Link>

        <header className={styles.hero}>
          {/* The typographic plate is the cover: the title set in the display
              face on the book's plate colour, echoing the shelf spine and keeping
              the hero's "book on the page" proportions. */}
          <div
            className={styles.plate}
            style={{ background: book.color }}
            aria-hidden
          >
            <span className={styles.plateTitle}>{title}</span>
          </div>

          <div className={styles.meta}>
            {book.series && <p className={styles.series}>{ui[locale].series}</p>}
            <h1 className={styles.title}>{title}</h1>
            {book.author && <p className={styles.author}>{book.author}</p>}
            {(book.year || book.pages) && (
              <p className={styles.details}>
                {[book.year, book.pages && `${book.pages} pages`]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
            {description && <p className={styles.blurb}>{description}</p>}

            {book.pdf ? (
              <div className={styles.actions}>
                <a
                  className={styles.download}
                  href={book.pdf}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open the PDF ↗
                </a>
                {book.epub && (
                  <a className={styles.download} href={book.epub} download>
                    Download EPUB
                  </a>
                )}
                <a className={styles.altLink} href={book.pdf} download>
                  {book.epub ? "Download PDF" : "Download"}
                </a>
              </div>
            ) : book.external ? (
              <a
                className={styles.download}
                href={book.external}
                target="_blank"
                rel="noreferrer"
              >
                Read at {book.externalLabel} ↗
              </a>
            ) : null}

            {book.lightning && (
              <aside className={styles.v4v}>
                <a
                  className={styles.v4vQr}
                  href={`lightning:${book.lightning}`}
                  aria-label={`Tip ${book.author} over Lightning: ${book.lightning}`}
                >
                  {/* Static LNURL QR generated once; white-backed so it scans in
                      either theme. Decorative — the address link names it. */}
                  <img src={`/books/${book.slug}-lightning.svg`} alt="" />
                </a>
                <div className={styles.v4vBody}>
                  <p className={styles.v4vLabel}>Value for value</p>
                  <a className={styles.v4vAddr} href={`lightning:${book.lightning}`}>
                    {book.lightning}
                  </a>
                </div>
              </aside>
            )}
          </div>
        </header>

        {book.pdf ? (
          isLongPdf ? (
            // Long book: open/download is the real action; inline is opt-in.
            <section className={styles.reader} aria-label={`${title} — reader`}>
              <p className={styles.longNote}>
                {book.pages ? `This is a ${book.pages}-page book. ` : ""}
                It reads best{" "}
                <a href={book.pdf} target="_blank" rel="noreferrer">
                  opened in its own tab
                </a>{" "}
                or downloaded. You can also read it inline below.
              </p>
              <details className={styles.inline}>
                <summary className={styles.inlineSummary}>Read inline</summary>
                <iframe
                  className={styles.frame}
                  src={`${book.pdf}#view=FitH`}
                  title={`${title} by ${book.author}`}
                  loading="lazy"
                />
              </details>
            </section>
          ) : (
            <section
              className={styles.reader}
              aria-label={`${title} — embedded reader`}
            >
              <iframe
                className={styles.frame}
                src={`${book.pdf}#view=FitH`}
                title={`${title} by ${book.author}`}
                loading="lazy"
              />
              <p className={styles.fallback}>
                Can&rsquo;t see the PDF?{" "}
                <a href={book.pdf} target="_blank" rel="noreferrer">
                  Open it in a new tab
                </a>{" "}
                or download it above.
              </p>
            </section>
          )
        ) : Text ? (
          <>
            {untranslatedNote && (
              <p className={styles.fallbackNote}>{untranslatedNote}</p>
            )}
            <article
              className={styles.prose}
              lang={contentLocale !== locale ? contentLocale : undefined}
            >
              <Text />
            </article>
            {(frSourceIntro || book.source) && (
              <footer className={styles.sourceNote}>
                {frSourceIntro ? (
                  <>
                    {frSourceIntro}
                    <a href={book.source} target="_blank" rel="noreferrer">
                      {book.sourceLabel}
                    </a>
                    . Texte du domaine public / librement diffusable, mis en
                    page ici par la Cypherpunk Library.
                  </>
                ) : (
                  <>
                    Reproduced from{" "}
                    <a href={book.source} target="_blank" rel="noreferrer">
                      {book.sourceLabel ?? "the original source"}
                    </a>
                    . A public-domain / freely distributable text, set here in the
                    Cypherpunk Library&rsquo;s own hand.
                  </>
                )}
              </footer>
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}
