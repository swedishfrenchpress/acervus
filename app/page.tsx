import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Celestial from "@/components/Celestial";
import BookShelf from "@/components/BookShelf";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <Celestial />
      <Nav />
      {/* Hero (masthead + intro) and the shelf overlap in one cell on desktop;
          on mobile the hero dissolves to display:contents and `order` stacks them
          title → shelf → intro, so the signature shelf lands in the first screen. */}
      <div className={styles.composition}>
        <Hero />
        <BookShelf />
      </div>
    </main>
  );
}
