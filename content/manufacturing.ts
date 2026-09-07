/**
 * Home page content.
 *
 * All of it comes from the Channel Intelligence copy deck: the hero, who the
 * firm helps, the questions a manufacturer cannot answer today (the pain
 * points inside the black hole), the four layers and six subservices
 * arranged around it once the page zooms out, and the reasons under both.
 * Copy only — the scenes that draw these are in components/sections/hero.tsx
 * and black-hole-scene.tsx.
 */

/**
 * The hero. The name of the thing, a rule, and the account of what it does —
 * nothing else on the screen, because the action is in the bar above.
 */
export const hero = {
  headline: "The Channel & Product Intelligence Engine for Manufacturers",
  /** Under the rule. */
  sub: "Channel Intelligence crawls your distributor network, extracts the catalogs they publish, and converts raw product data into commercial intelligence — with every finding traced to the live listing it came from.",
} as const;

/**
 * Who we help. The deck's client profile, each with the shortest true account
 * of what the channel question looks like in that market.
 *
 * The deck states this as five categories; industrial is split in two here so
 * the grid reads as six cells rather than five and an orphan. A reader either
 * recognises their own business in one line or does not — that is the whole
 * job of this section.
 */
export const industries = [
  {
    name: "Heavy equipment, mining and construction",
    body: "Dealer networks that publish partial catalogs, and rivals who publish more.",
  },
  {
    name: "Oil, gas and energy services",
    body: "Regional distributors, long tails, and coverage nobody has mapped.",
  },
  {
    name: "Heavy-duty truck and trailer aftermarket",
    body: "Crowded categories where displacement happens listing by listing.",
  },
  {
    name: "Passenger vehicle, HVAC and refrigeration",
    body: "High-SKU catalogs where your lines quietly go missing online.",
  },
  {
    name: "Power transmission, hydraulics, pneumatics, bearings",
    body: "Category-level competition you can only see in published data.",
  },
  {
    name: "Electrical, automation and industrial MRO",
    body: "Distributors carrying six brands in a category you thought was yours.",
  },
] as const;

/** The head of the services panel, under the layers. */
export const servicesSection = {
  eyebrow: "Inside Channel Intelligence",
  title: "Start with a census. Then map the channel. Then watch it.",
} as const;

/**
 * Inside the black hole: the questions your channel team cannot answer
 * before a distributor meeting.
 *
 * Four of the deck's "Why This Exists" gaps. Four rather than six because
 * the scene is a sticky panel inside one viewport, and six rows overflow it
 * on a short laptop.
 *
 * Title only — there is no supporting paragraph under these. Each one has to
 * land as a single statement, so it carries the stakes itself rather than
 * setting up a sentence underneath.
 */
export const painPoints = [
  {
    n: "01",
    title: "No accurate data on which distributors actually list your SKUs online",
  },
  {
    n: "02",
    title: "Competitor brands occupy the same distributor e-commerce pages without your reps knowing before sales calls",
  },
  {
    n: "03",
    title: "Incomplete part attributes, cross-references and fitment data cause distributor search engines to hide your products",
  },
  {
    n: "04",
    title: "Competitor brands expand across regional dealer catalogs for months before your team notices",
  },
] as const;

/**
 * The layers and subservices, arranged around the hole once the page zooms
 * out. This is Channel Intelligence broken into its parts.
 *
 * These are the deck's six core services. What you buy is a level down from
 * this, in content/services.ts, and the panel under this scene lists those.
 * Interchange harvesting has no page of its own on purpose: it is held as an
 * asset and licensed, rather than sold as a deliverable.
 *
 * `short` is what sits on the orbit and nowhere else: at the radius the ring
 * gets on a laptop, anything longer than about thirteen characters reaches
 * into the hole at the four diagonal positions. `label` is the full name and
 * still heads the hover card and the small-screen chips; `summary` is the
 * card body.
 *
 * The labels are keyed to icons in components/sections/black-hole-scene.tsx.
 * Renaming one here means renaming it there.
 */
