import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { dataPractice } from "@/content/positioning";

/**
 * How it is integrated, and what happens to your data.
 *
 * Every commitment here has a mechanism attached, because "we take security
 * seriously" is not a commitment — it is a sentence that costs nothing to
 * write and cannot be checked. Each of these can be checked, and one of them
 * (the confidence gate) is a number the client sets rather than one we hide.
 */
export function DataPractice() {
  return (
    <Section tone="deep" id="data">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Data & integration"
                title="It runs in your accounts, under"
                accent="your keys."
              />
              <p className="measure mt-8 text-lg text-ink-soft">
                We are a user on your systems rather than a middleman holding
                your data on ours. That is a structural choice, not a policy —
                it means there is no version of ending this engagement where
                we still have your material.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <dl>
              {dataPractice.map((item) => (
                <div
                  key={item.title}
                  className="border-t border-line py-8 last:border-b"
                >
                  <dt className="font-display text-xl text-pink-ink">
                    {item.title}
                  </dt>
                  <dd className="mt-3 text-ink-soft">{item.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
