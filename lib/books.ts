// Book data. Most entries are still plain colored blocks (placeholders); a book
// becomes "real" — and clickable, with a cover image and a /book/[slug] page —
// once it carries a `slug`. The marquee only reads `color`/`h`/`t`, so adding
// the optional fields below leaves every placeholder untouched.

export type Book = {
  id: number;
  /** Placeholder cover color — and the fallback bg behind a real cover image. */
  color: string;
  /** Cover height in px — varied so the row reads as real, mismatched books. */
  h: number;
  /** Book thickness (spine depth) in px. */
  t: number;

  // --- present only on real books (a `slug` makes the book clickable) ---
  /** URL slug → /book/[slug]. */
  slug?: string;
  title?: string;
  author?: string;
  /** Series / collection label shown above the title. */
  series?: string;
  /** Cover image path, served from /public. */
  cover?: string;
  /** PDF path, served from /public. */
  pdf?: string;
  /** Short blurb for the book-view page. */
  description?: string;
  year?: number;
  pages?: number;
};

// A tasteful, varied palette echoing the reference's literary covers.
const PALETTE: Array<[string, number, number]> = [
  ["#e7dcc4", 232, 36], // cream
  ["#7a1f2b", 214, 40], // burgundy
  ["#16243f", 240, 32], // navy
  ["#e7c2cc", 208, 34], // blush
  ["#14532d", 236, 38], // forest green
  ["#c2410c", 220, 30], // burnt orange
  ["#1f2733", 244, 42], // charcoal
  ["#b51d22", 226, 34], // signal red
  ["#0f3d3e", 212, 36], // deep teal
  ["#d6a23c", 234, 32], // mustard gold
  ["#3a1d52", 218, 38], // plum
  ["#0b1f3a", 240, 30], // midnight
  ["#6f9a6a", 206, 36], // sage
  ["#8b1e3f", 230, 40], // wine
  ["#1a1a1a", 222, 34], // near-black
  ["#dfe3e6", 216, 32], // pale grey
  ["#243b6b", 238, 36], // cobalt
  ["#5b3a29", 210, 40], // walnut brown
];

export const books: Book[] = PALETTE.map(([color, h, t], i) => ({
  id: i,
  color,
  h,
  t,
}));

// --- the first real book ---
// Overlaid in place onto the deep-teal slot (index 8): keeping its id/color/h/t
// means the marquee's geometry is unchanged, while the teal spine/edges sit well
// behind a teal-on-black cover. Replace in place — never push a 19th entry, since
// BookShelf measures one set width as `books.length`.
const FINNEY = 8;
books[FINNEY] = {
  ...books[FINNEY],
  slug: "protecting-privacy-with-electronic-cash",
  title: "Protecting Privacy with Electronic Cash",
  author: "Hal Finney",
  series: "A Cypherpunk's Library",
  cover: "/covers/protecting-privacy-with-electronic-cash.png",
  pdf: "/books/protecting-privacy-with-electronic-cash.pdf",
  description:
    "Hal Finney's early case for digital cash that preserves anonymity: a " +
    "demonstration that electronic payment need not mean electronic surveillance.",
  year: 1993,
  pages: 7,
};

/** Look up a book by its URL slug (undefined for placeholders / unknown slugs). */
export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
