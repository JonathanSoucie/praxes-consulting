/**
 * The five-step engagement. This is the spine of the whole site — the Home
 * page shows a condensed version, /process shows the full timeline.
 */

export type ProcessStep = {
  n: string;
  title: string;
  /** Commercial framing shown as a chip: what this stage costs. */
  tag: "Free" | "Paid" | "Downpayment" | "Final payment";
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
    title: "Deep-dive analysis call",
    tag: "Free",
    summary:
      "A longer working session with the people who do the work, mapping the process end to end.",
    detail:
      "We go through the candidate processes in detail with the people who actually run them — volumes, handoffs, systems, exceptions, and the parts that quietly eat the day. This is where we find out whether the obvious bottleneck is the real one. It usually isn't.",
    deliverables: [
      "A mapped view of the candidate workflows",
      "Volume and effort estimates gathered from your team",
      "A scoped proposal for the ROI audit, with a fixed fee",
    ],
    duration: "60–90 minutes",
  },
  {
    n: "03",
    title: "ROI audit",
    tag: "Paid",
    summary:
      "The paid deliverable: a bottleneck map and a projected ROI model you own, whatever you decide next.",
    detail:
      "We measure. Cycle times, touch counts, error and rework rates, cost per transaction. Then we build the financial model: what each bottleneck costs you annually, what fixing it would cost, and what the return looks like under conservative, expected and optimistic assumptions. The assumptions are written down and you can argue with them.",
    deliverables: [
      "Bottleneck map, ranked by annual cost to the business",
      "Projected ROI model with the assumptions stated explicitly",
      "A build recommendation — including 'don't build', when that's the answer",
      "Scope and fixed price for implementation, if we recommend proceeding",
    ],
    duration: "2–3 weeks",
  },
  {
    n: "04",
    title: "Build & integration",
    tag: "Downpayment",
    summary:
      "We build against the audit scope and integrate into the systems you already run.",
    detail:
      "Implementation starts on a downpayment. We build to the scope the audit defined, integrate with your existing stack, and test against real historical data rather than a demo set. You see working software early and in stages — there is no reveal at the end.",
    deliverables: [
      "Working implementation in a staging environment",
      "Integration with your existing systems",
      "Validation against your own historical data",
      "Staff walkthrough before anything touches live work",
    ],
    duration: "4–10 weeks, depending on scope",
  },
  {
    n: "05",
    title: "Go-live & measurement",
    tag: "Final payment",
    summary:
      "We switch on, measure against the audit baseline, and hand over full ownership.",
    detail:
      "Go-live is staged, with the old process running alongside until the numbers hold. The balance falls due at go-live. Then we measure against the baseline the audit established, at 30 and 90 days, and give you the comparison in writing — whether or not it flatters us.",
    deliverables: [
      "Staged rollout with the previous process as fallback",
      "Measured results against the audit baseline at 30 and 90 days",
      "Documentation, admin access and team training",
      "Full ownership — no lock-in, no mandatory retainer",
    ],
    duration: "Ongoing measurement for 90 days",
  },
];

/** Investment framing shown on /process. */
export const investmentModel = [
  {
    stage: "Discovery & analysis",
    cost: "Free",
    detail:
      "Both conversations are free. We're deciding together whether there's a case worth measuring.",
  },
  {
    stage: "ROI audit",
    cost: "Fixed fee",
    detail:
      "Quoted before we start, based on scope. This is a real deliverable you keep and can act on with anyone — including without us.",
  },
  {
    stage: "Build & integration",
    cost: "Downpayment",
    detail:
      "A downpayment starts the build. The scope and total price are fixed at the end of the audit, so there is no open-ended meter running.",
  },
  {
    stage: "Go-live",
    cost: "Balance",
    detail:
      "The remaining balance falls due at go-live, once the system is running against real work.",
  },
] as const;
