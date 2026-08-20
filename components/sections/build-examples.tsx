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
            className="card-raise hover-lift rounded-xl bg-surface p-7"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-accent-soft">
              <Icon aria-hidden strokeWidth={1.5} className="size-5 text-accent" />
            </span>
            <h3 className="card-title mt-5 text-lg">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
