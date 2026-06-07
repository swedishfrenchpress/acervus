import type { CSSProperties } from "react";
import Image from "next/image";
import type { Book } from "@/lib/books";
import styles from "./collection.module.css";

// One face for every book so the grid and list never show a broken-image hole.
// With cover art, an optimized next/image; without, a deliberately composed
// typographic plate (slot colour + a dark lower-third scrim so the title, author
// and year stay legible on ANY palette slot, light or dark). External link-outs
// carry a small corner arrow so a reader knows the click leaves the site.
type Props = { book: Book; variant: "card" | "row"; external?: boolean };

export default function Cover({ book, variant, external }: Props) {
  const sizeClass = variant === "row" ? styles.coverRow : styles.coverCard;
  const monogram = (book.author ?? book.title ?? "?").trim().charAt(0);

  return (
    <div
      className={`${styles.cover} ${sizeClass} ${book.cover ? "" : styles.plate}`}
      style={book.cover ? undefined : ({ "--plate-bg": book.color } as CSSProperties)}
    >
      {book.cover ? (
        <Image
          className={styles.coverImg}
          src={book.cover}
          alt=""
          fill
          sizes={variant === "row" ? "40px" : "(max-width: 520px) 45vw, 200px"}
          draggable={false}
        />
      ) : variant === "row" ? (
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
