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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${alphaLyrae.variable}`}>
      <body>{children}</body>
    </html>
  );
}
