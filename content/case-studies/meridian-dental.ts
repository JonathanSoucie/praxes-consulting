import type { CaseStudy } from "./types";

/** ⚠️ PLACEHOLDER — invented client and figures. Replace before launch. */
export const meridianDental: CaseStudy = {
  slug: "meridian-dental",
  client: "Meridian Dental Group",
  industry: "Healthcare Clinics",
  headline: "Recall attendance up 23% across four clinics",
  summary:
    "A four-site dental group with a full appointment book and a recall list quietly going stale in the background.",
  metric: "+23% recall attendance",
  duration: "3 months",

  challenge: [
    "Meridian operates four clinics with a shared administrative team. Front desk staff handle check-in, payments, scheduling, insurance queries and recall — in that order of urgency, which meant recall came last and often not at all.",
    "The group wanted to know whether an AI receptionist could take phone volume off the front desk.",
  ],

  bottleneck: [
    "Phone volume was high but not the constraint — calls were being answered within acceptable times at all four sites.",
    "The measured gap was recall. Of patients due for a six-month review, 41% were never contacted at all, because the task lived at the bottom of a queue that never emptied. Of those who were contacted, attendance was strong.",
    "The clinical and commercial value of closing that gap was several times the value of reducing call handling time, and it required a much smaller build.",
  ],

  built: [
    {
      title: "Recall identification and sequencing",
      detail:
        "Patients due for review are identified from clinical records and contacted on a schedule with appropriate spacing, across the channel each patient prefers.",
    },
    {
      title: "Two-way booking handling",
      detail:
        "Patients can accept, decline or reschedule in the reply, and the practice management system updates without a staff member re-keying anything.",
    },
    {
      title: "Clinical escalation rules",
      detail:
        "Anything clinical, sensitive or outside the defined set routes to a named staff member. The system never gives clinical advice.",
    },
  ],

  results: [
    { value: "23", unit: "%", label: "Increase in recall attendance" },
    { value: "41 → 6", unit: "%", label: "Due patients never contacted" },
    { value: "2.9", unit: "×", label: "First-year return" },
    { value: "7", unit: "mo", label: "Payback period" },
  ],

  quote: {
    text: "No jargon, no thirty-slide deck. A spreadsheet with the assumptions written out and a recommendation we could argue with. We argued, they adjusted, and the forecast held.",
    name: "Priya Anand",
    title: "Practice Manager, Meridian Dental Group",
  },
};
