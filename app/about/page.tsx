import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { Cta } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedPost, postsByDate } from "@/content/blog";
import { positioning } from "@/content/positioning";
import { site } from "@/content/site";
import { team, values } from "@/content/team";
import {
  breadcrumbSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Praxes is a three-person firm in Ottawa. We measure what repetitive work is costing a business, price it, and automate what is worth automating — and say so when nothing is.";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description,
  path: "/about",
});

export default function AboutPage() {
  const featured = getFeaturedPost();

  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "AboutPage",
            name: "About",
            description,
            path: "/about",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          ...team.map(personSchema),
        ]}
      />

      <PageHeader
        eyebrow="About"
        title="Three people who would rather be"
        accent="right than hired."
        standfirst="Praxes is a small firm in Ottawa. Small is the point: the work is measurement and judgement, and neither of those scales by adding juniors to a project."
        breadcrumbs={[{ label: "About", href: "/about" }]}
      />

      <Section size="sm">
        <Container>
          <div className="grid gap-12 border-t border-line pt-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24 lg:pt-20">
            <Reveal>
              <h2 className="display-md lg:sticky lg:top-32">
                Why the firm exists
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="measure-wide space-y-6 text-lg text-ink-soft">
                <p>
                  Every business that has lasted a few years is running on a
                  process nobody chose. It accumulated — a step added for one
                  client, a workaround for a system that was replaced twice
                  ago, a check that exists because of something that went wrong
                  in 2019. We call it {positioning.enemy.name}, and it takes a
                  fixed cut of every week whether or not the week was
                  profitable.
                </p>
                <p>
                  The reason it survives is not that nobody has noticed. It is
                  that it does not appear in any instrument a business already
                  owns. Your accounting system knows the payroll figure and not
                  what a third of it went to. Your project tool knows a job
                  took eleven days and not that nine of them were waiting.
                </p>
                <p>
                  So the firm does the unglamorous half first: sit with the
                  people doing the work, time the steps including the dead
                  ones, and price the result at the business&rsquo;s own
                  labour cost. Then — and only then — build the thing worth
                  building.
                </p>
                {/* The term is stored lowercase because it is used
                    mid-sentence almost everywhere. This is the one place it
                    opens a sentence, so it is capitalised here rather than
                    storing a second cased copy of it. */}
                <p>
                  <strong>Escape velocity</strong> is what we are actually
                  selling. {positioning.coinage.definition}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="deep">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="Four commitments, and each one costs us"
              accent="something."
              standfirst="A value that costs nothing to hold is a slogan. These are the four that have actually lost us work."
            />
          </Reveal>

          <div className="mt-16 grid gap-px sm:grid-cols-2 lg:mt-20">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={(i % 2) * 90}>
                <div className="h-full border-t border-line py-9 sm:even:pl-10 sm:odd:pr-10">
                  <h3 className="font-display text-xl text-pink-ink">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-ink-soft">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The team"
              title="The three people who will actually be"
              accent="in the room."
              standfirst="There is no delivery team behind us. Whoever you speak with on the call is who does the work."
            />
          </Reveal>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-12">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 90}>
                <article>
                  <div className="relative aspect-4/5 overflow-hidden bg-white">
                    <Image
                      src={member.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
                      className="object-cover"
                      style={{
                        objectPosition: member.focus,
                        transform: `scale(${member.zoom})`,
                        transformOrigin: member.focus,
                      }}
                    />
                  </div>
                  <h3 className="mt-7 font-display text-2xl">{member.name}</h3>
                  <p className="mt-2 text-pink-ink">{member.role}</p>
                  <p className="mt-5 text-ink-soft">{member.bio}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {member.credentials.map((credential) => (
                      <li
                        key={credential}
                        className="border border-line px-3 py-1.5 text-xs text-muted"
                      >
                        {credential}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* The writing. On an about page this is doing a specific job: showing
          that the arguments on this site are held by a named person who
          publishes them, rather than by a brand voice. */}
      <Section tone="deep" size="sm">
        <Container>
          <Reveal>
            <div className="grid gap-10 border-t border-line pt-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24 lg:pt-20">
              <div>
                <p className="eyebrow text-muted">In writing</p>
                <p className="mt-6 text-ink-soft">
                  We publish the arguments rather than announcements — including
                  the ones that argue against our own upsell.
                </p>
                <Link
                  href="/blog"
                  className="group mt-8 inline-flex items-center gap-2 text-pink-ink"
                >
                  All {postsByDate.length} posts
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
              <Link href={`/blog/${featured.slug}`} className="group">
                <h2 className="display-md transition-colors group-hover:text-pink-ink">
                  {featured.title}
                </h2>
                <p className="mt-5 text-lg text-ink-soft">
                  {featured.standfirst}
                </p>
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section size="sm">
        <Container>
          <Reveal>
            <div className="grid gap-8 border-t border-line pt-14 sm:grid-cols-3">
              <div>
                <p className="eyebrow text-muted">Where we are</p>
                <p className="mt-4 text-ink-soft">
                  {site.address.locality}, {site.address.region}
                  <br />
                  {site.address.country}
                </p>
              </div>
              <div>
                <p className="eyebrow text-muted">Founded</p>
                <p className="mt-4 text-ink-soft">{site.founded}</p>
              </div>
              <div>
                <p className="eyebrow text-muted">Get in touch</p>
                <p className="mt-4">
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline text-ink-soft transition-colors hover:text-ink"
                  >
                    {site.email}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
