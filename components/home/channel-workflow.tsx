"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, BarChart3, Bell, Check, ChevronRight, FileText, Grid2X2, Network, Target } from "lucide-react";
import styles from "./channel-workflow.module.css";

export type WorkflowScenario = "census" | "competitors" | "category-gap" | "changes" | "sales-signals";

const distributors = [
  { name: "Distributor 1", pages: "2,100", status: "Readable" },
  { name: "Distributor 2", pages: "5,400", status: "Readable" },
  { name: "Distributor 3", pages: "900", status: "Readable" },
  { name: "Distributor 4", pages: "3,300", status: "Readable" },
  { name: "Distributor 5", pages: "—", status: "Gated" },
  { name: "Distributor 6", pages: "—", status: "Not read" },
];

function ProductHeader({ icon, title }: { icon: ReactNode; title: string }) {
  return <div className={styles.productHeader}><span>{icon}{title}</span><span className={styles.demoBadge}>Demo data</span></div>;
}

export function ChannelWorkflow({ onExplore }: { onExplore: (scenario: WorkflowScenario) => void }) {
  const [catalogueView, setCatalogueView] = useState<"displacement" | "whitespace">("displacement");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  function changeTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") next = 1 - index;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 1;
    else return;
    event.preventDefault();
    setCatalogueView(next === 0 ? "displacement" : "whitespace");
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="how-it-works" className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.heading}>
        <div><p className={styles.eyebrow}><span /> A typical workflow</p><h2 id={`${id}-title`}>One network.<br /><span>A connected workflow.</span></h2></div>
        <p className={styles.intro}>Follow Distributor 2 from the first catalogue read to a signal your team can act on.</p>
      </div>

      <ol className={styles.workflow}>
        <li className={styles.step}>
          <span className={styles.stepNumber} aria-hidden="true">01</span>
          <div className={styles.copy}>
            <h3>Start with the census.</h3>
            <p>Six distributors. Four readable catalogues. Start with Distributor 2, where 5,400 product pages are available to review.</p>
            <span className={styles.outcome}>Know what you can see before comparing accounts.</span>
            <button className={styles.explore} type="button" onClick={() => onExplore("census")}>Explore the census <ArrowRight size={15} aria-hidden="true" /></button>
          </div>
          <div className={styles.stage}>
            <div className={styles.product}>
              <ProductHeader icon={<Network size={15} aria-hidden="true" />} title="Channel census" />
              <div className={styles.censusSummary}><span><strong>6</strong> distributors</span><span><span className={styles.readableDot} /> <strong>4</strong> readable catalogues</span></div>
              <table className={styles.censusTable}>
                <caption className={styles.srOnly}>Sample distributor catalogue coverage as of September 15, 2026</caption>
                <thead><tr><th scope="col">Distributor</th><th scope="col">Coverage</th><th scope="col">Pages</th></tr></thead>
                <tbody>{distributors.map((distributor, index) => <tr key={distributor.name} className={index === 1 ? styles.selectedRow : undefined}>
                  <th scope="row">{distributor.name}{index === 1 && <ChevronRight size={12} aria-hidden="true" />}</th>
                  <td><span className={distributor.status === "Readable" ? styles.readable : styles.limited}>{distributor.status}</span></td>
                  <td>{distributor.pages}</td>
                </tr>)}</tbody>
              </table>
            </div>
          </div>
        </li>

        <li className={styles.step}>
          <span className={styles.stepNumber} aria-hidden="true">02</span>
          <div className={styles.copy}>
            <h3>Open the distributor’s catalogue.</h3>
            <p>Compare competing brands in Category B. Then switch to Whitespace to see what is missing in Category F.</p>
            <span className={styles.outcome}>Move from an account to a specific category to review.</span>
            <button className={styles.explore} type="button" onClick={() => onExplore(catalogueView === "displacement" ? "competitors" : "category-gap")}>Explore this catalogue <ArrowRight size={15} aria-hidden="true" /></button>
          </div>
          <div className={styles.stage}>
            <div className={styles.product}>
              <ProductHeader icon={<FileText size={15} aria-hidden="true" />} title="Distributor 2" />
              <div className={styles.tabs} role="tablist" aria-label="Explore Distributor 2’s catalogue">
                {(["displacement", "whitespace"] as const).map((view, index) => <button key={view} type="button" role="tab" ref={(element) => { tabRefs.current[index] = element; }} id={`${id}-${view}-tab`} aria-controls={`${id}-${view}-panel`} aria-selected={catalogueView === view} tabIndex={catalogueView === view ? 0 : -1} className={catalogueView === view ? styles.activeTab : undefined} onClick={() => setCatalogueView(view)} onKeyDown={(event) => changeTab(event, index)}>
                  {view === "displacement" ? <BarChart3 size={14} aria-hidden="true" /> : <Grid2X2 size={14} aria-hidden="true" />}{view === "displacement" ? "Displacement" : "Whitespace"}
                </button>)}
              </div>
              <div className={styles.cataloguePanel} role="tabpanel" id={`${id}-displacement-panel`} aria-labelledby={`${id}-displacement-tab`} hidden={catalogueView !== "displacement"} tabIndex={0}>
                <div className={styles.panelMeta}><strong>Category B</strong><time dateTime="2026-09-15">Sep 15, 2026</time></div>
                <div className={styles.brandList} aria-label="Published competitor listings in Category B">
                  <div className={styles.highlightBrand}><span><i /> Brand X</span><strong>47 <small>listings</small></strong></div>
                  <div><span><i /> Brand Y</span><strong>45 <small>listings</small></strong></div>
                  <div><span><i /> Other competitors</span><strong>44 <small>listings</small></strong></div>
                </div>
                <div className={styles.productNote}><span>Your listings in this category</span><strong>14</strong></div>
              </div>
              <div className={styles.cataloguePanel} role="tabpanel" id={`${id}-whitespace-panel`} aria-labelledby={`${id}-whitespace-tab`} hidden={catalogueView !== "whitespace"} tabIndex={0}>
                <div className={styles.panelMeta}><strong>Category F</strong><time dateTime="2026-09-15">Sep 15, 2026</time></div>
                <div className={styles.gapMetrics}><div><strong>0</strong><span>published listings<br />at Distributor 2</span></div><div><strong>16</strong><span>relevant parts in your range,<br />listed elsewhere</span></div></div>
                <div className={styles.productNote}><span>Peer distributors listing Category F</span><strong>2 / 3</strong></div>
              </div>
            </div>
          </div>
        </li>

        <li className={styles.step}>
          <span className={styles.stepNumber} aria-hidden="true">03</span>
          <div className={styles.copy}>
            <h3>Follow what changes.</h3>
            <p>Brand X grew from 38 to 47 listings in Category B between reads. The change is tied to the distributor, brand and category.</p>
            <span className={styles.outcome}>Review the nine additions before your next account conversation.</span>
            <button className={styles.explore} type="button" onClick={() => onExplore("changes")}>Review the change <ArrowRight size={15} aria-hidden="true" /></button>
          </div>
          <div className={styles.stage}>
            <div className={styles.product}>
              <ProductHeader icon={<Bell size={15} aria-hidden="true" />} title="Change monitor" />
              <div className={styles.changeBody}>
                <div className={styles.panelMeta}><strong>Distributor 2 · Category B</strong><span className={styles.changeBadge}>Expansion</span></div>
                <p className={styles.changeTitle}>Brand X</p>
                <div className={styles.comparison}>
                  <div><time dateTime="2026-08-17">Aug 17, 2026</time><strong>38</strong><span>published listings</span></div>
                  <ArrowRight size={24} aria-label="increased to" />
                  <div><time dateTime="2026-09-15">Sep 15, 2026</time><strong>47</strong><span>published listings</span></div>
                </div>
                <div className={styles.changeResult}><span>+9</span><p>New listings since the previous read</p></div>
              </div>
            </div>
          </div>
        </li>

        <li className={styles.step}>
          <span className={styles.stepNumber} aria-hidden="true">04</span>
          <div className={styles.copy}>
            <h3>Turn findings into sales signals.</h3>
            <p>The Category F gap becomes a focused brief: one account, 16 relevant parts and a clear next step for your team.</p>
            <span className={styles.outcome}>Confirm the gap and category fit with the distributor.</span>
            <button className={styles.explore} type="button" onClick={() => onExplore("sales-signals")}>Open sales signals <ArrowRight size={15} aria-hidden="true" /></button>
          </div>
          <div className={styles.stage}>
            <div className={styles.product}>
              <ProductHeader icon={<Target size={15} aria-hidden="true" />} title="Sales signal" />
              <div className={styles.signalBody}>
                <div className={styles.panelMeta}><span className={styles.signalType}><Grid2X2 size={12} aria-hidden="true" /> Whitespace</span><span>Account brief</span></div>
                <p className={styles.signalTitle}>Distributor 2 · Category F</p>
                <div className={styles.range}><strong>16</strong><span>relevant parts in your range<br />already listed elsewhere</span></div>
                <ol className={styles.brief}><li><span>1</span>Confirm the gap</li><li><span>2</span>Check category fit</li><li><span>3</span>Discuss the relevant range</li></ol>
                <div className={styles.readStatus}><Check size={12} aria-hidden="true" /> Public catalogue readable <time dateTime="2026-09-15">Sep 15, 2026</time></div>
              </div>
            </div>
          </div>
        </li>
      </ol>
      <p className={styles.footerNote}>Illustrative product views · Demo data. Findings reflect public catalogue evidence, not sales or demand. Gated and unread catalogues remain separate from category gaps.</p>
    </section>
  );
}
