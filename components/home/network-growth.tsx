import { ArrowRight, Check, FileSearch, Search } from "lucide-react";

import styles from "./network-growth.module.css";

const candidates = [
  { name: "Distributor A", range: "Components", brands: "Published", category: "Bearings" },
  { name: "Distributor B", range: "Industrial MRO", brands: "Published", category: "Hydraulics" },
  { name: "Distributor C", range: "Aftermarket", brands: "To review", category: "Drivetrain" },
] as const;

const review = [
  { label: "Category fit", value: "Bearings range identified", note: "Category page noted" },
  { label: "Published brands", value: "Existing brands documented", note: "Brand listings noted" },
  { label: "Catalogue access", value: "Public catalogue available", note: "Access limits recorded" },
] as const;

export function NetworkGrowth() {
  return (
    <section className={styles.section} id="grow-your-network" aria-labelledby="network-growth-title">
      <div className={styles.heading}>
        <p className={styles.eyebrow}>Beyond your current network</p>
        <h2 id="network-growth-title">Build your next<br /><span>distributor relationship.</span></h2>
        <p className={styles.intro}>Use Distributor Finder and Qualification to decide who belongs in your channel next.</p>
      </div>

      <div className={styles.cards}>
        <article className={styles.card} aria-labelledby="distributor-finder-title">
          <div className={styles.cardCopy}>
            <p className={styles.serviceLabel}><span>01</span> Distributor Finder</p>
            <h3 id="distributor-finder-title">Find the next account.</h3>
            <p>Identify potential distributors for the products and markets you want to reach. Use their public presence to build a more informed starting list.</p>
          </div>

          <div className={styles.productView}>
            <div className={styles.productHeader}><span><Search size={14} strokeWidth={1.7} aria-hidden="true" />Potential distributors</span><span className={styles.exampleBadge}>Illustrative example</span></div>
            <div className={styles.candidateTable}>
              <table>
                <caption className={styles.srOnly}>Illustrative distributor candidates and their published presence</caption>
                <thead><tr><th>Candidate</th><th>Industrial range</th><th>Brands</th><th>Categories</th></tr></thead>
                <tbody>{candidates.map((candidate, index) => (
                  <tr key={candidate.name} className={index === 0 ? styles.selectedCandidate : undefined}>
                    <th scope="row"><span className={styles.candidateMark}>{candidate.name.slice(-1)}</span><span>{candidate.name}</span></th>
                    <td><span className={styles.mobileLabel}>Industrial range</span>{candidate.range}</td>
                    <td><span className={styles.mobileLabel}>Brands</span>{candidate.brands}</td>
                    <td><span className={styles.mobileLabel}>Categories</span>{candidate.category}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p className={styles.productFooter}>A candidate list is the beginning of the review.</p>
          </div>
        </article>

        <div className={styles.connection} aria-hidden="true"><ArrowRight size={17} strokeWidth={1.6} /></div>

        <article className={styles.card} aria-labelledby="distributor-qualifier-title">
          <div className={styles.cardCopy}>
            <p className={styles.serviceLabel}><span>02</span> Distributor Qualification</p>
            <h3 id="distributor-qualifier-title">Check the fit before you commit.</h3>
            <p>Review published brands, category coverage and catalogue access. Bring evidence of the fit into your next partnership conversation.</p>
          </div>

          <div className={styles.productView}>
            <div className={styles.productHeader}><span><FileSearch size={14} strokeWidth={1.7} aria-hidden="true" />Candidate review</span><span className={styles.exampleBadge}>Illustrative example</span></div>
            <div className={styles.reviewIdentity}><span><span className={styles.candidateMark}>A</span><strong>Distributor A</strong></span><span className={styles.reviewStatus}>Ready for review</span></div>
            <dl className={styles.reviewList}>{review.map((item) => (
              <div key={item.label}>
                <dt><Check size={13} strokeWidth={1.7} aria-hidden="true" />{item.label}</dt>
                <dd><strong>{item.value}</strong><span>{item.note}</span></dd>
              </div>
            ))}</dl>
            <p className={styles.productFooter}>Evidence supports the decision. Your team makes it.</p>
          </div>
        </article>
      </div>

      <div className={styles.sectionFooter}>
        <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
        <p>Bring the right prospects into your next channel review.</p>
      </div>
    </section>
  );
}
