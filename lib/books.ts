// Placeholder book data — plain colored blocks for now.
// Later: add a `cover` image path to each entry and swap the colored
// `.cover` div for an <img> in BookShelf (the box is already sized/clipped).

export type Book = {
  id: number;
  /** Solid placeholder cover color (becomes an <img> later). */
  color: string;
  /** Cover height in px — varied so the row reads as real, mismatched books. */
  h: number;
  /** Book thickness (spine depth) in px. */
  t: number;
};

// A tasteful, varied palette echoing the reference's literary covers.
const PALETTE: Array<[string, number, number]> = [
  ["#e7dcc4", 232, 36], // cream
  ["#7a1f2b", 214, 40], // burgundy
  ["#16243f", 240, 32], // navy
  ["#e7c2cc", 208, 34], // blush
  ["#14532d", 236, 38], // forest green
  ["#c2410c", 220, 30], // burnt orange
  ["#1f2733", 244, 42], // charcoal
  ["#b51d22", 226, 34], // signal red
  ["#0f3d3e", 212, 36], // deep teal
  ["#d6a23c", 234, 32], // mustard gold
  ["#3a1d52", 218, 38], // plum
  ["#0b1f3a", 240, 30], // midnight
  ["#6f9a6a", 206, 36], // sage
  ["#8b1e3f", 230, 40], // wine
  ["#1a1a1a", 222, 34], // near-black
  ["#dfe3e6", 216, 32], // pale grey
  ["#243b6b", 238, 36], // cobalt
  ["#5b3a29", 210, 40], // walnut brown
];

export const books: Book[] = PALETTE.map(([color, h, t], i) => ({
  id: i,
  color,
  h,
  t,
}));
