import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookView from "@/components/BookView";
import { getBookBySlug } from "@/lib/books";
import { ui, frBooks } from "@/lib/i18n";
import { OG_IMAGE, TWITTER_IMAGE } from "@/lib/og";
import { texts } from "@/content/texts";
import { frTexts } from "@/content/texts/fr";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book?.title) return { title: "Not found" };

  // Use the French overrides where they exist; an untranslated slug still has a
  // /fr page (it shows the English text), so fall back to the English metadata.
  const fr = frBooks[slug];
  const title = fr?.title ?? book.title;
  const description = fr?.description ?? book.description;

  // Same shallow-merge caveat as the English route: re-attach the file-based card
  // images, since defining openGraph here replaces the root's wholesale.
  const url = `/fr/book/${slug}`;
  const ogTitle = `${title} · The Cypherpunk Library`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `/book/${slug}`, fr: url },
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type: "article",
      siteName: "The Cypherpunk Library",
      locale: "fr_FR",
      authors: book.author ? [book.author] : undefined,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [TWITTER_IMAGE],
    },
  };
}

export default async function FrBookPage({ params }: Params) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book?.title) notFound();

  // Same "is this a readable book?" guard as the English route.
  const EnText = texts[slug];
  if (!book.pdf && !book.external && !EnText) notFound();

  // French overlay, if this slug has one. Otherwise the page renders the English
  // prose under a "pas encore traduit" note — a graceful fallback, not a 404.
  const fr = frBooks[slug];
  const FrText = frTexts[slug];
  const translated = !!fr;

  return (
    <BookView
      book={book}
      title={fr?.title ?? book.title}
      description={fr?.description ?? book.description}
      Text={FrText ?? EnText}
      locale="fr"
      contentLocale={FrText ? "fr" : "en"}
      altHref={`/book/${slug}`}
      backHref="/fr"
      backLabel={ui.fr.back}
      untranslatedNote={translated ? undefined : ui.fr.notYetTranslated}
      frSourceIntro={fr?.sourceIntro}
    />
  );
}
