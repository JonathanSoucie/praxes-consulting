import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SeeMore } from "@/components/section-more";
import { howItWorks } from "@/content/positioning";

/**
 * How the engagement runs.
 *
 * Four steps, one line each, with the commercial terms attached — what is
 * free, what is paid, how long it takes. That much has to be on the home page
 * because it is the question a reader has before they will click anything.
 * The rest of it is the audit page's process timeline.
 */
export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Four steps. The second one is where we"
            accent="tell you the truth."
          />
        </Reveal>

        <ol className="mt-14 grid gap-px border-t border-line lg:mt-16 lg:grid-cols-4">
          {howItWorks.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 70}>
              <div className="h-full border-b border-line py-8 lg:border-b-0 lg:border-r lg:pr-8 lg:last:border-r-0 lg:[&:not(:first-child)]:pl-8">
                <span className="figure-num text-sm text-pink-2">{step.n}</span>
                <h3 className="mt-4 font-display text-xl sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 font-ui text-sm text-pink-ink">{step.tag}</p>
                <p className="mt-4 text-ink-soft">{step.short}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <SeeMore
            href="/services/automations-audit"
            label="How the audit runs"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
