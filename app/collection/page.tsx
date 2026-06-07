import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Celestial from "@/components/Celestial";
import CollectionBrowser from "@/components/Collection/CollectionBrowser";
import { OG_IMAGE, TWITTER_IMAGE } from "@/lib/og";
import { books } from "@/lib/books";
import { texts } from "@/content/texts";
import styles from "./page.module.css";

const DESCRIPTION =
  "Search and browse the full Cypherpunk Library: every manifesto, essay, and treatise on the shelf, by format.";

export const metadata: Metadata = {
  title: "Browse the collection",
  description: DESCRIPTION,
  alternates: { canonical: "/collection" },
  // Defining openGraph here replaces the root's (shallow merge), so a shared
  // /collection link reads as the browse page, not the generic landing. That
  // replacement also drops the inherited file-based card image, so re-attach it.
  openGraph: {
    title: "Browse the collection · The Cypherpunk Library",
    description: DESCRIPTION,
    url: "/collection",
    type: "website",
    siteName: "The Cypherpunk Library",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse the collection · The Cypherpunk Library",
    description: DESCRIPTION,
    images: [TWITTER_IMAGE],
  },
};

export default function CollectionPage() {
  // Just the slugs cross to the client — the prose components stay server-side.
  const textSlugs = Object.keys(texts);

  return (
    <div className={styles.shell}>
      <Celestial />
      <Nav />
      <main className={styles.page}>
        <Link href="/" className={styles.back}>
          Back to the shelf
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>The collection</h1>
          <p className={styles.lead}>
            Every text on the shelf. Search the canon, filter by format, and
            switch between cover and list views.
          </p>
        </header>

        <CollectionBrowser books={books} textSlugs={textSlugs} />
      </main>
    </div>
  );
}
