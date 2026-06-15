import Link from "next/link";
import Nav from "@/components/Nav";
import Celestial from "@/components/Celestial";
import CollectionBrowser from "@/components/Collection/CollectionBrowser";
import { books } from "@/lib/books";
import { texts } from "@/content/texts";
import { ui, FR_SLUGS, type Locale } from "@/lib/i18n";
import styles from "@/app/collection/page.module.css";

// The browse view, shared by the English route (/collection) and the French one
// (/fr/collection). Only the slugs cross to the client browser — the prose
// components stay server-side. `locale` flows down so every book link and the
// chrome resolve in the right language; `altHref` is the other collection, for
// the Nav switcher.
export default function CollectionView({
  locale,
  altHref,
}: {
  locale: Locale;
  altHref: string;
}) {
  const textSlugs = Object.keys(texts);
  const frSlugs = [...FR_SLUGS];
  const t = ui[locale];

  return (
    <div
      className={styles.shell}
      lang={locale === "fr" ? "fr" : undefined}
    >
      <Celestial />
      <Nav locale={locale} altHref={altHref} />
      <main className={styles.page}>
        <Link href={locale === "fr" ? "/fr" : "/"} className={styles.back}>
          {t.back}
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>{t.browseView.title}</h1>
          <p className={styles.lead}>{t.browseView.lead}</p>
        </header>

        <CollectionBrowser
          books={books}
          textSlugs={textSlugs}
          frSlugs={frSlugs}
          locale={locale}
        />
      </main>
    </div>
  );
}
