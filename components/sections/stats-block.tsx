import type { Stat } from "@/content/stats";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/**
 * Stat figures rendered as a clean analytics readout: monospace numerals,
 * ruled cells, teal reserved for the figure itself.
 */
export function StatsBlock({
  stats,
  tone = "default",
  columns,
  className,
}: {
  stats: Stat[];
  tone?: "default" | "panel" | "inverse";
  /** Defaults to the number of stats, capped at 4. */
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const cols = columns ?? (Math.min(stats.length, 4) as 2 | 3 | 4);
  const inverse = tone === "inverse";

  return (
    <div
      className={cn(
        "grid divide-line",
        tone === "panel" && "grid-rule rounded-sm border border-line bg-surface",
        inverse && "divide-white/15",
        cols === 2 && "sm:grid-cols-2",
        cols === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        cols === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        "divide-y sm:divide-y-0 sm:divide-x",
        className
      )}
    >
      {stats.map((stat, i) => (
        <Reveal
          key={stat.label}
          delay={i * 60}
          className={cn(
            "px-6 py-8 first:pl-6 sm:px-8",
            tone === "panel" && "backdrop-blur-[1px]"
          )}
        >
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                "figure-num text-4xl lg:text-5xl",
                inverse ? "text-white" : "text-accent"
              )}
            >
              {stat.value}
            </span>
            {stat.unit ? (
              <span
                className={cn(
                  "figure-num text-lg lg:text-xl",
                  inverse ? "text-white/60" : "text-accent/70"
                )}
              >
                {stat.unit}
              </span>
            ) : null}
          </div>

          <p
            className={cn(
              "mt-3 text-sm font-medium",
              inverse ? "text-white" : "text-ink"
            )}
          >
            {stat.label}
          </p>

          {stat.note ? (
            <p
              className={cn(
                "mt-1.5 text-xs leading-relaxed",
                inverse ? "text-white/55" : "text-muted"
              )}
            >
              {stat.note}
            </p>
          ) : null}
        </Reveal>
      ))}
    </div>
  );
}
