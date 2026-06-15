import Link from "next/link";
import styles from "./Nav.module.css";
import GlitchLogo from "./GlitchLogo";
import ThemeToggle from "./ThemeToggle";
import LangSwitch from "./LangSwitch";
import { ui, type Locale } from "@/lib/i18n";

// The site banner, rendered per-page (not in the root layout) so each page can
// hand it the locale and the URL of its own equivalent in the other language.
// `altHref` is what the switcher links to; pages with no other-language twin
// (e.g. the English-only collection) point it at the French home. Omitting
// `altHref` hides the switcher entirely.
type Props = { locale?: Locale; altHref?: string };

export default function Nav({ locale = "en", altHref }: Props) {
  return (
    <header className={styles.nav}>
      <GlitchLogo />
      <nav className={styles.links}>
        <Link
          href={locale === "fr" ? "/fr/collection" : "/collection"}
          className={styles.link}
        >
          {ui[locale].collection}
        </Link>
        {altHref && <LangSwitch locale={locale} altHref={altHref} />}
        <ThemeToggle />
      </nav>
    </header>
  );
}
