/**
 * Headline numbers.
 *
 * The home page's `headlineStats` used to live here — average first-year
 * return, median payback, median hours removed. It is gone with the results
 * band that rendered it: those are figures a firm reports about itself, they
 * have no client attached, and a reader cannot check any of them. The home
 * page now shows four named engagements instead, built from the `glance`
 * field on each case study.
 *
 * What remains is the roll-up above the case study list, where the individual
 * studies the numbers come from are on the same page.
 *
 * ⚠️ PLACEHOLDER DATA — replace every figure below with your own measured
 * results before launch. These are plausible, not real.
 */

export type Stat = {
  /** The figure itself. Rendered in monospace. */
  value: string;
  /** Unit or symbol shown next to the figure, e.g. "%", "×", "mo". */
  unit?: string;
  /** Short label under the figure. */
  label: string;
  /** Optional one-line qualifier — where the number comes from. */
  note?: string;
};

/** Case Studies index aggregate. */
export const caseStudyAggregate: Stat[] = [
  { value: "4.1", unit: "×", label: "Average first-year return" },
  { value: "11,400", unit: "hrs", label: "Manual hours removed annually" },
  { value: "5.8", unit: "mo", label: "Median payback" },
];
