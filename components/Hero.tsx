import styles from "./Hero.module.css";
import Masthead from "./Masthead";
import Intro from "./Intro";

// The hero area wrapper. On desktop it is the grid that places the masthead and
// the intro over the shelf; on mobile it becomes display:contents (see
// Hero.module.css) so its children join the page's flex column and `order`
// interleaves them with the shelf.
export default function Hero() {
  return (
    <div className={styles.hero}>
      <Masthead />
      <Intro />
    </div>
  );
}
