import { Eyebrow } from "@/components/ui/eyebrow";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { processSteps } from "@/content/process";
import styles from "./minimal-sections.module.css";

export function ProcessOverview() {
  return (
    <section
      className={`${styles.section} ${styles.divided}`}
      aria-labelledby="process-overview-title"
    >
      <Container>
        <Reveal className={styles.intro}>
          <div>
            <Eyebrow className={styles.eyebrow}>How it runs</Eyebrow>
            <h2 id="process-overview-title">
              From first call to clear evidence.
            </h2>
          </div>
          <p className={styles.deck}>
            Five stages, from scoping your channel to tracking what changes.
            Every finding linked to its source.
          </p>
        </Reveal>
        <ol className={styles.timeline}>
          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              className={styles.stage}
              delay={i * 50}
            >
              <span className={styles.stageNumber}>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.brief}</p>
              <span className={styles.duration}>
                {step.tag === "Free" ? "Free · " : ""}
                {step.duration}
              </span>
            </Reveal>
          ))}
        </ol>
        <Reveal className={styles.processFooter}>
          <p>Start with a free, 30-minute scoping call.</p>
          <Link href="/services">
            Explore our services
            <ArrowUpRight size={17} aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
