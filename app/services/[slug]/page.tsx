import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { ProcessSteps } from "@/components/process/process-steps";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { FaqList } from "@/components/sections/faq";
import { processFaqs } from "@/content/faqs";
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

/**
 * One service. The masthead carries its commercial shape; then the problem
 * it exists for, the process as a timeline, worked examples where the
 * service has them, and the other two services as a way out.
 */
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
        deck={service.standfirst}
      >
        <dl className="mx-auto mt-12 grid max-w-4xl gap-x-8 gap-y-6 border-t border-line-strong pt-8 text-left sm:grid-cols-2 lg:grid-cols-4">
          {service.shape.map((item) => (
            <div key={item.label}>
              <dt className="label-tech text-muted">{item.label}</dt>
              <dd className="mt-3 font-heading text-base font-semibold text-ink">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      {/* The problem this service exists for. */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <SectionHeading
              align="left"
              eyebrow="The problem"
              title="What this is for"
            />
            <Reveal delay={100}>
              <div>
                <p className="text-xl leading-[1.5] text-ink sm:text-2xl">
                  {service.problem}
                </p>
                <div className="mt-10 border-t border-line-strong pt-10">
                  <p className="label-section text-accent">
                    What you are buying
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
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
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Examples"
              title={service.examplesTitle ?? "What this looks like"}
              deck={service.examplesStandfirst}
            />
            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
              {service.examples.map((example, i) => (
                <Reveal
                  key={example.title}
                  delay={(i % 3) * 80}
                  className="hover-lift flex h-full flex-col bg-surface p-7"
                >
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {example.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {example.body}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {example.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm text-ink-soft"
                      >
                        <span
                          aria-hidden
                          className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {showFaqs ? (
        <Section>
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
              <SectionHeading
                align="left"
                eyebrow="The mechanics"
                title="What you are actually agreeing to"
              />
              <Reveal delay={100}>
                <FaqList items={processFaqs} />
              </Reveal>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* The other two services. */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <p className="label-section text-muted">Also</p>
          <div className="mt-8 grid border-t border-line-strong sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="group py-10 sm:even:pl-10 sm:odd:pr-10 sm:odd:border-r sm:odd:border-line"
              >
                <h3 className="font-display text-xl leading-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
                  {other.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  {other.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-accent uppercase">
                  How it works
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
