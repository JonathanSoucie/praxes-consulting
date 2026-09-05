import { cn } from "@/lib/utils";

/**
 * "At a glance" — the five steps compressed into one horizontal track, so the
 * whole engagement reads as a single shape rather than five long cards.
 *
 * The segments are proportional to duration and each carries its own label, so
 * the sequence never depends on colour alone. The last segment fades out
 * rather than ending, because monitoring has no end date.
 *
 * Durations mirror content/process.ts — update both together.
 */

type Phase = {
  label: string;
  duration: string;
  /** Relative width on the track. */
  span: number;
  /** Step of the accent ramp, light to full — progression, not identity. */
  fill: string;
  detail: string;
};

const phases: Phase[] = [
  {
    label: "Part-data assessment",
    duration: "Week 0",
    span: 1,
    fill: "bg-accent/20",
    detail: "Free, 15 minutes",
  },
  {
    label: "Connect & normalize",
    duration: "1 week",
    span: 1.4,
    fill: "bg-accent/40",
    detail: "Governed data + gap report",
  },
  {
    label: "Automate the workflow",
    duration: "2–3 weeks",
    span: 3,
    fill: "bg-accent/65",
    detail: "Built and tested on your data",
  },
  {
    label: "Approve & go live",
    duration: "1 week",
    span: 1.4,
    fill: "bg-accent/85",
    detail: "Write-back after approval",
  },
  {
    label: "Measure & improve",
    duration: "Ongoing",
    span: 2,
    fill: "bg-accent",
    detail: "Watched and kept current",
  },
];

export function EngagementTimeline({ className }: { className?: string }) {
  const total = phases.reduce((sum, phase) => sum + phase.span, 0);

  return (
    <div
      className={cn("card-raise rounded-2xl bg-surface p-7 sm:p-9", className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-display text-base font-semibold text-ink">
          Typical engagement
        </p>
        <p className="text-sm text-muted">
          Live in roughly{" "}
          <span className="font-medium text-accent">five weeks</span> from the
          first call
        </p>
      </div>

      {/* Horizontal track. Below lg the four columns get narrow enough that
          labels hyphenate, so it stacks into rows instead. */}
      <div className="mt-7 hidden gap-2 lg:flex" role="list">
        {phases.map((phase) => (
          <div
            key={phase.label}
            role="listitem"
            style={{ flexGrow: phase.span, flexBasis: 0 }}
            className="min-w-0"
          >
            <div
              className={cn(
                "h-2.5 rounded-full",
                phase.fill,
                // The open end: monitoring doesn't stop.
                phase.duration === "Ongoing" &&
                  "mask-[linear-gradient(to_right,black_65%,transparent)]",
              )}
            />
            <p className="mt-4 text-sm font-medium text-ink">{phase.label}</p>
            <p className="figure-num mt-1 text-xs text-accent">
              {phase.duration}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              {phase.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Stacked view */}
      <ul className="mt-7 space-y-4 lg:hidden">
        {phases.map((phase) => (
          <li key={phase.label} className="flex items-start gap-3.5">
            <span
              className={cn(
                "mt-1.5 h-2.5 w-8 shrink-0 rounded-full",
                phase.fill,
              )}
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">{phase.label}</p>
              <p className="figure-num mt-0.5 text-xs text-accent">
                {phase.duration}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {phase.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
