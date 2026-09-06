import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Sans,
  IBM_Plex_Serif,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { Frame } from "@/components/layout/frame";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { site } from "@/content/site";
import { siteKeywords } from "@/lib/seo";

import "./globals.css";

/* Headers. IBM Plex Sans carries the H1 and H2 — the hero, the page
   mastheads, the section titles — and the wordmark in the bar.

   Weights are named rather than left to a variable axis. The face tops out
   at 700, so anything asking for 800 would be rendered by the browser as
   700 anyway or, worse, synthesised; naming the four we use makes what
   ships explicit. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

/* Sub-headings. The serif is the one face on the site that is not a
   grotesque, which is the point: a card title or a step name set in it
   reads as a different level rather than as the same level at a smaller
   size, which is the job a third face is worth having for.

   It is for headings only. Data readouts, product names and buttons that
   happen to use the same token are switched to the body face — see the
   note in globals.css. */
const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-serif",
  display: "swap",
});

/* Everything made of sentences, and the interface: body copy, decks, notes,
   list items, the nav. Variable, so the whole weight axis comes from one
   file.

   Loaded through next/font rather than the Google Fonts <link> tags: the
   same three families, but self-hosted at build time, so there is no
   render-blocking request to fonts.googleapis.com and no flash of a
   fallback face. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Mono: small technical labels inside the built data visuals only. */
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-label",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [...siteKeywords],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Business Consulting",
  // Stops iOS Safari turning bare numbers in body copy into tel: links, which
  // it styles itself and which breaks the type colour.
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Let Google use full-length snippets, large image previews and full
      // video previews rather than its conservative defaults.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  // Matches --color-surface-2, so the mobile browser chrome blends with the
  // page instead of staying white above a dark site.
  themeColor: "#0b0c10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexSerif.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="relative min-h-screen bg-surface-2 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-sm focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {/* The navbar overlays the page rather than sitting in flow, so the
            hero runs behind it. Page tops reserve space with pt-*. It scrolls
            away; <Frame> is the chrome that stays. */}
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Frame />
        <Analytics />
      </body>
    </html>
  );
}
