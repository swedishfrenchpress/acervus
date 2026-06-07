import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Celestial from "@/components/Celestial";
import { getBookBySlug } from "@/lib/books";
import { OG_IMAGE, TWITTER_IMAGE } from "@/lib/og";
import { texts } from "@/content/texts";
import styles from "./page.module.css";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book?.title) return { title: "Not found" };

  // Child pages don't inherit the root openGraph field by field: defining our own
  // replaces it wholesale (Next merges metadata shallowly), which also drops the
  // inherited file-based card image — so we re-attach OG_IMAGE/TWITTER_IMAGE here.
  // Without this, a shared book link would show the generic site title and no art.
  // og:title gets the full name spelled out, since the title template only touches
  // <title>, not openGraph.
  const url = `/book/${slug}`;
  const ogTitle = `${book.title} · The Cypherpunk Library`;
  return {
    title: book.title,
    description: book.description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: book.description,
      url,
      type: "article",
      siteName: "The Cypherpunk Library",
      authors: book.author ? [book.author] : undefined,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: book.description,
      images: [TWITTER_IMAGE],
    },
  };
}

export default async function BookPage({ params }: Params) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book?.title) notFound();

  // A book reads in one of three ways, in priority order: an embedded PDF
  // (Finney), an external link-out (book-length works), or in-site prose
  // reproduced from `content/texts`. Anything else isn't a real, readable book.
  const Text = texts[slug];
  if (!book.pdf && !book.external && !Text) notFound();

  // Book-length PDFs read badly trapped in a tall inline iframe, so we lead with
  // open/download and make the inline reader opt-in. Short ones (Finney's 7pp)
  // stay inline. Unknown page count is treated as long, to be safe.
  const isLongPdf = !!book.pdf && (book.pages == null || book.pages > 50);

  return (
    <div className={styles.shell}>
      <Celestial />
      <Nav />
      <main className={styles.page}>
        <Link href="/" className={styles.back}>
          Back to the shelf
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
            <span className={styles.plateTitle}>{book.title}</span>
          </div>

          <div className={styles.meta}>
            {book.series && <p className={styles.series}>{book.series}</p>}
            <h1 className={styles.title}>{book.title}</h1>
            {book.author && <p className={styles.author}>{book.author}</p>}
            {(book.year || book.pages) && (
              <p className={styles.details}>
                {[book.year, book.pages && `${book.pages} pages`]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
            {book.description && (
              <p className={styles.blurb}>{book.description}</p>
            )}

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
                  <img src={`/books/${slug}-lightning.svg`} alt="" />
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
            <section
              className={styles.reader}
              aria-label={`${book.title} — reader`}
            >
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
                  title={`${book.title} by ${book.author}`}
                  loading="lazy"
                />
              </details>
            </section>
          ) : (
            <section
              className={styles.reader}
              aria-label={`${book.title} — embedded reader`}
            >
              <iframe
                className={styles.frame}
                src={`${book.pdf}#view=FitH`}
                title={`${book.title} by ${book.author}`}
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
            <article className={styles.prose}>
              <Text />
            </article>
            {book.source && (
              <footer className={styles.sourceNote}>
                Reproduced from{" "}
                <a href={book.source} target="_blank" rel="noreferrer">
                  {book.sourceLabel ?? "the original source"}
                </a>
                . A public-domain / freely distributable text, set here in the
                Cypherpunk Library&rsquo;s own hand.
              </footer>
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}
