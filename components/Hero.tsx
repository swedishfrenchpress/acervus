import styles from "./Hero.module.css";
import Masthead from "./Masthead";
import Intro from "./Intro";
import type { Locale } from "@/lib/i18n";

// The hero area wrapper. On desktop it is the grid that places the masthead and
// the intro over the shelf; on mobile it becomes display:contents (see
// Hero.module.css) so its children join the page's flex column and `order`
// interleaves them with the shelf.
export default function Hero({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className={styles.hero}>
      <Masthead locale={locale} />
      <Intro locale={locale} />
    </div>
  );
}
