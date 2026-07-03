"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { Book } from "@/lib/books";
import {
  buildFormatFacet,
  getReadingMode,
  type ReadingKind,
  type ReadingMode,
} from "@/lib/format";
import { ui, frBooks, type Locale } from "@/lib/i18n";
import BookCard from "./BookCard";
import BookRow from "./BookRow";
import styles from "./collection.module.css";

type Props = {
  books: Book[];
  textSlugs: string[];
  frSlugs: string[];
  locale: Locale;
};
type Layout = "grid" | "list";
// `title` is the display title (the French override on /fr/collection, else the
// English title); `frTitle` is added as a search key so a French title still
// matches when present.
type Entry = { book: Book; mode: ReadingMode; title: string; frTitle?: string };

// Toggle a value in/out of a selection array, immutably.
function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export default function CollectionBrowser({
  books,
  textSlugs,
  frSlugs,
  locale,
}: Props) {
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState<Layout>("grid"); // grid is the landing view
  const [formatSel, setFormatSel] = useState<ReadingKind[]>([]);

  const t = ui[locale].browseView;
  const textSet = useMemo(() => new Set(textSlugs), [textSlugs]);
  const frSet = useMemo(() => new Set(frSlugs), [frSlugs]);

  // Classify each book once; cards/rows reuse the reading mode. On /fr/collection
  // the French title (where it exists) becomes the display + an extra search key.
  const entries = useMemo<Entry[]>(
    () =>
      books.map((book) => {
        const frTitle = locale === "fr" ? frBooks[book.slug]?.title : undefined;
        return {
          book,
          mode: getReadingMode(book, textSet.has(book.slug ?? "")),
          title: frTitle ?? book.title,
          frTitle,
        };
      }),
    [books, textSet, locale],
  );

  const formats = useMemo(() => buildFormatFacet(books, textSlugs), [books, textSlugs]);

  const fuse = useMemo(
    () =>
      new Fuse(entries, {
        keys: [
          { name: ["book", "title"], weight: 0.55 },
          { name: "frTitle", weight: 0.55 },
          { name: ["book", "author"], weight: 0.25 },
          { name: ["book", "series"], weight: 0.05 },
          { name: ["book", "description"], weight: 0.15 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [entries],
  );

  // Fuzzy search first (preserves relevance order), then the Format filter.
  const results = useMemo(() => {
    const q = query.trim();
    const base = q ? fuse.search(q).map((r) => r.item) : entries;
    return formatSel.length === 0
      ? base
      : base.filter((e) => formatSel.includes(e.mode.kind));
  }, [query, fuse, entries, formatSel]);

  const filtered = query.trim() !== "" || formatSel.length > 0;
  const clearAll = () => {
    setQuery("");
    setFormatSel([]);
  };

  // Remount the results on the discrete, deliberate changes — switching view or
  // toggling a format — so the set re-staggers in. Search is left out on purpose:
  // typing keeps the same key, so the container reconciles and only fresh matches
  // rise in, rather than the whole grid replaying its entrance on every keystroke.
  const revealKey = `${layout}|${formatSel.join(",")}`;

  return (
    <div>
      {/* controls: search, format filter, view toggle (no catalog facet panel) */}
      <div className={styles.controls}>
        <div className={styles.search}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <label htmlFor="collection-search" className={styles.srOnly}>
            {t.searchLabel}
          </label>
          <input
            id="collection-search"
            type="search"
            className={styles.searchInput}
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className={styles.toolbar}>
          <div className={styles.formats} role="group" aria-label={t.filterLabel}>
            {formats.map((f) => {
              const on = formatSel.includes(f.value);
              return (
                <button
                  key={f.value}
                  type="button"
                  className={`${styles.fmtPill} ${on ? styles.fmtPillOn : ""}`}
                  aria-pressed={on}
                  onClick={() => setFormatSel((s) => toggle(s, f.value))}
                >
                  {t.formats[f.value]}
                  <span className={styles.fmtCount}>{f.count}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.viewToggle} role="group" aria-label={t.viewLabel}>
            <button
              type="button"
              className={`${styles.viewBtn} ${layout === "grid" ? styles.viewBtnOn : ""}`}
              aria-pressed={layout === "grid"}
              aria-label={t.gridView}
              onClick={() => setLayout("grid")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
                <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
                <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
                <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.viewBtn} ${layout === "list" ? styles.viewBtnOn : ""}`}
              aria-pressed={layout === "list"}
              aria-label={t.listView}
              onClick={() => setLayout("list")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 6h.01M4 12h.01M4 18h.01" />
                <path d="M9 6h11M9 12h11M9 18h11" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <p className={styles.count} aria-live="polite">
        {results.length} {results.length === 1 ? t.one : t.many}
        {filtered && results.length > 0 && (
          <>
            {" · "}
            <button type="button" className={styles.clear} onClick={clearAll}>
              {t.clear}
            </button>
          </>
        )}
      </p>

      {results.length === 0 ? (
        <div className={styles.empty}>
          <p>
            {t.noMatch}
            {formatSel.length ? t.andFilter : ""}.
          </p>
          <button type="button" className={styles.clear} onClick={clearAll}>
            {t.clearAll}
          </button>
        </div>
      ) : layout === "grid" ? (
        <div key={revealKey} className={styles.grid}>
          {results.map((e, i) => (
            <BookCard
              key={e.book.slug}
              book={e.book}
              title={e.title}
              external={e.mode.where === "external"}
              hasFr={locale === "fr" && frSet.has(e.book.slug)}
              locale={locale}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div key={revealKey} className={styles.list}>
          {results.map((e, i) => (
            <BookRow
              key={e.book.slug}
              book={e.book}
              title={e.title}
              external={e.mode.where === "external"}
              hasFr={locale === "fr" && frSet.has(e.book.slug)}
              locale={locale}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
