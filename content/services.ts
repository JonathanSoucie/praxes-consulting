/**
 * What you buy: five subservices inside one solution.
 *
 * The solution is Channel Intelligence — one crawl of a manufacturer's
 * distributor network, read several ways. The six parts of it are in
 * content/manufacturing.ts and appear as the labels around the black hole on
 * Home. This file is a level down: the engagements themselves, each scoped
 * to a distributor count and a delivery window agreed before it starts.
 *
 * Interchange harvesting is the sixth part and deliberately has no page: it
 * compounds across clients and is held as an asset and licensed, rather than
 * sold as a deliverable.
 *
 * Each `process` array is the spine of its page: a sticky visual on one
 * side, the steps on the other, the visual changing as each step becomes the
 * live one. See components/process/process-steps.tsx. The steps follow the
 * four layers — reconnaissance, harvest, resolution, evidence — specialised
 * to the question the subservice answers.
 *
 * ⚠️ Figures marked as reference deliveries come from one engagement across
 * 24 distributors. Panel figures elsewhere are illustrative of shape, not
 * measured results. Replace them as engagements complete.
 */

/** What the sticky panel draws for a given step. Three shapes cover every
    step on the site; adding a fourth means teaching the renderer about it. */
export type StepPanel =
  /** A left-to-right chain. Used for anything that is a pipeline. */
  | {
      kind: "flow";
      nodes: { label: string; note?: string; state?: "live" | "idle" | "flag" }[];
    }
  /** A list with a value and a state per row. Used for findings and queues. */
  | {
      kind: "rows";
      caption?: string;
      rows: { label: string; value: string; state?: "ok" | "warn" | "idle" }[];
    }
  /** Horizontal bars, 0–100. Used wherever the point is a comparison. */
  | {
      kind: "bars";
      caption?: string;
      bars: { label: string; value: number; note?: string; muted?: boolean }[];
    };

/**
 * The glyph shown in the chip above a step's heading. A string rather than an
 * imported icon component: this file is plain data, and lib/schema.ts imports
 * it to build JSON-LD — pulling React components in here would drag the whole
 * icon set into a module that only wants strings. The mapping to real icons
 * lives in components/process/process-steps.tsx.
 */
export type StepIcon =
  | "users"
  | "timer"
  | "calculator"
  | "ranking"
  | "route"
  | "target"
  | "branches"
  | "plug"
  | "gate"
  | "compare"
  | "measure"
  | "audience"
  | "approve"
  | "send"
  | "revenue";

export type ProcessStep = {
  n: string;
  title: string;
  body: string;
  icon: StepIcon;
  /** The one thing the client is left holding after this step. */
  output?: string;
  panel: StepPanel;
};

export type ServiceExample = {
  title: string;
  body: string;
  /** Two or three, each short enough to set on one line. */
  points: readonly string[];
};

export type Service = {
  slug: string;
  /** Short label for nav and cards. */
  name: string;
  /** Full title for the page H1. */
  title: string;
  /** The line under the H1. */
  standfirst: string;
  /** One line, used on the services index and in the home page grid. */
  summary: string;
  /** The situation the service exists for. */
  problem: string;
  /** What the engagement actually is, in plain terms. */
  definition: string;
  /** Commercial shape. Deliberately concrete. */
  shape: { label: string; value: string }[];
  /** The home page row: a brief account of the engagement, and a schematic
      of what it actually hands back. Drawn with the same three shapes the
      process steps use — see components/process/step-panel.tsx for why these
      are diagrams rather than screenshots. */
  showcase: {
    blurb: string;
    panel: StepPanel;
  };
  processTitle: string;
  processStandfirst: string;
  process: ProcessStep[];
  examplesTitle?: string;
  examplesStandfirst?: string;
  examples?: ServiceExample[];
};

