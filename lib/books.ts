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

  // --- reproduced in-site text (the manifestos); prose lives in content/texts ---
  /** Original URL the prose was reproduced from (drives the source credit). */
  source?: string;
  /** Human label for that source, e.g. "activism.net", "EFF", "Phrack 1:7". */
  sourceLabel?: string;

  // --- link-out book (full work lives elsewhere; nothing reproduced in-site) ---
  /** External URL to read the full work. Presence makes this a link-out book. */
  external?: string;
  /** Label for the link-out CTA, e.g. "Nakamoto Institute" → "Read at …". */
  externalLabel?: string;
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

// --- the cypherpunk canon ---
// Four short manifestos are reproduced in-site (their prose lives in
// content/texts, keyed by slug — these carry `source`/`sourceLabel` but no
// `pdf`/`cover`). Two book-length works link out (`external`/`externalLabel`).
// Each is overlaid in place onto a dark placeholder slot — same id/color/h/t, so
// the marquee geometry is untouched and the light title reads on the spine. Cover
// art lands later; until then the shelf shows a typographic spine and the book
// page a typographic plate. As with Finney: replace in place, never push entries.

const HUGHES = 1; // burgundy
books[HUGHES] = {
  ...books[HUGHES],
  slug: "a-cypherpunks-manifesto",
  title: "A Cypherpunk's Manifesto",
  author: "Eric Hughes",
  series: "A Cypherpunk's Library",
  source: "https://www.activism.net/cypherpunk/manifesto.html",
  sourceLabel: "activism.net",
  description:
    "The founding statement of the cypherpunk movement: privacy is not secrecy " +
    "but the power to selectively reveal oneself — and in the electronic age it " +
    "must be defended with cryptography and code, not begged from governments.",
  year: 1993,
};

const MAY_CA = 2; // navy
books[MAY_CA] = {
  ...books[MAY_CA],
  slug: "the-crypto-anarchist-manifesto",
  title: "The Crypto Anarchist Manifesto",
  author: "Timothy C. May",
  series: "A Cypherpunk's Library",
  source: "https://www.activism.net/cypherpunk/crypto-anarchy.html",
  sourceLabel: "activism.net",
  description:
    "The 1988 text that named crypto anarchy. May foresees untraceable networks, " +
    "anonymous markets, and reputations that outweigh credit ratings — a " +
    "printing-press-scale shift in the power of the state.",
  year: 1988,
};

const BARLOW = 4; // forest green
books[BARLOW] = {
  ...books[BARLOW],
  slug: "a-declaration-of-the-independence-of-cyberspace",
  title: "A Declaration of the Independence of Cyberspace",
  author: "John Perry Barlow",
  series: "A Cypherpunk's Library",
  source: "https://www.eff.org/cyberspace-independence",
  sourceLabel: "EFF",
  description:
    "Written in Davos in 1996 against the Telecommunications Reform Act: a ringing " +
    "refusal of government sovereignty over cyberspace — the “civilization of the " +
    "Mind” that bodies cannot govern.",
  year: 1996,
};

const BLANKENSHIP = 11; // midnight
books[BLANKENSHIP] = {
  ...books[BLANKENSHIP],
  slug: "the-conscience-of-a-hacker",
  title: "The Conscience of a Hacker",
  author: "Loyd Blankenship (The Mentor)",
  series: "A Cypherpunk's Library",
  source: "https://phrack.org/issues/7/3.html",
  sourceLabel: "Phrack, Vol. 1 No. 7",
  description:
    "Written in 1986 shortly after the author’s arrest and published in Phrack: " +
    "“My crime is that of curiosity.” The manifesto that gave a generation its voice.",
  year: 1986,
};

const CYPHERNOMICON = 13; // wine — link-out
books[CYPHERNOMICON] = {
  ...books[CYPHERNOMICON],
  slug: "the-cyphernomicon",
  title: "The Cyphernomicon",
  author: "Timothy C. May",
  series: "A Cypherpunk's Library",
  external: "https://nakamotoinstitute.org/library/cyphernomicon/",
  externalLabel: "Nakamoto Institute",
  description:
    "May’s sprawling 1994 FAQ and compendium for the cypherpunks mailing list — " +
    "the movement’s encyclopedia of crypto, anonymity, digital cash, and the " +
    "politics of privacy. The full work is best read at the Nakamoto Institute.",
  year: 1994,
};

const BEY = 16; // cobalt — link-out
books[BEY] = {
  ...books[BEY],
  slug: "the-temporary-autonomous-zone",
  title: "T.A.Z.",
  author: "Hakim Bey",
  series: "A Cypherpunk's Library",
  external:
    "https://theanarchistlibrary.org/library/hakim-bey-t-a-z-the-temporary-autonomous-zone-ontological-anarchy-poetic-terrorism",
  externalLabel: "The Anarchist Library",
  description:
    "Hakim Bey’s anti-copyright classic on the Temporary Autonomous Zone: the " +
    "uprising that evades the map, the pirate utopia of the network age. Read the " +
    "full text at The Anarchist Library.",
  year: 1991,
};

/** Look up a book by its URL slug (undefined for placeholders / unknown slugs). */
export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
