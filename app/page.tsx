import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Celestial from "@/components/Celestial";
import BookShelf from "@/components/BookShelf";
import styles from "./page.module.css";

export default function Home() {
  return (
    // The .page shell carries the paper surface and the full-height flex column;
    // Nav (the site banner) sits beside <main>, not inside it, matching every other
    // route's shell → Celestial + Nav + main structure.
    <div className={styles.page}>
      <Celestial />
      <Nav />
      {/* Hero (masthead + intro) and the shelf overlap in one cell on desktop;
          on mobile the hero dissolves to display:contents and `order` stacks them
          title → shelf → intro, so the signature shelf lands in the first screen. */}
      <main className={styles.composition}>
        <Hero />
        <BookShelf />
      </main>
    </div>
  );
}
