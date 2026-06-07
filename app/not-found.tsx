import Link from "next/link";
import Nav from "@/components/Nav";
import Celestial from "@/components/Celestial";
import styles from "./not-found.module.css";

// Root not-found: catches both notFound() from the book route AND any unmatched
// URL across the app (Next routes both here). Wrapped by the root layout, so it
// inherits the fonts, theme script and paper surface — a missing page still
// reads as the same library.
export default function NotFound() {
  return (
    <div className={styles.shell}>
      <Celestial />
      <Nav />
      <main className={styles.page}>
        <p className={styles.kicker}>404</p>
        <h1 className={styles.title}>Off the shelf.</h1>
        <p className={styles.body}>
          Everything here is public domain, so there&rsquo;s nothing for anyone
          to take down. This one page is the exception: genuinely gone,
          misfiled or never written.
        </p>
        <Link href="/" className={styles.back}>
          Back to the shelf
        </Link>
      </main>
    </div>
  );
}
