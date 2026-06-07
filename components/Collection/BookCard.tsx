import Link from "next/link";
import type { Book } from "@/lib/books";
import Cover from "./Cover";
import styles from "./collection.module.css";

// Grid item: cover-art first, then title and a quiet author · year line. The
// whole card is the link to /book/[slug]; hover and click are affordance enough.
type Props = { book: Book; external?: boolean };

export default function BookCard({ book, external }: Props) {
  const meta = [book.author, book.year].filter(Boolean).join(" · ");
  return (
    <Link
      href={`/book/${book.slug}`}
      className={styles.card}
      aria-label={
        (book.author ? `${book.title} by ${book.author}` : book.title) +
        (external ? ", opens an external site" : "")
      }
    >
      <Cover book={book} variant="card" external={external} />
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{book.title}</h3>
        {meta && <p className={styles.cardAuthor}>{meta}</p>}
      </div>
    </Link>
  );
}
