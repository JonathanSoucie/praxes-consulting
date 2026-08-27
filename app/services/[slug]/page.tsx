import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/container";
import { Cta } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { ProcessSteps } from "@/components/process/process-steps";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { FaqList } from "@/components/sections/faq";
import { processFaqs } from "@/content/faqs";
import { audience } from "@/content/positioning";
import { getService, services } from "@/content/services";
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.title,
    description: service.standfirst,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  // The engagement FAQ is about commercial mechanics — what is paid, what
  // happens if the answer is no, whether you are locked in — so it belongs on
  // the audit page, which is the thing being bought, and nowhere else.
  const showFaqs = service.slug === "automations-audit";

  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            name: service.title,
            description: service.standfirst,
            path: `/services/${service.slug}`,
          }),
          webPageSchema({
            type: "WebPage",
            name: service.title,
            description: service.standfirst,
            path: `/services/${service.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
          // FAQPage markup is only valid where the questions are actually
          // rendered, which is the condition Google checks for.
          ...(showFaqs ? [faqPageSchema(processFaqs)] : []),
        ]}
      />

      <PageHeader
        eyebrow="What we offer"
        title={service.title}
        standfirst={service.standfirst}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
      >
        <dl className="grid gap-px border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {service.shape.map((item) => (
            <div key={item.label} className="pt-6 sm:pr-8">
              <dt className="eyebrow text-muted">{item.label}</dt>
              <dd className="mt-3 font-display text-lg text-ink">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      {/* The problem this service exists for, on the black ground. Every
          service page falls into the black hole once, in the same place. */}
      <Section tone="deep">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <Reveal>
              <SectionHeading
                eyebrow="The problem"
                title="What this is"
                accent="for."
              />
            </Reveal>
            <Reveal delay={100}>
              <div>
                <p className="text-xl leading-[1.5] text-ink sm:text-2xl">
                  {service.problem}
                </p>
                <div className="mt-10 border-t border-line pt-10">
                  <p className="eyebrow text-muted">What you are buying</p>
                  <p className="mt-5 text-lg text-ink-soft">
                    {service.definition}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ProcessSteps
        eyebrow="The process"
        title={service.processTitle}
        standfirst={service.processStandfirst}
        steps={service.process}
      />

      {service.examples?.length ? (
        <Section tone="deep">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Examples"
                title={service.examplesTitle ?? "What this looks like"}
                standfirst={service.examplesStandfirst}
              />
            </Reveal>
            <div className="mt-16 grid gap-px sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
              {service.examples.map((example, i) => (
                <Reveal key={example.title} delay={(i % 3) * 80}>
                  <article className="flex h-full flex-col border-t border-line py-8 sm:pr-8">
                    <h3 className="font-display text-xl text-pink-ink">
                      {example.title}
                    </h3>
                    <p className="mt-4 flex-1 text-ink-soft">{example.body}</p>
                    <ul className="mt-6 space-y-2">
                      {example.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-sm text-muted"
                        >
                          <span
                            aria-hidden
                            className="mt-2 size-1 shrink-0 rounded-full bg-pink-2"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* The exclusion. It used to close the audience section on the home
          page, where it read as pre-emptive — nobody three screens in has yet
          asked whether they qualify. On the audit page they have. */}
      {showFaqs ? (
        <Section size="sm">
          <Container>
            <Reveal>
              <div className="border-t border-line pt-14 lg:pt-20">
                <p className="eyebrow text-muted">Before you book</p>
                <h2 className="display-md mt-6">{audience.notForWho.title}</h2>
                <p className="measure-wide mt-6 text-lg text-ink-soft">
                  {audience.notForWho.body}
                </p>
              </div>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {showFaqs ? (
        <Section tone="deep">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
              <Reveal>
                <SectionHeading
                  eyebrow="The mechanics"
                  title="What you are actually"
                  accent="agreeing to."
                />
              </Reveal>
              <Reveal delay={100}>
                <FaqList items={processFaqs} />
              </Reveal>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* The other two services. */}
      <Section>
        <Container>
          <p className="eyebrow text-muted">Also</p>
          <div className="mt-8 grid gap-px border-t border-line sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="group py-10 transition-colors sm:even:pl-10 sm:odd:pr-10"
              >
                <h3 className="display-md transition-colors group-hover:text-pink-ink">
                  {other.name}
                </h3>
                <p className="mt-4 text-ink-soft">{other.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
