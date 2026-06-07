"use client";

import { useEffect } from "react";

// A quiet note in the margin for anyone who opens the console to read the source
// — the cypherpunk reflex. Logged once per load: this mounts in the root layout,
// which persists across client navigations, so it never repeats as you browse.
// No UI, no network. The heading is a self-contained paper chip so it stays
// legible whatever the console's own theme is.
export default function Colophon() {
  useEffect(() => {
    const chip =
      "color:#1c1b12;background:#ffffe1;font:600 13px/1.7 ui-monospace,SFMono-Regular,Menlo,monospace;padding:6px 10px;border-radius:4px;";
    const note =
      "color:#8a8770;font:400 12px/1.8 ui-monospace,SFMono-Regular,Menlo,monospace;";
    console.log("%cThe Cypherpunk Library", chip);
    console.log(
      "%cYou're reading the source. Good.\n" +
        "Everything here is public domain, this page included.\n" +
        "Free to read, free to keep. Fork it, mirror it, host your own.",
      note
    );
  }, []);

  return null;
}
