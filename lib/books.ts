// Book data for The Cypherpunk Library. Every book is shown as a typographic
// "cover": its title set in the display face on a solid plate colour, with a
// gradient scrim for legibility. That one treatment carries every surface — the
// 3D shelf spine, the /book hero plate, and the browse grid — so there are no
// cover images and no blank placeholders. Every entry here is a real, readable
// book; plate colours are kept dark enough for the light title to hold.

export type Book = {
  /** URL slug → /book/[slug]. */
  slug: string;
  title: string;
  author: string;
  /** Series / collection label shown above the title. */
  series: string;

  /** Plate background colour — the typographic cover sits on this. */
  color: string;
  /** Cover height in px — varied so the shelf row reads as mismatched books. */
  h: number;
  /** Book thickness (spine depth) in px. */
  t: number;

  description: string;
  year: number;
  pages?: number;

  // --- how the book is read (priority: pdf → external → reproduced text) ---
  /** PDF path, served from /public; reads inline / opens in a tab. */
  pdf?: string;
  /** EPUB path, served from /public; offered as an alternate download beside the PDF. */
  epub?: string;
  /** Author's Lightning address (LUD-16) for value-for-value support. When set, the
   *  book page shows a tip block with the address + a scannable QR at
   *  /public/books/<slug>-lightning.svg (a static LNURL QR, generated once). */
  lightning?: string;
  /** Original URL the in-site prose was reproduced from (drives the source credit). */
  source?: string;
  /** Human label for that source, e.g. "activism.net", "EFF", "Phrack 1:7". */
  sourceLabel?: string;
  /** External URL to read the full work. Presence makes this a link-out book. */
  external?: string;
  /** Label for the link-out CTA, e.g. "Nakamoto Institute" → "Read at …". */
  externalLabel?: string;
};

// Shared on every book, so they're folded in once rather than repeated below.
const SERIES = "A Cypherpunk's Library";
const SPINE = 22; // one slim, consistent spine depth; heights vary, thickness doesn't.

