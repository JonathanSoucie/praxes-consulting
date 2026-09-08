import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StepPanelView } from "@/components/process/step-panel";
import { STAR_COLOR, starField } from "@/components/sections/hole-geometry";
import { servicesSection } from "@/content/manufacturing";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import styles from "./refined-home.module.css";

/**
 * The services on the home page: one row per engagement, alternating — copy
 * on the left and the output beside it, then the output on the left and the
 * copy beside it, and so on down.
 *
 * The alternation is a `lg:order-*` swap rather than two different row
 * markups. Below lg the grid collapses to one column, and there the copy
 * must lead every time: a reader on a phone should meet the name of the
 * thing before the diagram of its output, whatever side it would have sat on
 * upstairs. Source order is copy-then-panel throughout, so that is what a
 * screen reader and a narrow screen both get.
 *
 * There are five rows because there are five engagements. The sixth would
 * have to be invented.
 *
 * The output panels are drawn, not photographed. That is the same argument
 * components/process/step-panel.tsx makes about the process visuals: a
 * screenshot of a system not yet built for the client reading it would be a
 * lie, and a stock illustration says nothing. These say the specific thing
 * the copy beside them is claiming. Their figures are illustrative of shape
 * and are flagged as such in content/services.ts.
 *
 * The section sits on the page colour with the same sky as the scene above,
 * so the black hole's field runs straight through into it, and starts a long
 * way down because that scene ends on the circle and its labels.
 */

/** A different seed from the hero's, so the two skies are not the same
    arrangement of dots twice on one page. */
const STARS = starField(90, 0x5f2d);

export function ServicesPanel() {
  return (
    <section
      aria-labelledby="services-title"
      className={styles.services}
    >
      {/* Fade the sky toward the next section so its boundary stays quiet. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 55%, transparent 96%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 55%, transparent 96%)",
        }}
      >
        {STARS.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.d}px`,
              height: `${star.d}px`,
              opacity: star.a,
              backgroundColor: STAR_COLOR,
            }}
          />
        ))}
      </div>

      <Container>
        <Reveal className={styles.servicesIntro}>
          <div>
            <Eyebrow>{servicesSection.eyebrow}</Eyebrow>
            <h2 id="services-title">{servicesSection.title}</h2>
          </div>
          <p>From the first crawl to monthly monitoring. A clear view of your distributor network, backed by evidence.</p>
        </Reveal>

        <ul className={styles.serviceList}>
          {services.map((service, i) => {
            const panelFirst = i % 2 === 1;
            return (
              <Reveal
                key={service.slug}
                as="li"
                className={cn("channel-service-row", styles.serviceRow)}
              >
                <div
                  className={cn(
                    "channel-service-copy",
                    styles.serviceCopy,
                    panelFirst && "lg:order-2",
                  )}
                >
                  <span className={styles.serviceNumber}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>
                    {service.name}
                  </h3>
                  <p>
                    {service.showcase.blurb}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className={styles.textLink}
                  >
                    How it works
                    <ArrowRight
                      aria-hidden
                      className="size-4"
                    />
                  </Link>
                </div>

                <div
                  className={cn(
                    "channel-preview-glow",
                    styles.preview,
                    panelFirst && "lg:order-1",
                  )}
                >
                  {/* `active` is what fills the bars. There is no scrub here
                      to drive it, so they are drawn at full length. */}
                  <StepPanelView panel={service.showcase.panel} active />
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal
          delay={120}
          className={styles.servicesFooter}
        >
          <Link href="/services" className={styles.textLink}>
            View all services <ArrowRight size={17} aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
