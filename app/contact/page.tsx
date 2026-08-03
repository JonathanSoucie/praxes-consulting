import type { Metadata } from "next";
import { Clock, MessageSquare, Scale } from "lucide-react";

import { Container, Section } from "@/components/container";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/section-heading";
import { BookingEmbed } from "@/components/cal-embed";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/sections/faq";
import { Reveal } from "@/components/reveal";

import { contactFaqs } from "@/content/faqs";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book your free 15-minute discovery call with Praxes, or send us a message. We reply to everything within one business day.",
  alternates: { canonical: "/contact" },
};

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
      <PageHeader
        eyebrow="Contact"
        title="Book your free 15-minute discovery call."
        deck="Pick a time that suits you below. If you'd rather write first, the form further down reaches us directly."
      />

      {/* ---------------------------------------------------------------- */}
      {/* Booking widget                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section className="pt-14 sm:pt-16">
        <Container>
          <Reveal>
            <BookingEmbed />
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* What to expect                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="muted" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="S.01 — What to expect"
            title="What happens on the call."
          />

          <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
            {expectations.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 60}
                className="bg-surface p-8"
              >
                <item.icon
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-5 text-accent"
                />
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
      <Section id="contact-form" className="scroll-mt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="S.02 — Or write to us"
                title="Prefer email?"
                deck="Tell us roughly what's slowing you down. We reply to everything within one business day."
              />

              <Reveal delay={80} className="mt-10 space-y-4 text-sm">
                <div>
                  <p className="label-eyebrow text-muted">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 block text-ink transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="label-eyebrow text-muted">Phone</p>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="figure-num mt-2 block text-ink transition-colors hover:text-accent"
                  >
                    {site.phone}
                  </a>
                </div>
                <div>
                  <p className="label-eyebrow text-muted">Based in</p>
                  <p className="mt-2 text-ink">
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
      <Section tone="muted">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="S.03 — Questions"
              title="Before you book."
            />
            <Reveal delay={80}>
              <FaqList items={contactFaqs} />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
