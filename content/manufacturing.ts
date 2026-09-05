/**
 * Home page content.
 *
 * All of it comes from the copy deck (website-copy-manufacturing-ai.pdf):
 * the hero, who the firm helps, the pain points that sit inside the black
 * hole, the solution areas arranged around it once the page zooms out, and
 * the reasons under both. Copy only — the scenes that draw these are in
 * components/sections/tunnel-hero.tsx and black-hole-scene.tsx.
 */

/**
 * The hero. One statement, one line under it, nothing else on the screen —
 * the action is in the bar above. Both are the deck's own hero copy.
 */
export const hero = {
  headline: "Find the right part. Quote faster. Ship with the right paperwork.",
  sub: "We connect your ERP, product data, RFQs, distributor catalogs and export documents — so your team can identify the correct part, prepare accurate quotes, and move international orders with confidence.",
} as const;

/** The band under the hero: who this is for, in one line. */
export const dividerLine =
  "Built for equipment-parts manufacturers, aftermarket suppliers and international distributors.";

/**
 * Who we help. The deck's five segments, each with the line from its
 * Industries entry — so the section says what the work is in that market
 * rather than only naming the market.
 */
export const industries = [
  {
    name: "Truck, trailer and off-highway",
    body: "Connect OEM and aftermarket references, improve distributor catalog coverage, accelerate RFQs, and prepare export-ready orders for complex commercial-vehicle portfolios.",
  },
  {
    name: "Construction, mining and earthmoving",
    body: "Identify parts across mixed fleets, drawings, OEM numbers, serial ranges and new, rebuilt or used alternatives — then turn urgent downtime requests into controlled sourcing and quotes.",
  },
  {
    name: "Agricultural machinery",
    body: "Help dealers and parts teams identify serial-aware replacements during seasonal peaks, while connecting old part numbers, fitment, supplier availability and export workflows.",
  },
  {
    name: "Industrial MRO, power, oil and gas",
    body: "Harmonize material masters across sites, identify critical spares and duplicates, link certificates and supplier identifiers, and enable approved alternatives before a stockout becomes downtime.",
  },
  {
    name: "Marine, rail and port equipment",
    body: "Turn urgent requests involving maker, model, serial, nameplate, photo and condition into a documented sourcing and quote workflow for port delivery and international shipment.",
  },
  {
    name: "Automation, electrical, hydraulics and HVAC",
    body: "Normalize technical attributes, identify discontinued items, extract datasheets, manage compatible alternatives, and make product data available to sales, maintenance and distributor channels.",
  },
] as const;

/** The head of the services panel, under the solutions. */
export const servicesSection = {
  eyebrow: "Services",
  title: "Start with one workflow. Prove it. Then scale.",
} as const;

/**
 * Inside the black hole: where the hours go before any of this is connected.
 *
 * Four of the deck's six pain points. The other two — ERP, catalog and
 * distributor data disagreeing, and obsolete parts becoming sourcing
 * emergencies — are argued in the solutions around the hole and on the
 * service pages. Four rather than six because the scene is a sticky panel
 * inside one viewport, and six rows overflow it on a short laptop.
 *
 * `body` is the deck's description; the closing sentence of each is its
 * "Business impact" line, which is what turns a description into stakes.
 */
export const painPoints = [
  {
    n: "01",
    title: "Customers cannot reliably find the right part",
    body: "They search with an old OEM number, a machine model, a serial, a drawing reference or a photo. The part exists in your ERP, but fitment, equivalencies and supersessions live in disconnected files and experienced employees' heads. The cost is wrong-part returns and lost orders.",
  },
  {
    n: "02",
    title: "Sales teams spend too long building quotes",
    body: "RFQs arrive by email, PDF, spreadsheet, portal and messaging app. Someone interprets the request, identifies the part, checks several systems for stock and price, considers alternatives, and assembles the quote by hand. Faster competitors win with your product in stock.",
  },
  {
    n: "03",
    title: "Catalog growth outpaces data operations",
    body: "New SKUs, supplier changes, technical PDFs and distributor requirements arrive faster than anyone can key them in. Products sit in the ERP and never reach the website or the distributor network with complete attributes, images or fitment. Inventory you cannot find is inventory you cannot sell.",
  },
  {
    n: "04",
    title: "Export documents create avoidable delays",
    body: "Invoices, packing lists, transport documents, origin evidence, certificates, weights, values and Incoterms all have to agree. Manual copying across fragmented shipment data produces the exceptions that hold a shipment at the border, and the demurrage and expedite costs that follow.",
  },
] as const;

