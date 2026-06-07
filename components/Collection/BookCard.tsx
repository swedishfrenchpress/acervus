import Link from "next/link";
import type { Book } from "@/lib/books";
import Cover from "./Cover";
import styles from "./collection.module.css";

// Grid item — cover-art first, then title / author. The whole card is the link
// to /book/[slug]; hover + click is affordance enough, so no explicit CTA.
export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.slug}`}
      className={styles.card}
      aria-label={book.author ? `${book.title} by ${book.author}` : book.title}
    >
      <Cover book={book} variant="card" />
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{book.title}</h3>
        {book.author && <p className={styles.cardAuthor}>{book.author}</p>}
      </div>
    </Link>
  );
}
