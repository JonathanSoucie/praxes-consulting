import type { Faq } from "@/content/faqs";
import type { TeamMember } from "@/content/team";
import { services } from "@/content/services";
import { site } from "@/content/site";

/**
 * Structured data (JSON-LD) for the whole site.
 *
 * Everything hangs off two stable @ids — the organisation and the website —
 * so a crawler reading any page can resolve the same entity rather than
 * inferring a new one per URL. Page-level types reference them by @id instead
 * of repeating the firm's details.
 *
 * The rendering component lives in components/json-ld.tsx; this file stays
 * plain data so it can be imported from anywhere without pulling in React.
 */

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

export type Json = Record<string, unknown>;

/**
 * The firm as an entity. ProfessionalService rather than plain Organization:
 * it is a LocalBusiness subtype, so the address, service area and catalogue
 * below are read as trading details rather than trivia.
 */
export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    description: site.description,
    slogan: site.tagline,
    foundingDate: String(site.founded),
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "Country", name: "Canada" },
    knowsAbout: [
      ...services.map((service) => service.title),
      "Business process automation",
      "ROI modelling",
      "AI readiness assessment",
    ],
    sameAs: [site.social.linkedin],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.phone,
      areaServed: "CA",
      availableLanguage: ["English"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI consulting services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
        },
      })),
    },
  };
}

/** The site itself — lets search engines attribute pages to one property. */
export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en-CA",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * FAQ markup. Only valid where the questions and answers are genuinely on the
 * page — every call site here renders the same `items` through <FaqList>,
 * which is the condition Google checks for.
 */
export function faqPageSchema(items: readonly Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Breadcrumb trail. Pass the full path including Home. */
export function breadcrumbSchema(
  trail: readonly { name: string; path: string }[]
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}

/** A page-type wrapper — AboutPage, ContactPage, CollectionPage, WebPage. */
export function webPageSchema({
  type,
  name,
  description,
  path,
}: {
  type: "AboutPage" | "ContactPage" | "CollectionPage" | "WebPage";
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${site.url}${path}#page`,
    url: `${site.url}${path}`,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-CA",
  };
}

/** Team members, so the people behind the analysis are resolvable entities. */
export function personSchema(member: TeamMember): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: `${site.url}${member.image}`,
    knowsAbout: member.credentials,
    worksFor: { "@id": ORG_ID },
  };
}

/** Case study detail pages. */
export function articleSchema({
  headline,
  description,
  path,
}: {
  headline: string;
  description: string;
  path: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${site.url}${path}`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en-CA",
  };
}

/**
 * Blog posts. BlogPosting rather than Article: it is the narrower type and
 * carries the same fields, so there is no reason to give a crawler less
 * information than we have. The author is a Person who works for the org
 * rather than the org itself — the positioning depends on a named human
 * making the arguments, and the markup should say the same thing the page
 * does.
 */
export function blogPostingSchema({
  headline,
  description,
  path,
  datePublished,
  author,
  authorRole,
  wordCount,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
  authorRole: string;
  wordCount?: number;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${site.url}${path}#post`,
    headline,
    description,
    url: `${site.url}${path}`,
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Person",
      name: author,
      jobTitle: authorRole,
      worksFor: { "@id": ORG_ID },
    },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en-CA",
    ...(wordCount ? { wordCount } : {}),
  };
}

/** A service page — one of the three things you can actually buy. */
export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${path}#service`,
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Canada" },
    serviceType: "Business process automation",
  };
}
