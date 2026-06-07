import Link from "next/link";
import type { Book } from "@/lib/books";
import Cover from "./Cover";
import styles from "./collection.module.css";

// List item: a scannable row (thumb, title + author, year). The whole row is the
// link to /book/[slug]; external link-outs carry the arrow on the thumb. `index`
// sets a per-item entrance delay so rows cascade in; see collection.module.css.
type Props = { book: Book; external?: boolean; index?: number };

export default function BookRow({ book, external, index = 0 }: Props) {
  return (
    <Link
      href={`/book/${book.slug}`}
      className={styles.row}
      style={{ animationDelay: `${40 + Math.min(index, 14) * 26}ms` }}
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
