import { Reveal } from "@/components/reveal";

/**
 * "What we build" — the concrete list under an argument section.
 *
 * The Blackhole and The Rocket both make a case and then have to answer the
 * obvious next question, so they share one component. Same rules, same
 * rhythm, different contents: whichever section a visitor reads first, the
 * second one's list is already familiar.
 *
 * A ruled list rather than another card grid. These sit *inside* a section
 * that is already cards, and a second grid of boxes inside the first reads as
 * two unrelated sections rather than as a list belonging to the argument
 * above it.
 */

export type BuildExample = {
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

      {/* Hairline between rows only — the top rule comes from the row itself,
          so the list opens with a line under the label above rather than
          floating free of it. */}
      <div className="mt-8 grid gap-x-12 sm:grid-cols-2">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 50}
            className="border-t border-line py-5"
          >
            <h4 className="font-display text-base font-semibold text-ink">
              {item.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
