import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { integrations } from "@/content/positioning";

/**
 * Connects with what you already run.
 *
 * The previous version was a marquee of product names over a grid of small
 * chips. It named the products, which is the cheapest credibility on the site
 * and worth spending — but it drew the stack as six separate boxes, which is
 * the opposite of what the section argues. A grid of categories says "we
 * touch all of these". It does not say "we build into them".
 *
 * So the tools now hang off one continuous spine that runs through every
 * category and terminates in the punchline: there is no seventh system. The
 * line is the build. It passes through your stack rather than sitting beside
 * it, and the only thing at the end of it is the absence of another login.
 *
 * The spine is decorative in the accessibility sense — it is a border and two
 * pseudo-marks, carrying no information the list does not — so it is hidden
 * from assistive tech and the categories remain an ordinary nested list.
 */
export function Systems() {
  return (
    <Section id="integrations">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Connects with existing systems"
                title="We build into your tools. Not"
                accent="alongside them."
              />
              <p className="measure mt-8 text-lg text-ink-soft">
                The measure of whether an operations build worked is that
                nobody had to change what they open in the morning. If your
                team has to learn a new dashboard, the automation has moved
                the work rather than removed it.
              </p>
              <p className="measure mt-6 text-ink-soft">
                Not an exhaustive list. If it has an API — or a mailbox, or a
                portal a person currently logs into — it is almost certainly
                reachable. Where it genuinely is not, the audit says so before
                you spend anything.
              </p>
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
                  <li key={group.category} className="relative pb-12">
                    <span
                      aria-hidden
                      className="absolute top-2.5 -left-8 size-2.5 -translate-x-1/2 rounded-full bg-pink sm:-left-12"
                    />
                    <h3 className="font-display text-2xl sm:text-3xl">
                      {group.category}
                    </h3>
                    <ul className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-ui text-ink-soft">
                      {group.tools.map((tool, i) => (
                        <li key={tool}>
                          {tool}
                          {i < group.tools.length - 1 ? (
                            <span aria-hidden className="ml-2 text-line-strong">
                              ·
                            </span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              {/* The end cap. Zero height, so the border above it stops
                  exactly here rather than running on behind the punchline —
                  the line has to visibly terminate for "no seventh system"
                  to be what terminates it. */}
              <div aria-hidden className="relative h-0">
                <span className="absolute top-0 -left-8 h-px w-6 -translate-x-1/2 bg-pink sm:-left-12" />
              </div>
            </div>

            {/* Outside the spine, because it is what follows the line ending. */}
            <div className="pl-8 sm:pl-12">
              <p className="font-display text-2xl text-pink-ink sm:text-3xl">
                No seventh system.
              </p>
              <p className="measure mt-4 text-ink-soft">
                Nothing here adds a tool your team has to remember to open.
                The build lives on the line between the ones they already use.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
