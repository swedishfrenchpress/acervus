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
      <Hero />
      <BookShelf />
    </main>
  );
}
