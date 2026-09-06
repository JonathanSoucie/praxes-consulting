/**
 * What you buy: five offers, from the copy deck's Services and Offers.
 *
 * The capability areas — part intelligence, RFQ automation, catalog, ERP,
 * export, obsolescence — are in content/manufacturing.ts and appear as the
 * solutions around the black hole on Home. This file is a level down from
 * those: the engagements themselves, each scoped to one workflow with
 * success measures agreed before it starts.
 *
 * Each `process` array is the spine of its page: a sticky visual on one
 * side, the steps on the other, the visual changing as each step becomes the
 * live one. See components/process/process-steps.tsx. The steps follow the
 * deck's own method — connect, normalize, automate, approve, improve —
 * specialised to the workflow the offer covers.
 *
 * ⚠️ The panel figures throughout are illustrative of shape, not measured
 * client results. Replace them with real ones as engagements complete.
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
    slug: "part-intelligence-pilot",
    name: "Part Intelligence Pilot",
    title: "The Part Intelligence Pilot",
    standfirst:
      "One product family, turned into a trusted product identity layer — so a number, a description, a drawing or a photo returns the right part with the evidence behind it.",
    summary:
      "For teams losing time to part search, cross-reference gaps, supersessions and wrong-part requests.",
    problem:
      "A customer arrives with an old OEM number, a machine model, a serial, a drawing reference or a photograph. The correct part is in your ERP. What is not in your ERP is the relationship that connects what they said to what you sell — fitment, equivalencies, replacements, supersessions — because those live in disconnected spreadsheets, in supplier files, and in the heads of people who have been there fifteen years. So the search depends on who happens to be at the desk, and the cost is wrong-part returns, delayed repairs, support tickets and lost orders.",
    definition:
      "A scoped pilot on one product family of roughly 5,000 to 25,000 active part records. We connect two to five trusted source datasets, resolve the identifiers into governed relationships, and put ranked matching with evidence and confidence in front of one high-volume request channel. The ERP connection is read-only, and every new fitment or interchangeability decision is approved by your people before it becomes part of the record.",
    shape: [
      { label: "Scope", value: "One product family" },
      { label: "Records", value: "5,000–25,000 active parts" },
      { label: "ERP access", value: "Read-only" },
      { label: "Measured on", value: "Search time, unmatched RFQs, wrong-part rate" },
    ],
    showcase: {
      blurb:
        "A number, a description, a drawing or a photo goes in. Ranked candidates come back, each carrying the evidence it was matched on and a confidence level — and the pairs your engineers have ruled out stay ruled out.",
      panel: {
        kind: "rows",
        caption: "Search — customer sent \"1R0750, old Cat filter\"",
        rows: [
          { label: "1R-0750 · exact replacement", value: "98%", state: "ok" },
          { label: "P551313 · approved alternate", value: "91%", state: "ok" },
          { label: "LF3970 · competitor cross-ref", value: "84%", state: "ok" },
          { label: "1R-0716 · non-interchangeable", value: "Blocked", state: "warn" },
        ],
      },
    },
    processTitle: "How the pilot runs",
    processStandfirst:
      "Connect, normalize, automate, approve, improve. The order matters: nothing is matched until the identifiers are governed, and nothing is written back until a person has approved it.",
    process: [
      {
        n: "01",
        title: "We connect the sources that already hold the answer",
        icon: "plug",
        body:
          "The ERP, the WMS, supplier files, cross-reference spreadsheets, PDFs and drawings. Read-only, so nothing about the pilot can change your system of record. Most of what a pilot needs is already in the business — the problem was never that the data does not exist, it is that no two copies of it agree.",
        output: "A connected, read-only view of every source that holds part data",
        panel: {
          kind: "rows",
          caption: "Sources connected",
          rows: [
            { label: "ERP part master", value: "Read-only", state: "ok" },
            { label: "Supplier cross-reference", value: "4 files", state: "ok" },
            { label: "Legacy dealer list", value: "Spreadsheet", state: "ok" },
            { label: "Drawings and PDFs", value: "Unstructured", state: "warn" },
          ],
        },
      },
      {
        n: "02",
        title: "We normalize the identifiers into governed relationships",
        icon: "branches",
        body:
          "OEM, aftermarket, supplier, competitor, legacy and customer numbers, resolved into typed relationships — exact replacement, alternate, kit, component, and explicitly non-interchangeable. That last one is the important one. A system that only records what fits, and never records what does not, will confidently recommend the thing you learned the hard way not to ship.",
        output: "A typed relationship graph, with non-interchangeable pairs recorded",
        panel: {
          kind: "rows",
          caption: "Relationship types resolved",
          rows: [
            { label: "Exact replacement", value: "8,410", state: "ok" },
            { label: "Alternate", value: "3,120", state: "ok" },
            { label: "Superseded by", value: "1,640", state: "ok" },
            { label: "Non-interchangeable", value: "290", state: "warn" },
          ],
        },
      },
      {
        n: "03",
        title: "We turn any starting point into a ranked match",
        icon: "target",
        body:
          "A number, a description, a model, a serial range, a nameplate photo, a drawing or a spreadsheet goes in. Ranked candidates come back, each carrying the evidence it was matched on and a confidence level. Evidence is not decoration: a parts person will not act on a match they cannot check, and they are right not to.",
        output: "Ranked matches with evidence and confidence, on one request channel",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Photo or number in", state: "live" },
            { label: "Candidates ranked", note: "With evidence" },
            { label: "Confidence scored", note: "Below threshold → queue", state: "flag" },
          ],
        },
      },
      {
        n: "04",
        title: "Your people approve anything uncertain",
        icon: "approve",
        body:
          "Above the confidence threshold, a match is offered with its evidence. Below it, or anywhere the part is safety-critical, it goes to a review queue instead of being guessed at. New fitment and interchangeability decisions are made by your technical people, and the decision is recorded with who made it and why.",
        output: "A review queue, and an auditable history of every decision",
        panel: {
          kind: "rows",
          caption: "This week's queue",
          rows: [
            { label: "Auto-matched, above threshold", value: "86%", state: "ok" },
            { label: "Routed for review", value: "11%", state: "idle" },
            { label: "Safety-critical, always reviewed", value: "3%", state: "warn" },
          ],
        },
      },
      {
        n: "05",
        title: "We measure it against the numbers we agreed",
        icon: "measure",
        body:
          "Search time, unmatched RFQs, quote turnaround, wrong-part rate and returns — the same definitions before and after, because a measure invented at the end of a pilot can be made to say anything. If the numbers do not move, that is the finding, and you get it in writing.",
        output: "Before-and-after on the measures agreed at the start",
        panel: {
          kind: "bars",
          caption: "Pilot measures, before and after",
          bars: [
            { label: "Time to identify a part", value: 34, note: "Was 100" },
            { label: "Unmatched RFQ lines", value: 41, note: "Was 100" },
            { label: "Wrong-part returns", value: 55, note: "Was 100" },
          ],
        },
      },
    ],
    examplesTitle: "What is in the layer",
    examplesStandfirst:
      "The relationships and intake paths a parts business actually needs, rather than a search box over a product table.",
    examples: [
      {
        title: "Cross-reference and supersession",
        body: "OEM to aftermarket, competitor to yours, and the chain of what replaced what — including the discontinued numbers customers still ask for by name.",
        points: [
          "OEM and aftermarket cross-reference",
          "Supersession and obsolescence mapping",
          "Private-label and legacy numbers",
        ],
      },
      {
        title: "Fitment and application",
        body: "The relationship between a machine and a part, so a model, a serial range or a VIN narrows to what actually fits rather than what sounds similar.",
        points: [
          "Model, serial and VIN matching",
          "Serial-aware replacements",
          "Explicitly non-interchangeable pairs",
        ],
      },
      {
        title: "Intake from whatever arrives",
        body: "Requests do not arrive as clean part numbers. They arrive as a photo of a nameplate, a page of a parts book, or a line in a spreadsheet.",
        points: [
          "Photo, nameplate and drawing intake",
          "PDF and spreadsheet parsing",
          "Free-text and local descriptions",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "rfq-to-quote-pilot",
    name: "RFQ-to-Quote Pilot",
    title: "The RFQ-to-Quote Pilot",
    standfirst:
      "Your highest-volume RFQ channel, turned into reviewable quote drafts — extraction, matching, availability, price and lead time in one workflow.",
    summary:
      "For sales teams processing high volumes of email, PDF or spreadsheet RFQs.",
    problem:
      "RFQs arrive through email, PDFs, spreadsheets, portals and messaging apps. Your team interprets the request, identifies the part, searches several systems for availability and price, checks whether an alternative would do, and assembles the quote by hand. It is skilled work, and almost none of it is the skill you hired them for. Meanwhile the competitor who answered in an hour wins the order you had in stock.",
    definition:
      "A pilot on one high-volume RFQ channel. We extract the request into structured intake, match the lines against your part data, retrieve stock, price, lead time and customer terms from the ERP, and prepare a quote draft for your sales team to review and send. The handoff back to the ERP is controlled, and exceptions route to a person rather than being filled in with a guess.",
    shape: [
      { label: "Scope", value: "One high-volume RFQ channel" },
      { label: "Intake", value: "Email, portal, PDF, spreadsheet" },
      { label: "ERP handoff", value: "Controlled, after review" },
      { label: "Measured on", value: "Time to first quote, manual touches, exception rate" },
    ],
    showcase: {
      blurb:
        "The request is read as it arrives, its lines matched and priced from your ERP, and a draft assembled for your salesperson to edit and send. Anything it is unsure of waits in a queue with the reason attached.",
      panel: {
        kind: "flow",
        nodes: [
          { label: "RFQ arrives", note: "Email, PDF, portal", state: "live" },
          { label: "14 lines extracted", note: "Part, qty, date, destination" },
          { label: "Draft ready to send", note: "1 line held for review", state: "flag" },
        ],
      },
    },
    processTitle: "How the pilot runs",
    processStandfirst:
      "The request is structured before anything is matched, and the quote is drafted rather than sent — because the last judgement on a price belongs to the person whose name is on it.",
    process: [
      {
        n: "01",
        title: "We take the channel as it actually arrives",
        icon: "plug",
        body:
          "One channel, whichever is highest volume: the shared sales inbox, the portal export, the spreadsheet a distributor sends every Monday. We do not ask customers to change how they submit requests. A workflow that only works when the input is tidy is a workflow that does not work.",
        output: "Structured intake from the channel you already receive on",
        panel: {
          kind: "rows",
          caption: "Intake, last 30 days",
          rows: [
            { label: "Email with PDF attached", value: "412", state: "ok" },
            { label: "Spreadsheet", value: "180", state: "ok" },
            { label: "Portal export", value: "96", state: "ok" },
            { label: "Free-text in message body", value: "74", state: "warn" },
          ],
        },
      },
      {
        n: "02",
        title: "We extract what the request actually says",
        icon: "compare",
        body:
          "Part details, quantities, deadlines, destinations and customer terms, pulled into a structured record. This is where most of the manual reading goes, and it is the step that decides everything downstream — a quantity read wrong at intake is a quantity wrong on the quote, the order and the shipment.",
        output: "Every line structured, with the source text kept beside it",
        panel: {
          kind: "flow",
          nodes: [
            { label: "RFQ arrives", state: "live" },
            { label: "Lines extracted", note: "Part, qty, date, destination" },
            { label: "Source text retained", note: "For checking" },
          ],
        },
      },
      {
        n: "03",
        title: "We match lines and price them from your systems",
        icon: "calculator",
        body:
          "Each line matched to likely parts and approved alternatives, then stock, price, lead time and the customer's own terms retrieved from the ERP. Alternatives are offered where they are approved and suppressed where they are not — the system never proposes a substitute your engineers have not signed off.",
        output: "Priced lines with availability, lead time and approved alternatives",
        panel: {
          kind: "rows",
          caption: "Quote lines, assembled",
          rows: [
            { label: "Matched and in stock", value: "68%", state: "ok" },
            { label: "Approved alternative offered", value: "17%", state: "ok" },
            { label: "Lead time from supplier", value: "9%", state: "idle" },
            { label: "No confident match", value: "6%", state: "warn" },
          ],
        },
      },
      {
        n: "04",
        title: "Your team reviews and sends",
        icon: "approve",
        body:
          "The draft arrives with its evidence: what was read, what it matched, where the price came from. Your salesperson edits, approves and sends. Exceptions — an unmatched line, a price outside the usual band, an unfamiliar destination — sit in a queue with a reason attached rather than being quietly filled in.",
        output: "A reviewed quote out the door, and an exception queue with reasons",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Draft prepared", state: "live" },
            { label: "Salesperson reviews", note: "Edits and approves" },
            { label: "Controlled ERP handoff", note: "After approval" },
          ],
        },
      },
      {
        n: "05",
        title: "We measure the turnaround, not the technology",
        icon: "measure",
        body:
          "Time to first quote, quote-win rate, exception rate and manual touches per RFQ. Manual touches is the honest one: it is the measure that gets worse if the automation is producing work rather than removing it, which is exactly the failure a demo will not show you.",
        output: "Before-and-after on the measures agreed at the start",
        panel: {
          kind: "bars",
          caption: "Pilot measures, before and after",
          bars: [
            { label: "Time to first quote", value: 28, note: "Was 100" },
            { label: "Manual touches per RFQ", value: 36, note: "Was 100" },
            { label: "Quotes sent same day", value: 100, note: "Was 44" },
          ],
        },
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "catalog-intelligence-program",
    name: "Catalog Intelligence Program",
    title: "The Catalog Intelligence Program",
    standfirst:
      "Supplier files, drawings and documentation turned into governed product records — complete, consistent, and publish-ready on every channel you sell through.",
    summary:
      "For manufacturers and distributors with incomplete online catalogs or inconsistent channel data.",
    problem:
      "New SKUs, supplier changes, technical PDFs, product variants and distributor requirements arrive faster than manual data entry can absorb them. Products sit in the ERP and never reach the website or the distributor network with complete attributes, images, fitment or specifications. Worse, the same part carries different names, numbers, attributes and prices across ERP, PIM, e-commerce and distributor channels, so customers see something outdated while your team spends its week reconciling records instead of selling.",
    definition:
      "An ongoing program, not a one-off cleanup. We ingest supplier data and documents, extract technical attributes and map them to your taxonomy, find the duplicates and the gaps, and publish governed records out to your website, PIM, marketplaces and distributor channels — then keep watching, because a catalog is only ever correct as of a date.",
    shape: [
      { label: "Shape", value: "Program, with a defined first scope" },
      { label: "Inputs", value: "Supplier files, drawings, PDFs, ERP" },
      { label: "Outputs", value: "Website, PIM, marketplaces, distributors" },
      { label: "Measured on", value: "Publish-ready SKU rate, completeness, coverage" },
    ],
    showcase: {
      blurb:
        "Supplier files and technical documents become governed product records in your own taxonomy, then go out to every channel in the shape that channel requires — and anything that fails your rules is held back with the reason.",
      panel: {
        kind: "bars",
        caption: "Publish-ready records, by channel",
        bars: [
          { label: "Website", value: 94 },
          { label: "PIM", value: 97 },
          { label: "Distributor feed", value: 88 },
          { label: "Marketplace", value: 76, note: "Needs 3 attributes" },
        ],
      },
    },
    processTitle: "How the program runs",
    processStandfirst:
      "Ingest, extract, reconcile, publish, monitor. The last one is what separates a program from a cleanup — the catalog goes out of date the day after it is finished.",
    process: [
      {
        n: "01",
        title: "We ingest the supplier data and the documents",
        icon: "plug",
        body:
          "Price files, product spreadsheets, technical PDFs, drawings and datasheets, in whatever form each supplier sends them. Suppliers do not standardise for you, and waiting for them to is how a catalog stays five years behind the products it describes.",
        output: "Every supplier input landing in one place, in a known state",
        panel: {
          kind: "rows",
          caption: "Supplier inputs",
          rows: [
            { label: "Structured price file", value: "12 suppliers", state: "ok" },
            { label: "Spreadsheet, non-standard", value: "31 suppliers", state: "warn" },
            { label: "PDF catalog only", value: "18 suppliers", state: "warn" },
          ],
        },
      },
      {
        n: "02",
        title: "We extract attributes and map them to your schema",
        icon: "branches",
        body:
          "Technical attributes pulled out of the files and the documents, then normalized to your own taxonomy rather than to whatever each supplier happened to call them. Thread pitch, voltage, material, pressure rating — the fields a customer actually filters on, in your names for them.",
        output: "Structured attributes in your taxonomy, not each supplier's",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Supplier file", state: "live" },
            { label: "Attributes extracted", note: "From text and tables" },
            { label: "Mapped to your schema", note: "One vocabulary" },
          ],
        },
      },
      {
        n: "03",
        title: "We find the duplicates, the gaps and the disagreements",
        icon: "compare",
        body:
          "Records that are the same product under two numbers, records missing the attributes a channel requires, and the places where the ERP, the PIM and a distributor's copy disagree about the same part. This step produces a list your team can act on whether or not anything else is automated.",
        output: "A ranked list of duplicates, gaps and channel disagreements",
        panel: {
          kind: "rows",
          caption: "Catalog health",
          rows: [
            { label: "SKUs publish-ready", value: "41%", state: "warn" },
            { label: "Missing required attributes", value: "3,880", state: "warn" },
            { label: "Probable duplicates", value: "612", state: "warn" },
            { label: "Channel disagreements", value: "1,140", state: "warn" },
          ],
        },
      },
      {
        n: "04",
        title: "We publish governed records to every channel",
        icon: "send",
        body:
          "Records that pass your rules go out to the website, the PIM, the marketplaces and the distributor feeds, formatted the way each channel requires and translated where the market needs it. Records that do not pass stay back with the reason attached — publishing an incomplete record is how a channel learns to distrust your feed.",
        output: "Publish-ready records live on each channel, in its own format",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Passes your rules", state: "live" },
            { label: "Formatted per channel", note: "Website, PIM, marketplace" },
            { label: "Held back with reason", note: "If incomplete", state: "flag" },
          ],
        },
      },
      {
        n: "05",
        title: "We keep watching it",
        icon: "measure",
        body:
          "Publish-ready SKU rate, data completeness, search conversion and catalog coverage, tracked continuously — plus gap and whitespace analysis against what competitors list and what your distributors are asking for and not getting.",
        output: "A monitored catalog, and a standing list of what is missing",
        panel: {
          kind: "bars",
          caption: "Publish-ready rate, by quarter",
          bars: [
            { label: "At start", value: 41, muted: true },
            { label: "Quarter one", value: 68 },
            { label: "Quarter two", value: 86 },
          ],
        },
      },
    ],
    examplesTitle: "What the program covers",
    examplesStandfirst:
      "The work that keeps a catalog sellable, rather than the one-time cleanup that leaves it correct for a month.",
    examples: [
      {
        title: "Enrichment and normalization",
        body: "Attributes extracted from files and documents, normalized to your schema, and filled out to the completeness each channel demands.",
        points: [
          "Attribute extraction from PDFs and drawings",
          "Taxonomy mapping and structured enrichment",
          "Multilingual descriptions and channel formatting",
        ],
      },
      {
        title: "Distributor synchronization",
        body: "Your distributors' copies of your catalog, kept in step with yours, and monitored for the places they have drifted.",
        points: [
          "Distributor catalog sync",
          "Channel disagreement detection",
          "Publish-ready SKU monitoring",
        ],
      },
      {
        title: "Gap and whitespace analysis",
        body: "What is missing, what is duplicated, and what your competitors list that you could sell but do not show.",
        points: [
          "Duplicate and incomplete record detection",
          "Catalog gap and competitor analysis",
          "Coverage by channel and market",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "export-operations-automation",
    name: "Export Operations Automation",
    title: "Export Operations Automation",
    standfirst:
      "Invoices, packing lists and transport documents checked against each other and against the ERP, so discrepancies are caught before the shipment reaches the border.",
    summary:
      "For exporters managing recurring document exceptions, broker back-and-forth, or multi-country shipments.",
    problem:
      "Commercial invoices, packing lists, transport documents, origin evidence, certificates, quantities, weights, values and Incoterms all have to agree with each other and with the order. They are assembled by hand from fragmented shipment data, which is why the same three fields cause the same exceptions every month. The cost is not the correction — it is the shipment holds, the demurrage, the expedite fees, the broker back-and-forth and the audit exposure that follow it.",
    definition:
      "We extract, generate and compare shipment data across invoices, packing lists, bills of lading, certificates, purchase orders and ERP records, and apply cross-document consistency rules before anything is handed to your broker or carrier. Missing or inconsistent fields are flagged as exceptions with the discrepancy named, so the fix happens at your desk rather than at the border.",
    shape: [
      { label: "Scope", value: "One shipment lane or document set" },
      { label: "Documents", value: "Invoice, packing list, transport, certificates" },
      { label: "Checks", value: "Origin, HS code, Incoterms, quantity, weight, value" },
      { label: "Measured on", value: "Document-error rate, exception volume, clearance delays" },
    ],
    showcase: {
      blurb:
        "Every document in the set is compared against the others and against the order. Where two that must agree do not, the shipment stops at your desk with both sources named — rather than at the border.",
      panel: {
        kind: "rows",
        caption: "Shipment DE-4471 · pre-broker check",
        rows: [
          { label: "Line quantities · invoice vs packing list", value: "Match", state: "ok" },
          { label: "Gross weight · packing list vs BOL", value: "12kg apart", state: "warn" },
          { label: "HS code · vs product record", value: "Match", state: "ok" },
          { label: "Incoterm · vs order terms", value: "Match", state: "ok" },
        ],
      },
    },
    processTitle: "How it runs",
    processStandfirst:
      "Every check is a comparison. The system does not decide what is correct — it finds the places where two documents that must agree do not, and says which two.",
    process: [
      {
        n: "01",
        title: "We take in the whole document set",
        icon: "plug",
        body:
          "Commercial invoice, packing list, transport documents, certificates, the purchase order and the ERP shipment record. All of it, together — a document validated on its own is a document validated against nothing, which is exactly how the current process fails.",
        output: "One shipment record holding every document and the ERP data",
        panel: {
          kind: "rows",
          caption: "Shipment record",
          rows: [
            { label: "Commercial invoice", value: "Parsed", state: "ok" },
            { label: "Packing list", value: "Parsed", state: "ok" },
            { label: "Bill of lading", value: "Parsed", state: "ok" },
            { label: "Certificate of origin", value: "Missing", state: "warn" },
          ],
        },
      },
      {
        n: "02",
        title: "We apply the cross-document rules",
        icon: "compare",
        body:
          "Quantities against quantities, weights against weights, values against values, origin against the evidence, HS codes against the product, and Incoterms against the agreed terms. Each rule names the two places it compared, so a flag is something a person can check in seconds rather than an alert they learn to dismiss.",
        output: "Every mismatch named, with both sources cited",
        panel: {
          kind: "rows",
          caption: "Consistency checks",
          rows: [
            { label: "Line quantities: invoice vs packing list", value: "Match", state: "ok" },
            { label: "Gross weight: packing list vs BOL", value: "12kg apart", state: "warn" },
            { label: "HS code vs product record", value: "Match", state: "ok" },
            { label: "Incoterm vs order terms", value: "Match", state: "ok" },
          ],
        },
      },
      {
        n: "03",
        title: "Exceptions go to a person, with the reason",
        icon: "gate",
        body:
          "A shipment that fails a rule stops at your desk, not at the port. The exception says which documents disagree and by how much, which is the difference between a queue your export team works through and a queue they start ignoring.",
        output: "An exception queue with the discrepancy stated on each item",
        panel: {
          kind: "flow",
          nodes: [
            { label: "All rules pass", note: "Straight through" },
            { label: "Rule fails", note: "Held with reason", state: "flag" },
            { label: "Corrected and re-checked", state: "live" },
          ],
        },
      },
      {
        n: "04",
        title: "The validated set goes to the broker",
        icon: "send",
        body:
          "Handoff happens once the set is internally consistent and the evidence is attached — certificates, SDS, inspection reports. The record of what was checked, when, and by whom stays with the shipment, which is what an audit asks for and what nobody has time to reconstruct afterwards.",
        output: "An audit-ready shipment record, handed off clean",
        panel: {
          kind: "rows",
          caption: "Handoff package",
          rows: [
            { label: "Documents", value: "Consistent", state: "ok" },
            { label: "Evidence attached", value: "Certificates, SDS", state: "ok" },
            { label: "Check history", value: "Retained", state: "ok" },
          ],
        },
      },
      {
        n: "05",
        title: "We measure the exceptions down",
        icon: "measure",
        body:
          "Document-error rate, exception volume, clearance delays and rework time. The useful pattern is which rule fires most: recurring exceptions are almost never carelessness, they are a step upstream that makes the error easy to produce, and that is the thing worth fixing.",
        output: "Exception trend, and the upstream cause behind the top rules",
        panel: {
          kind: "bars",
          caption: "Exceptions per 100 shipments",
          bars: [
            { label: "Before", value: 100, muted: true },
            { label: "Month one", value: 61 },
            { label: "Month three", value: 24 },
          ],
        },
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "integration-and-managed-operations",
    name: "Integration & Managed Operations",
    title: "Integration and Managed Operations",
    standfirst:
      "For teams ready to scale past a pilot: workflow design, integration, deployment, data stewardship, monitoring and managed catalog operations.",
    summary:
      "For teams past the pilot stage, scaling to more products, channels and markets.",
    problem:
      "A pilot that works creates a different problem. The workflow now has to hold across more product families, more channels and more markets; the integration has to move from read-only to controlled write-back; someone has to steward the data as suppliers and systems change; and somebody has to be watching when a supplier changes a file format on a Tuesday. Without that, the return a pilot proved quietly decays, and nobody notices until a customer does.",
    definition:
      "The ongoing engagement: we design the workflows, build and run the integration layer, deploy across the systems and sites that need it, steward the data, monitor what is running, and operate the catalog where you want that carried. You retain ownership of your enriched data and remain in control of every approval decision — this is operations support, not a licence you have to keep buying to keep your own data.",
    shape: [
      { label: "Shape", value: "Ongoing engagement" },
      { label: "Integration", value: "Read-only, then controlled write-back" },
      { label: "You own", value: "Your enriched data and every approval" },
      { label: "Measured on", value: "Workflow adoption, exception rates, data completeness" },
    ],
    showcase: {
      blurb:
        "Past the pilot, someone has to own the integration layer, steward the data as suppliers and systems change, and watch the numbers. That is this — with every approval decision still yours.",
      panel: {
        kind: "rows",
        caption: "Month three · against the agreed baseline",
        rows: [
          { label: "Workflow adoption", value: "88%", state: "ok" },
          { label: "Data completeness", value: "94%", state: "ok" },
          { label: "Exception rate", value: "3.1%", state: "ok" },
          { label: "Supplier format changes absorbed", value: "7", state: "ok" },
        ],
      },
    },
    processTitle: "How the engagement runs",
    processStandfirst:
      "Expansion is sequenced the same way the first pilot was: connect, normalize, automate, approve, improve — one new workflow or market at a time, against measures agreed before it starts.",
    process: [
      {
        n: "01",
        title: "We design the next workflow before building it",
        icon: "route",
        body:
          "Which workflow, which product family, which market, and what it has to beat. A pilot earns the right to expand; it does not earn the right to expand everywhere at once. The sequence is chosen on what the measurement said, not on what is technically nearest to hand.",
        output: "A sequenced roadmap with a measure attached to each step",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Proven pilot", state: "live" },
            { label: "Next workflow scoped", note: "With its own measures" },
            { label: "Then the next market", state: "idle" },
          ],
        },
      },
      {
        n: "02",
        title: "We build the integration layer properly",
        icon: "plug",
        body:
          "Around SAP ECC or S/4HANA, Oracle E-Business Suite, NetSuite, Infor, Epicor, the WMS, the PIM, the CRM and the legacy dealer system — whichever of those you run. Read-only first. Controlled write-back once the approvals are in place. RPA where an API does not exist, which on legacy systems is more often than vendors admit.",
        output: "A secure integration layer, with your ERP still the system of record",
        panel: {
          kind: "rows",
          caption: "Integration posture",
          rows: [
            { label: "ERP read", value: "Live", state: "ok" },
            { label: "Write-back", value: "After approval", state: "ok" },
            { label: "Legacy dealer system", value: "RPA", state: "idle" },
            { label: "Master data", value: "Harmonized across sites", state: "ok" },
          ],
        },
      },
      {
        n: "03",
        title: "We steward the data as the inputs change",
        icon: "branches",
        body:
          "Suppliers change formats, product lines are discontinued, sites merge their material masters, a distributor asks for a new attribute. Stewardship is the standing work of keeping the structure true as all of that happens, and it is the part that gets dropped first when nobody owns it.",
        output: "Harmonized master data that stays harmonized",
        panel: {
          kind: "rows",
          caption: "Stewardship, this month",
          rows: [
            { label: "Supplier format changes absorbed", value: "7", state: "ok" },
            { label: "Duplicate materials merged", value: "214", state: "ok" },
            { label: "New attributes onboarded", value: "12", state: "ok" },
          ],
        },
      },
      {
        n: "04",
        title: "You keep control of the decisions",
        icon: "approve",
        body:
          "Approval queues, confidence thresholds and audit trails stay with your technical, sales, procurement and compliance teams. We run the system; you decide what it is allowed to conclude. The evidence, the confidence and the decision history are visible to you at every point, including in an audit.",
        output: "Approval queues and audit trails owned by your teams",
        panel: {
          kind: "rows",
          caption: "Control",
          rows: [
            { label: "Fitment approvals", value: "Your engineers", state: "ok" },
            { label: "Price and terms", value: "Your sales team", state: "ok" },
            { label: "Export exceptions", value: "Your compliance team", state: "ok" },
            { label: "Decision history", value: "Retained and exportable", state: "ok" },
          ],
        },
      },
      {
        n: "05",
        title: "We watch it and keep improving it",
        icon: "measure",
        body:
          "Search time, quote speed, data completeness, exception rates, document errors and workflow adoption, monitored continuously. Adoption is the one people skip and the one that predicts everything else: a workflow the team has quietly routed around is not saving anything, however good the other numbers look.",
        output: "Monitoring, with the measures reported rather than assumed",
        panel: {
          kind: "bars",
          caption: "Adoption by workflow",
          bars: [
            { label: "RFQ intake", value: 92 },
            { label: "Part search", value: 84 },
            { label: "Catalog publishing", value: 71 },
            { label: "Export checks", value: 63 },
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
  { name: "Truck, trailer and off-highway parts" },
  { name: "Construction, mining and earthmoving equipment" },
  { name: "Agricultural machinery and implements" },
  { name: "Industrial MRO, automation, electrical, hydraulics and pneumatics" },
  { name: "Marine engines, ship machinery, rail, HVAC and refrigeration" },
] as const;
