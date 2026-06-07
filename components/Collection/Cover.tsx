import type { CSSProperties } from "react";
import type { Book } from "@/lib/books";
import styles from "./collection.module.css";

// One typographic cover for every book: the plate colour with a dark scrim so
// the title, author and year stay legible on any slot. The card shows the full
// composed plate; the compact list row shows a single monogram. External
// link-outs carry a small corner arrow so a reader knows the click leaves the site.
type Props = { book: Book; variant: "card" | "row"; external?: boolean };

export default function Cover({ book, variant, external }: Props) {
  const sizeClass = variant === "row" ? styles.coverRow : styles.coverCard;
  const monogram = (book.author ?? book.title ?? "?").trim().charAt(0);

  return (
    <div
      className={`${styles.cover} ${sizeClass} ${styles.plate}`}
      style={{ "--plate-bg": book.color } as CSSProperties}
    >
      {variant === "row" ? (
        <span className={styles.plateMonogram} aria-hidden>
          {monogram}
        </span>
      ) : (
        <span className={styles.plateInner} aria-hidden>
          {book.series && <span className={styles.plateSeries}>{book.series}</span>}
          <span className={styles.plateTitle}>{book.title}</span>
          {book.author && <span className={styles.plateAuthor}>{book.author}</span>}
          {book.year && <span className={styles.plateYear}>{book.year}</span>}
        </span>
      )}

      {external && (
        <span className={styles.extBadge} aria-hidden>
          ↗
        </span>
      )}
    </div>
  );
}
