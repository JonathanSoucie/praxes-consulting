/**
 * The five-step engagement. This is the spine of the whole site — the Home
 * page shows a condensed version, /process shows the full timeline.
 */

export type ProcessStep = {
  n: string;
  title: string;
  /** Optional chip. Only used to flag the stages that cost nothing. */
  tag?: "Free";
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
      "A scoped proposal for the ROI audit",
    ],
    duration: "60–90 minutes",
  },
  {
    n: "03",
    title: "ROI audit",
    summary:
      "A bottleneck map and a projected ROI model you own, whatever you decide next.",
    detail:
      "We measure. Cycle times, touch counts, error and rework rates, cost per transaction. Then we build the financial model: what each bottleneck costs you annually, what fixing it would cost, and what the return looks like under conservative, expected and optimistic assumptions. The assumptions are written down and you can argue with them.",
    deliverables: [
      "Bottleneck map, ranked by annual cost to the business",
      "Projected ROI model with the assumptions stated explicitly",
      "A build recommendation — including 'don't build', when that's the answer",
      "Scope and fixed price for implementation, if we recommend proceeding",
    ],
    duration: "1 week",
  },
  {
    n: "04",
    title: "Build & integration",
    summary:
      "We build against the audit scope and integrate into the systems you already run.",
    detail:
      "We build to the scope the audit defined, integrate with your existing stack, and test against real historical data rather than a demo set.",
    deliverables: [
      "Working implementation in a staging environment",
      "Integration with your existing systems",
      "Validation against your own historical data",
      "Staff walkthrough before anything touches live work",
    ],
    duration: "2–3 weeks",
  },
  {
    n: "05",
    title: "Monitoring & maintenance",
    summary:
      "We keep the system running, watched, and measured against the baseline as your business changes.",
    detail:
      "Going live is the start of our responsibility, not the end of it. Rollout is staged, with the previous process running alongside until the numbers hold. From there we monitor performance against the baseline the audit established, keep integrations and models current as your tools and volumes change, and fix problems before they surface in your operation.",
    deliverables: [
      "Staged rollout with the previous process as fallback",
      "Continuous monitoring against the audit baseline",
      "Measured results at 30 and 90 days, in writing",
      "Updates and fixes as your systems and volumes change",
      "Documentation, admin access and team training — the system is yours",
    ],
    duration: "Ongoing",
  },
];
