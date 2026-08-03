/**
 * The case study collection.
 *
 * TO ADD A CASE STUDY:
 *   1. Copy an existing file in this folder, e.g. northgate-accounting.ts
 *   2. Give it a unique `slug` and an `industry` that matches one of the
 *      names in `industries` (content/services.ts) so filtering works.
 *   3. Import it below and add it to the array.
 *
 * The detail page at /case-studies/[slug] and the industry filter on the
 * index page are both generated from this array — nothing else to touch.
 */

import { fairwayRidgeGolf } from "./fairway-ridge-golf";
import { harbourlineLogistics } from "./harbourline-logistics";
import { meridianDental } from "./meridian-dental";
import { northgateAccounting } from "./northgate-accounting";
import { vantageProperty } from "./vantage-property";
import type { CaseStudy } from "./types";

export type { CaseStudy };

/** Display order on the index page. */
export const caseStudies: CaseStudy[] = [
  northgateAccounting,
  fairwayRidgeGolf,
  harbourlineLogistics,
  meridianDental,
  vantageProperty,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** The study marked `featured`, falling back to the first entry. */
export function getFeaturedCaseStudy(): CaseStudy {
  return caseStudies.find((study) => study.featured) ?? caseStudies[0];
}

/** Same-industry studies first, then others, excluding the current one. */
export function getRelatedCaseStudies(slug: string, limit = 2): CaseStudy[] {
  const current = getCaseStudy(slug);
  if (!current) return caseStudies.slice(0, limit);

  const others = caseStudies.filter((study) => study.slug !== slug);
  const sameIndustry = others.filter(
    (study) => study.industry === current.industry
  );
  const rest = others.filter((study) => study.industry !== current.industry);

  return [...sameIndustry, ...rest].slice(0, limit);
}

/** Industries that actually have a case study, for the filter control. */
export function getCaseStudyIndustries(): string[] {
  return [...new Set(caseStudies.map((study) => study.industry))].sort();
}
