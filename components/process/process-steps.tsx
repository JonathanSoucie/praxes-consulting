"use client";

import * as React from "react";

import { Container, Section } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { StepPanelView } from "@/components/process/step-panel";
import type { ProcessStep } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * The process, as a scroll-driven sequence.
 *
 * Two columns on desktop: the steps scroll on the left, one visual stays
 * pinned on the right and changes as each step becomes the live one. Below
 * the large breakpoint the layout unfolds into a plain sequence with each
 * visual sitting under its own step — a sticky panel on a phone occupies the
 * screen the copy needs, and there is no room for a synchronised pair.
 *
 * Which step is live is decided by an IntersectionObserver with a narrow band
 * across the middle of the viewport, rather than by mapping scroll position
 * to an index. The observer approach costs nothing per frame and, more
 * usefully, stays correct when a step's height changes — which it does at
 * every breakpoint, and would do again the moment anyone edits the copy.
 *
 * The rail runs the full height of the list with a fill that tracks progress,
 * so the section reads as one movement rather than as six separate blocks.
 */
export function ProcessSteps({
  title,
  accent,
  standfirst,
  eyebrow = "The process",
  steps,
  tone = "light",
}: {
  title: string;
  accent?: string;
  standfirst?: string;
  eyebrow?: string;
  steps: ProcessStep[];
  tone?: "light" | "deep";
}) {
  const [active, setActive] = React.useState(0);
  const stepRefs = React.useRef<(HTMLLIElement | null)[]>([]);

  React.useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Take the entry closest to the band's centre rather than the first
        // that fires: two adjacent steps can both be intersecting, and
        // picking arbitrarily makes the panel flicker between them.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length === 0) return;
        const index = nodes.indexOf(visible[0].target as HTMLLIElement);
        if (index >= 0) setActive(index);
      },
      // A band across the middle third of the viewport.
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );

    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [steps.length]);

  const progress = steps.length > 1 ? active / (steps.length - 1) : 1;

  return (
    <Section tone={tone} id="process">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          standfirst={standfirst}
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
          {/* Steps. */}
          <ol className="relative pl-9">
            <span aria-hidden className="step-rail" />
            <span
              aria-hidden
              className="absolute top-3 left-0 w-px origin-top bg-pink transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ height: `calc(${progress * 100}% - 1.5rem)` }}
            />

            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <li
                  key={step.n}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative pb-16 last:pb-0"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "step-dot absolute top-2 -left-9 -translate-x-1/2",
                      isActive && "scale-125 border-pink bg-pink",
                    )}
                  />

                  <p
                    className={cn(
                      "figure-num text-sm transition-colors duration-300",
                      isActive ? "text-pink-ink" : "text-muted",
                    )}
                  >
                    {step.n}
                  </p>

                  <h3
                    className={cn(
                      "display-md mt-3 transition-colors duration-300",
                      isActive ? "text-ink" : "text-ink/55",
                    )}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-5 text-lg text-ink-soft">{step.body}</p>

                  {step.output ? (
                    <p className="mt-6 flex flex-col gap-1 border-l border-line pl-5 sm:flex-row sm:gap-3">
                      <span className="eyebrow shrink-0 pt-1 text-muted">
                        You get
                      </span>
                      <span className="text-ink">{step.output}</span>
                    </p>
                  ) : null}

                  {/* The mobile panel. Inline under its own step, because the
                      sticky column does not exist at this width. */}
                  <div className="mt-8 lg:hidden">
                    <StepPanelView panel={step.panel} active />
                  </div>
                </li>
              );
            })}
          </ol>

          {/* The pinned visual. `top` clears the fixed navbar. */}
          <div className="sticky top-32 hidden lg:block">
            <div className="relative">
              {steps.map((step, i) => (
                <div
                  key={step.n}
                  aria-hidden={i !== active}
                  className={cn(
                    "transition-opacity duration-500",
                    i === active
                      ? "relative opacity-100"
                      : "pointer-events-none absolute inset-0 opacity-0",
                  )}
                >
                  <StepPanelView panel={step.panel} active={i === active} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
