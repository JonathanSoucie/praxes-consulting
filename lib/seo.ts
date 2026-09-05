import type { Metadata } from "next";

import { site } from "@/content/site";

/** The generated card from app/opengraph-image.tsx — keep the two in step. */
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

/**
 * Builds a page's Metadata from one place, so every route gets the same
 * complete set rather than each page remembering to add half of it.
 *
 * Next only inherits `title`/`description` from the root layout — it does not
 * derive per-page Open Graph tags from them. Without this helper every page
 * shares the Home page's social card, which is why the OG/Twitter blocks are
 * filled in here rather than left to the layout.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  robots,
}: {
  /** Page title without the brand suffix — the layout template appends it. */
  title: string;
  description: string;
  /** Route path with a leading slash; "" for Home. */
  path: string;
  keywords?: readonly string[];
  type?: "website" | "article";
  robots?: Metadata["robots"];
}): Metadata {
  // The <title> template only applies to the document title, so the social
  // title has to carry the brand itself.
  const socialTitle = `${title} — ${site.name}`;
  const url = `${site.url}${path}`;

  return {
    // Kept in step with app/opengraph-image.tsx. Declaring `openGraph` on a
    // page replaces the parent's block wholesale — the file-based card is NOT
    // merged back in — so every page that uses this helper has to name the
    // image itself or it ships with no social card at all.
    title,
    description,
    ...(keywords ? { keywords: [...keywords] } : {}),
    alternates: { canonical: path === "" ? "/" : path },
    openGraph: {
      type,
      url,
      siteName: site.name,
      locale: "en_US",
      title: socialTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage],
    },
    ...(robots ? { robots } : {}),
  };
}

/**
 * Head terms the site is actually trying to rank for. Deliberately long-tail
 * and geographically qualified — "AI consulting" alone is unwinnable for a
 * new domain, whereas "AI automation consultant Ottawa" is reachable.
 */
export const siteKeywords = [
  "part number cross reference software",
  "RFQ automation manufacturing",
  "quote automation parts distributor",
  "product data enrichment manufacturing",
  "distributor catalog synchronization",
  "legacy ERP integration layer",
  "export document validation",
  "obsolete parts sourcing",
] as const;
