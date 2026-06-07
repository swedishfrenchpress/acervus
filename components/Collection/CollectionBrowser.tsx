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
import BookCard from "./BookCard";
import BookRow from "./BookRow";
import styles from "./collection.module.css";

type Props = { books: Book[]; textSlugs: string[] };
type Layout = "grid" | "list";
type Entry = { book: Book; mode: ReadingMode };

// Toggle a value in/out of a selection array, immutably.
function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export default function CollectionBrowser({ books, textSlugs }: Props) {
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState<Layout>("grid"); // grid is the landing view
  const [formatSel, setFormatSel] = useState<ReadingKind[]>([]);

  const textSet = useMemo(() => new Set(textSlugs), [textSlugs]);

  // Classify each book once; cards/rows reuse the reading mode.
  const entries = useMemo<Entry[]>(
    () =>
      books.map((book) => ({
        book,
        mode: getReadingMode(book, textSet.has(book.slug ?? "")),
      })),
    [books, textSet],
  );

  const formats = useMemo(() => buildFormatFacet(books, textSlugs), [books, textSlugs]);

  const fuse = useMemo(
    () =>
      new Fuse(entries, {
        keys: [
          { name: ["book", "title"], weight: 0.55 },
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
            Search the collection
          </label>
          <input
            id="collection-search"
            type="search"
            className={styles.searchInput}
            placeholder="Search by title, author, idea…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className={styles.toolbar}>
          <div className={styles.formats} role="group" aria-label="Filter by format">
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
                  {f.value}
                  <span className={styles.fmtCount}>{f.count}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.viewToggle} role="group" aria-label="View">
            <button
              type="button"
              className={`${styles.viewBtn} ${layout === "grid" ? styles.viewBtnOn : ""}`}
              aria-pressed={layout === "grid"}
              aria-label="Grid view"
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
              aria-label="List view"
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
        {results.length} {results.length === 1 ? "book" : "books"}
        {filtered && results.length > 0 && (
          <>
            {" · "}
            <button type="button" className={styles.clear} onClick={clearAll}>
              Clear
            </button>
          </>
        )}
      </p>

      {results.length === 0 ? (
        <div className={styles.empty}>
          <p>No books match your search{formatSel.length ? " and filter" : ""}.</p>
          <button type="button" className={styles.clear} onClick={clearAll}>
            Clear search and filter
          </button>
        </div>
      ) : layout === "grid" ? (
        <div key={revealKey} className={styles.grid}>
          {results.map((e, i) => (
            <BookCard
              key={e.book.slug}
              book={e.book}
              external={e.mode.where === "external"}
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
              external={e.mode.where === "external"}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
