import type { CaseStudy } from "./types";

/** ⚠️ PLACEHOLDER — invented client and figures. Replace before launch. */
export const northgateAccounting: CaseStudy = {
  slug: "northgate-accounting",
  client: "Northgate Accounting",
  industry: "Accounting & Bookkeeping",
  headline: "38% fewer manual hours in client onboarding",
  summary:
    "A 40-person practice losing its January to document chasing and rekeying — and the bottleneck turned out to be neither.",
  metric: "38% fewer manual hours",
  duration: "4 months",
  featured: true,

  challenge: [
    "Northgate is a 40-person accounting practice with a January that swallows the year. Onboarding a new client meant collecting a variable stack of documents, keying the contents into three separate systems, and chasing whatever was missing — usually by email, usually more than once.",
    "The partners believed the fix was document extraction: read the PDFs automatically and the problem goes away. They came to us asking us to build exactly that.",
  ],

  bottleneck: [
    "The audit measured the actual time distribution across 240 onboardings from the previous year. Extraction and rekeying accounted for 31% of the total handling time. Chasing missing documents accounted for 46%.",
    "The real cost wasn't reading documents. It was the dead time between requesting something and receiving it — an average of 9.4 days per onboarding, during which the file sat open and a person periodically remembered to follow up.",
    "Building extraction alone would have addressed a third of the problem at most of the cost. We recommended sequencing it the other way round: fix the chase first, then extraction.",
  ],

  built: [
    {
      title: "Requirement-aware intake",
      detail:
        "The system determines which documents a given client type actually requires, so requests go out complete and correct the first time rather than in three rounds.",
    },
    {
      title: "Automated follow-up sequence",
      detail:
        "Outstanding items are chased on a schedule with escalation to the account lead, replacing the ad-hoc email reminders that depended on someone remembering.",
    },
    {
      title: "Extraction with a confidence gate",
      detail:
        "Received documents are read and the relevant fields extracted into the practice systems. Anything below the confidence threshold routes to a review queue rather than being written on a guess.",
    },
    {
      title: "Partner dashboard",
      detail:
        "Live view of every open onboarding, its age, and what it's waiting on — so stalled files surface in days rather than at month-end.",
    },
  ],

  results: [
    { value: "38", unit: "%", label: "Fewer manual hours", note: "On the onboarding workflow" },
    { value: "9.4", unit: "→ 2.1", label: "Days to complete intake", note: "Average, per onboarding" },
    { value: "4.4", unit: "×", label: "First-year return", note: "Against total engagement cost" },
    { value: "5", unit: "mo", label: "Payback period" },
  ],

  quote: {
    text: "The audit told us our bottleneck wasn't where we thought it was. That alone was worth the fee. What they built afterwards took eleven hours a week out of our intake process and we can point to the exact number.",
    name: "Helena Marsh",
    title: "Managing Partner, Northgate Accounting",
  },
};
