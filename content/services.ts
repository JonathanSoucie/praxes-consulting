/**
 * Service categories. Each one is framed as problem -> solution -> ROI,
 * because that is how the firm sells: from the bottleneck, not the product.
 *
 * ⚠️ ROI ranges are PLACEHOLDER figures — replace with your own.
 */

export type Service = {
  slug: string;
  title: string;
  /** One-line summary used in the Home page snapshot grid. */
  summary: string;
  /** The bottleneck this addresses, in the client's language. */
  problem: string;
  /** What we actually build. Concrete, not "AI-powered synergy". */
  solution: string;
  /** Typical measured outcome. Keep it a range, keep it honest. */
  roi: string;
  /** Lucide icon name — see components/icon.tsx for the allowed set. */
  icon:
    | "FileStack"
    | "MessagesSquare"
    | "Search"
    | "BarChart3"
    | "Workflow"
    | "ClipboardCheck";
};

export const services: Service[] = [
  {
    slug: "bottleneck-audit",
    title: "AI Bottleneck Audit",
    summary:
      "A measured map of where your hours and margin actually leak — before anyone builds anything.",
    problem:
      "You suspect AI could help somewhere, but nobody has quantified which process is costing you the most, or what fixing it would be worth.",
    solution:
      "We shadow the work, time the steps, and price the waste. You get a bottleneck map ranked by annual cost, a projected ROI model per candidate, and a clear recommendation on what to build first — or whether to build at all.",
    roi: "Delivered as a fixed-fee audit; typically identifies 3–6× its cost in annual recoverable hours.",
    icon: "Search",
  },
  {
    slug: "document-intake",
    title: "Document & Data Intake",
    summary:
      "Turn inbound paperwork into structured, checked data without a person retyping it.",
    problem:
      "Invoices, forms, contracts and statements arrive as PDFs, scans and email attachments. Someone reads each one and keys it into your system — slowly, and with errors that surface weeks later.",
    solution:
      "An extraction pipeline that reads the document, pulls the fields you care about, validates them against your own rules, and writes them into your system. Anything below a confidence threshold routes to a human queue instead of being guessed at.",
    roi: "Typically 60–80% of intake handling time removed, with error rates measured before and after.",
    icon: "FileStack",
  },
  {
    slug: "client-communication",
    title: "Client Communication & Response",
    summary:
      "Faster, consistent replies on the channels your clients actually use — with your team still in control.",
    problem:
      "Enquiries, booking requests and routine questions pile up in a shared inbox. Response time slips, and the same twenty answers get retyped every week.",
    solution:
      "A drafting and triage layer that classifies incoming messages, drafts a reply grounded in your own documented answers, and queues it for one-click approval. Escalation rules keep anything sensitive with a human.",
    roi: "Typical first-response time down from hours to minutes; 40–65% of routine volume handled on first pass.",
    icon: "MessagesSquare",
  },
  {
    slug: "internal-knowledge",
    title: "Internal Knowledge Assistants",
    summary:
      "Your own procedures, contracts and history — answerable in a sentence instead of a search.",
    problem:
      "The answer exists, but it lives in a shared drive, an old thread, or one person's head. New staff take months to get productive and senior people spend their day being a search engine.",
    solution:
      "A retrieval assistant scoped to your own material, with citations back to the source document so every answer can be checked. Access follows your existing permissions — nobody sees what they shouldn't.",
    roi: "Typically 3–6 hours per employee per month returned; onboarding ramp shortened by a third.",
    icon: "ClipboardCheck",
  },
  {
    slug: "reporting-decision-support",
    title: "Reporting & Decision Support",
    summary:
      "The numbers you run the business on, assembled on schedule instead of on request.",
    problem:
      "Month-end reporting is a manual assembly job across several systems. By the time the picture is complete, the decisions it should have informed have already been made.",
    solution:
      "Automated consolidation across your sources, with narrative summaries that flag what moved and why. Scheduled delivery, versioned, and reconciled against the source of truth so the numbers are trusted.",
    roi: "Reporting cycle typically compressed from days to hours; variance caught in-period rather than after.",
    icon: "BarChart3",
  },
  {
    slug: "workflow-integration",
    title: "Workflow Integration & Handoff",
    summary:
      "Systems that talk to each other, and a team that can run them without us.",
    problem:
      "Point solutions get bought, half-adopted, and abandoned because nothing connects and nobody owns them. The work quietly returns to spreadsheets.",
    solution:
      "We integrate into the tools you already run, instrument the workflow so performance stays visible, and hand over documentation, admin access and training. You own the system outright.",
    roi: "Measured on sustained adoption at 90 days, not on the day we go live.",
    icon: "Workflow",
  },
];

/** Verticals we name explicitly on the site. */
export const industries = [
  {
    name: "Accounting & Bookkeeping",
    note: "Client intake, document processing, month-end assembly",
  },
  {
    name: "Golf & Hospitality",
    note: "Booking operations, member communication, seasonal demand",
  },
  {
    name: "Professional Services",
    note: "Proposal turnaround, matter intake, knowledge retrieval",
  },
  {
    name: "Healthcare Clinics",
    note: "Patient intake, recall scheduling, records handling",
  },
  {
    name: "Logistics & Distribution",
    note: "Quote turnaround, exception handling, status queries",
  },
  {
    name: "Property Management",
    note: "Tenant requests, lease abstraction, maintenance triage",
  },
] as const;
