import type { Stat } from "@/content/stats";

export type CaseStudy = {
  /** URL segment — /case-studies/<slug>. Must be unique. */
  slug: string;
  /** Client name, or an anonymised descriptor if under NDA. */
  client: string;
  /** Must match a name in `industries` (content/services.ts) for filtering. */
  industry: string;
  /** The headline outcome. Short, specific, numeric. */
  headline: string;
  /** One-line summary for the card. */
  summary: string;
  /** The single metric shown on the card, e.g. "38% fewer manual hours". */
  metric: string;
  /** Roughly how long the engagement ran. */
  duration: string;
  /** Shown as the featured study on Home and the Case Studies index. */
  featured?: boolean;

  /** Detail page body. Each is a short run of prose. */
  challenge: string[];
  /** What the audit actually found — usually not what the client expected. */
  bottleneck: string[];
  /** What we built. Concrete items. */
  built: { title: string; detail: string }[];
  /** Measured results. Rendered as the ROI block. */
  results: Stat[];
  /** Optional client quote for the detail page. */
  quote?: { text: string; name: string; title: string };
};
