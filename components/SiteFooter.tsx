import Celestial from "./Celestial";
import styles from "./SiteFooter.module.css";

// A quiet way to reach the librarian. Rendered once in the root layout, so it
// closes every route on the same line of paper — below the single-screen
// landing (a short scroll past the shelf) and at the natural end of the
// scrolling collection/book pages. It carries its own Celestial grain so the
// paper texture runs unbroken past the stage's bottom edge, with no flat seam.
export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Celestial />
      <a className={styles.email} href="mailto:info@cypherpunklibrary.com">
        info@cypherpunklibrary.com
      </a>
    </footer>
  );
}
