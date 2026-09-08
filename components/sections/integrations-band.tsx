import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionStars } from "./section-stars";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import Link from "next/link";
import { ArrowUpRight, ScanLine, ShieldCheck, FileCheck2 } from "lucide-react";
import styles from "./minimal-sections.module.css";
import { integrationApproach } from "@/content/integrations";

/** The collection principles behind Channel Intelligence. */
export function IntegrationsBand() {
  return (
    <section
      className={`${styles.section} ${styles.methodBackground} ${styles.starSection}`}
      aria-labelledby="how-we-work-title"
    >
      <SectionStars seed={0x7c31} />
      <Container>
        <Reveal className={styles.intro}>
          <div>
            <Eyebrow className={styles.eyebrow}>
              {integrationApproach.eyebrow}
            </Eyebrow>
            <h2 id="how-we-work-title">{integrationApproach.title}</h2>
          </div>
          <p className={styles.deck}>{integrationApproach.deck}</p>
        </Reveal>
        <ol className={styles.steps}>
          {integrationApproach.points.slice(0, 3).map((point, i) => {
            const Icon = [ScanLine, ShieldCheck, FileCheck2][i];
            return (
              <Reveal
                as="li"
                key={point.title}
                delay={i * 70}
                className={styles.step}
              >
                <div className={styles.stepTop}>
                  <span>0{i + 1}</span>
                  <Icon size={22} strokeWidth={1.4} aria-hidden />
                </div>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </Reveal>
            );
          })}
        </ol>
        <Reveal className={styles.assurances}>
          {integrationApproach.points.slice(3).map((point) => (
            <div key={point.title} className={styles.assurance}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className={styles.footer}>
          <Link href="/services">
            Explore our services
            <ArrowUpRight size={17} aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
