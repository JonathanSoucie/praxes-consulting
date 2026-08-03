import { Check } from "lucide-react";

import { processSteps } from "@/content/process";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const tagStyles: Record<string, string> = {
  Free: "border-accent/30 bg-accent-soft text-accent",
  Paid: "border-ink/20 bg-surface-2 text-ink",
  Downpayment: "border-ink/20 bg-surface-2 text-ink",
  "Final payment": "border-ink/20 bg-surface-2 text-ink",
};

/**
 * The five-step engagement.
 *
 * `variant="overview"` — condensed, for the Home page.
 * `variant="full"`     — with deliverables and durations, for /process.
 */
export function ProcessTimeline({
  variant = "full",
}: {
  variant?: "overview" | "full";
}) {
  return (
    <ol className="relative">
      {processSteps.map((step, i) => (
        <Reveal
          as="li"
          key={step.n}
          delay={i * 50}
          className={cn(
            "relative grid gap-x-8 gap-y-4 border-t border-line py-10 sm:grid-cols-[auto_1fr] lg:py-12",
            i === processSteps.length - 1 && "border-b"
          )}
        >
          {/* Step number + connector rail */}
          <div className="flex items-start gap-5 sm:w-40">
            <span className="figure-num text-sm text-accent">{step.n}</span>
            <span
              aria-hidden
              className="mt-2 hidden h-px flex-1 bg-line sm:block"
            />
          </div>

          <div className={cn(variant === "full" ? "max-w-4xl" : "max-w-3xl")}>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl sm:text-2xl">{step.title}</h3>
              <span
                className={cn(
                  "label-eyebrow rounded-xs border px-2 py-1",
                  tagStyles[step.tag]
                )}
              >
                {step.tag}
              </span>
            </div>

            <p className="mt-4 text-base leading-relaxed text-muted">
              {variant === "full" ? step.detail : step.summary}
            </p>

            {variant === "full" ? (
              <div className="mt-7 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
                <div>
                  <h4 className="label-eyebrow text-muted">What you get</h4>
                  <ul className="mt-4 space-y-2.5">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-ink">
                        <Check
                          aria-hidden
                          className="mt-0.5 size-4 shrink-0 text-accent"
                        />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-sm border border-line bg-surface-2 px-4 py-3 sm:min-w-44">
                  <span className="label-eyebrow text-muted">Typical</span>
                  <p className="figure-num mt-2 text-sm text-ink">
                    {step.duration}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
