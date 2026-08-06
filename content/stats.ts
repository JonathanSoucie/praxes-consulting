/**
 * Headline numbers.
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

/** Home page results band. */
export const headlineStats: Stat[] = [
  {
    value: "4.1",
    unit: "×",
    label: "Average first-year return",
    note: "Across engagements that reached go-live in 2025",
  },
  {
    value: "38",
    unit: "%",
    label: "Fewer manual hours",
    note: "Median reduction on the automated workflow",
  },
  {
    value: "5.8",
    unit: "mo",
    label: "Median payback period",
    note: "From final payment to break-even",
  },
  {
    value: "1 in 3",
    label: "Audits that say don't build",
    note: "We tell you when AI isn't the answer",
  },
];

/** Case Studies index aggregate. */
export const caseStudyAggregate: Stat[] = [
  { value: "4.1", unit: "×", label: "Average first-year return" },
  { value: "11,400", unit: "hrs", label: "Manual hours removed annually" },
  { value: "5.8", unit: "mo", label: "Median payback" },
];
