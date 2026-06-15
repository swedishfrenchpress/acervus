import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import styles from "./Nav.module.css";

// The compact EN·FR language toggle, beside the theme toggle. Two fixed slots
// (EN left, FR right): the current locale is plain active text, the other is a
// link to this exact page's equivalent in that language (`altHref`). With only
// two locales the non-current slot is always the link, so exactly one side is
// live on any page. Server-only — no JS, no state — so it never disturbs the
// theme island sitting next to it.
type Props = { locale: Locale; altHref: string };

export default function LangSwitch({ locale, altHref }: Props) {
  return (
    <span className={styles.langSwitch} aria-label="Language">
      <Slot code="en" current={locale === "en"} altHref={altHref} />
      <span className={styles.langSep} aria-hidden>
        ·
      </span>
      <Slot code="fr" current={locale === "fr"} altHref={altHref} />
    </span>
  );
}

function Slot({
  code,
  current,
  altHref,
}: {
  code: Locale;
  current: boolean;
  altHref: string;
}) {
  const label = code.toUpperCase();
  if (current) {
    return (
      <span className={styles.langCurrent} aria-current="true">
        {label}
      </span>
    );
  }
  return (
    <Link
      href={altHref}
      className={styles.langLink}
      hrefLang={code}
      aria-label={code === "fr" ? "Français" : "English"}
    >
      {label}
    </Link>
  );
}
