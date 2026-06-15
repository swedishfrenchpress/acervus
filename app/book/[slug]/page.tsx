import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookView from "@/components/BookView";
import { getBookBySlug } from "@/lib/books";
import { ui } from "@/lib/i18n";
import { OG_IMAGE, TWITTER_IMAGE } from "@/lib/og";
import { texts } from "@/content/texts";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book?.title) return { title: "Not found" };

  // Child pages don't inherit the root openGraph field by field: defining our own
  // replaces it wholesale (Next merges metadata shallowly), which also drops the
  // inherited file-based card image — so we re-attach OG_IMAGE/TWITTER_IMAGE here.
  // Without this, a shared book link would show the generic site title and no art.
  // og:title gets the full name spelled out, since the title template only touches
  // <title>, not openGraph.
  const url = `/book/${slug}`;
  const ogTitle = `${book.title} · The Cypherpunk Library`;
  return {
    title: book.title,
    description: book.description,
    // English is canonical; point hreflang at both editions so the French page is
    // discoverable from here (the /fr route exists for every readable slug).
    alternates: {
      canonical: url,
      languages: { en: url, fr: `/fr/book/${slug}` },
    },
    openGraph: {
      title: ogTitle,
      description: book.description,
      url,
      type: "article",
      siteName: "The Cypherpunk Library",
      authors: book.author ? [book.author] : undefined,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: book.description,
      images: [TWITTER_IMAGE],
    },
  };
}

export default async function BookPage({ params }: Params) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book?.title) notFound();

  // A book reads in one of three ways, in priority order: an embedded PDF
  // (Finney), an external link-out (book-length works), or in-site prose
  // reproduced from `content/texts`. Anything else isn't a real, readable book.
  const Text = texts[slug];
  if (!book.pdf && !book.external && !Text) notFound();

  return (
    <BookView
      book={book}
      title={book.title}
      description={book.description}
      Text={Text}
      locale="en"
      contentLocale="en"
      altHref={`/fr/book/${slug}`}
      backHref="/"
      backLabel={ui.en.back}
    />
  );
}