// The collection, in shelf order. Colours and heights alternate so the marquee
// reads as a row of real, mismatched books rather than a sorted set.
const DATA: Array<Omit<Book, "series" | "t">> = [
  {
    slug: "a-cypherpunks-manifesto",
    title: "A Cypherpunk's Manifesto",
    author: "Eric Hughes",
    color: "#7a1f2b", // burgundy
    h: 214,
    source: "https://www.activism.net/cypherpunk/manifesto.html",
    sourceLabel: "activism.net",
    description:
      "The founding statement of the cypherpunk movement: privacy is not secrecy " +
      "but the power to selectively reveal oneself, and in the electronic age it " +
      "must be defended with cryptography and code, not begged from governments.",
    year: 1993,
  },
  {
    slug: "the-crypto-anarchist-manifesto",
    title: "The Crypto Anarchist Manifesto",
    author: "Timothy C. May",
    color: "#16243f", // navy
    h: 240,
    source: "https://www.activism.net/cypherpunk/crypto-anarchy.html",
    sourceLabel: "activism.net",
    description:
      "The 1988 text that named crypto anarchy. May foresees untraceable networks, " +
      "anonymous markets, and reputations that outweigh credit ratings: a " +
      "printing-press-scale shift in the power of the state.",
    year: 1988,
  },
  {
    slug: "a-declaration-of-the-independence-of-cyberspace",
    title: "A Declaration of the Independence of Cyberspace",
    author: "John Perry Barlow",
    color: "#14532d", // forest green
    h: 236,
    source: "https://www.eff.org/cyberspace-independence",
    sourceLabel: "EFF",
    description:
      "Written in Davos in 1996 against the Telecommunications Reform Act: a ringing " +
      "refusal of government sovereignty over cyberspace: the “civilization of the " +
      "Mind” that bodies cannot govern.",
    year: 1996,
  },
  {
    slug: "your-secret-right-to-cash",
    title: "Your Secret Right to Cash",
    author: "Peter Van Valkenburgh",
    color: "#c2410c", // burnt orange
    h: 220,
    source: "https://valkenburgh.tumblr.com/post/165558410543/your-secret-right-to-cash",
    sourceLabel: "valkenburgh.tumblr.com",
    description:
      "Peter Van Valkenburgh on cash as a “secret right”: censorship-resistant, " +
      "private payment was guaranteed for centuries by the physical nature of the " +
      "world, never debated because never threatened. Electronic money quietly " +
      "removed it, and we should reckon with the cost before celebrating the death " +
      "of cash.",
    year: 2017,
  },
  {
    slug: "the-praxeology-of-privacy",
    title: "The Praxeology of Privacy",
    author: "Max Hildebrand",
    color: "#1f2733", // charcoal
    h: 244,
    pdf: "/books/the-praxeology-of-privacy.pdf",
    description:
      "Max Hildebrand's synthesis of two traditions that reach the same end from " +
      "opposite starts: Austrian economics, which deduces from the fact of human " +
      "action that observation is the precondition of state predation, and the " +
      "cypherpunks, who wrote the running code that proves these systems can be " +
      "defended. A treatise on why privacy matters, and a working field guide to " +
      "the engineering that makes it survivable.",
    year: 2026,
    pages: 587,
  },
  {
    slug: "of-cypherpunks-and-sousveillance",
    title: "Of Cypherpunks and Sousveillance",
    author: "Patrick Anderson",
    color: "#b51d22", // signal red
    h: 226,
    pdf: "/books/of-cypherpunks-and-sousveillance.pdf",
    description:
      "Patrick Anderson's scholarly account of cypherpunk philosophy (“privacy for " +
      "the weak, transparency for the powerful”) as a two-sided data activism of " +
      "privacy and sousveillance for resisting surveillance institutions at the " +
      "systemic level. Published in Surveillance & Society (2022).",
    year: 2022,
    pages: 17,
  },
  {
    slug: "protecting-privacy-with-electronic-cash",
    title: "Protecting Privacy with Electronic Cash",
    author: "Hal Finney",
    color: "#0f3d3e", // deep teal
    h: 212,
    pdf: "/books/protecting-privacy-with-electronic-cash.pdf",
    description:
      "Hal Finney's early case for digital cash that preserves anonymity: a " +
      "demonstration that electronic payment need not mean electronic surveillance.",
    year: 1993,
    pages: 7,
  },
  {
    slug: "why-i-wrote-pgp",
    title: "Why I Wrote PGP",
    author: "Philip Zimmermann",
    color: "#7a5512", // deep gold
    h: 234,
    source: "https://www.philzimmermann.com/EN/essays/WhyIWrotePGP.html",
    sourceLabel: "philzimmermann.com",
    description:
      "Zimmermann's essay on why he built PGP and gave it away: in an age of " +
      "automated surveillance, the ability to encrypt is a precondition of a free " +
      "society: privacy must be the default, not a favour granted by the powerful.",
    year: 1991,
  },
  {
    slug: "definition-of-democratic-civilization",
    title: "Definition of Democratic Civilization",
    author: "Abdullah Öcalan",
    color: "#3a1d52", // plum
    h: 218,
    source: "https://github.com/darkrenaissance/darkfi/blob/master/IDEOLOGY.md",
    sourceLabel: "darkrenaissance/darkfi",
    description:
      "The text the DarkFi project adopted as its IDEOLOGY: Abdullah Öcalan's " +
      "definition of the democratic civilization system: moral and political " +
      "society as the stateless, free counter-history to capital and the " +
      "nation-state. Excerpted from The Sociology of Freedom, Volume 3.",
    year: 2020,
  },
  {
    slug: "the-conscience-of-a-hacker",
    title: "The Conscience of a Hacker",
    author: "Loyd Blankenship (The Mentor)",
    color: "#0b1f3a", // midnight
    h: 240,
    source: "https://phrack.org/issues/7/3.html",
    sourceLabel: "Phrack, Vol. 1 No. 7",
    description:
      "Written in 1986 shortly after the author’s arrest and published in Phrack: " +
      "“My crime is that of curiosity.” The manifesto that gave a generation its voice.",
    year: 1986,
  },
  {
    slug: "the-cyphernomicon",
    title: "The Cyphernomicon",
    author: "Timothy C. May",
    color: "#8b1e3f", // wine
    h: 230,
    external: "https://nakamotoinstitute.org/library/cyphernomicon/",
    externalLabel: "Nakamoto Institute",
    description:
      "May’s sprawling 1994 FAQ and compendium for the cypherpunks mailing list, " +
      "the movement’s encyclopedia of crypto, anonymity, digital cash, and the " +
      "politics of privacy. The full work is best read at the Nakamoto Institute.",
    year: 1994,
  },
  {
    slug: "meditations-on-cypherpunk-nightmares",
    title: "Meditations on Cypherpunk Nightmares",
    author: "Michael Goldstein",
    color: "#1a1a1a", // near-black
    h: 222,
    source:
      "https://nakamotoinstitute.org/mempool/meditations-on-cypherpunk-nightmares/",
    sourceLabel: "Nakamoto Institute",
    description:
      "Michael Goldstein reads Tim May's crypto anarchy through the Stoics: if all " +
      "information will inevitably reach the market, the cypherpunk's defense is not " +
      "only strong cryptography but an ancient discipline of virtue: live as though " +
      "your secrets are already leaked.",
    year: 2014,
  },
  {
    slug: "the-beauty-of-ecash",
    title: "The Beauty of eCash",
    author: "Hal Finney",
    color: "#5b3a29", // walnut brown
    h: 210,
    source: "https://nakamotoinstitute.org/library/the-beauty-of-ecash/",
    sourceLabel: "Nakamoto Institute",
    description:
      "Hal Finney on digital cash as a collector's object: a note to the cypherpunks " +
      "list on how the unforgeable numbers of an anonymous banknote might be made " +
      "beautiful: rarity, fingerprints, and fractals tied to the validity of the " +
      "cash itself.",
    year: 1994,
  },
  {
    slug: "21-lessons",
    title: "21 Lessons",
    author: "Gigi",
    color: "#f7931a", // bitcoin orange
    h: 232,
    pdf: "/books/21-lessons.pdf",
    epub: "/books/21-lessons.epub",
    lightning: "dergigi@primal.net",
    description:
      "Gigi's distillation of the Bitcoin rabbit hole into twenty-one short lessons, " +
      "each meeting at the seam of economics, cryptography, and philosophy. First " +
      "written as the essay series “What I've Learned From Bitcoin,” gathered and " +
      "revised here, and released under CC BY-SA 4.0 on a value-for-value basis.",
    year: 2019,
    pages: 155,
  },
  {
    slug: "a-lodging-of-wayfaring-men",
    title: "A Lodging of Wayfaring Men",
    author: "Paul Rosenberg",
    color: "#2a1f5e", // deep indigo
    h: 228,
    pdf: "/books/a-lodging-of-wayfaring-men.pdf",
    description:
      "A novel. A loose network of programmers, traders, and ordinary people build " +
      "a free society in the unmapped space of the early internet: anonymous, " +
      "encrypted, voluntary, beyond the reach of states. Through their story " +
      "Rosenberg dramatizes the cypherpunk wager: that cryptography and conscience " +
      "can carve out room for human freedom, and asks what it costs and what it's " +
      "worth.",
    year: 2003,
    pages: 452,
  },
  {
    slug: "fog-of-cryptowar",
    title: "Fog of CryptoWar",
    author: "Jonathan 'smuggler' Logan",
    color: "#2e3a40", // gunmetal
    h: 238,
    source: "https://opaquelink.sirion.io/post/fog_of_cryptowar/",
    sourceLabel: "opaquelink.sirion.io",
    description:
      "Jonathan 'smuggler' Logan argues the second Crypto War is being fought in a " +
      "fog: the public debate over “banning encryption” is a straw man, while " +
      "governments quietly pursue plaintext access through vendor pressure, lawful " +
      "hacking, weakened defaults, and metadata retention. A field map of the real " +
      "battleground, and why absolutist “you can't ban math” arguments lose the " +
      "policy fight.",
    year: 2017,
  },
  {
    slug: "libertaria-in-cyberspace",
    title: "Libertaria in Cyberspace",
    author: "Timothy C. May",
    color: "#10402c", // deep emerald
    h: 216,
    source: "https://nakamotoinstitute.org/library/libertaria-in-cyberspace/",
    sourceLabel: "Nakamoto Institute",
    description:
      "May's 1992 posting to the Extropians list on why a computer-mediated network " +
      "is more hospitable to a “crypto anarchy” libertarian order than any island, " +
      "oil rig, or floating data haven: physical Libertarias are too exposed to the " +
      "world's powers, but distributed systems have no nexus to knock out. An " +
      "arbitrarily large number of separate “nations” can coexist in cyberspace, " +
      "entered and left at will.",
    year: 1992,
  },
  {
    slug: "measuring-freenet-in-the-wild",
    title: "Measuring Freenet in the Wild",
    author: "Stefanie Roos et al.",
    color: "#4a1d2a", // oxblood
    h: 230,
    pdf: "/books/measuring-freenet-in-the-wild.pdf",
    description:
      "An empirical study of Freenet, the decentralized, censorship-resistant " +
      "publication system: an extensive measurement campaign and code analysis that " +
      "maps why content is slow and often unreachable. The authors find the " +
      "topology-control mechanism is suboptimal for routing, and that Freenet's " +
      "several tens of thousands of users stay online far longer than peers on other " +
      "P2P networks. By Stefanie Roos, Benjamin Schiller, Stefan Hacker, and " +
      "Thorsten Strufe; presented at PETS 2014.",
    year: 2014,
    pages: 20,
  },
  {
    slug: "ideal-money-and-asymptotically-ideal-money",
    title: "Ideal Money and Asymptotically Ideal Money",
    author: "John F. Nash Jr.",
    color: "#4a3713", // antique bronze
    h: 222,
    pdf: "/books/ideal-money-and-asymptotically-ideal-money.pdf",
    description:
      "The game theorist and Nobel laureate's argument that money becomes “ideal” " +
      "when its value holds steady over time: a stable standard of measurement, not " +
      "a thing managed by inflationary discretion. Nash proposes pegging currency to " +
      "an objective index of prices, and sketches “asymptotically ideal money” as " +
      "the practical path: currencies that, through competition and credible policy, " +
      "converge toward a reliable long-term store of value.",
    year: 2002,
    pages: 8,
  },
];

export const books: Book[] = DATA.map((b) => ({ ...b, series: SERIES, t: SPINE }));

/** Look up a book by its URL slug (undefined for unknown slugs). */
export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
