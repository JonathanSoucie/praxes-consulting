import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SeeMore } from "@/components/section-more";
import { dataPractice, integrations } from "@/content/positioning";

/**
 * Where the automation lives, and what it can reach.
 *
 * This absorbed the separate data-and-integration band. The two were one
 * claim split across two screens — it runs inside your systems, and because
 * it runs inside your systems it runs on your credentials rather than ours.
 * Read apart they were two lists; read together the second is the consequence
 * of the first.
 *
 * The products stay named. It is the cheapest credibility on the site and the
 * one thing here that a competitor's page never actually evidences.
 */
export function Systems() {
  return (
    <Section id="integrations">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Where it lives"
                title="We build into your tools. Not"
                accent="alongside them."
              />
              <p className="measure mt-8 text-lg text-ink-soft">
                The measure of an operations build is that nobody had to change
                what they open in the morning.
              </p>
              <SeeMore
                href="/services/operations-automations"
                label="How we build one"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            {/* One container carries the spine — the border and the gutter
                both live here, so every mark on the line positions against
                the same edge. An absolutely positioned `left` resolves
                against its containing block's PADDING edge, so a nested
                element that repeats the padding lands a full gutter out. */}
            <div className="relative border-l border-line-strong pl-8 sm:pl-12">
              <ul>
                {integrations.map((group) => (
                  <li key={group.category} className="relative pb-8">
                    <span
                      aria-hidden
                      className="absolute top-2 -left-8 size-2.5 -translate-x-1/2 rounded-full bg-pink sm:-left-12"
                    />
                    <h3 className="font-display text-lg">{group.category}</h3>
                    <p className="mt-1.5 font-ui text-sm text-ink-soft">
                      {group.tools.join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>

              {/* The end cap. Zero height, so the border above it stops
                  exactly here rather than running on behind the punchline. */}
              <div aria-hidden className="relative h-0">
                <span className="absolute top-0 -left-8 h-px w-6 -translate-x-1/2 bg-pink sm:-left-12" />
              </div>
            </div>

            <p className="pt-8 pl-8 font-display text-xl text-pink-ink sm:pl-12 sm:text-2xl">
              No seventh system.
            </p>
          </Reveal>
        </div>

        {/* The consequence of the above: if it runs inside your systems, it
            runs on your credentials. */}
        <Reveal>
          <dl className="mt-20 grid gap-px border-t border-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-5">
            {dataPractice.map((item) => (
              <div key={item.title} className="pt-7 sm:pr-8">
                <dt className="font-display text-base text-pink-ink">
                  {item.title}
                </dt>
                <dd className="mt-2 text-sm text-ink-soft">{item.short}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
