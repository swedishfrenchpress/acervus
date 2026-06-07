import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Celestial from "@/components/Celestial";
import { getBookBySlug } from "@/lib/books";
import { texts } from "@/content/texts";
import styles from "./page.module.css";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book?.title) return { title: "Not found" };
  return {
    title: book.title,
    description: book.description,
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
          {book.cover ? (
            <div className={styles.cover}>
              <Image
                className={styles.coverImg}
                src={book.cover}
                alt=""
                fill
                sizes="(max-width: 760px) 240px, 300px"
                priority
              />
            </div>
          ) : (
            // Cover art lands later; until then a typographic plate echoes the
            // shelf spine and keeps the hero's "book on the page" proportions.
            <div
              className={styles.plate}
              style={{ background: book.color }}
              aria-hidden
            >
              <span className={styles.plateTitle}>{book.title}</span>
            </div>
          )}

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
                <a className={styles.altLink} href={book.pdf} download>
                  Download
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
