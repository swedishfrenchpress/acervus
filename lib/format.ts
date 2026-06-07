// Presentation logic for the browse view: how a book is read, and the Format
// facet derived from the collection. Kept out of lib/books.ts (pure data) and
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
  /** Coarse bucket, drives the Format facet. */
  kind: ReadingKind;
  /** Display tag: "PDF" | "Text" | the host name for link-outs. */
  medium: string;
  /** Reading chip: "Read here" | "External ↗". */
  label: string;
};

const READ_HERE = "Read here";
const EXTERNAL = "External ↗";

// Mirrors the book page's format priority (app/book/[slug]/page.tsx):
// pdf, then external, then reproduced text. Classifying in the same order
// guarantees the badge never disagrees with what /book/[slug] actually renders.
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
  // hasText (and the defensive fallback): reproduced prose, read on the page.
  return { where: "onsite", kind: "Text", medium: "Text", label: READ_HERE };
}

export type FormatOption = { value: ReadingKind; count: number };

// Fixed presentation order, read-here media first, link-out last.
const FORMAT_ORDER: ReadingKind[] = ["Text", "PDF", "External"];

/** The Format facet (the only facet): each reading kind present, with a count. */
export function buildFormatFacet(books: Book[], textSlugs: string[]): FormatOption[] {
  const textSet = new Set(textSlugs);
  const counts = new Map<ReadingKind, number>();
  for (const book of books) {
    const { kind } = getReadingMode(book, textSet.has(book.slug ?? ""));
    counts.set(kind, (counts.get(kind) ?? 0) + 1);
  }
  return FORMAT_ORDER.filter((k) => counts.has(k)).map((value) => ({
    value,
    count: counts.get(value)!,
  }));
}
