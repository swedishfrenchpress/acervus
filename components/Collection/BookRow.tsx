import Link from "next/link";
import type { Book } from "@/lib/books";
import Cover from "./Cover";
import styles from "./collection.module.css";

// List item: a scannable row (thumb, title + author, year). The whole row is the
// link to /book/[slug]; external link-outs carry the arrow on the thumb.
type Props = { book: Book; external?: boolean };

export default function BookRow({ book, external }: Props) {
  return (
    <Link
      href={`/book/${book.slug}`}
      className={styles.row}
      aria-label={
        (book.author ? `${book.title} by ${book.author}` : book.title) +
        (external ? ", opens an external site" : "")
      }
    >
      <Cover book={book} variant="row" external={external} />
      <span className={styles.rowMain}>
        <span className={styles.rowTitle}>{book.title}</span>
        {book.author && <span className={styles.rowAuthor}>{book.author}</span>}
      </span>
      {book.year && <span className={styles.rowYear}>{book.year}</span>}
    </Link>
  );
}
