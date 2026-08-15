import Image from "next/image";
import type { Metadata } from "next";

import { Container, Section } from "@/components/container";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";
import { ProseLink } from "@/components/ui/prose-link";

import { JsonLd } from "@/components/json-ld";

import { team, values } from "@/content/team";
import { site } from "@/content/site";
import { breadcrumbSchema, personSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Our AI Consulting Team",
  description:
    "Praxes is an AI consulting firm for Canadian small and mid-sized businesses, built around one commitment: measure the business honestly, and say so when AI isn't the answer. Meet the team and how we think.",
  path: "/about",
  keywords: [
    "AI consulting firm Canada",
    "AI consultants Ottawa",
    "about Praxes",
    "AI consulting team",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "AboutPage",
            name: "About Our AI Consulting Team",
            description:
              "Who Praxes is, how the firm thinks, and the three people who do the work.",
            path: "/about",
          }),
          ...team.map(personSchema),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="About"
        title="A straight answer on AI."
        deck="Praxes makes a narrower promise than most consultancies: we will measure your business honestly, show you the numbers behind our recommendation, and tell you when the answer is no."
      />
      {/* ---------------------------------------------------------------- */}
      {/* Story                                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <SectionHeading
              align="left"
              eyebrow="Story"
              title="How we got here."
            />
            <Reveal delay={60} className="max-w-2xl space-y-5">
              <p className="text-base leading-relaxed text-muted">
                We started out doing automation assessments — walking floors,
                timing processes, and building the financial case for whether a
                piece of equipment would pay for itself. The discipline that
                work demanded turned out to be the whole business: measure
                first, model the return conservatively, and be willing to say
                the investment isn&apos;t worth it.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Then we started looking at what AI was doing to Canadian small
                and mid-sized businesses. The pattern was hard to miss. The
                enterprise end of the market had consultants, budgets and people
                whose job was to check the maths. Everyone else — the accounting
                practices, the clinics, the clubs, the distributors, the firms
                that actually employ most Canadians — was being sold the same
                technology with none of the scrutiny, on a demo and a promise.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Almost nobody was establishing a baseline before building, which
                meant almost nobody could say afterwards whether it had worked.
                Owners were spending real money on capability and hoping. A few
                got lucky. Most quietly stopped using what they bought.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Praxes exists to close that gap. We bring{" "}
                <ProseLink href="/process">the same method</ProseLink> to a
                twenty-person practice that a bank would expect for a
                seven-figure programme: find the constraint, price it,{" "}
                <ProseLink href="/services">
                  build only what the numbers justify
                </ProseLink>
                , then re-measure and report what actually happened. It is not a
                novel idea. It is ordinary engineering discipline applied to a
                field that currently runs on enthusiasm — and applied for
                businesses that have rarely been offered it.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Praxes is the Greek for practice: action informed by theory
                rather than theory on its own. That is roughly the whole point.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Team                                                              */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Team"
            title="Who does the work."
            deck="Three people, each responsible for a different part of the answer. You will be talking to us directly, not to an account manager."
          />

          {/* A square portrait at the head of the card — large enough to read
              a face, without the 4:5 crop dominating the whole card. */}
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal
                as="article"
                key={member.name}
                delay={i * 70}
                className="card-raise flex flex-col rounded-2xl bg-surface p-7"
              >
                <div className="relative size-36 overflow-hidden rounded-2xl bg-surface-2 sm:size-40">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="160px"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>

                <h3 className="mt-6 text-xl leading-snug">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {member.role}
                </p>

                {/* flex-1 on the bio pushes the credential row to the card
                    base, so all three align regardless of bio length. */}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>

                <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1 border-t border-line pt-5 text-xs text-muted">
                  {member.credentials.map((credential, index) => (
                    <li key={credential}>
                      {credential}
                      {index < member.credentials.length - 1 ? (
                        <span aria-hidden className="ml-2 text-line-strong">
                          ·
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Values                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading eyebrow="How we think" title="Four commitments." />

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal
                key={value.title}
                delay={i * 60}
                className="card-raise rounded-2xl bg-surface p-8 lg:p-9"
              >
                <span
                  aria-hidden
                  className="block h-1 w-10 rounded-full bg-accent"
                />
                <h3 className="card-title mt-6 text-xl">{value.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Talk to the team."
        body="No account manager, no discovery deck. Fifteen minutes with the person who would run your audit."
        secondary={{ href: "/process", label: "See the process" }}
      />
    </>
  );
}
