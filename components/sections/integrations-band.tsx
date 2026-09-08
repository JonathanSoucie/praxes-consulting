import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionStars } from "./section-stars";
import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import Link from "next/link";
import { ArrowUpRight, ScanLine, ShieldCheck, FileCheck2 } from "lucide-react";
import styles from "./minimal-sections.module.css";
import {
  integrationApproach,
  integrationSystems,
} from "@/content/integrations";

/**
 * The platforms distributor catalogs run on and the systems findings land
 * in, as a slow scrolling row, and underneath it the answer to the question
 * the row provokes: fine, but what exactly are you doing to those sites?
 *
 * HOW THE ROW LOOPS
 *
 * The track holds the list twice and travels exactly -50% of itself, so the
 * moment the first copy has left, the second is sitting where the first
 * began and the jump back to 0 is invisible. That is the whole trick, and it
 * is why the duplicate is not optional. The second copy is `aria-hidden`,
 * because it is the same list again and a screen reader should hear it once.
 *
 * Type, not logos. Every system here is someone else's trademark, we have no
 * partnership with any of them, and a wall of other people's marks reads as
 * endorsement whether or not it is meant to. See content/integrations.ts.
 *
 * Under prefers-reduced-motion the track does not move at all — see the rule
 * on `.marquee-track` in globals.css, which overrides the blanket one that
 * would otherwise snap it to its end position.
 */
export function IntegrationsBand() {
  return (
    <div className={styles.integrationsGroup}>
      <Section
        className={`${styles.platformBand} overflow-hidden border-t border-white/20`}
      >
        <Container>
          <Reveal>
            <p className="text-center text-base text-ink-soft sm:text-lg">
              Platforms we read, and systems findings land in
            </p>
          </Reveal>
        </Container>

        {/* Full-bleed, and outside the Container: the row should run off both
          edges of the page rather than stopping at the gutter, or it reads as
          a widget instead of as something passing through.

          Two elements, and that is deliberate. The rules belong to the outer
          one and the fade to the inner one, because a mask applies to an
          element's border as well as its content — put both on one element
          and the rules dissolve at the ends along with the wordmarks, which
          is the opposite of what a rule is for. */}
        <div className="integrations-marquee relative mt-10 border-y border-line-strong py-7 lg:mt-12">
          <div
            style={{
              maskImage:
                "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div className="marquee-track flex w-max animate-marquee items-stretch">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1 || undefined}
                  className="flex shrink-0 items-stretch"
                >
                  {integrationSystems.map((system) => (
                    <li
                      key={system.name}
                      className="flex shrink-0 flex-col justify-center border-l border-line px-8 lg:px-12"
                    >
                      <span className="font-sans text-lg font-semibold whitespace-nowrap text-ink-soft lg:text-xl">
                        {system.name}
                      </span>
                      <span className="label-tech mt-1.5 text-muted">
                        {system.kind}
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </Section>
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
                    <Icon size={25} strokeWidth={1.4} aria-hidden />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </Reveal>
              );
            })}
          </ol>
          <Reveal className={styles.assurances}>
            {integrationApproach.points.slice(3).map((point) => (
              <div key={point.title}>
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
    </div>
  );
}
