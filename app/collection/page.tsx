import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Celestial from "@/components/Celestial";
import CollectionBrowser from "@/components/Collection/CollectionBrowser";
import { books } from "@/lib/books";
import { texts } from "@/content/texts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Browse the collection",
  description:
    "Search and browse the full Cypherpunk Library: every manifesto, essay, and treatise on the shelf, by format.",
};

export default function CollectionPage() {
  // Only real books (a slug + title) browse; the palette placeholders don't.
  const realBooks = books.filter((b) => b.slug && b.title);
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

        <CollectionBrowser books={realBooks} textSlugs={textSlugs} />
      </main>
    </div>
  );
}
