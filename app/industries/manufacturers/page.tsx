import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ArrowRight, Layers3, Network, Target } from "lucide-react";

import { BookACall } from "@/components/book-a-call";
import { pageMetadata } from "@/lib/seo";

import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Channel intelligence for manufacturers",
  description:
    "Understand product coverage, competing brands and category gaps across your distributor network, with evidence from public catalogues.",
  path: "/industries/manufacturers",
  keywords: [
    "channel intelligence for manufacturers",
    "distributor catalogue coverage",
    "industrial competitor intelligence",
  ],
});

export const viewport: Viewport = { themeColor: "#1c1b23" };

const industries = [
  "Industrial & MRO",
  "Heavy equipment",
  "Automotive aftermarket",
  "Power transmission",
];

export default function ManufacturersPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="manufacturers-title">
        <div className={styles.container}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" />For manufacturers</p>
            <h1 id="manufacturers-title">A clearer view of your<br /><span>distributor network.</span></h1>
            <p className={styles.heroDescription}>
              See where your products are listed, which competitors share the
              shelf and where catalogue gaps could open a conversation.
            </p>
            <div className={styles.actions}>
              <BookACall label="Book a call" className={styles.bookButton} />
              <Link href="/#demo" className={styles.heroLink}>Explore the platform <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>

          <figure className={styles.heroFrame}>
            <figcaption className={styles.frameHeader}>
              <span><span className={styles.productDot} aria-hidden="true" />Channel overview</span>
              <span className={styles.demoBadge}>Demo data</span>
            </figcaption>
            <img
              src="/platform/overview-hero.webp"
              alt="Praxes demo overview showing category gaps and each distributor’s share of published listings"
              width={1272}
              height={353}
              fetchPriority="high"
              decoding="async"
            />
          </figure>
          <p className={styles.heroCaption}>Actual platform. Demonstration data.</p>
        </div>
      </section>

      <section className={`${styles.container} ${styles.insights}`} aria-labelledby="channel-focus-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.lightEyebrow}>Built for industrial channels</p>
            <h2 id="channel-focus-title">Know where to focus.</h2>
          </div>
          <p>
            Give your channel team a shared view of the products, brands and
            categories your distributors publish.
          </p>
        </div>
        <ul className={styles.industryList} aria-label="Manufacturing sectors">
          {industries.map((industry) => <li key={industry}>{industry}</li>)}
        </ul>

        <div className={styles.featureGrid}>
          <article className={styles.feature}>
            <div className={styles.featureCopy}>
              <p className={styles.featureLabel}>Competitive presence</p>
              <h3>Know who shares your shelf.</h3>
              <p>
                See competing brands and products by distributor and category.
                Use the published listings to prepare a more informed account review.
              </p>
            </div>
            <figure className={styles.featureFrame}>
              <figcaption className={styles.frameHeader}><span>Displacement mapping</span><span className={styles.demoBadge}>Demo data</span></figcaption>
              <img
                src="/platform/displacement.webp"
                alt="Demo displacement analysis showing your listings alongside competing products at Distributor 2"
                width={1270}
                height={598}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </article>
          <article className={styles.feature}>
            <div className={styles.featureCopy}>
              <p className={styles.featureLabel}>Category opportunities</p>
              <h3>Find a reason to start the conversation.</h3>
              <p>
                Identify empty categories in readable catalogues. Bring a focused
                range to the discussion, then validate demand and fit with the distributor.
              </p>
            </div>
            <figure className={styles.featureFrame}>
              <figcaption className={styles.frameHeader}><span>Whitespace mapping</span><span className={styles.demoBadge}>Demo data</span></figcaption>
              <img
                src="/platform/whitespace.webp"
                alt="Demo whitespace analysis identifying two empty categories in Distributor 4’s public catalogue"
                width={1272}
                height={482}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </article>
        </div>
        <p className={styles.scopeNote}>
          Findings reflect public catalogue presence, not sales or sell-through.
          Gated and unread catalogues are reported separately from category gaps.
        </p>
      </section>

      <section className={styles.nextStep} aria-labelledby="start-network-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.lightEyebrow}>Start with what you know</p>
              <h2 id="start-network-title">Your network is the starting point.</h2>
            </div>
            <p>
              A discovery call helps establish what your channel’s public
              catalogues can reveal and where to begin.
            </p>
          </div>
          <ul className={styles.inputs}>
            <li><Network size={21} strokeWidth={1.5} aria-hidden="true" /><div><h3>Your distributor websites</h3><p>A starting list of the accounts you want to understand.</p></div></li>
            <li><Layers3 size={21} strokeWidth={1.5} aria-hidden="true" /><div><h3>Your product categories</h3><p>The parts and product lines that matter to your team.</p></div></li>
            <li><Target size={21} strokeWidth={1.5} aria-hidden="true" /><div><h3>Your competing brands</h3><p>The manufacturers you want to track across the channel.</p></div></li>
          </ul>
          <div className={styles.closingActions}>
            <div className={styles.actions}>
              <BookACall label="Book a call" withArrow className={styles.bookButton} />
              <Link href="/#demo" className={styles.demoLink}>Explore the demo <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
            <p>A focused conversation about your channel</p>
          </div>
        </div>
      </section>
    </div>
  );
}
