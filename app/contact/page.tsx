import type { Metadata } from "next";
import { Clock, MessageSquare, Scale } from "lucide-react";

import { Container, Section } from "@/components/container";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/section-heading";
import { BookingEmbed } from "@/components/cal-embed";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/sections/faq";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { contactFaqs } from "@/content/faqs";
import { site } from "@/content/site";
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Book a free 15-minute call with Praxes, or send a message. We reply to everything within one business day — including when the answer is that we cannot help.";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description,
  path: "/contact",
  keywords: [
    "AI consultation",
    "free AI discovery call",
    "AI consultant Ottawa",
    "contact AI consultant",
  ],
});

const expectations = [
  {
    icon: Clock,
    title: "Fifteen minutes, and we keep to it",
    body: "A structured conversation about how your operation runs and where work backs up. No presentation, and nothing to prepare.",
  },
  {
    icon: Scale,
    title: "A straight read, including 'no'",
    body: "If we cannot see a credible case, you will hear that on the call rather than in a proposal three weeks later.",
  },
  {
    icon: MessageSquare,
    title: "Nothing is quoted on the call",
    body: "The only possible next step is the audit, and only if there is something worth measuring. No pricing pressure and no follow-up sequence.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "ContactPage",
            name: "Contact",
            description,
            path: "/contact",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          faqPageSchema(contactFaqs),
        ]}
      />

      <PageHeader
        eyebrow="Contact"
        title="Fifteen minutes. Then you will know if there is"
        accent="anything here."
        standfirst="Book the call, or write to us. Either way you get a straight answer about whether your operation has a case worth measuring."
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      >
        <dl className="grid gap-px border-t border-line sm:grid-cols-3">
          {expectations.map((item) => (
            <div key={item.title} className="pt-8 sm:pr-8">
              <item.icon aria-hidden className="size-5 text-pink-ink" />
              <dt className="mt-5 font-display text-lg">{item.title}</dt>
              <dd className="mt-3 text-ink-soft">{item.body}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <Section size="sm" id="book">
        <Container>
          <Reveal>
            <div className="border-t border-line pt-14 lg:pt-20">
              <SectionHeading
                eyebrow="Book directly"
                title="Pick a"
                accent="time."
                size="md"
              />
              <div className="mt-10">
                <BookingEmbed />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section size="sm" id="contact-form">
        <Container>
          <div className="grid gap-14 border-t border-line pt-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24 lg:pt-20">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="Or write to us"
                  title="Send a"
                  accent="message."
                  size="md"
                />
                <div className="mt-10 space-y-1.5 text-ink-soft">
                  <p>
                    <a
                      href={`mailto:${site.email}`}
                      className="link-underline transition-colors hover:text-ink"
                    >
                      {site.email}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="link-underline transition-colors hover:text-ink"
                    >
                      {site.phone}
                    </a>
                  </p>
                  <p className="pt-3 text-muted">
                    {site.address.locality}, {site.address.region},{" "}
                    {site.address.country}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="deep">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
            <Reveal>
              <SectionHeading
                eyebrow="Before you book"
                title="The usual"
                accent="questions."
              />
            </Reveal>
            <Reveal delay={100}>
              <FaqList items={contactFaqs} />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
