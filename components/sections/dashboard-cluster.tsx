import { ArrowDownRight, Check, Clock } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The hero visual: a cluster of small, floating UI panels that read as an
 * analytics readout. Entirely coded — no screenshots, nothing to license, and
 * it stays sharp at every resolution.
 *
 * ⚠️ Figures are the placeholder Northgate case study. Swap for real ones.
 */
export function DashboardCluster({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden>
      {/* Soft halo behind the cluster, so the white panels separate from the
          gradient without needing a border. */}
      <div className="pointer-events-none absolute inset-0 -z-10 scale-125 rounded-full bg-white/25 blur-3xl" />

      <div className="grid gap-4 sm:grid-cols-5 sm:gap-5">
        {/* Primary panel — the headline return */}
        <div className="card-float rounded-xl bg-surface p-6 sm:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label-tech text-muted">First-year return</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="figure-num text-5xl text-ink">4.4</span>
                <span className="figure-num text-2xl text-accent">×</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-ink">
              <Check className="size-3" />
              Verified
            </span>
          </div>

          <p className="mt-4 text-xs text-muted">
            Northgate Accounting · client onboarding
          </p>

          {/* Before / after — one measure, one baseline, both direct-labelled */}
          <div className="mt-6 border-t border-line pt-5">
            <div className="flex items-baseline justify-between">
              <p className="text-xs font-medium text-ink">
                Manual hours per week
              </p>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-accent">
                <ArrowDownRight className="size-3.5" />
                38%
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <MiniBar label="Before" value="29.5" widthPct={87} tone="before" />
              <MiniBar label="After" value="18.3" widthPct={54} tone="after" />
            </div>
          </div>
        </div>

        {/* Side stack */}
        <div className="grid gap-4 sm:col-span-2 sm:gap-5">
          <div className="card-float rounded-xl bg-surface p-5">
            <div className="flex items-center gap-2">
              <Clock className="size-3.5 text-accent" />
              <p className="label-tech text-muted">Payback</p>
            </div>
            <p className="figure-num mt-3 text-3xl text-ink">
              5.0
              <span className="ml-1 text-base font-medium text-muted">mo</span>
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-accent-soft">
              <div className="h-full w-[42%] rounded-full bg-accent" />
            </div>
          </div>

          <div className="card-float rounded-xl bg-surface p-5">
            <p className="label-tech text-muted">Intake time</p>
            <p className="figure-num mt-3 text-2xl text-ink">
              9.4 <span className="text-muted">→</span> 2.1
            </p>
            <p className="mt-1 text-xs text-muted">days to complete</p>
          </div>
        </div>
      </div>

      {/* Verification chip. Sits below the cluster rather than overlapping it —
          absolute positioning collided with the card content at some widths. */}
      <div className="mt-5 flex justify-center">
        <span className="card-float inline-flex items-center gap-2.5 rounded-full bg-surface py-2.5 pr-5 pl-3">
          <span className="grid size-6 place-items-center rounded-full bg-accent-soft">
            <Check className="size-3.5 text-accent" />
          </span>
          <span className="text-xs font-medium text-ink">
            Re-measured against baseline at 90 days
          </span>
        </span>
      </div>
    </div>
  );
}

function MiniBar({
  label,
  value,
  widthPct,
  tone,
}: {
  label: string;
  value: string;
  widthPct: number;
  tone: "before" | "after";
}) {
  return (
    <div className="grid grid-cols-[3.25rem_1fr_auto] items-center gap-3">
      <span className="text-xs text-muted">{label}</span>
      <span className="h-2.5 min-w-0">
        <span
          style={{ width: `${widthPct}%` }}
          className={cn(
            "block h-full rounded-full",
            tone === "after" ? "bg-chart-after" : "bg-chart-before"
          )}
        />
      </span>
      {/* Direct label — the comparison never depends on colour alone. */}
      <span className="figure-num w-11 text-right text-xs text-ink">
        {value}
      </span>
    </div>
  );
}
