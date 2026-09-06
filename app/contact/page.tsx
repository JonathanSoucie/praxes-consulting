import type { Metadata } from "next";
import { Clock, MessageSquare, Scale } from "lucide-react";

import { Container, Section } from "@/components/container";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/section-heading";
import { BookingEmbed } from "@/components/cal-embed";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/sections/faq";
import { Reveal } from "@/components/reveal";

import { JsonLd } from "@/components/json-ld";

import { contactFaqs } from "@/content/faqs";
import { site } from "@/content/site";
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Schedule a Discovery Call",
  description:
    "Tell us about your distributor network — how many domains, which regions, which categories you are contesting and which competitor brands you want counted — and we'll tell you what a census of your channel would cover.",
  path: "/contact",
  keywords: [
    "distributor channel audit",
    "channel census consultation",
    "displacement mapping distributors",
    "competitor brand analysis manufacturers",
  ],
});

const expectations = [
  {
    icon: Clock,
    title: "Thirty minutes, and we keep to it",
    body: "How many distributors you sell through, which regions, which categories you are contesting, and which competitors you already worry about. No presentation, and no preparation needed from you.",
  },
  {
    icon: Scale,
    title: "A scope, and a straight read",
    body: "You leave knowing what a census of your network would actually cover and what it would cost — including when the answer is that your channel is too small or too offline to be worth crawling.",
  },
  {
    icon: MessageSquare,
    title: "A sample report if you want one",
    body: "We will share an anonymised displacement or whitespace sample from a reference engagement so you can see the findings and the evidence links before committing to anything.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "ContactPage",
            name: "Schedule a Channel Discovery Call",
            description:
              "Book a free 30-minute channel discovery call with Praxes, or send a message.",
            path: "/contact",
          }),
          // Valid because <FaqList> below renders these exact items.
          faqPageSchema(contactFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Contact"
        title="Find out what your distributors are publishing."
        deck="Tell us about your channel: how many distributors, which regions and categories, and which competitor brands you want counted. Pick a time below, or write to us with the form further down."
      />
      {/* ---------------------------------------------------------------- */}
      {/* Booking widget — lifted into the seam under the header            */}
      {/* ---------------------------------------------------------------- */}
      <Container className="relative -mt-12 pb-4">
        <Reveal>
          <BookingEmbed />
        </Reveal>
      </Container>

      {/* ---------------------------------------------------------------- */}
      {/* What to expect                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="What to expect" title="On the call." />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {expectations.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 60}
                className="card-raise rounded-xl bg-surface p-7"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-accent-soft">
                  <item.icon
                    aria-hidden
                    strokeWidth={1.8}
                    className="size-5 text-accent"
                  />
                </span>
                <h3 className="card-title mt-5 text-lg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Contact form                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section id="contact-form" className="scroll-mt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Or write to us"
                title="Prefer email?"
                deck="Tell us roughly how many distributors you sell through, the categories you are contesting, and one or two competitor brands you would want counted. We reply to everything within one business day."
              />

              <Reveal delay={80} className="mt-10 space-y-5 text-sm">
                <div>
                  <p className="text-xs font-medium text-muted">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1.5 block text-ink transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted">Phone</p>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="mt-1.5 block text-ink transition-colors hover:text-accent"
                  >
                    {site.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted">Based in</p>
                  <p className="mt-1.5 text-ink">
                    {site.address.locality}, {site.address.region},{" "}
                    {site.address.country}
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Quick FAQ                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Questions" title="Before you book." />
          <Reveal delay={80} className="mx-auto mt-14 max-w-3xl">
            <FaqList items={contactFaqs} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
