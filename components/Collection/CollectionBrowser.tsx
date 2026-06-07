"use client";

import { useId, useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { Book } from "@/lib/books";
import {
  buildFacets,
  getDecade,
  getReadingMode,
  type ReadingKind,
  type ReadingMode,
} from "@/lib/format";
import BookCard from "./BookCard";
import BookRow from "./BookRow";
import styles from "./collection.module.css";

type Props = { books: Book[]; textSlugs: string[] };
type Layout = "grid" | "list";
type Entry = { book: Book; mode: ReadingMode; decade: number | null };

// Toggle a value in/out of a selection array, immutably.
function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export default function CollectionBrowser({ books, textSlugs }: Props) {
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState<Layout>("grid"); // grid is the landing view
  const [facetsOpen, setFacetsOpen] = useState(false); // resting UI = search only
  const [formatSel, setFormatSel] = useState<ReadingKind[]>([]);
  const [authorSel, setAuthorSel] = useState<string[]>([]);
  const [decadeSel, setDecadeSel] = useState<number[]>([]);

  const panelId = useId();

  const textSet = useMemo(() => new Set(textSlugs), [textSlugs]);

  // Classify each book once (reading mode + decade); cards/rows reuse the result.
  const entries = useMemo<Entry[]>(
    () =>
      books.map((book) => ({
        book,
        mode: getReadingMode(book, textSet.has(book.slug ?? "")),
        decade: getDecade(book.year),
      })),
    [books, textSet],
  );

  const facets = useMemo(() => buildFacets(books, textSlugs), [books, textSlugs]);

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

  // Fuzzy search first (preserves relevance order), then facet filtering:
  // AND across the three facets, OR within each.
  const results = useMemo(() => {
    const q = query.trim();
    const base = q ? fuse.search(q).map((r) => r.item) : entries;
    return base.filter(
      (e) =>
        (formatSel.length === 0 || formatSel.includes(e.mode.kind)) &&
        (authorSel.length === 0 ||
          (e.book.author != null && authorSel.includes(e.book.author))) &&
        (decadeSel.length === 0 ||
          (e.decade !== null && decadeSel.includes(e.decade))),
    );
  }, [query, fuse, entries, formatSel, authorSel, decadeSel]);

  const selectedCount = formatSel.length + authorSel.length + decadeSel.length;
  const filtered = query.trim() !== "" || selectedCount > 0;

  const clearAll = () => {
    setQuery("");
    setFormatSel([]);
    setAuthorSel([]);
    setDecadeSel([]);
  };

  return (
    <div>
      {/* ---- controls: the always-visible resting UI ---- */}
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
          <button
            type="button"
            className={`${styles.filtersBtn} ${facetsOpen ? styles.filtersBtnOn : ""}`}
            aria-expanded={facetsOpen}
            aria-controls={panelId}
            onClick={() => setFacetsOpen((v) => !v)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filters
            {selectedCount > 0 && (
              <span className={styles.badge}>{selectedCount}</span>
            )}
          </button>

          <div className={styles.viewToggle} role="group" aria-label="View">
            <button
              type="button"
              className={`${styles.viewBtn} ${layout === "grid" ? styles.viewBtnOn : ""}`}
              aria-pressed={layout === "grid"}
              aria-label="Grid view"
              onClick={() => setLayout("grid")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
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
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M4 6h.01M4 12h.01M4 18h.01" />
                <path d="M9 6h11M9 12h11M9 18h11" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ---- collapsible facet bar (collapsed by default) ---- */}
      <div className={styles.facets} id={panelId} hidden={!facetsOpen}>
        <FacetGroup
          legend="Format"
          options={facets.formats.map((f) => ({ value: f.value, label: f.value, count: f.count }))}
          selected={formatSel}
          onToggle={(v) => setFormatSel((s) => toggle(s, v))}
        />
        <FacetGroup
          legend="Author"
          options={facets.authors.map((a) => ({ value: a.value, label: a.value, count: a.count }))}
          selected={authorSel}
          onToggle={(v) => setAuthorSel((s) => toggle(s, v))}
        />
        <FacetGroup
          legend="Era"
          options={facets.decades.map((d) => ({ value: d.value, label: d.label, count: d.count }))}
          selected={decadeSel}
          onToggle={(v) => setDecadeSel((s) => toggle(s, v))}
        />
        {selectedCount > 0 && (
          <button type="button" className={styles.facetClear} onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      <p className={styles.count} aria-live="polite">
        {results.length} {results.length === 1 ? "book" : "books"}
      </p>

      {/* ---- results ---- */}
      {results.length === 0 ? (
        <div className={styles.empty}>
          <p>No books match your search{filtered ? " and filters" : ""}.</p>
          {filtered && (
            <button type="button" className={styles.facetClear} onClick={clearAll}>
              Clear search and filters
            </button>
          )}
        </div>
      ) : layout === "grid" ? (
        <div className={styles.grid}>
          {results.map((e) => (
            <BookCard key={e.book.slug} book={e.book} />
          ))}
        </div>
      ) : (
        <div className={styles.list}>
          {results.map((e) => (
            <BookRow key={e.book.slug} book={e.book} />
          ))}
        </div>
      )}
    </div>
  );
}

// A single facet group: a fieldset of checkbox pills with per-option counts.
// Real checkboxes (visually hidden, still focusable) give correct multi-select
// semantics to screen readers; the focus ring is shown on the pill via :focus-within.
function FacetGroup<T extends string | number>({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: { value: T; label: string; count: number }[];
  selected: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <fieldset className={styles.facetGroup}>
      <legend className={styles.facetLegend}>{legend}</legend>
      <div className={styles.facetOptions}>
        {options.map((opt) => {
          const checked = selected.includes(opt.value);
          return (
            <label
              key={String(opt.value)}
              className={`${styles.facetPill} ${checked ? styles.facetPillOn : ""}`}
            >
              <input
                type="checkbox"
                className={styles.srOnly}
                checked={checked}
                onChange={() => onToggle(opt.value)}
              />
              <span>{opt.label}</span>
              <span className={styles.facetCount}>{opt.count}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