export const services: Service[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "channel-census",
    name: "Channel Census",
    title: "The Channel Census",
    standfirst:
      "Your distributor list, crawled end to end — what is reachable, what publishes a catalog, what platform it runs on, and where the door is locked.",
    summary:
      "The pilot. It answers a question you cannot answer today, and de-risks everything after it.",
    problem:
      "Ask most manufacturers which of their distributors publish their products online and the honest answer is that nobody knows. There is a spreadsheet of domains, a set of relationships, and an assumption that the catalog made it onto the website. Some of those domains are parked. Some run a catalog with four hundred products and no part numbers. Some sit behind a dealer login, which is a legitimate answer and a different one from having no catalog at all. Until somebody separates those cases, every channel decision is made on a guess about what is out there.",
    definition:
      "A crawl of up to 25 distributor domains that reports what in this channel is machine-readable at all. For each domain: reachability, catalog presence and depth, the platform it runs on, access restrictions, and digital maturity signals. It is a reconnaissance layer only — HTTP requests at one per second, no paid resolution — which is why it costs almost nothing to run and why it is the sensible first purchase.",
    shape: [
      { label: "Scope", value: "Up to 25 distributor domains" },
      { label: "Layers", value: "Reconnaissance only" },
      { label: "Timeline", value: "3–5 business days" },
      { label: "Investment", value: "$7,500–$15,000 one time" },
    ],
    showcase: {
      blurb:
        "Every domain on your list, sorted into what it actually is: a live catalog you can read, a gated portal you cannot, a site with no catalog behind it, or a domain that no longer resolves. A 24-distributor census took one hour of crawling.",
      panel: {
        kind: "rows",
        caption: "Census — 24 distributor domains",
        rows: [
          { label: "Live catalog, machine-readable", value: "14", state: "ok" },
          { label: "Site live, no catalog published", value: "5", state: "idle" },
          { label: "Gated — dealer login required", value: "3", state: "warn" },
          { label: "Parked or unreachable", value: "2", state: "warn" },
        ],
      },
    },
    processTitle: "How the census runs",
    processStandfirst:
      "Reconnaissance before extraction. The census establishes what each domain is and what it will let us read, which is the thing every later engagement is priced and scoped against.",
    process: [
      {
        n: "01",
        title: "We take your distributor list as it is",
        icon: "plug",
        body:
          "A spreadsheet of domains is enough. No integration, no access, no involvement from the distributors themselves — everything the census reads is a public page anyone with a browser could open. If the list is out of date, that is a finding rather than a blocker.",
        output: "Your domain list, deduplicated and resolved",
        panel: {
          kind: "rows",
          caption: "Input",
          rows: [
            { label: "Domains supplied", value: "26", state: "ok" },
            { label: "Duplicates and redirects merged", value: "2", state: "idle" },
            { label: "Distinct domains crawled", value: "24", state: "ok" },
          ],
        },
      },
      {
        n: "02",
        title: "We establish what is actually reachable",
        icon: "target",
        body:
          "Live, parked, redirected or gone. This is the least glamorous finding in the report and frequently the one that gets read out loud in the meeting: a distributor in the incentive programme whose domain has not resolved since last year is a fact, not an opinion.",
        output: "Reachability status per domain, with the response evidence",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Domain requested", state: "live" },
            { label: "Resolved and classified", note: "Live · parked · gone" },
            { label: "Evidence stored", note: "Response and URL" },
          ],
        },
      },
      {
        n: "03",
        title: "We measure the catalog and the platform under it",
        icon: "compare",
        body:
          "Whether a catalog exists, roughly how deep it goes, and what it runs on — Shopify, WooCommerce, Adobe Commerce, a custom build, or a marketplace storefront. Platform matters commercially: it predicts whether a distributor could take a product feed from you at all, which is the next question you will be asked.",
        output: "Catalog depth and platform, per distributor",
        panel: {
          kind: "rows",
          caption: "Catalog and platform",
          rows: [
            { label: "Shopify", value: "6 distributors", state: "ok" },
            { label: "WooCommerce", value: "4 distributors", state: "ok" },
            { label: "Custom build", value: "3 distributors", state: "idle" },
            { label: "Marketplace storefront only", value: "1 distributor", state: "warn" },
          ],
        },
      },
      {
        n: "04",
        title: "We record where the door is locked, and say so",
        icon: "gate",
        body:
          "Dealer logins, robots.txt exclusions and automated-access blocking. We respect all three. A gated distributor is reported as gated with a recommendation to handle it by manual review or direct outreach — never worked around, and never quietly counted as having no catalog.",
        output: "An explicit gated list, with the reason for each",
        panel: {
          kind: "rows",
          caption: "Access restrictions",
          rows: [
            { label: "Open catalog", value: "14", state: "ok" },
            { label: "Dealer login required", value: "3", state: "warn" },
            { label: "Excluded by robots.txt", value: "1", state: "warn" },
            { label: "Automated access blocked", value: "1", state: "warn" },
          ],
        },
      },
      {
        n: "05",
        title: "You get the report and a recommended next step",
        icon: "send",
        body:
          "Distributor-level findings, evidence links, and a straight recommendation about what is worth doing next — displacement mapping on the readable ones, outreach on the gated ones, or nothing yet. If the channel turns out to be too thin online to justify going further, that is the finding and you have it in writing.",
        output: "An executive report with per-distributor findings and next steps",
        panel: {
          kind: "bars",
          caption: "Channel readability, 24 domains",
          bars: [
            { label: "Readable catalogs", value: 58 },
            { label: "No catalog online", value: 21, muted: true },
            { label: "Gated or blocked", value: 13, muted: true },
            { label: "Parked or gone", value: 8, muted: true },
          ],
        },
      },
    ],
    examplesTitle: "What the census reports",
    examplesStandfirst:
      "Five signals per distributor, each recorded with the page it was read from — enough to sort a channel without spending a cent on resolution.",
    examples: [
      {
        title: "Reachability and presence",
        body: "Whether the domain resolves, whether a catalog exists behind it, and whether either has changed since you last looked.",
        points: [
          "Live, parked or inaccessible",
          "Catalog present, yes or no",
          "Redirects and merged domains",
        ],
      },
      {
        title: "Depth and platform",
        body: "How much of a catalog it really is, and what it runs on — the two things that predict whether a data relationship is even possible.",
        points: [
          "Catalog depth signals",
          "Shopify, WooCommerce, custom, marketplace",
          "Digital maturity indicators",
        ],
      },
      {
        title: "Access restrictions",
        body: "Where the published catalog stops and the gated one begins, stated plainly rather than treated as an absence of data.",
        points: [
          "Dealer login required",
          "robots.txt exclusion",
          "Automated-access blocking",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "displacement-mapping",
    name: "Displacement Mapping",
    title: "Displacement Mapping",
    standfirst:
      "Which distributors carry brands you compete against, in your categories — with every competing part linked to the listing it was found on.",
    summary:
      "The flagship. Competitor brands per distributor, per category, with evidence.",
    problem:
      "A distributor carries your line. They also carry three other brands in the same categories, and they publish all four. Your rep walks into the quarterly meeting knowing the first fact and not the second, so the conversation is about your products in isolation rather than about the shelf you are actually on. Meanwhile the competitor whose parts fill 85 of the 102 air springs that distributor lists has no reason to mention it either. This is not hidden information. It is published, indexed, and unread.",
    definition:
      "A full crawl and extraction across up to 10 distributors, with every product record resolved to its manufacturer and classified against your category taxonomy and your named competitor set. The output is competing parts per distributor, broken down by category and rival brand, with concentration analysis and a recommended play for each account. Every claim links to the distributor's live listing.",
    shape: [
      { label: "Scope", value: "Up to 10 distributors" },
      { label: "Layers", value: "Harvest, resolution, evidence" },
      { label: "Timeline", value: "7–10 business days" },
      { label: "Investment", value: "From $25,000, bundled with whitespace" },
    ],
    showcase: {
      blurb:
        "Every product record on a distributor's site, resolved to the manufacturer that made it and sorted into your categories. What comes back is the competitor brand mix on that shelf — and 823 competing parts across six distributors, 418 of them in named client categories, is what one reference delivery looked like.",
      panel: {
        kind: "rows",
        caption: "Distributor 04 · air springs, 102 listings",
        rows: [
          { label: "Rival brand A", value: "85 parts", state: "warn" },
          { label: "Rival brand B", value: "9 parts", state: "warn" },
          { label: "Your brand", value: "6 parts", state: "ok" },
          { label: "Unresolved", value: "2 parts", state: "idle" },
        ],
      },
    },
    processTitle: "How the mapping runs",
    processStandfirst:
      "Harvest, resolve, classify, concentrate, evidence. Nothing is claimed that is not traceable to a page, and nothing is counted twice — the resolution cache means a part paid for once is never paid for again.",
    process: [
      {
        n: "01",
        title: "We harvest the published catalog",
        icon: "plug",
        body:
          "Product name, part number, brand, price, category and URL, extracted record by record from the distributor's own pages. One request per second, public pages only, gated content left alone. The source URL travels with every record from this point on, which is what makes the later claims checkable.",
        output: "Every published product record, with its source URL attached",
        panel: {
          kind: "rows",
          caption: "Harvest — six distributors",
          rows: [
            { label: "Product records extracted", value: "31,480", state: "ok" },
            { label: "With a part number published", value: "27,910", state: "ok" },
            { label: "With a brand published", value: "22,140", state: "ok" },
            { label: "Price published", value: "18,020", state: "idle" },
          ],
        },
      },
      {
        n: "02",
        title: "We resolve part numbers to manufacturers",
        icon: "branches",
        body:
          "A published part number does not tell you who made the part; a brand field, where one exists at all, is often the distributor's own label. Resolution maps the number to a manufacturer at $0.28 per resolution, and every result is cached permanently — so the same part is never paid for twice, on this engagement or any later one.",
        output: "Manufacturer identity per part, cached against future runs",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Part number", state: "live" },
            { label: "Resolved to manufacturer", note: "$0.28, once" },
            { label: "Cached permanently", note: "Free on every later run" },
          ],
        },
      },
      {
        n: "03",
        title: "We classify against your categories and your rivals",
        icon: "compare",
        body:
          "Your category taxonomy and your named competitor universe, not a generic one. A competing part is only a competing part relative to what you sell — which is why the first working session is about which categories you are actually contesting, and which rival brands you want counted.",
        output: "Competing parts per distributor, per category, per rival brand",
        panel: {
          kind: "rows",
          caption: "Reference delivery",
          rows: [
            { label: "Competing parts found", value: "823", state: "warn" },
            { label: "In named client categories", value: "418", state: "warn" },
            { label: "Distributors covered", value: "6", state: "ok" },
            { label: "Rival brands identified", value: "17", state: "idle" },
          ],
        },
      },
      {
        n: "04",
        title: "We look at concentration, not just counts",
        icon: "ranking",
        body:
          "A hundred competing parts spread across nine brands is a fragmented category. A hundred with 85 from one rival is a relationship, and a different sales problem. Concentration is where the report stops being a list and starts telling a rep which conversation to have in which account.",
        output: "Category-level concentration, ranked by account",
        panel: {
          kind: "bars",
          caption: "Rival share in contested categories",
          bars: [
            { label: "Air springs", value: 83, note: "One rival" },
            { label: "U-bolts", value: 61 },
            { label: "Hangers", value: 44 },
            { label: "Bushings", value: 27, muted: true },
          ],
        },
      },
      {
        n: "05",
        title: "You get the report, the evidence and the plays",
        icon: "send",
        body:
          "Competitor brand breakdown, category analysis, an evidence link on every claim, and a recommended play per account. The evidence link is the part sales teams actually use: a distributor cannot argue with their own listing, and a rep who can open it on a laptop in the meeting is having a different conversation than one quoting a report.",
        output: "A displacement report your reps can use in the next meeting",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Finding", state: "live" },
            { label: "Source URL and verbatim quote", note: "Stored per value" },
            { label: "Opened in the meeting", note: "Live listing" },
          ],
        },
      },
    ],
    examplesTitle: "What the report contains",
    examplesStandfirst:
      "Three views of the same crawl, because a channel director, a regional manager and a rep each need a different cut of it.",
    examples: [
      {
        title: "Per distributor",
        body: "The brand mix on one account's shelf, category by category, with the parts counted and the listings linked.",
        points: [
          "Competing parts by rival brand",
          "Your coverage in the same categories",
          "Lines absent from their catalog",
        ],
      },
      {
        title: "Per category",
        body: "Where you are contested across the whole network, and where a single rival has quietly consolidated.",
        points: [
          "Concentration by rival brand",
          "Category coverage across distributors",
          "Uncontested categories, flagged",
        ],
      },
      {
        title: "Per meeting",
        body: "A brief a rep can read on the drive: what this distributor publishes, what they publish instead of you, and what to ask for.",
        points: [
          "Sales-call briefs",
          "Evidence links per claim",
          "Recommended play per account",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "whitespace-mapping",
    name: "Whitespace Mapping",
    title: "Whitespace Mapping",
    standfirst:
      "Which categories a distributor stocks from nobody — openings with no incumbent to dislodge, from the same crawl as displacement.",
    summary:
      "The inverse of displacement, and usually the easier sales conversation.",
    problem:
      "Displacement tells you where you are losing. It does not tell you where nobody is winning. A distributor with a deep hydraulics catalog and nothing at all in hangers is not a competitive loss — it is a category they do not serve, in a network you already have a relationship with. Those openings are invisible for the same reason displacement is: they are a pattern across tens of thousands of listings, and nobody has read them. So the sales conversation defaults to fighting for shelf space in the categories that are already crowded.",
    definition:
      "The same harvest, resolution and evidence layers, read for absence rather than presence. We map each distributor's published catalog against your category taxonomy and identify the categories they stock from nobody — yours or anyone's — then rank those openings by the product lines you could put into them. It bundles with displacement on one crawl, or runs standalone on an existing census.",
    shape: [
      { label: "Scope", value: "Same crawl as displacement" },
      { label: "Layers", value: "Harvest, resolution, evidence" },
      { label: "Timeline", value: "5–7 business days" },
      { label: "Investment", value: "Bundled, or standalone on a census" },
    ],
    showcase: {
      blurb:
        "Categories where a distributor lists nothing at all — not your products, not a rival's. One distributor in the reference set lists zero U-bolts and zero hangers, in a catalog otherwise deep enough to take them.",
      panel: {
        kind: "rows",
        caption: "Distributor 02 · category coverage",
        rows: [
          { label: "Suspension — 340 listings", value: "Contested", state: "warn" },
          { label: "Hydraulics — 610 listings", value: "Contested", state: "warn" },
          { label: "U-bolts", value: "Zero listings", state: "ok" },
          { label: "Hangers", value: "Zero listings", state: "ok" },
        ],
      },
    },
    processTitle: "How the mapping runs",
    processStandfirst:
      "Absence is a harder claim than presence, so it is made carefully: a category is only reported as whitespace when the catalog around it was read deeply enough for the gap to mean something.",
    process: [
      {
        n: "01",
        title: "We agree the categories that count",
        icon: "route",
        body:
          "Your taxonomy, your sellable lines. Whitespace against a generic industry category tree produces a list of things you do not make, which is noise. The scoping session is about which categories you could actually supply tomorrow if the distributor said yes.",
        output: "A category set scoped to what you can supply",
        panel: {
          kind: "rows",
          caption: "Scope",
          rows: [
            { label: "Categories in your catalog", value: "64", state: "ok" },
            { label: "In scope for this network", value: "38", state: "ok" },
            { label: "Excluded — not supplied to region", value: "26", state: "idle" },
          ],
        },
      },
      {
        n: "02",
        title: "We read the same crawl for absence",
        icon: "compare",
        body:
          "The harvested records are already there from displacement. Whitespace inverts the question: instead of asking which rival brands appear in a category, it asks which categories have no listings at all — from you, from a rival, from anyone.",
        output: "Category coverage per distributor, presence and absence",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Harvested records", state: "live" },
            { label: "Mapped to your categories" },
            { label: "Empty categories isolated", note: "No brand present" },
          ],
        },
      },
      {
        n: "03",
        title: "We check that an absence is really an absence",
        icon: "gate",
        body:
          "A category can look empty because the distributor does not serve it, or because that part of their catalog sits behind a login, or because their site names it something we did not map. All three are reported differently. An overstated whitespace claim is the fastest way to lose a rep's trust in a report.",
        output: "Confirmed openings, separated from unread and gated sections",
        panel: {
          kind: "rows",
          caption: "Absence checks",
          rows: [
            { label: "Confirmed empty — catalog read in full", value: "22", state: "ok" },
            { label: "Category named differently, matched", value: "6", state: "ok" },
            { label: "Section gated — not claimable", value: "3", state: "warn" },
          ],
        },
      },
      {
        n: "04",
        title: "We rank the openings by what you could put in them",
        icon: "ranking",
        body:
          "An empty category in a distributor with 12,000 listings and a live feed is worth more than an empty category in one with 400 and no part numbers. The ranking combines catalog depth, adjacent categories they already stock, and the lines you have available to pitch.",
        output: "Openings ranked per distributor, with the lines to pitch",
        panel: {
          kind: "bars",
          caption: "Openings by opportunity",
          bars: [
            { label: "Distributor 02 · hangers", value: 88 },
            { label: "Distributor 05 · U-bolts", value: 74 },
            { label: "Distributor 01 · bushings", value: 51 },
            { label: "Distributor 09 · brackets", value: 22, muted: true },
          ],
        },
      },
      {
        n: "05",
        title: "You get an uncontested-category list per account",
        icon: "send",
        body:
          "One page per distributor: the categories they serve, the categories nobody serves them, and the product lines to open with. It is the easier sales conversation of the two, because there is no incumbent relationship to argue against — only a gap and a supplier who noticed it.",
        output: "A whitespace report with evidence links and lines to pitch",
        panel: {
          kind: "rows",
          caption: "Account brief · Distributor 02",
          rows: [
            { label: "Categories served", value: "17", state: "ok" },
            { label: "Confirmed openings", value: "4", state: "ok" },
            { label: "Lines available to pitch", value: "11", state: "ok" },
            { label: "Evidence links", value: "Per claim", state: "ok" },
          ],
        },
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "change-monitoring",
    name: "Change Monitoring",
    title: "Change Monitoring",
    standfirst:
      "What moved since last month — lines added or dropped, catalogs launched, competitor brands arriving, distributors going dark.",
    summary:
      "The retainer. A census is a project; change detection is a standing reason to be in the account.",
    problem:
      "A census and a displacement map are true on the day they are delivered. Catalogs are not static: a distributor prunes a product line in March, a rival brand appears across four accounts in a region over a quarter, a site goes dark and nobody upstream notices for two more. Today those changes reach a manufacturer as anecdote from a sales call, months after they were published — which means the response is late by exactly the length of time the information sat unread on a public website.",
    definition:
      "A recurring crawl of 30 to 60 distributor domains against the baseline established by your census and displacement map, reporting what changed. Product lines added or dropped, new catalogs launched, distributors gone dark, competitor brands added or removed, categories expanding or contracting. Critical changes trigger an alert rather than waiting for the monthly report. Because the resolution cache carries over, a recurring run costs a fraction of the first.",
    shape: [
      { label: "Scope", value: "30–60 distributor domains" },
      { label: "Cadence", value: "Monthly, weekly or quarterly" },
      { label: "First report", value: "Within 15 business days" },
      { label: "Investment", value: "$12,500–$20,000 per month" },
    ],
    showcase: {
      blurb:
        "Every month, the same crawl against the same definitions, and a report of the difference. The parts already resolved cost nothing to resolve again, so what you pay for on a recurring run is the change, not the catalog.",
      panel: {
        kind: "rows",
        caption: "March · 41 domains",
        rows: [
          { label: "Competitor brand added", value: "3 distributors", state: "warn" },
          { label: "Your lines dropped", value: "1 distributor", state: "warn" },
          { label: "New catalog launched", value: "2 distributors", state: "ok" },
          { label: "Gone dark", value: "1 distributor", state: "warn" },
        ],
      },
    },
    processTitle: "How the retainer runs",
    processStandfirst:
      "A diff is only as good as the baseline under it, and only as useful as the alert that interrupts you when something matters. Both are set up before the first recurring run.",
    process: [
      {
        n: "01",
        title: "We fix the baseline the diffs are measured against",
        icon: "measure",
        body:
          "The census and displacement map become the reference state: which domains, which catalogs, which brands in which categories, on which date. Every later report is a comparison against that, using the same definitions — because a change report where the definitions moved is just two different reports side by side.",
        output: "A dated baseline, per distributor and per category",
        panel: {
          kind: "rows",
          caption: "Baseline set",
          rows: [
            { label: "Domains under monitoring", value: "41", state: "ok" },
            { label: "Product records in baseline", value: "68,300", state: "ok" },
            { label: "Rival brands tracked", value: "17", state: "ok" },
            { label: "Categories tracked", value: "38", state: "ok" },
          ],
        },
      },
      {
        n: "02",
        title: "We re-crawl on your cadence",
        icon: "timer",
        body:
          "Monthly as standard, weekly or quarterly where it suits the market. The crawl is the same one, at the same rate, against the same pages. Most of the cost of the first run was resolution, and resolution is cached permanently, so a recurring run is a fraction of it.",
        output: "A fresh read of every monitored domain, on schedule",
        panel: {
          kind: "bars",
          caption: "Cost per run, indexed to the first",
          bars: [
            { label: "First run", value: 100, muted: true },
            { label: "Month two", value: 31 },
            { label: "Month three", value: 24 },
          ],
        },
      },
      {
        n: "03",
        title: "We diff it, and only report what moved",
        icon: "compare",
        body:
          "Lines added and dropped, catalogs launched, competitor brands arriving and leaving, categories expanding and contracting, distributors gone dark. A monthly report that restates the whole channel is a report nobody opens by month four; this one is short on a quiet month, and that is the point.",
        output: "A change report: additions, removals, and notable shifts",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Baseline", note: "Last month" },
            { label: "Fresh crawl", state: "live" },
            { label: "Differences only", note: "Everything else suppressed" },
          ],
        },
      },
      {
        n: "04",
        title: "Critical changes alert you immediately",
        icon: "gate",
        body:
          "A distributor going dark and a major competitor brand landing across several accounts do not wait for the end of the month. Those trigger an alert when they are detected. Everything else is deliberately not an alert — a monitoring service that pages you about a price change is one you will mute.",
        output: "Alerts on the changes that cannot wait for the report",
        panel: {
          kind: "rows",
          caption: "Alert rules",
          rows: [
            { label: "Distributor gone dark", value: "Immediate", state: "warn" },
            { label: "Major competitor addition", value: "Immediate", state: "warn" },
            { label: "Your line dropped", value: "Immediate", state: "warn" },
            { label: "Everything else", value: "Monthly report", state: "idle" },
          ],
        },
      },
      {
        n: "05",
        title: "Quarterly, we refresh the full picture",
        icon: "send",
        body:
          "Displacement and whitespace re-run in full, distributor scorecards updated, sales-call briefs regenerated for the accounts being visited, and one strategy review to decide what the trend actually means. Monthly reporting tells you what moved; the quarterly review is where you decide what to do about it.",
        output: "Quarterly refresh, scorecards, briefs and a strategy review",
        panel: {
          kind: "rows",
          caption: "Included each quarter",
          rows: [
            { label: "Displacement and whitespace refresh", value: "Full", state: "ok" },
            { label: "Manufacturer resolutions", value: "Up to 500/mo", state: "ok" },
            { label: "Distributor scorecards", value: "All accounts", state: "ok" },
            { label: "Strategy review", value: "One per quarter", state: "ok" },
          ],
        },
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "distributor-qualification",
    name: "Distributor Qualification",
    title: "Distributor Qualification",
    standfirst:
      "Before you sign them: what a prospective distributor actually publishes, what they run it on, and which brands they already carry.",
    summary:
      "Per domain, on demand. Diligence on the half of a distributor you can check yourself.",
    problem:
      "A prospective distributor is evaluated on the meeting, the territory, the references and the forecast. The one thing nobody checks is the thing every customer will see first: what they publish. Whether their catalog has four hundred products or forty thousand. Whether it carries part numbers at all. Whether they could take a product feed or co-branded imagery from you if you sent one. Whether they already list three of your competitors in the categories you are about to hand them.",
    definition:
      "A single-domain crawl and report on a prospective distributor, run on demand. Catalog depth and product range, platform and technical maturity, whether the site could carry a product data feed or co-branded imagery, competitive brand presence, and digital readiness signals — ending in a go/no-go recommendation and a list of integration requirements if you proceed.",
    shape: [
      { label: "Scope", value: "One domain, per unit" },
      { label: "Crawl time", value: "Roughly ten minutes" },
      { label: "Timeline", value: "2–3 business days" },
      { label: "Investment", value: "Per unit, on demand" },
    ],
    showcase: {
      blurb:
        "Ten minutes of crawl time answers what a reference call cannot: how deep their catalog really is, whether it is structured enough to take your data, and which competitor brands are already on the shelf you are being offered.",
      panel: {
        kind: "rows",
        caption: "Prospect · qualification summary",
        rows: [
          { label: "Catalog depth", value: "8,400 products", state: "ok" },
          { label: "Part numbers published", value: "94%", state: "ok" },
          { label: "Feed-capable platform", value: "Yes — Shopify", state: "ok" },
          { label: "Competitor brands listed", value: "3 in your categories", state: "warn" },
        ],
      },
    },
    processTitle: "How a qualification runs",
    processStandfirst:
      "One domain, four questions, a recommendation. It is short by design — this sits inside a decision you are already making, not alongside a project.",
    process: [
      {
        n: "01",
        title: "One domain, on demand",
        icon: "target",
        body:
          "You send a domain when a prospect reaches the stage where it matters. No scoping call, no minimum, no waiting for a monitoring cycle. Roughly ten minutes of crawl time, and a report inside two to three business days.",
        output: "A single-domain crawl, started the day you ask",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Domain submitted", state: "live" },
            { label: "Crawled", note: "~10 minutes" },
            { label: "Report in 2–3 days" },
          ],
        },
      },
      {
        n: "02",
        title: "We measure the catalog they actually publish",
        icon: "compare",
        body:
          "Depth, range, and how much structure is in it: are there part numbers, brands, categories and prices on the page, or is it a PDF and a phone number? Range tells you what territory they really cover; structure tells you what any future data relationship would have to work with.",
        output: "Catalog depth, product range and data structure",
        panel: {
          kind: "rows",
          caption: "Catalog",
          rows: [
            { label: "Products published", value: "8,400", state: "ok" },
            { label: "Categories covered", value: "22", state: "ok" },
            { label: "Part numbers on page", value: "94%", state: "ok" },
            { label: "Prices published", value: "12%", state: "idle" },
          ],
        },
      },
      {
        n: "03",
        title: "We check whether they could carry your data at all",
        icon: "plug",
        body:
          "Platform, technical maturity, and whether the site could accept a product data feed or co-branded imagery. This is the question that decides whether the partnership is a catalog listing or a shrug, and it is answerable before the contract rather than six months into it.",
        output: "Integration requirements, or the reason there are none",
        panel: {
          kind: "rows",
          caption: "Technical readiness",
          rows: [
            { label: "Platform", value: "Shopify", state: "ok" },
            { label: "Product feed capable", value: "Yes", state: "ok" },
            { label: "Co-branded imagery supported", value: "Yes", state: "ok" },
            { label: "Structured attributes", value: "Partial", state: "warn" },
          ],
        },
      },
      {
        n: "04",
        title: "We check whose brands are already on the shelf",
        icon: "audience",
        body:
          "Which competitor brands they list, in which of your categories, and how deep. A prospect already carrying two rivals in your core category is not disqualified — but it is a different negotiation, and you should be having it knowingly.",
        output: "Competitive brand presence, by category",
        panel: {
          kind: "bars",
          caption: "Rival presence in your categories",
          bars: [
            { label: "Suspension", value: 64, note: "Two rivals" },
            { label: "Brakes", value: 38 },
            { label: "Hangers", value: 0, note: "Open" },
          ],
        },
      },
      {
        n: "05",
        title: "You get a go, a no-go, and the reasons",
        icon: "approve",
        body:
          "A recommendation with the evidence under it, plus the integration requirements if you proceed. It does not replace commercial judgement about the territory or the people — it removes the part of the decision that was being taken on faith when it could have been checked.",
        output: "A qualification report with a go/no-go recommendation",
        panel: {
          kind: "rows",
          caption: "Recommendation",
          rows: [
            { label: "Digital readiness", value: "Strong", state: "ok" },
            { label: "Category fit", value: "Partial overlap", state: "warn" },
            { label: "Integration effort", value: "Low", state: "ok" },
            { label: "Recommendation", value: "Proceed, with terms", state: "ok" },
          ],
        },
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * The markets we name, for structured data only. The site itself says who it
 * is for in content/manufacturing.ts (`industries`), which carries a line of
 * copy per segment; this is the bare list schema.org wants as an audience.
 */
export const industries = [
  { name: "Heavy equipment, mining and construction manufacturers" },
  { name: "Oil, gas and energy equipment manufacturers" },
  { name: "Heavy-duty truck, trailer and passenger vehicle aftermarket" },
  { name: "Power transmission, hydraulics, pneumatics and bearings" },
  { name: "Electrical, automation, HVAC and industrial MRO" },
  { name: "Agricultural machinery and equipment manufacturers" },
] as const;
