"use client";

import { useId } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Maximize2, TrendingUp } from "lucide-react";

import styles from "./product-insights.module.css";

export type ProductInsightScenario = "competitors" | "changes";
export type ProductInsightPreview = { src: string; alt: string; title: string };
export type ProductInsightsProps = {
  onExplore: (scenario: ProductInsightScenario) => void;
  onPreview?: (image: ProductInsightPreview) => void;
  className?: string;
};

// The same sample records used by the interactive platform demo.
const competitors = [
  { name: "Brand X", count: 339, share: "31%", color: "#655d91" },
  { name: "Brand Y", count: 302, share: "27%", color: "#8d80ad" },
  { name: "Brand Z", count: 283, share: "26%", color: "#b3a8c8" },
  { name: "Other brands", count: 181, share: "16%", color: "#ddd6e5" },
] as const;
const competingTotal = competitors.reduce((sum, competitor) => sum + competitor.count, 0);

const previews: Record<ProductInsightScenario, ProductInsightPreview> = {
  competitors: {
    src: "/platform/displacement.webp",
    alt: "Praxes displacement dashboard with the competing brands and catalogue presence in the demonstration account",
    title: "Displacement mapping — demo data",
  },
  changes: {
    src: "/platform/change-monitor.webp",
    alt: "Praxes change monitoring dashboard showing changes in the demonstration distributor catalogues",
    title: "Change monitoring — demo data",
  },
};

export function ProductInsights({ onExplore, onPreview, className = "" }: ProductInsightsProps) {
  const id = useId();

  function previewButton(scenario: ProductInsightScenario) {
    if (!onPreview) return null;
    return (
      <button
        type="button"
        className={styles.previewButton}
        onClick={() => onPreview(previews[scenario])}
        aria-label={`View ${scenario === "competitors" ? "displacement mapping" : "change monitoring"} platform screenshot`}
        title="View platform screenshot"
      >
        <Maximize2 size={14} strokeWidth={1.7} aria-hidden="true" />
      </button>
    );
  }

  return (
    <section id="signals" className={`${styles.insights} ${className}`} aria-labelledby={`${id}-signals-title`}>
      <div className={styles.sectionHeading}>
        <p className={styles.chapter}>02 / Find where to focus</p>
        <h2 id={`${id}-signals-title`}>Spot the signals.<br /><span>Find your priorities.</span></h2>
        <p className={styles.intro}>Once you know what your channel publishes, see who shares the shelf and what is changing. Turn catalogue coverage into a focused account conversation.</p>
      </div>

      <div className={styles.cardGrid}>
      <article className={styles.insight} aria-labelledby={`${id}-competitors-title`}>
        <div className={styles.copy}>
          <h3 id={`${id}-competitors-title`}>Who shares your shelf.</h3>
          <p>Compare competing brands across your readable catalogues, then look closer at the accounts that matter.</p>
        </div>
        <div className={styles.visual}>
          <div className={styles.productCard}>
            <div className={styles.cardChrome}>
              <span className={styles.cardIdentity}><BarChart3 size={15} strokeWidth={1.7} aria-hidden="true" /> Displacement</span>
              <div className={styles.cardTools}><span className={styles.demoBadge}>Demo data</span>{previewButton("competitors")}</div>
            </div>
            <div className={styles.chartContent}>
              <div className={styles.cardHeading}>
                <p className={styles.cardTitle}>Competitor landscape</p>
                <p>Published listings in your categories</p>
              </div>
              <div className={styles.total}><strong>1,105</strong><span>competing listings<br />across the network</span></div>
              <div className={styles.stackedChart} role="img" aria-label="Of 1,105 competing listings, Brand X has 339, Brand Y has 302, Brand Z has 283, and other brands have 181.">
                {competitors.map((competitor) => <span key={competitor.name} style={{ width: `${competitor.count / competingTotal * 100}%`, background: competitor.color }} />)}
              </div>
              <dl className={styles.competitorList}>
                {competitors.map((competitor) => (
                  <div key={competitor.name} className={styles.competitorRow}>
                    <dt><span className={styles.swatch} style={{ background: competitor.color }} aria-hidden="true" />{competitor.name}</dt>
                    <dd><strong>{competitor.count}</strong><span>{competitor.share}</span></dd>
                  </div>
                ))}
              </dl>
              <p className={styles.dataFootnote}>Catalogue presence, not sales share.</p>
            </div>
            <div className={styles.finding}><span className={styles.findingDot} aria-hidden="true" /><p><strong>Brand X leads this sample network.</strong> Start by reviewing where its listings overlap your range.</p></div>
          </div>
        </div>

        <div className={styles.cardAction}>
          <button type="button" className={styles.exploreButton} onClick={() => onExplore("competitors")}>Explore the competitor view <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" /></button>
        </div>
      </article>

      <article className={styles.insight} aria-labelledby={`${id}-changes-title`}>
        <div className={styles.copy}>
          <h3 id={`${id}-changes-title`}>Where competitors are gaining ground.</h3>
          <p>Follow changes between catalogue reads. Know which new listings deserve a closer look before your next call.</p>
        </div>
        <div className={styles.visual}>
          <div className={`${styles.productCard} ${styles.changeCard}`}>
            <div className={styles.cardChrome}>
              <span className={styles.cardIdentity}><TrendingUp size={15} strokeWidth={1.7} aria-hidden="true" /> Change monitoring</span>
              <div className={styles.cardTools}><span className={styles.demoBadge}>Demo data</span>{previewButton("changes")}</div>
            </div>
            <div className={styles.changeContent}>
              <div className={styles.changeMeta}><span className={styles.expansionBadge}><TrendingUp size={12} aria-hidden="true" />Competitor expansion</span><span>Category B</span></div>
              <div className={styles.cardHeading}><p className={styles.cardTitle}>Brand X added listings.</p><p>Distributor 2 · Published catalogue</p></div>

              <div className={styles.comparison} aria-label="Brand X increased from 38 to 47 published listings, an increase of 9.">
                <div><span>Previous read</span><strong>38</strong><small>listings</small></div>
                <ArrowRight className={styles.comparisonArrow} size={21} strokeWidth={1.4} aria-hidden="true" />
                <div className={styles.currentValue}><span>Latest read</span><strong>47</strong><small>listings</small></div>
                <span className={styles.changeAmount}>+9</span>
              </div>

              <div className={styles.comparisonChart} aria-hidden="true">
                <div><span>Previous</span><i style={{ width: `${38 / 47 * 100}%` }} /></div>
                <div><span>Latest</span><i style={{ width: "100%" }} /></div>
              </div>
              <p className={styles.dataFootnote}>A change between two catalogue reads.</p>
            </div>
            <div className={styles.finding}><span className={styles.findingDot} aria-hidden="true" /><p><strong>Nine more listings in this sample.</strong> Review the new parts before the next account conversation.</p></div>
          </div>
        </div>
        <div className={styles.cardAction}>
          <button type="button" className={styles.exploreButton} onClick={() => onExplore("changes")}>Inspect a catalogue change <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" /></button>
        </div>
      </article>
      </div>
    </section>
  );
}
