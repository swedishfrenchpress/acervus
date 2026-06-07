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

// One slim spine depth for every book — varied heights read as mismatched
// books, but a consistent (not-too-thick) thickness keeps the row tidy.
const SPINE = 22;

// A tasteful, varied palette echoing the reference's literary covers. Each entry
// is [color, cover height in px]; thickness is the shared SPINE above.
const PALETTE: Array<[string, number]> = [
  ["#e7dcc4", 232], // cream
  ["#7a1f2b", 214], // burgundy
  ["#16243f", 240], // navy
  ["#e7c2cc", 208], // blush
  ["#14532d", 236], // forest green
  ["#c2410c", 220], // burnt orange
  ["#1f2733", 244], // charcoal
  ["#b51d22", 226], // signal red
  ["#0f3d3e", 212], // deep teal
  ["#d6a23c", 234], // mustard gold
  ["#3a1d52", 218], // plum
  ["#0b1f3a", 240], // midnight
  ["#6f9a6a", 206], // sage
  ["#8b1e3f", 230], // wine
  ["#1a1a1a", 222], // near-black
  ["#dfe3e6", 216], // pale grey
  ["#243b6b", 238], // cobalt
  ["#5b3a29", 210], // walnut brown
];

export const books: Book[] = PALETTE.map(([color, h], i) => ({
  id: i,
  color,
  h,
  t: SPINE,
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
  cover: "/covers/a-cypherpunks-manifesto.png",
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
  cover: "/covers/the-crypto-anarchist-manifesto.png",
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
  cover: "/covers/a-declaration-of-the-independence-of-cyberspace.png",
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

const CYPHERNOMICON = 13; // wine — link-out, with its own cover
books[CYPHERNOMICON] = {
  ...books[CYPHERNOMICON],
  slug: "the-cyphernomicon",
  title: "The Cyphernomicon",
  author: "Timothy C. May",
  series: "A Cypherpunk's Library",
  cover: "/covers/the-cyphernomicon.png",
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

const ZIMMERMANN = 9; // mustard gold — reproduced in-site, matches the yellow PGP cover
books[ZIMMERMANN] = {
  ...books[ZIMMERMANN],
  slug: "why-i-wrote-pgp",
  title: "Why I Wrote PGP",
  author: "Philip Zimmermann",
  series: "A Cypherpunk's Library",
  cover: "/covers/why-i-wrote-pgp.png",
  source: "https://www.philzimmermann.com/EN/essays/WhyIWrotePGP.html",
  sourceLabel: "philzimmermann.com",
  description:
    "Zimmermann's essay on why he built PGP and gave it away: in an age of " +
    "automated surveillance, the ability to encrypt is a precondition of a free " +
    "society — privacy must be the default, not a favour granted by the powerful.",
  year: 1991,
};

// --- a contemporary addition ---
// Max Hildebrand's 2026 treatise — a PDF book with its own cover, read inline
// (cover + pdf, like Finney). Overlaid onto the charcoal slot (index 6): the
// dark blue-grey reads as a sympathetic fallback behind the navy poster art.
const HILDEBRAND = 6; // charcoal
books[HILDEBRAND] = {
  ...books[HILDEBRAND],
  slug: "the-praxeology-of-privacy",
  title: "The Praxeology of Privacy",
  author: "Max Hildebrand",
  series: "A Cypherpunk's Library",
  cover: "/covers/the-praxeology-of-privacy.png",
  pdf: "/books/the-praxeology-of-privacy.pdf",
  description:
    "Max Hildebrand's synthesis of two traditions that reach the same end from " +
    "opposite starts — Austrian economics, which deduces from the fact of human " +
    "action that observation is the precondition of state predation, and the " +
    "cypherpunks, who wrote the running code that proves these systems can be " +
    "defended. A treatise on why privacy matters, and a working field guide to " +
    "the engineering that makes it survivable.",
  year: 2026,
  pages: 587,
};

// --- four more, overlaid onto dark placeholder slots ---
// Three are read in-site (prose in content/texts, carrying source/sourceLabel);
// one is a PDF read inline (Anderson's paper, like Finney/Hildebrand). The dark
// slots keep the light titles legible on the spine/plate until cover art lands.
// As always: replace in place, never push, so the marquee geometry is untouched.

const GOLDSTEIN = 14; // near-black
books[GOLDSTEIN] = {
  ...books[GOLDSTEIN],
  slug: "meditations-on-cypherpunk-nightmares",
  title: "Meditations on Cypherpunk Nightmares",
  author: "Michael Goldstein",
  series: "A Cypherpunk's Library",
  source:
    "https://nakamotoinstitute.org/mempool/meditations-on-cypherpunk-nightmares/",
  sourceLabel: "Nakamoto Institute",
  description:
    "Michael Goldstein reads Tim May's crypto anarchy through the Stoics: if all " +
    "information will inevitably reach the market, the cypherpunk's defense is not " +
    "only strong cryptography but an ancient discipline of virtue — live as though " +
    "your secrets are already leaked.",
  year: 2014,
};

const ECASH = 17; // walnut brown
books[ECASH] = {
  ...books[ECASH],
  slug: "the-beauty-of-ecash",
  title: "The Beauty of eCash",
  author: "Hal Finney",
  series: "A Cypherpunk's Library",
  source: "https://nakamotoinstitute.org/library/the-beauty-of-ecash/",
  sourceLabel: "Nakamoto Institute",
  description:
    "Hal Finney on digital cash as a collector's object: a note to the cypherpunks " +
    "list on how the unforgeable numbers of an anonymous banknote might be made " +
    "beautiful — rarity, fingerprints, and fractals tied to the validity of the " +
    "cash itself.",
  year: 1994,
};

const OCALAN = 10; // plum
books[OCALAN] = {
  ...books[OCALAN],
  slug: "definition-of-democratic-civilization",
  title: "Definition of Democratic Civilization",
  author: "Abdullah Öcalan",
  series: "A Cypherpunk's Library",
  source: "https://github.com/darkrenaissance/darkfi/blob/master/IDEOLOGY.md",
  sourceLabel: "darkrenaissance/darkfi",
  description:
    "The text the DarkFi project adopted as its IDEOLOGY: Abdullah Öcalan's " +
    "definition of the democratic civilization system — moral and political " +
    "society as the stateless, free counter-history to capital and the " +
    "nation-state. Excerpted from The Sociology of Freedom, Volume 3.",
  year: 2020,
};

const ANDERSON = 7; // signal red — a PDF paper, read inline (like Finney/Hildebrand)
books[ANDERSON] = {
  ...books[ANDERSON],
  slug: "of-cypherpunks-and-sousveillance",
  title: "Of Cypherpunks and Sousveillance",
  author: "Patrick Anderson",
  series: "A Cypherpunk's Library",
  pdf: "/books/of-cypherpunks-and-sousveillance.pdf",
  description:
    "Patrick Anderson's scholarly account of cypherpunk philosophy — “privacy for " +
    "the weak, transparency for the powerful” — as a two-sided data activism of " +
    "privacy and sousveillance for resisting surveillance institutions at the " +
    "systemic level. Published in Surveillance & Society (2022).",
  year: 2022,
};

const VALKENBURGH = 5; // burnt orange — reproduced in-site
books[VALKENBURGH] = {
  ...books[VALKENBURGH],
  slug: "your-secret-right-to-cash",
  title: "Your Secret Right to Cash",
  author: "Peter Van Valkenburgh",
  series: "A Cypherpunk's Library",
  source: "https://valkenburgh.tumblr.com/post/165558410543/your-secret-right-to-cash",
  sourceLabel: "valkenburgh.tumblr.com",
  description:
    "Peter Van Valkenburgh on cash as a “secret right”: censorship-resistant, " +
    "private payment was guaranteed for centuries by the physical nature of the " +
    "world — never debated because never threatened. Electronic money quietly " +
    "removed it, and we should reckon with the cost before celebrating the death " +
    "of cash.",
  year: 2017,
};

/** Look up a book by its URL slug (undefined for placeholders / unknown slugs). */
export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
