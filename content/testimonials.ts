/**
 * ⚠️ PLACEHOLDER TESTIMONIALS — every quote, name and company below is
 * invented so the page can be designed against realistic content. Replace all
 * of them with real, attributable quotes (with permission) before launch, or
 * delete the section. Publishing these as-is would be presenting fabricated
 * endorsements as genuine.
 */

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  /** Optional — links the quote to a case study slug. */
  caseStudy?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The audit told us our bottleneck wasn't where we thought it was. That alone was worth the fee. What they built afterwards took eleven hours a week out of our intake process and we can point to the exact number.",
    name: "Helena Marsh",
    title: "Managing Partner",
    company: "Northgate Accounting",
    caseStudy: "northgate-accounting",
  },
  {
    quote:
      "They talked us out of two of the three things we came in asking for. We ended up spending less than we'd budgeted and getting a system we actually use every day.",
    name: "Tom Reyner",
    title: "General Manager",
    company: "Fairway Ridge Golf Club",
    caseStudy: "fairway-ridge-golf",
  },
  {
    quote:
      "What stood out was the measurement. At ninety days they came back with a comparison against the original baseline, unprompted. I've not had a supplier do that before.",
    name: "Daniela Vogt",
    title: "Operations Director",
    company: "Harbourline Logistics",
    caseStudy: "harbourline-logistics",
  },
  {
    quote:
      "No jargon, no thirty-slide deck. A spreadsheet with the assumptions written out and a recommendation we could argue with. We argued, they adjusted, and the forecast held.",
    name: "Priya Anand",
    title: "Practice Manager",
    company: "Meridian Dental Group",
    caseStudy: "meridian-dental",
  },
];
