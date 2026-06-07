import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Alpha-Lyrae (Vega Protocol, SIL OFL 1.1) — our display / brand face. Single
// weight (Medium); self-hosted from app/fonts (license: app/fonts/OFL.md).
const alphaLyrae = localFont({
  variable: "--font-display",
  src: "./fonts/AlphaLyrae-Medium.woff2",
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Acervus — One cypherpunk's library",
  description:
    "A personal collection of good public-domain reads, curated by some random cypherpunk. Free to read, free to keep.",
};

// Set the theme on <html> before the first paint so there's no flash of the
// wrong palette. This must run synchronously during HTML parse — next/script's
// beforeInteractive defers to the Next runtime (after parse) in the App Router,
// so a plain inline <script> is the FOUC-free path. It reads a saved choice,
// else the OS preference, and writes [data-theme] (+ color-scheme) that the
// tokens in globals.css key off. suppressHydrationWarning silences the expected
// diff between the server's bare <html> and the script-mutated one.
const THEME_INIT = `(function(){try{var e=document.documentElement,s=localStorage.getItem('theme'),t=(s==='dark'||s==='light')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');e.setAttribute('data-theme',t);e.style.colorScheme=t;}catch(_){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${alphaLyrae.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* First child of <body>: runs during parse, before any content paints. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        {children}
      </body>
    </html>
  );
}
