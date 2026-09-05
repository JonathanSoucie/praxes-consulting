"use client";

import * as React from "react";
import {
  ArrowLeftRight,
  BarChart3,
  Calculator,
  CheckSquare,
  GitBranch,
  LineChart,
  Plug,
  Route,
  Send,
  ShieldCheck,
  Target,
  Timer,
  TrendingUp,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Container, Section } from "@/components/container";
import { StepPanelView } from "@/components/process/step-panel";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { ProcessStep, StepIcon } from "@/content/services";
import { cn } from "@/lib/utils";

/** content/services.ts stores a name; this is where it becomes a glyph. */
const ICONS: Record<StepIcon, LucideIcon> = {
  users: Users,
  timer: Timer,
  calculator: Calculator,
  ranking: BarChart3,
  route: Route,
  target: Target,
  branches: GitBranch,
  plug: Plug,
  gate: ShieldCheck,
  compare: ArrowLeftRight,
  measure: LineChart,
  audience: UsersRound,
  approve: CheckSquare,
  send: Send,
  revenue: TrendingUp,
};

/**
 * A service's process, as an alternating timeline.
 *
 * A spine runs down the middle with a dot at each step, and the steps zig-zag
 * across it: copy on one side, the visual on the other, swapping every step.
 * The spine is dashed ahead of the reader and solid behind them, so the line
 * is a progress bar as much as a decoration. Each step rises in with the
 * site's usual <Reveal>, and the bars in a step's panel only draw once that
 * step is the live one.
 *
 * Which step is live is decided by an IntersectionObserver over a band across
 * the middle of the viewport rather than by mapping scroll position to an
 * index: it costs nothing per frame and stays correct when a step's height
 * changes, which it does at every breakpoint.
 */
export function ProcessSteps({
  title,
  standfirst,
  eyebrow = "The process",
  steps,
}: {
  title: string;
  standfirst?: string;
  eyebrow?: string;
  steps: ProcessStep[];
}) {
  const [active, setActive] = React.useState(0);
  const stepRefs = React.useRef<(HTMLLIElement | null)[]>([]);

  React.useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Closest to the band's centre, not the first to fire: two adjacent
        // steps can both be intersecting, and picking arbitrarily makes the
        // spine fill jump back and forth between them.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length === 0) return;
        const index = nodes.indexOf(visible[0].target as HTMLLIElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.4, 1] },
    );

    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [steps.length]);

  // The fill stops at the live step's dot. Each step owns an equal share of
  // the spine, and the dot sits a little way into its own share.
  const share = 100 / steps.length;
  const fill = Math.min(100, active * share + share * 0.32);

  return (
    <Section id="process">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} deck={standfirst} />

        <div className="relative mt-20 lg:mt-28">
          {/* The spine. Left-hung on small screens, centred once the layout
              splits — a centre line with everything stacked to one side of it
              is a line with nothing to divide. */}
          <span
            aria-hidden
            className="spine-dashed absolute inset-y-0 left-[7px] lg:left-1/2 lg:-translate-x-1/2"
          />
          <span
            aria-hidden
            className="absolute top-0 left-[7px] w-px bg-accent transition-[height] duration-700 ease-out-soft lg:left-1/2 lg:-translate-x-1/2"
            style={{ height: `${fill}%` }}
          />

          <ol>
            {steps.map((step, i) => {
              const Icon = ICONS[step.icon];
              const reversed = i % 2 === 1;
              const reached = i <= active;

              return (
                <li
                  key={step.n}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative pb-24 last:pb-0 lg:pb-36"
                >
                  {/* The dot, on the spine. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-1.5 left-[7px] z-10 size-3.5 -translate-x-1/2 rounded-full border-2 transition-colors duration-500 lg:left-1/2",
                      reached
                        ? "border-accent bg-accent"
                        : "border-line-strong bg-surface-2",
                    )}
                  />

                  <Reveal className="grid gap-12 pl-10 lg:grid-cols-2 lg:items-center lg:gap-24 lg:pl-0">
                    {/* Copy. */}
                    <div
                      className={cn(
                        "relative",
                        reversed ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6",
                      )}
                    >
                      {/* The numeral, behind the copy. Always to the right of
                          the block, on both sides of the spine, which keeps it
                          clear of the icon chip on the left. */}
                      <span
                        aria-hidden
                        className="ghost-number pointer-events-none absolute top-1/2 right-0 hidden -translate-y-1/2 lg:block"
                      >
                        {step.n}
                      </span>

                      <div className="relative lg:max-w-[27rem]">
                        <span
                          aria-hidden
                          className="inline-grid size-11 place-items-center rounded-[10px] border border-line-strong bg-surface text-white"
                        >
                          <Icon className="size-5" />
                        </span>

                        <h3 className="mt-7 font-heading text-xl font-semibold text-ink sm:text-2xl">
                          {step.title}
                        </h3>

                        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                          {step.body}
                        </p>

                        {step.output ? (
                          <p className="mt-7 flex flex-col gap-1 border-l-2 border-accent pl-5 sm:flex-row sm:gap-3">
                            <span className="label-tech shrink-0 pt-1.5 text-accent">
                              You get
                            </span>
                            <span className="text-ink-soft">{step.output}</span>
                          </p>
                        ) : null}
                      </div>
                    </div>

                    {/* Visual. */}
                    <div
                      className={cn(
                        "relative",
                        reversed ? "lg:order-1" : "lg:order-2",
                      )}
                    >
                      <span aria-hidden className="panel-bloom" />
                      <span aria-hidden className="dot-field" />
                      <div className="relative">
                        <StepPanelView panel={step.panel} active={reached} />
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
