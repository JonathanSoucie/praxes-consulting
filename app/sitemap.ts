import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";
import { features, site } from "@/content/site";

/** Generated from the route list plus the case study collection. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((service) => ({
      path: `/services/${service.slug}`,
      priority: 0.8,
    })),
    { path: "/process", priority: 0.9 },
    // Case Studies is omitted entirely while hidden — see content/site.ts.
    ...(features.caseStudies
      ? [{ path: "/case-studies", priority: 0.8 }]
      : []),
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.9 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  const staticEntries = routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const caseStudyEntries = features.caseStudies
    ? caseStudies.map((study) => ({
        url: `${site.url}/case-studies/${study.slug}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      }))
    : [];

  return [...staticEntries, ...caseStudyEntries];
}
