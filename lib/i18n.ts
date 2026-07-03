// i18n data spine for the French annex. Kept deliberately React-free and
// prose-free: the client CollectionBrowser imports FR_SLUGS / hasFr for the "FR"
// availability badge, and pulling the French prose server components in here
// would drag them into the client bundle — the same discipline lib/format.ts
// documents for `textSlugs`.
//
// Adding a French edition is a three-point contract; keep these in sync:
//   1. FR_SLUGS (this file)             — availability + /fr index order
//   2. frBooks  (this file)             — translated title / blurb / source credit
//   3. frTexts  (content/texts/fr)      — the prose component
// All three list the same slugs.

export type Locale = "en" | "fr";

// UI chrome strings actually rendered somewhere, by locale.
export const ui = {
  en: {
    collection: "Collection",
    back: "Back to the shelf",
    browse: "Browse the collection",
    // The series / collection label on every cover plate and book hero. The
    // French form mirrors the home wordmark ("La bibliothèque d’un cypherpunk").
    series: "A Cypherpunk’s Library",
    subtitle:
      "A personal collection of good public-domain reads. Nothing for sale, nothing to take down.",
    // The browse view (/collection). Lives under a sub-key so it can be handed to
    // the client CollectionBrowser as one object.
    browseView: {
      title: "The collection",
      lead: "Every text on the shelf. Search the canon, filter by format, and switch between cover and list views.",
      searchLabel: "Search the collection",
      searchPlaceholder: "Search by title, author, idea…",
      filterLabel: "Filter by format",
      viewLabel: "View",
      gridView: "Grid view",
      listView: "List view",
      one: "book",
      many: "books",
      clear: "Clear",
      clearAll: "Clear search and filter",
      noMatch: "No books match your search",
      andFilter: " and filter",
      by: "by",
      opensExternal: "opens an external site",
      frAvailable: "French edition available",
      formats: { Text: "Text", PDF: "PDF", External: "External" },
    },
  },
  fr: {
    collection: "Collection",
    back: "Retour à l’étagère",
    browse: "Parcourir la collection",
    series: "La bibliothèque d’un cypherpunk",
    subtitle:
      "Une collection personnelle d’ouvrages de qualité tombés dans le domaine public. Rien n’est à vendre, rien ne sera retiré.",
    // Shown above the English prose when a book has no French edition yet.
    notYetTranslated:
      "Ce texte n’est pas encore traduit. En voici la version anglaise.",
    browseView: {
      title: "La collection",
      lead: "Tous les textes de l’étagère. Cherchez dans le corpus, filtrez par format, et basculez entre les vues couverture et liste.",
      searchLabel: "Rechercher dans la collection",
      searchPlaceholder: "Rechercher par titre, auteur, idée…",
      filterLabel: "Filtrer par format",
      viewLabel: "Affichage",
      gridView: "Vue grille",
      listView: "Vue liste",
      one: "livre",
      many: "livres",
      clear: "Effacer",
      clearAll: "Effacer la recherche et le filtre",
      noMatch: "Aucun livre ne correspond à votre recherche",
      andFilter: " et au filtre",
      by: "par",
      opensExternal: "ouvre un site externe",
      frAvailable: "édition française disponible",
      formats: { Text: "Texte", PDF: "PDF", External: "Externe" },
    },
  },
} as const;

// The stacked wordmark headline, line by line. English is the mark set in code
// today; French stacks on its own beats.
export const MASTHEAD_LINES: Record<Locale, string[]> = {
  en: ["A", "cypherpunk’s", "library"],
  fr: ["La", "bibliothèque d’un", "cypherpunk"],
};

// The slugs with a French edition, in /fr display order.
export const FR_SLUGS = [
  "a-cypherpunks-manifesto",
  "the-crypto-anarchist-manifesto",
  "a-declaration-of-the-independence-of-cyberspace",
  "your-secret-right-to-cash",
  "definition-of-democratic-civilization",
  "libertaria-in-cyberspace",
  "meditations-on-cypherpunk-nightmares",
  "the-beauty-of-ecash",
  "the-conscience-of-a-hacker",
  "why-i-wrote-pgp",
] as const;

export function hasFr(slug: string): boolean {
  return (FR_SLUGS as readonly string[]).includes(slug);
}

// Per-book French overlay: only what differs from the English Book. Author,
// year, plate colour, format, etc. all come from lib/books.ts.
export type BookFr = {
  title: string;
  description: string;
  /** Lead-in text shown before the linked source name in the prose footer,
   *  e.g. "Reproduit à partir du site " — BookView appends the linked
   *  `book.sourceLabel` and the fixed "domaine public" boilerplate after it.
   *  Replaces the English "Reproduced from …" credit. */
  sourceIntro: string;
};

