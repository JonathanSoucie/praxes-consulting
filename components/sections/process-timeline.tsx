import { Check } from "lucide-react";

import { processSteps } from "@/content/process";
import { Reveal } from "@/components/reveal";

/**
 * The engagement stages.
 *
 * `variant="overview"` — condensed cards, for the Home page.
 * `variant="full"`     — with deliverables and durations, for /process.
 *
 * The commercial framing (free / paid / small deposit …) is plain text beside
 * the stage title rather than a chip.
 */
export function ProcessTimeline({
  variant = "full",
}: {
  variant?: "overview" | "full";
}) {
  if (variant === "overview") {
    return (
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.n}
            delay={i * 60}
            className="card-raise flex h-full flex-col rounded-xl bg-surface p-7"
          >
            <span className="grid size-9 place-items-center rounded-full bg-accent-soft">
              <span className="figure-num text-sm text-accent-ink">
                {step.n}
              </span>
            </span>

            <h3 className="mt-5 text-lg">{step.title}</h3>
            {step.tag ? (
              <p className="mt-1 text-xs text-accent">{step.tag}</p>
            ) : null}

            <p className="mt-3 text-sm leading-relaxed text-muted">
              {step.summary}
            </p>
          </Reveal>
        ))}
      </ol>
    );
  }

  return (
    <ol className="space-y-5">
      {processSteps.map((step, i) => (
        <Reveal
          as="li"
          key={step.n}
          delay={i * 50}
          className="card-raise rounded-2xl bg-surface p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
            {/* Stage number rail */}
            <div className="lg:w-24">
              <span className="grid size-12 place-items-center rounded-full bg-accent-soft">
                <span className="figure-num text-base text-accent-ink">
                  {step.n}
                </span>
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="text-xl sm:text-2xl">
                  {step.title}
                  {step.tag ? (
                    <span className="ml-3 text-base font-normal text-accent">
                      {step.tag}
                    </span>
                  ) : null}
                </h3>
                <span className="figure-num text-sm text-muted">
                  {step.duration}
                </span>
              </div>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
                {step.detail}
              </p>

              <div className="mt-7 rounded-xl bg-surface-2 p-6">
                <h4 className="label-tech text-muted">What you get</h4>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {step.deliverables.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink">
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent">
                        <Check
                          aria-hidden
                          className="size-2.5 text-on-accent"
                        />
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
