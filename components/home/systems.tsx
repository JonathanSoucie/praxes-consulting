import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { integrations } from "@/content/positioning";

/** Flattened once, at module scope, rather than per render. */
const allTools = integrations.flatMap((group) => group.tools);

/**
 * Connects with what you already run.
 *
 * "Integrates with your stack" is what every competitor in this category
 * says, and none of them evidence it. Naming the products is the entire
 * point of this section — it is the cheapest credibility on the site and
 * almost nobody spends it.
 *
 * The marquee is texture, and it is duplicated and aria-hidden because a
 * screen reader hitting sixty product names twice is a worse experience than
 * not hearing them at all. The named grid below carries the same information
 * accessibly.
 */
export function Systems() {
  return (
    <Section id="integrations">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Connects with existing systems"
            title="We build into your tools. Not"
            accent="alongside them."
            standfirst="The measure of whether an operations build worked is that nobody had to change what they open in the morning. If your team has to learn a new dashboard, the automation has moved the work rather than removed it."
          />
        </Reveal>
      </Container>

      {/* Full-bleed, so the marquee reads as passing through the page rather
          than sitting inside a column. */}
      <div
        aria-hidden
        className="mt-16 flex overflow-hidden border-y border-line py-6 select-none lg:mt-20"
      >
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...allTools, ...allTools].map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              className="font-display text-lg whitespace-nowrap text-muted"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <Container>
        <div className="mt-16 grid gap-px sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {integrations.map((group, i) => (
            <Reveal key={group.category} delay={(i % 3) * 70}>
              <div className="h-full border-t border-line py-8">
                <h3 className="font-display text-lg text-pink-ink">
                  {group.category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                  {group.tools.map((tool) => (
                    <li key={tool} className="text-ink-soft">
                      {tool}
                      <span aria-hidden className="ml-3 text-line-strong">
                        ·
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 text-sm text-muted">
            Not an exhaustive list. If it has an API — or a mailbox, or a
            portal a person currently logs into — it is almost certainly
            reachable. Where it genuinely is not, the audit says so before you
            spend anything.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
