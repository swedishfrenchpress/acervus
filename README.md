# Acervus

> One cypherpunk's library — a personal collection of good public-domain reads.

A small landing page for a curated, public-domain book collection. The hero
features an infinite 3D book carousel that auto-scrolls and reacts to hover
(neighbouring books fan apart, the hovered book lifts and faces you), over a
light "paper" background.

Everything in the collection is public domain — nothing to take down. For
everything else, there's [Anna's Archive](https://annas-archive.org),
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

## Adding real books

Book covers are currently plain colored placeholders. They live as a data
array in [`lib/books.ts`](lib/books.ts):

```ts
{ id, color, h, t }   // color = placeholder cover, h = height, t = thickness
```

To use real cover images, add a `cover` image path to each entry and swap the
colored `.cover` `<span>` for an `<img>` in
[`components/BookShelf.tsx`](components/BookShelf.tsx). The 3D box is already
sized and clipped, so it's a drop-in.

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

The marquee speed and hover-spread (`PUSH_PX`, `FALLOFF`, `REACH`) live at the
top of [`components/BookShelf.tsx`](components/BookShelf.tsx).
