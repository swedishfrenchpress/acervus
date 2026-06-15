import styles from "./Hero.module.css";
import { MASTHEAD_LINES, type Locale } from "@/lib/i18n";

// The editorial wordmark headline. Stacked so each line can rise on its own
// beat; screen readers still read it as one continuous heading. It shares the
// shelf's grid cell on desktop (top-left, in front of the books) and leads the
// single column on mobile — see Hero.module.css / page.module.css. The lines are
// locale-specific (the French mark stacks on its own beats).
export default function Masthead({ locale = "en" }: { locale?: Locale }) {
  return (
    <h1 className={styles.title}>
      {MASTHEAD_LINES[locale].map((line, i) => (
        <span key={i} className={styles.line}>
          {line}
        </span>
      ))}
    </h1>
  );
}
