import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { Cta } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/reveal";
import { segments } from "@/content/segments";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "The mechanics of automation are the same everywhere. What the repetitive work is made of is not. Pages for accounting practices, carriers and brokers, clinics, property managers, and clubs.";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description,
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "CollectionPage",
            name: "Industries",
            description,
            path: "/industries",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Who we work with"
        title="The mechanics are the same. The"
        accent="week isn't."
        standfirst="A clinic and a freight broker lose their week to entirely different things, and a page that could describe both describes neither. These are written one trade at a time."
        breadcrumbs={[{ label: "Industries", href: "/industries" }]}
      />

      <Section size="sm">
        <Container>
          {segments.map((segment, i) => (
            <Reveal key={segment.slug} delay={i * 70}>
              <Link
                href={`/industries/${segment.slug}`}
                className="group grid gap-6 border-t border-line py-10 last:border-b lg:grid-cols-[1fr_1.3fr_auto] lg:items-baseline lg:gap-16 lg:py-16"
              >
                <div>
                  <p className="eyebrow text-muted">{segment.who}</p>
                  <h2 className="display-md mt-4 transition-colors group-hover:text-pink-ink">
                    {segment.name}
                  </h2>
                </div>
                <div>
                  <p className="font-display text-xl text-ink">
                    {segment.title}
                  </p>
                  <p className="mt-3 text-ink-soft">{segment.summary}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm text-pink-ink">
                  Read
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}

          <Reveal>
            <p className="mt-14 max-w-2xl text-ink-soft">
              Not listed? The audit does not require us to have worked in your
              industry before — it requires the process to be repetitive,
              high-volume and measurable. Most of what we find transfers.
              Where it does not, you will hear that on the call.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
