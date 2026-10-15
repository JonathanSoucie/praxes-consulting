import { ChevronDown, FileText, ShieldCheck } from "lucide-react";

import styles from "./evidence-section.module.css";

/** A sample evidence record, using the same fictional data as the homepage demo. */
export function EvidenceSection({ className = "" }: { className?: string }) {
  return (
    <section
      className={`${styles.section} ${className}`}
      aria-labelledby="praxes-evidence-title"
    >
      <div className={styles.copy}>
        <p className={styles.eyebrow}><span aria-hidden="true" />The evidence behind the next step</p>
        <h2 id="praxes-evidence-title">A finding you can<br /><span>back up.</span></h2>
        <p className={styles.intro}>
          Every conversation starts with a source you can inspect.
        </p>
        <div className={styles.principle}>
          <ShieldCheck size={18} strokeWidth={1.5} aria-hidden="true" />
          <p>Gated and unread catalogues are reported separately from empty categories.</p>
        </div>
      </div>

      <div className={styles.visual}>
        <article className={styles.record} aria-labelledby="sample-finding-title">
          <header className={styles.recordHeader}>
            <span><FileText size={16} strokeWidth={1.5} aria-hidden="true" />Finding details</span>
            <span className={styles.demoBadge}>Demo data</span>
          </header>
          <div className={styles.recordBody}>
            <p className={styles.recordEyebrow}>Whitespace <span aria-hidden="true">·</span> Distributor 2</p>
            <h3 id="sample-finding-title">No Category F listings found.</h3>

            <dl className={styles.metadata}>
              <div><dt>Data source</dt><dd>Public catalogue</dd></div>
              <div><dt>Sample read</dt><dd><time dateTime="2026-09-15">Sep 15, 2026</time></dd></div>
              <div><dt>Coverage</dt><dd><span className={styles.coverage}><span aria-hidden="true" />Readable catalogue</span></dd></div>
            </dl>

            <div className={styles.source}>
              <span>Sample source</span>
              <code>distributor2.example/catalogue/category-f</code>
            </div>

            <details className={styles.supporting}>
              <summary>How to interpret this finding<ChevronDown size={16} aria-hidden="true" /></summary>
              <p>
                This fictional record illustrates a gap in a readable public
                catalogue. It does not establish demand, sales or offline stock.
                A real finding includes its source pages and supporting evidence.
              </p>
            </details>
          </div>
        </article>
      </div>
    </section>
  );
}
