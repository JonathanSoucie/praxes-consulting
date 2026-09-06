/**
 * The engagement stages. This is the spine of the whole site — the Home page
 * shows a condensed version, /process shows the full timeline.
 *
 * The five stages are the copy deck's own method — connect, normalize,
 * automate, approve, improve — with the commercial shape of the engagement
 * attached to each: what it costs, how long it takes, and what you are left
 * holding. The deck describes the method; the tags and durations here are the
 * firm's own terms and are the numbers quoted on the call.
 *
 * Durations here are mirrored in components/sections/engagement-timeline.tsx.
 * Update both together.
 */

export type ProcessStep = {
  n: string;
  title: string;
  /** Commercial framing, rendered as plain text beside the title. */
  tag?: "Free" | "Paid" | "Small deposit" | "Final payment" | "Ongoing";
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
    title: "Part-data assessment",
    brief: "Which workflow, and the data it would need",
    tag: "Free",
    summary:
      "Fifteen minutes to find the highest-value workflow and the data it would need.",
    detail:
      "A short, structured conversation about where the friction actually is: part identification, RFQs and quoting, catalog and distributor data, legacy ERP integration, export documents, MRO or obsolete components. We ask what systems hold the data and who approves decisions today. If we cannot see a workflow worth measuring, we say so on the call and you have lost fifteen minutes.",
    deliverables: [
      "A straight read on which workflow is worth attacking first",
      "The source datasets a pilot on it would need",
      "A clear picture of what a pilot would involve, and what it would not",
    ],
    duration: "15 minutes",
  },
  {
    n: "02",
    title: "Connect and normalize",
    brief: "Read-only, then the identifiers resolved",
    tag: "Paid",
    summary:
      "We connect the sources read-only and turn fragmented identifiers into a controlled structure.",
    detail:
      "We connect the systems and files that already hold your operational knowledge — ERP, WMS, PIM, CRM, supplier files, PDFs, drawings, catalogs, RFQs and document repositories — read-only, so nothing can change your system of record. Then we organize the fragmented identifiers, descriptions, specifications, fitment rules, documents and commercial data into a controlled structure, and agree the measures the pilot will be judged on before anything is built.",
    deliverables: [
      "Read-only connections to the systems that hold the data",
      "Fragmented identifiers resolved into governed relationships",
      "A gap and duplicate report you can act on independently",
      "Success measures and a fixed pilot scope, agreed in writing",
    ],
    duration: "1 week",
  },
  {
    n: "03",
    title: "Automate the workflow",
    brief: "Built and validated on your own data",
    tag: "Small deposit",
    summary:
      "Requests extracted, parts matched, records enriched, quotes and documents drafted.",
    detail:
      "We build the workflow against the agreed scope: extracting requests, matching parts, enriching product records, drafting quotes, validating shipment documents — and routing anything uncertain to the right person instead of guessing at it. It is validated against your own historical data before it touches live work, and where an API does not exist we use RPA rather than asking you to replace a system that works.",
    deliverables: [
      "The workflow running against your real data in a staging environment",
      "Confidence thresholds and exception routing you set",
      "Validation against historical cases, with the misses shown",
      "A walkthrough with the people who will use it",
    ],
    duration: "2–3 weeks",
  },
  {
    n: "04",
    title: "Approve and go live",
    brief: "Your people approve; write-back switches on",
    tag: "Final payment",
    summary:
      "Your teams keep control: the system presents evidence and exceptions, people approve.",
    detail:
      "Your technical, sales, procurement and compliance teams keep the decisions. The system presents evidence, confidence and exceptions; people approve the high-impact ones. Write-back to the ERP is switched on only after those approvals are in place, and rollout is staged with the previous process running alongside until the measures hold.",
    deliverables: [
      "Approval queues owned by your own teams",
      "Controlled write-back, enabled after approval and not before",
      "Staged rollout with the previous process as fallback",
      "Documentation, admin access and training",
    ],
    duration: "1 week",
  },
  {
    n: "05",
    title: "Measure and improve",
    brief: "Against the baseline agreed at the start",
    // No tag — the duration column already reads "Ongoing".
    summary:
      "Search time, quote speed, data completeness, exception rates and adoption, measured and reported.",
    detail:
      "We measure search time, quote speed, data completeness, exception rates, document errors and workflow adoption against the baseline agreed at the start — then use what those say to scale to new products, channels and markets. Adoption is the one that predicts the rest: a workflow the team has quietly routed around is not saving anything, whatever the other numbers look like.",
    deliverables: [
      "Measured results against the agreed baseline, in writing",
      "Continuous monitoring, including supplier and format changes",
      "A sequenced roadmap for the next workflow or market",
      "Ownership of your enriched data, throughout",
    ],
    duration: "Ongoing",
  },
];
