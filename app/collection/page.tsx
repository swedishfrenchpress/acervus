import type { Metadata } from "next";
import CollectionView from "@/components/CollectionView";
import { OG_IMAGE, TWITTER_IMAGE } from "@/lib/og";

const DESCRIPTION =
  "Search and browse the full Cypherpunk Library: every manifesto, essay, and treatise on the shelf, by format.";

export const metadata: Metadata = {
  title: "Browse the collection",
  description: DESCRIPTION,
  // Defining openGraph here replaces the root's (shallow merge), so a shared
  // /collection link reads as the browse page, not the generic landing. That
  // replacement also drops the inherited file-based card image, so re-attach it.
  alternates: {
    canonical: "/collection",
    languages: { en: "/collection", fr: "/fr/collection" },
  },
  openGraph: {
    title: "Browse the collection · The Cypherpunk Library",
    description: DESCRIPTION,
    url: "/collection",
    type: "website",
    siteName: "The Cypherpunk Library",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse the collection · The Cypherpunk Library",
    description: DESCRIPTION,
    images: [TWITTER_IMAGE],
  },
};

export default function CollectionPage() {
  return <CollectionView locale="en" altHref="/fr/collection" />;
}
