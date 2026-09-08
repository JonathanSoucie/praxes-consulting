import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StepPanelView } from "@/components/process/step-panel";
import { STAR_COLOR, starField } from "@/components/sections/hole-geometry";
import { servicesSection } from "@/content/manufacturing";
import { services } from "@/content/services";
import styles from "./services-panel.module.css";

const STARS = starField(90, 0x5f2d);

/** Each engagement pairs readable copy with its illustrative output. */
export function ServicesPanel() {
  return (
    <section aria-labelledby="services-title" className={styles.section}>
      <div aria-hidden className={styles.sky}>
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
        <Reveal className={styles.heading}>
          <div>
            <Eyebrow>{servicesSection.eyebrow}</Eyebrow>
            <h2 id="services-title">{servicesSection.title}</h2>
          </div>
          <p>
            Five focused services. Each one turns published distributor data
            into a specific answer for your commercial team.
          </p>
        </Reveal>

        <ul className={styles.list}>
          {services.map((service, i) => (
            <Reveal key={service.slug} as="li" className={styles.serviceCard}>
              <div className={styles.copy}>
                <div className={styles.meta}>
                  <span className={styles.number}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    {i === 0 ? "Start with the census" : "Build on the census"}
                  </span>
                </div>
                <h3>{service.name}</h3>
                <p>{service.showcase.blurb}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className={styles.serviceLink}
                >
                  How it works<span className="sr-only">: {service.name}</span>
                  <ArrowUpRight size={18} aria-hidden />
                </Link>
              </div>
              <div className={styles.preview}>
                <div className={styles.previewHeading}>
                  <span className={styles.previewDot} aria-hidden />
                  <span>Example output</span>
                  <span className={styles.previewType}>
                    {service.showcase.panel.kind === "bars"
                      ? "Brand mix"
                      : "Channel findings"}
                  </span>
                </div>
                <StepPanelView panel={service.showcase.panel} active />
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className={styles.footer}>
          <p>Explore the scope and deliverables of each service.</p>
          <Button asChild variant="outline" size="lg">
            <Link href="/services">
              View all services
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
