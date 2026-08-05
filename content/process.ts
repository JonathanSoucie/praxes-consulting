/**
 * The engagement stages. This is the spine of the whole site — the Home page
 * shows a condensed version, /process shows the full timeline.
 *
 * Durations here are mirrored in components/sections/engagement-timeline.tsx.
 * Update both together.
 */

export type ProcessStep = {
  n: string;
  title: string;
  /** Commercial framing, rendered as plain text beside the title. */
  tag?: "Free" | "Paid" | "Small deposit" | "Final payment" | "Ongoing";
  /** Short version, used in the Home page overview. */
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
    title: "Discovery call",
    tag: "Free",
    summary:
      "Fifteen minutes to understand your operation and tell you honestly whether this is worth pursuing.",
    detail:
      "A short, structured conversation about how your business actually runs: where work queues up, what your team spends its week on, and what a fix would be worth. If we can't see a credible case, we say so on this call and you've lost fifteen minutes. No deck, no pitch.",
    deliverables: [
      "A straight answer on whether AI is likely to pay off for you",
      "Two or three specific areas worth examining",
      "A clear picture of what an engagement would involve",
    ],
    duration: "15 minutes",
  },
  {
    n: "02",
    title: "Audit",
    tag: "Paid",
    summary:
      "We map the process end to end with the people who run it, and price what it costs you.",
    detail:
      "A longer working session during which we talk with employees in different departments, understanding and mapping out the process end to end. The deliverable: a bottleneck map, projected ROI and a recommended sequence. It remains yours regardless of what follows.",
    deliverables: [
      "Bottleneck map, ranked by annual cost to the business",
      "Projected ROI with the assumptions stated explicitly",
      "A recommended sequence — including 'don't build', when that's the answer",
      "Scope and fixed price for implementation, if we recommend proceeding",
    ],
    duration: "1 week",
  },
  {
    n: "03",
    title: "Build & integration",
    tag: "Small deposit",
    summary:
      "We build against the audit scope and integrate into the systems you already have in place.",
    detail:
      "We build against the audit scope and integrate into the systems you already have in place.",
    deliverables: [
      "Working implementation in a staging environment",
      "Integration with your existing systems",
      "Validation against your own historical data",
      "Staff walkthrough before anything touches live work",
    ],
    duration: "2–3 weeks",
  },
  {
    n: "04",
    title: "Go-live & handover",
    tag: "Final payment",
    summary:
      "We deploy, measure against the audit baseline, and hand over full ownership.",
    detail:
      "We deploy the solutions, measure against the audit baseline, and hand over full ownership. Rollout is staged, with the previous process running alongside until the numbers hold.",
    deliverables: [
      "Staged rollout with the previous process as fallback",
      "Measured results against the audit baseline",
      "Documentation, admin access and team training",
      "Full ownership of the system",
    ],
    duration: "1 week",
  },
  {
    n: "05",
    title: "Monitoring & maintenance",
    // No tag — the duration column already reads "Ongoing".
    summary:
      "We keep the system running, watched, and measured against the baseline as your business changes.",
    detail:
      "Going live is the start of our responsibility, not the end of it. We monitor performance against the baseline the audit established, keep integrations and models current as your tools and volumes change, and fix problems before they surface in your operation.",
    deliverables: [
      "Continuous monitoring against the audit baseline",
      "Measured results at 30 and 90 days, in writing",
      "Updates and fixes as your systems and volumes change",
      "Ongoing support from the people who built it",
    ],
    duration: "Ongoing",
  },
];
