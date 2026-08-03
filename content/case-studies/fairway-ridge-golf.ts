import type { CaseStudy } from "./types";

/** ⚠️ PLACEHOLDER — invented client and figures. Replace before launch. */
export const fairwayRidgeGolf: CaseStudy = {
  slug: "fairway-ridge-golf",
  client: "Fairway Ridge Golf Club",
  industry: "Golf & Hospitality",
  headline: "€64,000 in recovered green fee revenue",
  summary:
    "A members' club with a full tee sheet on paper and empty slots in practice. The gap was cancellations nobody had time to re-fill.",
  metric: "€64k revenue recovered",
  duration: "3 months",

  challenge: [
    "Fairway Ridge runs 18 holes with roughly 700 members and a meaningful visitor trade in season. The pro shop team of four handles bookings, member enquiries, competition entries and the shop itself — from one counter, with a phone that does not stop between April and September.",
    "Management's concern was staff cost during peak season. They wanted to know whether AI could take enough load off the counter to avoid hiring two seasonal staff.",
  ],

  bottleneck: [
    "We instrumented three weeks of peak-season booking data. Staff cost was real, but it wasn't the largest number on the page.",
    "The club was losing 14% of its bookable peak slots to late cancellations that were never re-filled. Not because there was no demand — the waitlist was full — but because re-filling a slot took eleven minutes of phone calls that nobody had between 8am and 11am.",
    "Priced across the season, unfilled cancellations cost more than three times the seasonal staffing the club was worried about.",
  ],

  built: [
    {
      title: "Automated waitlist matching",
      detail:
        "A cancelled slot is offered immediately to the waitlist members whose stated preferences match it, on a first-accepted basis, without anyone picking up the phone.",
    },
    {
      title: "Enquiry triage and drafting",
      detail:
        "Inbound calls, emails and messages are classified and routed, with drafted replies for the routine 60% — green fee rates, competition rules, buggy availability — held for one-click approval.",
    },
    {
      title: "Competition entry handling",
      detail:
        "Entries, withdrawals and handicap queries collected and reconciled automatically, removing a recurring Thursday evening job from the pro's week.",
    },
  ],

  results: [
    { value: "64,000", unit: "€", label: "Recovered green fee revenue", note: "First full season" },
    { value: "14 → 3", unit: "%", label: "Peak slots lost to cancellation" },
    { value: "0", label: "Seasonal hires needed", note: "Against a planned two" },
    { value: "3.2", unit: "×", label: "First-year return" },
  ],

  quote: {
    text: "They talked us out of two of the three things we came in asking for. We ended up spending less than we'd budgeted and getting a system we actually use every day.",
    name: "Tom Reyner",
    title: "General Manager, Fairway Ridge Golf Club",
  },
};
