import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Celestial from "@/components/Celestial";
import { getBookBySlug } from "@/lib/books";
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
  // Only fully-real books (cover + pdf) have a readable page.
  if (!book?.cover || !book.pdf) notFound();

  return (
    <div className={styles.shell}>
      <Celestial />
      <Nav />
      <main className={styles.page}>
        <Link href="/" className={styles.back}>
          Back to the shelf
        </Link>

      <header className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.cover}
          src={book.cover}
          alt={`Cover of ${book.title}`}
        />

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
          {book.description && <p className={styles.blurb}>{book.description}</p>}

          <a className={styles.download} href={book.pdf} download>
            Download PDF
          </a>
        </div>
      </header>

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
      </main>
    </div>
  );
}
