// Social-card images for pages that set their own `openGraph` / `twitter`.
//
// The site-wide cards live as file routes (app/opengraph-image.png,
// app/twitter-image.png) and attach automatically to the root segment. But Next
// merges metadata *shallowly*: a page that defines its own `openGraph` replaces
// the root's wholesale, which drops the inherited file image. So any page that
// overrides the social title/description must re-attach these. metadataBase
// (set in app/layout.tsx) resolves the paths to absolute URLs for crawlers.

export const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
};

export const TWITTER_IMAGE = {
  url: "/twitter-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
};
