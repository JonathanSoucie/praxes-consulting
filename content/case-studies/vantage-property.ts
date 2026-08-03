import type { CaseStudy } from "./types";

/** ⚠️ PLACEHOLDER — invented client and figures. Replace before launch. */
export const vantageProperty: CaseStudy = {
  slug: "vantage-property",
  client: "Vantage Property Group",
  industry: "Property Management",
  headline: "The audit that recommended not building",
  summary:
    "A commercial property manager came to us for lease abstraction. The numbers said the payback wasn't there — so we said so.",
  metric: "Audit recommended: don't build",
  duration: "3 weeks",

  challenge: [
    "Vantage manages a mixed commercial portfolio of around 180 units. Lease abstraction — pulling key dates, break clauses, rent review terms and obligations out of lease documents into a usable register — was being done manually by two staff members.",
    "They had seen AI lease abstraction demonstrated elsewhere and wanted it implemented.",
  ],

  bottleneck: [
    "We measured the work. Abstraction consumed 310 hours per year across the two staff — real, but far less than the impression the team had, because most of the portfolio is on standard-form leases already abstracted years ago.",
    "New abstraction work arrives at roughly 20 leases a year. At that volume, the build cost, integration effort and ongoing verification exceeded the value of the hours recovered, on any assumption set we could justify.",
    "The audit recommended against building. It also identified a genuine bottleneck the team hadn't raised: maintenance request triage, consuming four times the hours abstraction did. Vantage chose to sit on both findings for a year, which was a reasonable call on the numbers.",
  ],

  built: [
    {
      title: "Nothing — and that was the deliverable",
      detail:
        "The engagement ended at the audit. Vantage received the bottleneck map, the cost model, and a written recommendation against the project they had come in asking for.",
    },
    {
      title: "A ranked map of what actually costs them",
      detail:
        "Maintenance triage, tenant query handling and arrears follow-up priced by annual cost — an agenda they can act on with or without us, whenever the volumes justify it.",
    },
  ],

  results: [
    { value: "310", unit: "hrs", label: "Annual abstraction effort measured" },
    { value: "0.6", unit: "×", label: "Projected return", note: "Below 1× — the project would not have paid back" },
    { value: "1", label: "Larger bottleneck identified", note: "Maintenance triage, 4× the annual cost" },
  ],
};
