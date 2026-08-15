import type { Metadata } from "next";
import { Clock, MessageSquare, Scale } from "lucide-react";

import { Container, Section } from "@/components/container";
import { PageCard } from "@/components/layout/page-card";
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
  title: "Book a Free AI Consultation",
  description:
    "Book your free 15-minute AI discovery call with Praxes, or send us a message. We reply to everything within one business day.",
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
    body: "A structured conversation about how your operation runs and where work backs up. No presentation, no preparation needed from you.",
  },
  {
    icon: Scale,
    title: "A straight read, including 'no'",
    body: "If we can't see a credible case, you'll hear that on the call. We'd rather spend fifteen minutes than take you through a process that won't pay back.",
  },
  {
    icon: MessageSquare,
    title: "No pricing pressure",
    body: "Nothing is quoted on this call. The only possible next step is a longer analysis conversation, and only if there's something worth analysing.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "ContactPage",
            name: "Book a Free AI Consultation",
            description:
              "Book a free 15-minute AI discovery call with Praxes, or send a message.",
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
        title="Book your free 15-minute discovery call."
        deck="Pick a time that suits you below. If you'd rather write first, the form further down reaches us directly."
      />
      <PageCard>
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
            <SectionHeading
              eyebrow="What to expect"
              title="What happens on the call."
            />

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
                  <h3 className="mt-5 text-lg">{item.title}</h3>
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
        <Section id="contact-form" tone="card" className="scroll-mt-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Or write to us"
                  title="Prefer email?"
                  deck="Tell us roughly what's slowing you down. We reply to everything within one business day."
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
        <Section tone="wash">
          <Container>
            <SectionHeading eyebrow="Questions" title="Before you book." />
            <Reveal delay={80} className="mx-auto mt-14 max-w-3xl">
              <FaqList items={contactFaqs} />
            </Reveal>
          </Container>
        </Section>
      </PageCard>
    </>
  );
}