/**
 * The solution areas, arranged around the hole once the page zooms out.
 *
 * These are the deck's six Solutions — the capability areas. What you buy is
 * a level down from this, in content/services.ts, and the panel under this
 * scene lists those. `label` is what sits on the orbit, so it has to be short
 * enough to read at a small size; `summary` is the hover card.
 *
 * The labels are keyed to icons in components/sections/black-hole-scene.tsx.
 * Renaming one here means renaming it there.
 */
export const solutions = [
  {
    label: "Part intelligence",
    summary: "OEM, aftermarket, legacy and private-label numbers connected into governed relationships.",
    title: "A trusted product identity layer",
    body: "OEM, aftermarket, supplier, competitor, legacy and customer part numbers connected into governed relationships — searchable by number, description, drawing, model, serial range or photo, and answered with ranked matches, evidence and confidence.",
  },
  {
    label: "RFQ automation",
    summary: "An incoming request turned into a reviewable, accurate quote.",
    title: "From request to reviewable quote",
    body: "The important information extracted from an RFQ, likely parts and approved alternatives identified, stock, price, lead time and customer terms retrieved, and a quote prepared for your sales team to review and send.",
  },
  {
    label: "Catalog intelligence",
    summary: "Product data made complete, consistent and publish-ready across every channel.",
    title: "Every product easier to find and sell",
    body: "Technical attributes extracted from supplier files, drawings and documentation, normalized to your schema, checked for what is missing, and published as governed records to your website, PIM, marketplaces and distributor channels.",
  },
  {
    label: "ERP integration",
    summary: "A secure layer around the system of record, not a replacement for it.",
    title: "Better workflow, same system of record",
    body: "A secure integration layer around what you already rely on — SAP, Oracle, NetSuite, Infor, Epicor, WMS, PIM, CRM and legacy dealer systems. Read-only to start, controlled write-back after approval, RPA where the APIs will not reach.",
  },
  {
    label: "Export documents",
    summary: "The shipment validated before it reaches the border.",
    title: "Caught before the border, not at it",
    body: "Shipment data extracted, generated and compared across invoices, packing lists, bills of lading, certificates, purchase orders and ERP records, with missing or inconsistent fields flagged before handoff to your broker or carrier.",
  },
  {
    label: "Obsolescence",
    summary: "Discontinued components traced to technically appropriate, evidenced alternatives.",
    title: "Sourcing options, not guesses",
    body: "Duplicate materials identified, critical spares found, obsolete components traced, and technically appropriate alternatives evaluated with the evidence — fit, condition, certification, availability and lead time — a controlled decision needs.",
  },
] as const;

export type Solution = (typeof solutions)[number];

/**
 * Why us. The deck's four, kept in its order: the argument runs from what we
 * know, to how we work with what you have, to what stops it inventing
 * things, to how an engagement starts.
 */
export const whyManufacturing = [
  {
    title: "Built for parts businesses, not generic workflows",
    body: "We work on the data relationships that decide a parts business: OEM numbers, fitment, supersessions, technical specifications, condition, pricing tiers, stock, certificates and export documentation.",
  },
  {
    title: "Works with the systems you already run",
    body: "Your ERP remains the system of record. We build a practical integration layer around it, starting with low-risk read-only pilots and expanding through controlled approvals.",
  },
  {
    title: "Evidence and human control by design",
    body: "A system should never silently invent a fitment relationship or approve a safety-critical substitute. Source evidence, confidence levels, review steps and auditable decision history are preserved.",
  },
  {
    title: "Start small, prove value, then scale",
    body: "We start with one measurable workflow — OEM cross-reference, RFQ automation, catalog enrichment or export-document validation — and expand once the data and the workflow are trusted.",
  },
] as const;
