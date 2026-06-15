import Link from "next/link";
import type { Book } from "@/lib/books";
import { ui, type Locale } from "@/lib/i18n";
import Cover from "./Cover";
import styles from "./collection.module.css";

// Grid item: cover-art first, then title and a quiet author · year line. The
// whole card is the link to the book; in French it links into /fr so the
// translation holds. `index` sets a per-item entrance delay so the grid rises in
// as a soft cascade (capped so a large set still settles quickly).
type Props = {
  book: Book;
  /** Resolved display title (French override on /fr, else English). */
  title: string;
  external?: boolean;
  hasFr?: boolean;
  locale?: Locale;
  index?: number;
};

export default function BookCard({
  book,
  title,
  external,
  hasFr,
  locale = "en",
  index = 0,
}: Props) {
  const t = ui[locale].browseView;
  const href = `${locale === "fr" ? "/fr" : ""}/book/${book.slug}`;
  const meta = [book.author, book.year].filter(Boolean).join(" · ");
  return (
    <Link
      href={href}
      className={styles.card}
      style={{ animationDelay: `${40 + Math.min(index, 14) * 26}ms` }}
      aria-label={
        (book.author ? `${title} ${t.by} ${book.author}` : title) +
        (external ? `, ${t.opensExternal}` : "") +
        (hasFr ? `, ${t.frAvailable}` : "")
      }
    >
      <Cover
        book={book}
        variant="card"
        external={external}
        fr={hasFr}
        title={title}
        locale={locale}
      />
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {meta && <p className={styles.cardAuthor}>{meta}</p>}
      </div>
    </Link>
  );
}
