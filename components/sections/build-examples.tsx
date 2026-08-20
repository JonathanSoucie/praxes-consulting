import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/reveal";

/**
 * "What we build" — the concrete answer under an argument section.
 *
 * The Blackhole and The Rocket both make a case and then have to answer the
 * obvious next question, so they share one component.
 *
 * Each card is a line and a list, not a paragraph. Six cards of prose in a
 * grid is more continuous reading than anyone does at this point on a page:
 * the visitor is scanning for the one that describes their business, and a
 * block of text gives them nothing to scan. So the sentence says what the
 * thing is, and the three specifics under it — which are what actually
 * distinguish one card from the next — sit where the eye can pick them off
 * without reading.
 *
 * The icon is bare. It was a filled square chip, which put a heavy block of
 * accent at the top of every card and made a grid of six read as a wall
 * before a single word was read.
 */

export type BuildExample = {
  /** Lucide icon, passed as the component rather than a name — both this and
      its callers are server components, so nothing crosses a client
      boundary and there is no lookup table to keep in sync. */
  icon: LucideIcon;
  title: string;
  /** One line. If it needs two sentences, it belongs in the points. */
  summary: string;
  /** Two to four, two to four words each. Long enough to be specific, short
      enough that the column reads as a list rather than as more prose. */
  points: readonly string[];
};

export function BuildExamples({
  eyebrow = "What we build",
  items,
}: {
  eyebrow?: string;
  items: readonly BuildExample[];
}) {
  return (
    <div className="mt-16">
      <Reveal>
        <p className="label-section text-muted">{eyebrow}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Examples, not a menu. What gets built is whatever the audit says is
          actually in the way.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, ...item }, i) => (
          <Reveal
            key={item.title}
            delay={i * 50}
            className="hover-lift flex flex-col bg-surface p-7"
          >
            {/* Icon and title on one line now that the title is the only
                thing on it — the summary moved below, so there is no long
                heading left to squeeze into half a column. */}
            <div className="flex items-start gap-3">
              {/* Aligned to the first line rather than centred: most titles
                  here run to two lines, and centring left the icon floating
                  at the midpoint between them instead of next to where the
                  reading starts. mt-px optically centres it on the cap
                  height of that first line. */}
              <Icon
                aria-hidden
                strokeWidth={1.5}
                className="mt-px size-5 shrink-0 text-accent"
              />
              <h3 className="card-title text-lg text-balance sm:text-xl">
                {item.title}
              </h3>
            </div>

            <p className="mt-4 text-[0.9375rem] leading-[1.6] text-ink-soft">
              {item.summary}
            </p>

            {/* Ruled off from the sentence above. The list is the part that
                gets scanned, so it wants a visible edge of its own rather
                than just more space. */}
            <ul className="mt-5 space-y-2 border-t border-line pt-4">
              {item.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm text-muted">
                  {/* A rule, not a bullet — a dot at this size reads as
                      punctuation left behind by accident. */}
                  <span
                    aria-hidden
                    className="mt-2.5 h-px w-2.5 shrink-0 bg-accent"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
