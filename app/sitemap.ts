import type { MetadataRoute } from "next";

import { posts } from "@/content/blog";
import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";
import { features, site } from "@/content/site";

/**
 * Generated from the route list plus the three collections, so a new service,
 * segment, post or study is in the sitemap the moment its content file is.
 *
 * `lastModified` is build time for everything except posts, which carry their
 * own publication date — a blog whose entire archive claims to have changed
 * on every deploy trains a crawler to ignore the field.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/blog", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.9 },
    // Case Studies is omitted entirely while hidden — see content/site.ts.
    ...(features.caseStudies ? [{ path: "/case-studies", priority: 0.8 }] : []),
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  const staticEntries = routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const serviceEntries = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const postEntries = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const caseStudyEntries = features.caseStudies
    ? caseStudies.map((study) => ({
        url: `${site.url}/case-studies/${study.slug}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      }))
    : [];

  return [
    ...staticEntries,
    ...serviceEntries,
    ...postEntries,
    ...caseStudyEntries,
  ];
}
