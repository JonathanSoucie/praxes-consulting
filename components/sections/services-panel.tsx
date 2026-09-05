import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { automations, servicesSection } from "@/content/manufacturing";
import { services } from "@/content/services";

/**
 * The services, on the home page: a rounded panel a step up from the page,
 * with a soft ring of the brand pink sweeping through it, and one card per
 * service inside.
 *
 * After the reference: the panel is inset from the page edges and rounded,
 * so it reads as a plate laid on the ground rather than as another band; the
 * cards are a further step up from the panel, hairlined, with a title, a
 * line, and a "Read more" that goes to the service's own page. The ring
 * behind them is the reference's smoky loop in the palette's own pink —
 * a thick circular border blurred until it is a haze, placed so its arc
 * passes through the top-right corner and sweeps down and around.
 *
 * The cards are the automations themselves (content/manufacturing.ts), not
 * the three commercial wrappers they are sold under: a plant reads "RFQs
 * read on arrival" and knows what it would be buying, where "Operations
 * Automations" tells it nothing. Each card names the engagement that covers
 * it and links there, which is where the depth is — there is no page per
 * automation, and a "Read more" that went to a category page would be
 * promising one.
 */
export function ServicesPanel() {
  /** Slug -> name, for the line at the foot of each card. */
  const serviceName = new Map(services.map((s) => [s.slug, s.name]));

  return (
    <section
      aria-labelledby="services-title"
      className="px-2 pt-2 pb-4 sm:px-3 sm:pt-3 sm:pb-6"
    >
      <div className="relative isolate overflow-hidden rounded-[24px] bg-surface">
        {/* The ring. Sized off the viewport so it stays a single large
            sweep at any panel width, and blurred well past its own border
            width so what is left is a haze with a curve in it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 rounded-full border-[7vw] border-accent/[0.075] blur-[60px]"
          style={{
            width: "150vw",
            height: "150vw",
            right: "-58vw",
            top: "-88vw",
          }}
        />
        {/* A warmer pool where the ring is nearest, so the corner it enters
            from reads as the light source. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 48% 42% at 82% 8%, rgba(248,32,109,0.14) 0%, rgba(248,32,109,0) 100%)",
          }}
        />

        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-4xl">
            <Eyebrow>{servicesSection.eyebrow}</Eyebrow>
            <h2
              id="services-title"
              className="mt-6 text-3xl leading-[1.06] text-ink sm:text-4xl lg:text-[2.875rem]"
            >
              {servicesSection.title}
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {automations.map((automation, i) => (
              <Reveal
                key={automation.name}
                as="li"
                delay={(i % 3) * 70}
                className="flex flex-col rounded-[14px] border border-line-strong bg-surface-3 p-7"
              >
                <h3 className="font-heading text-xl leading-snug font-semibold text-ink">
                  {automation.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {automation.body}
                </p>
                <Link
                  href={`/services/${automation.service}`}
                  className="group mt-8 inline-flex w-fit items-center gap-1.5 text-sm text-ink-soft underline decoration-line-strong underline-offset-[5px] transition-colors hover:text-accent hover:decoration-accent"
                >
                  {serviceName.get(automation.service)}
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={240} className="mt-12 flex justify-center lg:mt-14">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View all services</Link>
            </Button>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
