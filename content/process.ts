/**
 * The engagement stages. This is the spine of the whole site — the Home page
 * shows a condensed version, /process shows the full timeline.
 *
 * The five stages are the four Channel Intelligence layers — reconnaissance,
 * harvest, resolution, evidence — with a free scoping call in front of them
 * and monitoring behind them, and the commercial shape of the engagement
 * attached to each: how long it takes and what you are left holding. The
 * site quotes no prices — scope is agreed on the call and priced against
 * your own distributor count.
 *
 * Durations here are mirrored in components/sections/engagement-timeline.tsx.
 * Update both together.
 */

export type ProcessStep = {
  n: string;
  title: string;
  /** Commercial framing, rendered as plain text beside the title. */
  tag?: "Free" | "Ongoing";
  /** A handful of words for the Home page strip — the stage in one phrase.
      `summary` is a sentence, which is a size the strip has no room for. */
  brief: string;
  /** Short version, used where there is room for a sentence. */
  summary: string;
  /** Full version, used on /process. */
  detail: string;
  /** Concrete artefacts the client receives at this stage. */
  deliverables: string[];
  /** Typical duration. */
  duration: string;
};

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Channel scoping call",
    brief: "Your domains, your categories, your rivals",
    tag: "Free",
    summary:
      "Thirty minutes to agree which distributors, which categories and which competitor brands are worth counting.",
    detail:
      "A short, structured conversation about your distributor network: how many domains, which regions, which categories you are actually contesting, and which competitor brands you want tracked. We also ask what you already believe about the channel, because the census either confirms it or does not, and both are useful. If your network is too small or too offline for this to pay, we say so on the call.",
    deliverables: [
      "An agreed distributor list and category taxonomy",
      "The competitor brand universe to be counted",
      "A clear picture of what a census would cover, and what it would not",
    ],
    duration: "30 minutes",
  },
  {
    n: "02",
    title: "Reconnaissance",
    brief: "What is reachable, and what is gated",
    summary:
      "Every domain checked for reachability, catalog presence, platform and access restrictions.",
    detail:
      "Layer one. Each distributor domain is checked for whether it is reachable, whether a catalog exists behind it, what platform it runs on, and whether access is restricted by a dealer login, a robots.txt exclusion or automated-access blocking. Catalog depth and digital maturity signals are measured at the same time. These are HTTP requests at one per second on public pages, which is why this layer costs almost nothing to run.",
    deliverables: [
      "Reachability, catalog presence and platform per distributor",
      "An explicit gated list, with the reason for each",
      "Catalog depth and digital maturity signals",
      "A census report you can act on independently",
    ],
    duration: "3–5 days",
  },
  {
    n: "03",
    title: "Harvest and resolution",
    brief: "Records extracted, part numbers resolved",
    summary:
      "Product records extracted with their source URLs, then part numbers mapped to manufacturers.",
    detail:
      "Layers two and three. Every published product record is extracted — name, part number, brand, price, category and URL — and stored with the page it came from. Then part numbers are resolved to the manufacturers that made them. Resolved identities are cached permanently, so the same part is only ever resolved once, on this engagement or on any run after it.",
    deliverables: [
      "Every published product record, with its source URL",
      "Manufacturer identity resolved per part",
      "A permanent resolution cache that makes later runs cheaper",
      "Coverage stated honestly, including what each site did not expose",
    ],
    duration: "3–5 days",
  },
  {
    n: "04",
    title: "Evidence and report",
    brief: "Every claim linked to a live listing",
    summary:
      "Findings assembled into displacement, whitespace and account-level reporting, each claim traceable.",
    detail:
      "Layer four, and the deliverable. Records are classified against your categories and your competitor set, concentration is analysed, and the findings are written up per distributor, per category and per meeting. The source URL and a verbatim quote are stored for every value, so any finding in any report can be opened and checked against the page it came from — including in the distributor meeting itself.",
    deliverables: [
      "Displacement and whitespace reports with evidence links",
      "Category concentration analysis",
      "Sales-call briefs and distributor scorecards",
      "An executive presentation with recommended plays",
    ],
    duration: "3–5 days",
  },
  {
    n: "05",
    title: "Monitor and expand",
    brief: "What moved, every month, against the baseline",
    // No tag — the duration column already reads "Ongoing".
    summary:
      "Lines added and dropped, catalogs launched, brands arriving, distributors going dark — reported monthly.",
    detail:
      "The delivered reports become the baseline. From there the network is re-crawled on your cadence and only the differences are reported: product lines added or dropped, new catalogs launched, distributors gone dark, competitor brands arriving or leaving, categories expanding or contracting. Critical changes alert immediately. The resolution cache carries over, so recurring runs are a fraction of the work of the first, and coverage expands to new regions and languages from the same base.",
    deliverables: [
      "Monthly change reports against the agreed baseline",
      "Immediate alerts on distributors going dark or major brand additions",
      "Quarterly displacement and whitespace refresh",
      "Ownership of every report and its evidence, throughout",
    ],
    duration: "Ongoing",
  },
];
