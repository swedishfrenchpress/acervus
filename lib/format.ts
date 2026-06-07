// Presentation logic for the browse view: how a book is read, and the facet
// values derived from the collection. Kept out of lib/books.ts (pure data) and
// free of React so it's safe to run in the client browse bundle.
//
// `hasText` is passed in rather than imported from content/texts: that registry
// pulls in the prose server components, and we never want those in the client
// bundle. The route hands down just the slugs (Object.keys(texts)).

import type { Book } from "@/lib/books";

export type ReadingKind = "PDF" | "Text" | "External";

export type ReadingMode = {
  /** onsite = reads in our reader (PDF iframe or reproduced prose); external = link-out. */
  where: "onsite" | "external";
  /** Coarse bucket — drives the Format facet. */
  kind: ReadingKind;
  /** Display tag: "PDF" | "Text" | the host name for link-outs. */
  medium: string;
  /** Reading chip: "Read here" | "External ↗". */
  label: string;
};

const READ_HERE = "Read here";
const EXTERNAL = "External ↗";

// Mirrors the book page's format priority (app/book/[slug]/page.tsx):
// pdf → external → reproduced text. Classifying in the same order guarantees the
// badge never disagrees with what /book/[slug] actually renders.
export function getReadingMode(book: Book, hasText: boolean): ReadingMode {
  if (book.pdf) {
    return { where: "onsite", kind: "PDF", medium: "PDF", label: READ_HERE };
  }
  if (book.external) {
    return {
      where: "external",
      kind: "External",
      medium: book.externalLabel ?? book.sourceLabel ?? "External",
      label: EXTERNAL,
    };
  }
  // hasText (and the defensive fallback) — reproduced prose, read on the page.
  return { where: "onsite", kind: "Text", medium: "Text", label: READ_HERE };
}

/** Floor a year to its decade (1988 → 1980, 2026 → 2020); null when no year. */
export function getDecade(year?: number): number | null {
  return year == null ? null : Math.floor(year / 10) * 10;
}

/** "2020s" from 2020. */
export function decadeLabel(decade: number): string {
  return `${decade}s`;
}

export type FacetOption<V> = { value: V; count: number };
export type DecadeOption = { value: number; label: string; count: number };

export type Facets = {
  formats: FacetOption<ReadingKind>[];
  authors: FacetOption<string>[];
  decades: DecadeOption[];
};

// Fixed presentation order for the format facet — read-here media first, link-out last.
const FORMAT_ORDER: ReadingKind[] = ["Text", "PDF", "External"];

/** Surname for sorting — the last whitespace token, parentheticals stripped. */
function surname(author: string): string {
  const cleaned = author.replace(/\s*\(.*?\)\s*/g, " ").trim();
  const parts = cleaned.split(/\s+/);
  return parts[parts.length - 1] || cleaned;
}

// Derive the three facet groups (with counts) from the real-book set. `textSlugs`
// classifies the on-site prose. Authors are deduped (Timothy C. May appears
// twice), decades bucketed; books without a year contribute to no decade.
export function buildFacets(books: Book[], textSlugs: string[]): Facets {
  const textSet = new Set(textSlugs);

  const formatCounts = new Map<ReadingKind, number>();
  const authorCounts = new Map<string, number>();
  const decadeCounts = new Map<number, number>();

  for (const book of books) {
    const { kind } = getReadingMode(book, textSet.has(book.slug ?? ""));
    formatCounts.set(kind, (formatCounts.get(kind) ?? 0) + 1);

    if (book.author) {
      authorCounts.set(book.author, (authorCounts.get(book.author) ?? 0) + 1);
    }

    const decade = getDecade(book.year);
    if (decade !== null) {
      decadeCounts.set(decade, (decadeCounts.get(decade) ?? 0) + 1);
    }
  }

  const formats = FORMAT_ORDER.filter((k) => formatCounts.has(k)).map((value) => ({
    value,
    count: formatCounts.get(value)!,
  }));

  const authors = [...authorCounts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => surname(a.value).localeCompare(surname(b.value)));

  const decades = [...decadeCounts.entries()]
    .map(([value, count]) => ({ value, label: decadeLabel(value), count }))
    .sort((a, b) => a.value - b.value);

  return { formats, authors, decades };
}
