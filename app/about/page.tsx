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
  title: "About Praxes",
  description:
    "Praxes builds AI integration for equipment-parts manufacturers and international distributors: part intelligence, RFQ automation, catalog data, export documents. Evidence and human approval by design. Meet the team and how we think.",
  path: "/about",
  keywords: [
    "AI integration manufacturers",
    "parts data consultants",
    "ERP integration consultants Canada",
    "about Praxes",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "AboutPage",
            name: "About Praxes",
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
        title="Evidence, not confident guesses."
        deck="Praxes makes a narrower promise than most consultancies: we will connect what your business already knows, show you the evidence behind every match, and route the uncertain cases to your people rather than guessing at them."
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
                What kept appearing in parts businesses was a different shape of
                problem. The data was not missing. It was everywhere: in the
                ERP, in supplier spreadsheets, in technical PDFs, in drawings,
                in distributor portals, and in the head of whoever had been at
                the parts counter longest. Nothing connected any of it, so the
                same question — which part is this, and what is true about it? —
                was answered from scratch, by a person, several hundred times a
                week.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Meanwhile the tools being sold into that gap were confident
                where they should have been careful. A system that will invent a
                fitment relationship rather than admit it does not know is not a
                productivity gain; it is a wrong-part return, a held shipment,
                or a machine down for another week — produced faster and at
                greater scale than any person could manage.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Praxes exists to close that gap the careful way. We bring{" "}
                <ProseLink href="/process">the same method</ProseLink> every
                time: connect the sources read-only, normalize the identifiers
                into governed relationships, automate one workflow, route what
                is uncertain to the people who can judge it, and measure the
                result against numbers agreed before the work started. It is
                ordinary engineering discipline applied to a field that
                currently runs on enthusiasm.
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

          {/* The portrait leads the card at full bleed, with the name set on
              the image itself rather than under it.

              The crop is driven per photo from content/team.ts. Every source
              file is wider than this 4:5 box, so object-cover only ever trims
              width — no aspect ratio would have removed the loose headroom
              the originals were shot with. `focus` and `zoom` pull each crop
              in on its own face instead.

              Greyscale on purpose: the three were taken in different places
              under different light, and stripping the colour is what makes
              them read as one set rather than three snapshots. */}
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal
                as="article"
                key={member.name}
                delay={i * 70}
                className="card-raise flex flex-col overflow-hidden bg-surface"
              >
                {/* overflow-hidden is load-bearing: the zoom below is a
                    transform, which paints outside the box and would spill
                    the portrait over the bio underneath it. */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale"
                    style={{
                      objectPosition: member.focus,
                      transform: `scale(${member.zoom})`,
                      transformOrigin: member.focus,
                    }}
                    priority={i === 0}
                  />

                  {/* Scrim, not a solid bar: the name has to hold at 4.5:1
                      over whatever happens to be behind it, and these three
                      backgrounds run from near-black to near-white. */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/45 to-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-xl leading-tight font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/75">{member.role}</p>
                  </div>
                </div>

                {/* flex-1 on the bio pushes the credential row to the card
                    base, so all three align regardless of bio length. */}
                <p className="flex-1 p-6 text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>

                <ul className="mx-6 mb-6 flex flex-wrap gap-x-2 gap-y-1 border-t border-line pt-5 text-xs text-muted">
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
        body="No account manager, no discovery deck. Fifteen minutes with the person who would run your assessment."
        secondary={{ href: "/process", label: "See the process" }}
      />
    </>
  );
}
