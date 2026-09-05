/** FAQ sets. Keyed by where they appear. */

export type Faq = { q: string; a: string };

/** Home page — the objections a parts business actually raises. */
export const generalFaqs: Faq[] = [
  {
    q: "Do we have to replace our ERP?",
    a: "No, and we would argue against it. Your ERP stays the system of record. We build a secure integration layer around it — SAP ECC or S/4HANA, Oracle E-Business Suite, NetSuite, Infor, Epicor, the WMS, the PIM, the CRM, legacy dealer systems — starting read-only, and moving to controlled write-back only after your approvals are in place. Where a system has no usable API, we use RPA rather than making its replacement your problem.",
  },
  {
    q: "Our part data is a mess. Is that a reason to wait?",
    a: "It is the reason to start. Every parts business we work with has the same shape of problem: the data exists, but no two copies of it agree, and the relationships that make it findable live in spreadsheets and in people's heads. Normalizing that is the first week of the work, not a prerequisite for it. What you get out of that week — the duplicates, the gaps, the disagreements between channels — is useful whether or not anything is automated afterwards.",
  },
  {
    q: "Will the system invent a fitment or approve a substitute on its own?",
    a: "No. Matches are returned with the evidence they were made on and a confidence level; anything below your threshold, and anything safety-critical, routes to a person instead of being guessed at. New fitment and interchangeability decisions are made by your technical people and recorded with who made them. A system that silently invents a relationship is worse than no system, because it is wrong at scale.",
  },
  {
    q: "How small can we start?",
    a: "One product family, roughly 5,000 to 25,000 active part records, two to five source datasets, and one high-volume request channel. That is deliberately small. It is enough to prove or disprove the case on your own data, and it is a scope we can stand a fixed price and a set of success measures against.",
  },
  {
    q: "What if the pilot does not move the numbers?",
    a: "Then that is the finding, and you get it in writing with the measures behind it. We agree what we are measuring — search time, unmatched RFQs, time to first quote, publish-ready SKU rate, document-error rate — before the pilot starts, precisely so the answer cannot be moved afterwards. You keep the normalized data and the gap analysis either way.",
  },
  {
    q: "Who owns the enriched data?",
    a: "You do. The enriched records, the relationships, the documentation and the administrative access are yours, and you keep them if the engagement ends. Ongoing operations are how we make sure the return holds as suppliers and systems change, not a licence you have to keep buying to keep your own catalog.",
  },
  {
    q: "Do you resell software or take vendor commissions?",
    a: "No. We hold no reseller agreements and take no commissions from any platform. What we recommend is shaped by your data and your workflow, not by someone else's margin.",
  },
  {
    q: "Will this replace our parts people?",
    a: "It changes what they spend the day on. The work it removes is the searching, the retyping, the cross-checking of documents that must agree — not the judgement about whether a substitute is appropriate for a customer's machine. That judgement is the thing we route work to, deliberately, and it is the reason a parts business is worth calling in the first place.",
  },
];

/** /process — commercial and engagement mechanics. */
export const processFaqs: Faq[] = [
  {
    q: "Why start read-only?",
    a: "Because a pilot should not be able to damage the system your business runs on. Read-only means we can prove the matching, the enrichment or the document checks against your real data with no path to changing it. Write-back is switched on later, deliberately, once the approval queues exist and your team has decided what the system is allowed to conclude.",
  },
  {
    q: "What do you need from us during a pilot?",
    a: "Access to the source data, and time from the people who know it — the parts person who knows which cross-references are wrong, the export coordinator who knows which field causes the exceptions every month. Typically a few hours a week. Their knowledge is most of what gets encoded; the software is the easy half.",
  },
  {
    q: "How long before anything is live?",
    a: "Assessment: 15 minutes. Connect and normalize: one week. Building the workflow: two to three weeks. Approval and go-live: one week. Most pilots are running against live work about five weeks after the first call, and then we monitor and expand from there.",
  },
  {
    q: "Can we take the normalized data and go elsewhere?",
    a: "Yes. The enriched records and the relationship structure are yours, they are exportable, and they are specific enough to hand to an internal team or another supplier. We would rather be the firm whose data work is worth taking elsewhere than the one that holds it hostage.",
  },
  {
    q: "How much disruption should we expect?",
    a: "The connection and normalization stage happens alongside your operation rather than through it. Rollout is staged, with the previous process running as a fallback until the measures hold. The one thing we do ask for is that exceptions get worked rather than ignored — a queue nobody opens is how these systems quietly stop being trusted.",
  },
  {
    q: "What happens when a supplier changes their file format?",
    a: "We absorb it. That is a large part of what ongoing operations covers: supplier formats change, product lines are discontinued, sites merge their material masters, a distributor asks for a new attribute. Without someone owning that, an enriched catalog goes stale within about a quarter and nobody notices until a customer does.",
  },
  {
    q: "How do you measure whether it worked?",
    a: "With the measures agreed before it started, using the same definitions before and after: search time, unmatched RFQ lines, wrong-part rate, time to first quote, manual touches per RFQ, publish-ready SKU rate, document-error rate, exception volume, and workflow adoption. Adoption is the one people skip and the one that predicts everything else.",
  },
  {
    q: "Does ongoing support mean we are locked in?",
    a: "No. You own the enriched data, the documentation and the admin access outright, and you get the training to run the workflow in-house. What ongoing support buys is somebody watching when a format changes on a Tuesday — not permission to use your own systems.",
  },
];

/** /contact — short set, focused on the call itself. */
export const contactFaqs: Faq[] = [
  {
    q: "What happens on the assessment call?",
    a: "We ask where the friction is — part identification, RFQs, quoting, catalog data, distributor sync, ERP integration, export documents, MRO or obsolete components — and which systems hold the data today. You get a straight read on which workflow is worth measuring first. Nothing is quoted on the call itself.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "No. A rough sense of your SKU count, which ERP you run, and which request channel causes the most manual work is plenty. Anything precise we need, we gather properly at the assessment stage.",
  },
  {
    q: "What if our situation does not fit any of your services?",
    a: "Say so on the call and we will tell you honestly. The offers are shaped around the workflows we see most often in parts businesses; they are not the only ones that exist. If the first useful step for you is something we do not do, that is a more useful answer than a proposal.",
  },
  {
    q: "Can we talk by email instead?",
    a: "Yes — use the form below or write to us directly. A call is faster for the first pass, but we will work the way you prefer.",
  },
];
