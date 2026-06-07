import type { Metadata } from "next";
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
  if (!book?.title) return { title: "Not found — Acervus" };
  return {
    title: `${book.title} — Acervus`,
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
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className={styles.cover}
              src={book.cover}
              alt={`Cover of ${book.title}`}
            />
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
              <a className={styles.download} href={book.pdf} download>
                Download PDF
              </a>
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
          <section
            className={styles.reader}
            aria-label={`${book.title} — embedded reader`}
          >
            <iframe
              className={styles.frame}
              src={`${book.pdf}#view=FitH`}
              title={`${book.title} by ${book.author}`}
            />
            <p className={styles.fallback}>
              Can&rsquo;t see the PDF?{" "}
              <a href={book.pdf} target="_blank" rel="noreferrer">
                Open it in a new tab
              </a>{" "}
              or download it above.
            </p>
          </section>
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
                . A public-domain / freely distributable text, set here in
                Acervus&rsquo;s own hand.
              </footer>
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}
