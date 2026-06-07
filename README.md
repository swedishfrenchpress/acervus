# Acervus

> A cypherpunk's library — a personal collection of good public-domain reads.

A small landing page for a curated, public-domain book collection. The hero
features an infinite 3D book carousel that auto-scrolls and reacts to the cursor
(the book under the cursor lifts off the row as the marquee eases to a near-stop
and names itself beneath the shelf), over a light "paper" background.

Everything in the collection is public domain — nothing to take down. For
everything else, there's [Anna's Archive](https://annas-archive.gl/),
[LibGen](https://libgen.is), and the torrents.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Plain CSS Modules (no UI framework)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Adding books

The collection is a data array in [`lib/books.ts`](lib/books.ts). Every book is
shown as a typographic cover — its title set in the display face on a solid plate
colour — so there are no cover images to manage. A new entry looks like:

```ts
{
  slug, title, author,   // identity; slug → /book/[slug]
  color, h,              // plate colour (keep it dark — the title sits on it in light type) + shelf height in px
  description, year,     // shown on the book page
  // …plus ONE reading mode, in priority order:
  pdf,                   // a PDF under /public/books (reads inline / opens in a tab), or
  external,              // a URL to the full work elsewhere (a link-out), or
  source,                // the URL a reproduced text came from (its prose lives in content/texts, keyed by slug)
}
```

The shared `series` label and the spine thickness `t` are folded in for every
book, so you don't set them per entry.

## Tuning the carousel

The look of the 3D shelf is driven by CSS variables at the top of
[`components/bookshelf.module.css`](components/bookshelf.module.css) (`.shelf`):

| Variable          | Controls                                  |
| ----------------- | ----------------------------------------- |
| `--persp`         | perspective depth                         |
| `--tilt-x`        | downward look angle                        |
| `--tilt-ry`       | plane recede (left near, right far)       |
| `--tilt-z`        | diagonal rise toward the right            |
| `--shelf-scale`   | overall book size                         |
| `--tilt-bottom`   | vertical position of the row              |
| `--book-ry`       | per-book turn (reveals the page edge)     |
| `--book-w`        | cover width                               |
| `--book-overlap`  | spacing between books                     |

The marquee speed and focus response (`SPEED`, `LIFT`, `POP`, `SCALE`) live at
the top of [`components/BookShelf.tsx`](components/BookShelf.tsx).
