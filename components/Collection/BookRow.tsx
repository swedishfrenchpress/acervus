import Link from "next/link";
import type { Book } from "@/lib/books";
import { ui, type Locale } from "@/lib/i18n";
import Cover from "./Cover";
import styles from "./collection.module.css";

// List item: a scannable row (thumb, title + author, year). The whole row links
// to the book; in French it links into /fr so the translation holds. External
// link-outs carry the arrow on the thumb. `index` sets a per-item entrance delay
// so rows cascade in.
type Props = {
  book: Book;
  /** Resolved display title (French override on /fr, else English). */
  title: string;
  external?: boolean;
  hasFr?: boolean;
  locale?: Locale;
  index?: number;
};

export default function BookRow({
  book,
  title,
  external,
  hasFr,
  locale = "en",
  index = 0,
}: Props) {
  const t = ui[locale].browseView;
  const href = `${locale === "fr" ? "/fr" : ""}/book/${book.slug}`;
  return (
    <Link
      href={href}
      className={styles.row}
      style={{ animationDelay: `${40 + Math.min(index, 14) * 26}ms` }}
      aria-label={
        (book.author ? `${title} ${t.by} ${book.author}` : title) +
        (external ? `, ${t.opensExternal}` : "") +
        (hasFr ? `, ${t.frAvailable}` : "")
      }
    >
      <Cover book={book} variant="row" external={external} locale={locale} />
      <span className={styles.rowMain}>
        <span className={styles.rowTitle}>{title}</span>
        {book.author && <span className={styles.rowAuthor}>{book.author}</span>}
      </span>
      {/* The 40px thumb is too small for a legible chip, so the list marks French
          availability with a quiet inline tag beside the year instead. */}
      {hasFr && (
        <span className={styles.frTag} aria-hidden>
          FR
        </span>
      )}
      {book.year && <span className={styles.rowYear}>{book.year}</span>}
    </Link>
  );
}
