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
 * The process, as an alternating timeline.
 *
 * A spine runs down the middle with a dot at each step, and the steps zig-zag
 * across it: copy on one side, the visual on the other, swapping every step.
 * The spine is dashed ahead of the reader and solid behind them, so the line
 * is a progress bar as much as a decoration.
 *
 * This replaced a sticky two-column version — steps scrolling on the left, one
 * pinned visual on the right that swapped as each step became live. That
 * version had a specific failure: the visual changed while the reader was
 * mid-paragraph, so the thing they were reading about and the thing on screen
 * were often one step apart. Pairing each step with its own visual, side by
 * side, removes the desync entirely. It costs vertical space, which on a page
 * whose whole argument is "we measure before we build" is a reasonable trade.
 *
 * Which step is live is still decided by an IntersectionObserver over a band
 * across the middle of the viewport rather than by mapping scroll position to
 * an index: it costs nothing per frame and stays correct when a step's height
 * changes, which it does at every breakpoint.
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
    <Section tone={tone} id="process">
      <Container>
        {/* Centred header. The timeline below is symmetrical about the middle
            of the page, and a left-aligned headline over it reads as a
            different section that happens to be adjacent. */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-pink-ink">{eyebrow}</p>
          <h2 className="display-lg mt-6">
            {title}
            {accent ? (
              <>
                {" "}
                <span className="text-pink-em">{accent}</span>
              </>
            ) : null}
          </h2>
          {standfirst ? (
            <p className="mx-auto mt-7 max-w-2xl text-lg text-ink-soft sm:text-xl">
              {standfirst}
            </p>
          ) : null}
        </header>

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
            className="absolute top-0 left-[7px] w-px bg-pink transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:left-1/2 lg:-translate-x-1/2"
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
                        ? "border-pink bg-pink"
                        : "border-line-strong bg-page",
                    )}
                  />

                  <div className="grid gap-12 pl-10 lg:grid-cols-2 lg:items-center lg:gap-24 lg:pl-0">
                    {/* Copy. */}
                    <div
                      className={cn(
                        "relative",
                        reversed ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6",
                      )}
                    >
                      {/* The numeral, behind the copy. Always to the right of
                          the block, on both sides of the spine — which is
                          what the reference does, and which keeps it clear of
                          the icon chip on the left. Vertically centred rather
                          than top-anchored so it sits behind the paragraph
                          instead of colliding with the heading. */}
                      <span
                        aria-hidden
                        className="ghost-number pointer-events-none absolute top-1/2 right-0 hidden -translate-y-1/2 lg:block"
                      >
                        {step.n}
                      </span>

                      <div className="relative lg:max-w-[27rem]">
                        <span
                          aria-hidden
                          className="inline-grid size-11 place-items-center border border-line bg-card text-pink-ink"
                        >
                          <Icon className="size-5" />
                        </span>

                        <h3 className="display-md mt-7">{step.title}</h3>

                        <p className="measure mt-5 text-lg text-ink-soft">
                          {step.body}
                        </p>

                        {step.output ? (
                          <p className="measure mt-7 flex flex-col gap-1 border-l border-pink-3/40 pl-5 sm:flex-row sm:gap-3">
                            <span className="eyebrow shrink-0 pt-1 text-muted">
                              You get
                            </span>
                            <span className="text-ink">{step.output}</span>
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
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