export const solutions = [
  {
    label: "Channel census",
    short: "Census",
    summary: "What in this channel is machine-readable at all — reachability, catalogs, platforms and gates.",
    title: "The map before the campaign",
    body: "Every distributor domain checked for reachability, catalog presence and depth, the platform it runs on, and whether access is restricted by a dealer login, robots.txt or automated-access blocking. It answers a question you cannot answer today, and it costs almost nothing to run.",
  },
  {
    label: "Displacement mapping",
    short: "Displacement",
    summary: "Which competitor brands your distributors carry, in your categories, with the listing as proof.",
    title: "The shelf you are actually on",
    body: "Competing parts per distributor, broken down by product category and rival brand, with every claim linked to the live listing. Category-level concentration is where it bites: one distributor listing 102 air springs, 85 of them a single rival's.",
  },
  {
    label: "Whitespace mapping",
    short: "Whitespace",
    summary: "Categories a distributor stocks from nobody — an opening with no incumbent to dislodge.",
    title: "The easier conversation",
    body: "The inverse of displacement, and usually the easier sales call: no rival to displace, just a category the distributor does not serve. One distributor in our reference set lists zero U-bolts and zero hangers.",
  },
  {
    label: "Change monitoring",
    short: "Monitoring",
    summary: "What moved since last month — lines added or dropped, catalogs launched, distributors gone dark.",
    title: "A standing reason to be in the account",
    body: "Product lines added or dropped, new catalogs launched, distributors gone dark, competitor brands appearing or disappearing, categories expanding or contracting. The resolution cache absorbs most of the work, so a recurring run costs a fraction of the first.",
  },
  {
    label: "Distributor qualification",
    short: "Qualification",
    summary: "Before you sign them, what a prospective distributor actually publishes.",
    title: "Diligence on the digital half",
    body: "Catalog depth and range, platform and technical maturity, whether they could carry a product feed or co-branded imagery, and which competitor brands they already list. One domain, roughly ten minutes of crawl time.",
  },
  {
    label: "Interchange harvesting",
    short: "Interchange",
    summary: "Distributor cross-reference tables, harvested deliberately and mapped to manufacturer part numbers.",
    title: "Held as an asset, not sold as a file",
    body: "Distributors publish competitor cross-reference tables. Harvested deliberately, they map distributor codes to manufacturer part numbers. This compounds across clients, so we build these databases selectively and license access rather than selling raw data.",
  },
] as const;

export type Solution = (typeof solutions)[number];

/**
 * Why us. Four reasons, in the deck's own order of argument: what makes a
 * finding trustworthy, why manual research is not the same thing, why a B2C
 * shelf-analytics platform is not either, and why we state the ceiling first.
 */
export const whyManufacturing = [
  {
    title: "Every claim links to the live listing",
    body: "We store the source URL and a verbatim quote for every value we report. No estimates, no modelled share, no dashboard without a source. Your channel team can click any finding and see the page it came from — which is the difference between intelligence and a slide.",
  },
  {
    title: "Built for B2B distribution, not Amazon",
    body: "Digital shelf platforms are built for CPG brands optimising marketplace listings. We read industrial distributor catalogs — heavy equipment, aftermarket, power transmission, MRO — and report in the form a manufacturer's rep can take into a distributor meeting.",
  },
  {
    title: "Coverage manual research cannot reach",
    body: "A 24-distributor census took one hour of crawling. Doing it by hand takes days, misses the long tail, and happens once. Our monitoring runs every month against the same definitions, so the second report is comparable to the first.",
  },
  {
    title: "We name the ceiling before you find it",
    body: "This measures what distributors publish, not what they sell. Not order volume, not content behind a dealer login, not prices nobody posts. We state those limits up front, because naming the ceiling is what makes the rest credible.",
  },
] as const;
