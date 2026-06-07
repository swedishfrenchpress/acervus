import type { Book } from "@/lib/books";
import styles from "./collection.module.css";

// One face for every book so the grid and list never show a broken-image hole.
// With cover art → the image; without → the typographic plate from the book page
// (same colored field, sheen, and binding shadow), so the two cover-less books
// (Conscience of a Hacker, T.A.Z.) read as intentional plates, not gaps.
type Props = { book: Book; variant: "card" | "row" };

export default function Cover({ book, variant }: Props) {
  const sizeClass = variant === "row" ? styles.coverRow : styles.coverCard;

  if (book.cover) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        className={`${styles.cover} ${sizeClass}`}
        src={book.cover}
        alt=""
        draggable={false}
      />
    );
  }

  return (
    <div
      className={`${styles.cover} ${sizeClass} ${styles.plate}`}
      style={{ background: book.color }}
      aria-hidden
    >
      <span className={styles.plateTitle}>{book.title}</span>
    </div>
  );
}
