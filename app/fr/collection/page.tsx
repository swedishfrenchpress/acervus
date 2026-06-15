import type { Metadata } from "next";
import CollectionView from "@/components/CollectionView";
import { ui } from "@/lib/i18n";
import { OG_IMAGE, TWITTER_IMAGE } from "@/lib/og";

const TITLE = ui.fr.browseView.title;
const DESCRIPTION = ui.fr.browseView.lead;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/fr/collection",
    languages: { en: "/collection", fr: "/fr/collection" },
  },
  openGraph: {
    title: `${TITLE} · The Cypherpunk Library`,
    description: DESCRIPTION,
    url: "/fr/collection",
    type: "website",
    siteName: "The Cypherpunk Library",
    locale: "fr_FR",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · The Cypherpunk Library`,
    description: DESCRIPTION,
    images: [TWITTER_IMAGE],
  },
};

export default function FrCollectionPage() {
  return <CollectionView locale="fr" altHref="/collection" />;
}
