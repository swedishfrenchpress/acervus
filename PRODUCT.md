# Product

## Register

brand

## Users

Privacy-minded readers: the cypherpunk crowd who care about free information, encryption, and anti-censorship, alongside curious book lovers who wander in. They arrive expecting a personal, principled corner of the web, not a storefront. Their job is simple: discover something worth reading and trust that it's genuinely free to read and free to keep. There is an app behind the landing eventually (browsing the collection), but the landing page is the face and carries the brand by default.

## Product Purpose

Acervus is a cypherpunk's library: a curated collection of good public-domain reads. The landing page exists to make a small, opinionated collection feel inviting and alive, and to make a quiet point: everything here is public domain, so there is nothing for anyone to take down. Success is a visitor who lingers on the shelf, feels the care in the curation, and clicks through to read. The signature element is an infinite 3D book carousel over a light "paper" surface.

## Brand Personality

Quiet, literary, calm. A hushed private library, not a marketing push. Voice is first-person, understated, and principled, with a dry cypherpunk wink rather than a shout. Restraint over spectacle: a distinctive technical display face (Alpha-Lyrae) for the wordmark and headline, plain humanist sans (Inter) for reading, generous space, soft paper warmth. The display face carries the cypherpunk wink; its pixel/glitch alternates stay off so the surface reads calm, not hacker-theatrical. The freedom-of-information conviction is present but worn lightly, expressed through what the collection *is* rather than through loud rhetoric. Three words: literate, principled, unhurried.

## Anti-references

- **Corporate SaaS landing** — gradient hero, feature-grid cards, hero-metric template, "Trusted by" logo walls. Acervus is a library, not a product launch.
- **Amazon / e-commerce bookstore** — dense product grids, star ratings, buy buttons, price tags, conversion clutter. Nothing here is for sale.
- **Crypto neon-on-black** — the obvious "cypherpunk" cliché: dark hacker terminal, neon-green-on-black, matrix rain. The aesthetic is warm paper and daylight, deliberately the opposite of the category reflex.
- **Generic library catalog** — sterile database UI: tables, filter dropdowns, pagination, admin chrome. This is a curated shelf, not a search index.

## Design Principles

- **Daylight, not the dark web.** Reject the neon-terminal cypherpunk cliché. The conviction shows through warmth and craft on a paper surface, never through hacker theatrics.
- **The shelf is the argument.** The 3D carousel and the books themselves carry the page. Let the collection speak; resist explaining it with marketing copy.
- **Restraint as taste.** Quiet hierarchy, generous space, one considered accent. Sophistication reads as confidence, not as decoration.
- **Free to read, free to keep.** The freedom-of-information ethos is a felt promise, not a slogan. Honor it in tone and in the absence of anything transactional.
- **Motion that breathes.** Interactions should feel alive and responsive, never binary or gimmicky. Ease out, respect reduced-motion, let things settle softly.

## Accessibility & Inclusion

Target WCAG AA. Body and UI text maintain AA contrast against the paper surface; the muted token is reserved for secondary text at adequate size. All decorative motion (the carousel marquee, celestial spin, proximity effects) is purely ornamental and fully disabled under `prefers-reduced-motion: reduce`, which the codebase already honors globally. Interactive affordances do not rely on color alone. The collection must remain navigable and readable with motion off and at increased zoom.
