import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  integrationApproach,
  integrationSystems,
} from "@/content/integrations";

/**
 * The systems we integrate with, as a slow scrolling row, and underneath it
 * the answer to the question the row provokes: fine, but what do you do to
 * my ERP?
 *
 * HOW THE ROW LOOPS
 *
 * The track holds the list twice and travels exactly -50% of itself, so the
 * moment the first copy has left, the second is sitting where the first
 * began and the jump back to 0 is invisible. That is the whole trick, and it
 * is why the duplicate is not optional. The second copy is `aria-hidden`,
 * because it is the same list again and a screen reader should hear it once.
 *
 * Type, not logos. Every system here is someone else's trademark, we have no
 * partnership with any of them, and a wall of other people's marks reads as
 * endorsement whether or not it is meant to. See content/integrations.ts.
 *
 * Under prefers-reduced-motion the track does not move at all — see the rule
 * on `.marquee-track` in globals.css, which overrides the blanket one that
 * would otherwise snap it to its end position.
 */
export function IntegrationsBand() {
  return (
    <Section className="overflow-hidden">
      <Container>
        <Reveal>
          <p className="text-center text-base text-ink-soft sm:text-lg">
            Systems we integrate with, not around
          </p>
        </Reveal>
      </Container>

      {/* Full-bleed, and outside the Container: the row should run off both
          edges of the page rather than stopping at the gutter, or it reads as
          a widget instead of as something passing through.

          Two elements, and that is deliberate. The rules belong to the outer
          one and the fade to the inner one, because a mask applies to an
          element's border as well as its content — put both on one element
          and the rules dissolve at the ends along with the wordmarks, which
          is the opposite of what a rule is for. */}
      <div className="relative mt-10 border-y border-line-strong py-7 lg:mt-12">
        <div
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <div className="marquee-track flex w-max animate-marquee items-stretch">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className="flex shrink-0 items-stretch"
              >
                {integrationSystems.map((system) => (
                  <li
                    key={system.name}
                    className="flex shrink-0 flex-col justify-center border-l border-line px-8 lg:px-12"
                  >
                    <span className="font-heading text-lg font-semibold whitespace-nowrap text-ink-soft lg:text-xl">
                      {system.name}
                    </span>
                    <span className="label-tech mt-1.5 text-muted">
                      {system.kind}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <Container className="mt-24 lg:mt-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow={integrationApproach.eyebrow}
            title={integrationApproach.title}
            deck={integrationApproach.deck}
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <ul className="grid">
            {integrationApproach.points.map((point, i) => (
              <Reveal
                key={point.title}
                as="li"
                delay={i * 50}
                className="border-t border-line-strong py-6 last:border-b"
              >
                <h3 className="font-heading text-lg font-semibold text-ink sm:text-xl">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
