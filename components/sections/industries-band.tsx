import { SectionStars } from "./section-stars";
import { Factory, Fuel, Truck, Car, Cog, Zap } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { industries } from "@/content/manufacturing";
import styles from "./minimal-sections.module.css";

const industryIcons = [Factory, Fuel, Truck, Car, Cog, Zap];

export function IndustriesBand() {
  return (
    <section
      className={`${styles.section} ${styles.divided} ${styles.starSection}`}
      aria-labelledby="industries-title"
    >
      <SectionStars seed={0x4b92} />
      <Container>
        <Reveal className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Who we help</p>
            <h2 id="industries-title">Built for industrial channels.</h2>
          </div>
          <p className={styles.deck}>
            For eight-figure manufacturers and independent distributors
            competing for a place on the shelf.
          </p>
        </Reveal>
        <ul className={styles.steps}>
          {industries.map((industry, i) => {
            const Icon = industryIcons[i];
            return (
              <Reveal
                key={industry.name}
                as="li"
                delay={(i % 3) * 60}
                className={styles.step}
              >
                <div className={styles.stepTop}>
                  <Icon size={25} strokeWidth={1.4} aria-hidden />
                  <span>0{i + 1}</span>
                </div>
                <h3>{industry.name}</h3>
                <p>{industry.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
