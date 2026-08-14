import type { Metadata, Viewport } from "next";
import {
  Flow_Circular,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { site } from "@/content/site";
import { siteKeywords } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme";

import "./globals.css";

/* Body: Flow Circular — NOTE this is a wireframe/placeholder face that renders
   every glyph as a filled circle, so body copy reads as redacted blobs. */
const flowCircular = Flow_Circular({
  subsets: ["latin"],
  variable: "--font-flow",
  display: "swap",
  weight: "400", // the family ships this single weight
});

/* Display: high-contrast serif for headings and stat figures. Variable font,
   so every weight from 400-900 is available from one file. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
  // Matches --color-surface-2 in each theme, so the mobile browser chrome
  // blends with the page instead of staying white behind a dark site.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d18" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${flowCircular.variable} ${playfair.variable} ${jetBrainsMono.variable}`}
      // The init script below writes data-theme onto this element before React
      // hydrates, so the server HTML and the live DOM legitimately differ here.
      suppressHydrationWarning
    >
      <head>
        <script
          // Must run before first paint to avoid a flash of the wrong theme,
          // which rules out next/script — see lib/theme.ts.
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-screen bg-surface-2 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {/* The navbar overlays the page rather than sitting in flow, so the
            hero gradient runs behind it. Page tops reserve space with pt-*. */}
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
