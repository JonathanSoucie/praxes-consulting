"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Check, ChevronRight, FileText, Grid2X2 } from "lucide-react";
import { LogoMark } from "@/components/layout/logo-mark";
import styles from "./opportunity-story.module.css";

const steps = [
  { title: "Find the gap.", description: "Category F is missing from Distributor 2’s readable public catalogue." },
  { title: "Follow the evidence.", description: "Other distributors list the category. Your range includes 16 relevant parts already listed elsewhere." },
  { title: "Start a better conversation.", description: "Bring the account team a specific category, a relevant range and a reason to talk." },
];

export function OpportunityStory({ onExplore }: { onExplore: () => void }) {
  const [step, setStep] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % steps.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + steps.length - 1) % steps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = steps.length - 1;
    else return;
    event.preventDefault();
    setStep(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="next-move" className={styles.section} aria-labelledby="opportunity-story-title">
      <div className={styles.heading}>
        <div><p className={styles.eyebrow}><span /> 03 / Make the next move</p><h2 id="opportunity-story-title">Turn a finding into<br /><span>a focused conversation.</span></h2></div>
        <p>Here’s what that looks like: one distributor, one missing category, and a relevant range to discuss.</p>
      </div>
      <div className={styles.story}>
        <div className={styles.steps} role="tablist" aria-label="Follow a sample opportunity" aria-orientation="vertical">
          {steps.map((item, index) => <button key={item.title} type="button" role="tab" id={`story-step-${index}`} aria-selected={step === index} aria-controls="story-panel" tabIndex={step === index ? 0 : -1} ref={(element) => { tabs.current[index] = element; }} className={`${styles.step} ${step === index ? styles.activeStep : ""}`} onClick={() => setStep(index)} onKeyDown={(event) => handleKey(event, index)}><span className={styles.number}>0{index + 1}</span><span><strong>{item.title}</strong><span className={styles.description}>{item.description}</span></span><ChevronRight size={17} aria-hidden="true" /></button>)}
        </div>
        <div className={styles.stage}>
          <div className={styles.window}>
            <div className={styles.chrome}><span><LogoMark size={19} /> Opportunity detail</span><span className={styles.demoBadge}>Demo data</span></div>
            <div className={styles.panel} id="story-panel" role="tabpanel" aria-labelledby={`story-step-${step}`} tabIndex={0}>
              <div className={styles.account}><span>Distributor 2</span><ChevronRight size={12} aria-hidden="true" /><span>Category F</span></div>
              {step === 0 && <div className={styles.panelContent}>
                <span className={styles.sectionIcon}><Grid2X2 size={21} aria-hidden="true" /></span>
                <h3>A category with room to explore.</h3><p>No manufacturer is listed in Category F in this public catalogue.</p>
                <div className={styles.gapRow}><div><span>Category F</span><strong>No published listings</strong></div><span className={styles.emptyBadge}>Empty</span></div>
                <div className={styles.readStatus}><Check size={14} aria-hidden="true" /> Public catalogue readable <span>15 Sep 2026</span></div>
              </div>}
              {step === 1 && <div className={styles.panelContent}>
                <span className={styles.sectionIcon}><FileText size={21} aria-hidden="true" /></span>
                <h3>Your range already fits the category.</h3><p>Compare the gap with what is listed elsewhere in your network.</p>
                <div className={styles.evidenceMetrics}><div><strong>16</strong><span>relevant parts in your range,<br />listed elsewhere</span></div><div><strong>2 <small>/ 3</small></strong><span>peer distributors<br />list this category</span></div></div>
                <p className={styles.panelNote}>A starting point for range review, supported by catalogue evidence.</p>
              </div>}
              {step === 2 && <div className={styles.panelContent}>
                <span className={styles.sectionIcon}><FileText size={21} aria-hidden="true" /></span>
                <h3>A focused brief for your next call.</h3><p>Distributor 2 · Category F range review</p>
                <ol className={styles.brief}><li><span>01</span>Confirm the published catalogue gap.</li><li><span>02</span>Discuss category fit and demand.</li><li><span>03</span>Share a line card with the 16 relevant parts.</li></ol>
              </div>}
              <div className={styles.panelFooter}><span>Sample opportunity · Whitespace</span>{step < 2 ? <button type="button" onClick={() => setStep(step + 1)}>Next step <ArrowRight size={14} aria-hidden="true" /></button> : <button type="button" onClick={onExplore}>Open in the demo <ArrowRight size={14} aria-hidden="true" /></button>}</div>
            </div>
          </div>
          <p className={styles.caption}>Illustrative workflow using the same sample data as the interactive demo.</p>
        </div>
      </div>
    </section>
  );
}
