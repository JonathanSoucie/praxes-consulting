import type { CaseStudy } from "./types";

/** ⚠️ PLACEHOLDER — invented client and figures. Replace before launch. */
export const harbourlineLogistics: CaseStudy = {
  slug: "harbourline-logistics",
  client: "Harbourline Logistics",
  industry: "Logistics & Distribution",
  headline: "Quote turnaround from 31 hours to 40 minutes",
  summary:
    "A freight forwarder losing tenders to faster competitors, with three days of quoting work hidden inside a two-hour job.",
  metric: "31 hrs → 40 min quote time",
  duration: "5 months",

  glance: {
    built: "Rate quoting driven straight off inbound email",
    value: "17",
    unit: "%",
    label: "Higher tender win rate, on quotes returned in 40 minutes rather than 31 hours",
  },

  challenge: [
    "Harbourline quotes multi-leg freight for mid-sized importers. Every quote requires pulling rates from carrier tariffs, checking surcharges, applying client-specific terms, and assembling it into a document — work spread across four people and three systems.",
    "The commercial team's complaint was simple: they were losing tenders to competitors who replied the same day.",
  ],

  bottleneck: [
    "Median time from enquiry received to quote sent was 31 hours. Actual hands-on work was 2.2 hours. The remaining 29 hours was queue — enquiries waiting for whoever held the relevant rate knowledge to be free.",
    "The audit also found that 22% of quotes were revised after sending because a surcharge or client term had been missed. Each revision cost credibility as well as time.",
    "Automating the assembly step alone would have saved two hours per quote. Removing the queue and the rework was worth more than ten times that.",
  ],

  built: [
    {
      title: "Enquiry parsing and structuring",
      detail:
        "Inbound enquiries — email, PDF, spreadsheet — are read into a structured request with the route, cargo profile and terms identified, so nothing waits to be interpreted.",
    },
    {
      title: "Rate assembly with rule checks",
      detail:
        "Applicable tariffs, surcharges and client-specific terms are applied automatically against the current rate set, with every applied rule shown for verification.",
    },
    {
      title: "Exception routing",
      detail:
        "Non-standard routes and anything outside the rule set is flagged to a specialist immediately rather than sitting in a general queue.",
    },
    {
      title: "Quote document generation",
      detail:
        "The final document assembles in Harbourline's format for review and send, with a full audit trail of what was applied and why.",
    },
  ],

  results: [
    { value: "31h → 40m", label: "Median quote turnaround" },
    { value: "22 → 4", unit: "%", label: "Quotes requiring revision" },
    { value: "17", unit: "%", label: "Tender win rate improvement", note: "Measured over two quarters" },
    { value: "6.1", unit: "×", label: "First-year return" },
  ],

  quote: {
    text: "What stood out was the measurement. At ninety days they came back with a comparison against the original baseline, unprompted. I've not had a supplier do that before.",
    name: "Daniela Vogt",
    title: "Operations Director, Harbourline Logistics",
  },
};
