import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { Frame } from "@/components/layout/frame";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { site } from "@/content/site";
import { siteKeywords } from "@/lib/seo";

import "./globals.css";

// One local variable heading face, shared by the hero and every page.
import "@fontsource-variable/plus-jakarta-sans/wght.css";

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

/* Badges and terminal data: the small uppercase labels on cards, in the
   built data visuals, and on buttons. Medium is the weight those are set at,
   so 500 ships alongside the regular. */
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
      className={`${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="relative min-h-screen bg-surface-2 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-sm focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {/* The fixed navbar preserves the hero's existing document position.
            Page tops reserve space with pt-*; the frame remains above it. */}
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Frame />
        <Analytics />
      </body>
    </html>
  );
}
