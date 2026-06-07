import Link from "next/link";
import type { Book } from "@/lib/books";
import Cover from "./Cover";
import styles from "./collection.module.css";

// List item — a scannable row: thumb, title + author, year. The whole row is the
// link to /book/[slug]; hover + click is affordance enough, so no explicit CTA.
export default function BookRow({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.slug}`}
      className={styles.row}
      aria-label={book.author ? `${book.title} by ${book.author}` : book.title}
    >
      <Cover book={book} variant="row" />
      <span className={styles.rowMain}>
        <span className={styles.rowTitle}>{book.title}</span>
        {book.author && <span className={styles.rowAuthor}>{book.author}</span>}
      </span>
      {book.year && <span className={styles.rowYear}>{book.year}</span>}
    </Link>
  );
}