export const frBooks: Record<string, BookFr> = {
  "a-cypherpunks-manifesto": {
    title: "Manifeste d’un Cypherpunk",
    description:
      "La déclaration fondatrice du mouvement cypherpunk : la vie privée n’est pas le secret, mais le pouvoir de se révéler de manière sélective ; à l’ère électronique, elle doit être défendue par la cryptographie et le code, et non mendiée auprès des gouvernements.",
    sourceIntro: "Reproduit à partir du site ",
  },
  "the-crypto-anarchist-manifesto": {
    title: "Le Manifeste de l’Anarchiste Cryptographique",
    description:
      "Le texte de 1988 qui a donné son nom à l’anarchie cryptographique. May y anticipe des réseaux intraçables, des marchés anonymes et des réputations surpassant les cotes de crédit : un bouleversement du pouvoir de l’État comparable à l’invention de l’imprimerie.",
    sourceIntro: "Reproduit à partir du site ",
  },
  "a-declaration-of-the-independence-of-cyberspace": {
    title: "Déclaration d’indépendance du cyberespace",
    description:
      "Rédigée à Davos en 1996 en réaction au Telecommunications Reform Act : un refus retentissant de la souveraineté gouvernementale sur le cyberespace, cette « civilisation de l’Esprit » que les corps ne peuvent gouverner.",
    sourceIntro: "Reproduit à partir de l’",
  },
  "your-secret-right-to-cash": {
    title: "Votre droit secret à l’argent liquide",
    description:
      "Peter Van Valkenburgh sur l’argent liquide en tant que « droit secret » : un moyen de paiement privé et résistant à la censure, garanti pendant des siècles par la nature physique du monde, jamais débattu car jamais menacé. La monnaie électronique l’a silencieusement supprimé, et nous devrions en évaluer le coût avant de célébrer la mort de l’argent liquide.",
    sourceIntro: "Reproduit à partir de ",
  },
  "definition-of-democratic-civilization": {
    title: "Définition de la civilisation démocratique",
    description:
      "Le texte que le projet DarkFi a adopté comme IDÉOLOGIE : la définition par Abdullah Öcalan du système de civilisation démocratique : la société morale et politique comme contre-histoire sans État et libre face au capital et à l’État-nation. Extrait de La Sociologie de la liberté, Volume 3.",
    sourceIntro: "Reproduit à partir de ",
  },
  "libertaria-in-cyberspace": {
    title: "Libertaria dans le cyberespace",
    description:
      "Publication de May en 1992 sur la liste Extropians expliquant pourquoi un réseau médiatisé par ordinateur est plus hospitalier pour un ordre libertarien d’« anarchie cryptographique » que n’importe quelle île, plateforme pétrolière ou havre de données flottant : les Libertarias physiques sont trop exposées aux puissances mondiales, tandis que les systèmes distribués n’ont aucun nœud central à neutraliser. Un nombre arbitrairement grand de « nations » séparées peut coexister dans le cyberespace, avec une entrée et une sortie à volonté.",
    sourceIntro: "Reproduit à partir du ",
  },
  "meditations-on-cypherpunk-nightmares": {
    title: "Méditations sur les cauchemars cypherpunks",
    description:
      "Michael Goldstein relit l’anarchie cryptographique de Tim May à travers le prisme des Stoïciens : si toute information atteint inévitablement le marché, la défense du cypherpunk ne réside pas seulement dans la cryptographie forte, mais dans une ancienne discipline de la vertu : vivre comme si vos secrets étaient déjà divulgués.",
    sourceIntro: "Reproduit à partir du ",
  },
  "the-beauty-of-ecash": {
    title: "La beauté de l’eCash",
    description:
      "Hal Finney sur la monnaie numérique en tant qu’objet de collection : une note adressée à la liste de diffusion Cypherpunks sur la manière de rendre beaux les nombres infalsifiables d’un billet anonyme : rareté, empreintes digitales et fractales liées à la validité même de la monnaie.",
    sourceIntro: "Reproduit à partir du ",
  },
  "the-conscience-of-a-hacker": {
    title: "La conscience d’un hacker",
    description:
      "Écrit en 1986 peu après l’arrestation de l’auteur et publié dans Phrack : « Mon crime est celui de la curiosité. » Le manifeste qui a donné une voix à toute une génération.",
    sourceIntro: "Reproduit à partir de ",
  },
  "why-i-wrote-pgp": {
    title: "Pourquoi j’ai écrit PGP",
    description:
      "L’essai de Zimmermann expliquant pourquoi il a conçu PGP et l’a offert gratuitement : à l’ère de la surveillance automatisée, la capacité de chiffrer est une condition préalable à une société libre ; la vie privée doit être la norme, et non une faveur accordée par les puissants.",
    sourceIntro: "Reproduit à partir du site ",
  },
};
