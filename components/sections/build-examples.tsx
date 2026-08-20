import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/reveal";

/**
 * "What we build" — the concrete answer under an argument section.
 *
 * The Blackhole and The Rocket both make a case and then have to answer the
 * obvious next question, so they share one component. Same rules, same
 * rhythm, different contents: whichever section a visitor reads first, the
 * second one's list is already familiar.
 *
 * Cards rather than the ruled rows this started as. The arguments above are
 * prose now, so these are the only boxes in either section and there is
 * nothing left for a grid of them to compete with — and six items with an
 * icon each are far easier to scan for the one that describes your business
 * than six paragraphs under hairlines.
 */

export type BuildExample = {
  /** Lucide icon, passed as the component rather than a name — both this and
      its callers are server components, so nothing crosses a client
      boundary and there is no lookup table to keep in sync. */
  icon: LucideIcon;
  title: string;
  body: string;
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
        <p className="label-tech text-muted">{eyebrow}</p>
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
            className="hover-lift flex flex-col bg-surface p-8"
          >
            {/* Icon on its own line. Beside the title it looked tighter in
                the abstract, but these titles run to three and four words and
                wrapped to three lines in a squeezed column, with the icon
                floating against the middle of them. */}
            <span className="grid size-11 shrink-0 place-items-center bg-accent-soft">
              <Icon
                aria-hidden
                strokeWidth={1.5}
                className="size-5 text-accent"
              />
            </span>

            <h3 className="card-title mt-6 text-lg text-balance sm:text-xl">
              {item.title}
            </h3>

            {/* A step up in size and a step lighter than the muted grey these
                started at. Six cards of dense copy is the most reading on the
                page, and --color-muted is a secondary tone meant for single
                lines, not for paragraphs somebody has to get through. */}
            <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink-soft">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
