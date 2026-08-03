import { cn } from "@/lib/utils";

/**
 * Dashboard-style readout used beside the hero.
 *
 * Design notes:
 * - Before/after is a two-state comparison of ONE measure, so it shares one
 *   axis and one baseline. The "before" mark is a neutral grey and the "after"
 *   mark is the accent; both are direct-labelled, so colour is never the only
 *   channel carrying the comparison.
 * - Bars are ≤24px, rounded only at the data end, square at the baseline.
 * - Values are monospace and tabular so the columns line up exactly.
 *
 * ⚠️ Figures below are the placeholder Northgate case study. Swap for real ones.
 */

type Comparison = {
  measure: string;
  unit: string;
  before: number;
  after: number;
  /** Optional axis maximum. Defaults to the larger value plus headroom. */
  max?: number;
};

const comparison: Comparison = {
  measure: "Manual hours per week",
  unit: "hrs",
  before: 29.5,
  after: 18.3,
};

const supporting = [
  { label: "Payback", value: "5.0", unit: "mo" },
  { label: "Intake", value: "9.4→2.1", unit: "days" },
  { label: "Rework", value: "−71", unit: "%" },
];

export function RoiReadout({ className }: { className?: string }) {
  const max = comparison.max ?? Math.ceil(comparison.before * 1.15);
  const beforePct = (comparison.before / max) * 100;
  const afterPct = (comparison.after / max) * 100;
  const delta = Math.round(
    ((comparison.before - comparison.after) / comparison.before) * 100
  );

  return (
    <figure
      className={cn(
        "rounded-sm border border-line bg-surface shadow-[0_1px_2px_rgba(17,17,17,0.04)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
        <span className="label-eyebrow text-muted">Engagement readout</span>
        <span className="figure-num text-[0.6875rem] whitespace-nowrap text-muted">
          90-DAY RESULT
        </span>
      </div>

      <div className="px-6 py-7">
        {/* Hero figure — exactly one per view */}
        <div className="flex items-baseline gap-2">
          <span className="figure-num text-5xl text-accent sm:text-6xl">
            4.4
          </span>
          <span className="figure-num text-xl text-accent/70">×</span>
        </div>
        <p className="mt-2 text-sm text-ink">First-year return</p>
        <p className="mt-1 text-xs text-muted">
          Northgate Accounting · client onboarding
        </p>

        {/* Before / after comparison — one measure, one baseline */}
        <div className="mt-8 border-t border-line pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xs font-medium tracking-wide text-ink uppercase">
              {comparison.measure}
            </h3>
            <span className="figure-num text-xs text-accent">−{delta}%</span>
          </div>

          <dl className="mt-5 space-y-4">
            <Bar
              label="Before"
              value={comparison.before}
              unit={comparison.unit}
              widthPct={beforePct}
              variant="before"
            />
            <Bar
              label="After"
              value={comparison.after}
              unit={comparison.unit}
              widthPct={afterPct}
              variant="after"
            />
          </dl>

          {/* Recessive baseline rule + scale */}
          <div className="mt-4 border-t border-line pt-2">
            <div className="flex justify-between">
              <span className="figure-num text-[0.625rem] text-muted">0</span>
              <span className="figure-num text-[0.625rem] text-muted">
                {max} {comparison.unit}
              </span>
            </div>
          </div>
        </div>

        {/* Supporting metrics */}
        <dl className="mt-7 grid grid-cols-3 gap-px border-t border-line bg-line pt-px">
          {supporting.map((item) => (
            // min-w-0 lets the cell shrink below its content's intrinsic width
            // instead of pushing the grid wider than the panel.
            <div key={item.label} className="min-w-0 bg-surface pt-5">
              {/* Unit sits on the label line, not beside the figure — at narrow
                  widths the two together don't fit a third of the panel. */}
              <dd className="figure-num text-sm text-ink sm:text-base">
                {item.value}
              </dd>
              <dt className="mt-1 text-xs text-muted">
                {item.label} <span className="text-line-strong">·</span>{" "}
                {item.unit}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      <figcaption className="sr-only">
        Sample engagement readout for Northgate Accounting: 4.4× first-year
        return. Manual hours per week fell from {comparison.before} to{" "}
        {comparison.after}, a {delta}% reduction. Payback in 5 months.
      </figcaption>
    </figure>
  );
}

function Bar({
  label,
  value,
  unit,
  widthPct,
  variant,
}: {
  label: string;
  value: number;
  unit: string;
  widthPct: number;
  variant: "before" | "after";
}) {
  return (
    <div className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="flex items-center gap-3">
        <div className="h-5 flex-1">
          <div
            style={{ width: `${widthPct}%` }}
            className={cn(
              // Rounded at the data end only; square against the baseline.
              "h-full rounded-r-[4px]",
              variant === "after" ? "bg-chart-after" : "bg-chart-before"
            )}
          />
        </div>
        {/* Direct label — the secondary channel, so the comparison never
            depends on colour alone. */}
        <span className="figure-num w-16 shrink-0 text-right text-sm text-ink">
          {value}
          <span className="ml-1 text-xs text-muted">{unit}</span>
        </span>
      </dd>
    </div>
  );
}
