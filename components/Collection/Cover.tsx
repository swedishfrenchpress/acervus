import type { CSSProperties } from "react";
import type { Book } from "@/lib/books";
import { ui, type Locale } from "@/lib/i18n";
import styles from "./collection.module.css";

// One typographic cover for every book: the plate colour with a dark scrim so
// the title, author and year stay legible on any slot. The card shows the full
// composed plate; the compact list row shows a single monogram. External
// link-outs carry a small corner arrow so a reader knows the click leaves the
// site. `title` is the resolved display title (French where translated) and
// `locale` localizes the series line, so a French cover reads fully in French.
type Props = {
  book: Book;
  variant: "card" | "row";
  external?: boolean;
  fr?: boolean;
  title?: string;
  locale?: Locale;
};

export default function Cover({
  book,
  variant,
  external,
  fr,
  title,
  locale = "en",
}: Props) {
  const sizeClass = variant === "row" ? styles.coverRow : styles.coverCard;
  const displayTitle = title ?? book.title;
  const series = ui[locale].series;
  const monogram = (book.author ?? displayTitle ?? "?").trim().charAt(0);

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
          {series && <span className={styles.plateSeries}>{series}</span>}
          <span className={styles.plateTitle}>{displayTitle}</span>
          {book.author && <span className={styles.plateAuthor}>{book.author}</span>}
          {book.year && <span className={styles.plateYear}>{book.year}</span>}
        </span>
      )}

      {external && (
        <span className={styles.extBadge} aria-hidden>
          ↗
        </span>
      )}

      {/* French-edition marker, top-left so it never meets the external badge.
          The card's full plate has room for it; the row marks French inline. */}
      {fr && (
        <span className={styles.frBadge} aria-hidden>
          FR
        </span>
      )}
    </div>
  );
}
