"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, Bell, Bookmark,
  Check, ChevronDown, ChevronRight, CircleHelp, FileText,
  Grid2X2, LayoutDashboard, Maximize2, Minimize2, Network, Plus, RotateCcw,
  Search, ShieldCheck, Sparkles, Target, TrendingUp, X,
} from "lucide-react";
import { LogoMark } from "@/components/layout/logo-mark";
import styles from "./platform-demo.module.css";

type View = "overview" | "distributors" | "displacement" | "whitespace" | "monitoring" | "signals";
export type DemoScenario = "census" | "competitors" | "category-gap" | "changes" | "sales-signals";
type ScenarioRequest = { scenario: DemoScenario; requestId: number };
type Distributor = {
  id: number; pages: number | null; platform: string; status: "Readable" | "Gated" | "Not read";
  share: number | null; competing: number | null;
};
type Opportunity = {
  id: string; distributor: number; category: string; type: "Whitespace" | "Cross-reference" | "Competitor movement";
  title: string; description: string; metric: string; metricLabel: string; next: string;
};
type Change = { id: string; distributor: number; category: string; brand: string; type: "Expansion" | "Removed" | "Whitespace"; before: number; after: number };
type Detail = { kind: "distributor"; distributor: Distributor } | { kind: "opportunity"; opportunity: Opportunity } | { kind: "change"; change: Change };
type SignalStatus = "pitched";

const navigation = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "distributors", label: "Distributors", icon: Network },
  { id: "displacement", label: "Displacement", icon: BarChart3 },
  { id: "whitespace", label: "Whitespace", icon: Grid2X2 },
  { id: "monitoring", label: "Monitoring", icon: Bell },
  { id: "signals", label: "Sales signals", icon: Target },
] as const;

const scenarios = [
  { id: "competitors", label: "Compare competing brands", icon: BarChart3, context: "Distributor 2 · Category B", hint: "Compare your 14 listings with 136 competitor listings in the same category." },
  { id: "category-gap", label: "Find a category gap", icon: Grid2X2, context: "Distributor 2 · Category F", hint: "Review an empty category with 16 relevant parts from your range listed elsewhere." },
  { id: "changes", label: "Review recent changes", icon: Bell, context: "Competitor expansion", hint: "See which brands added listings between the August 17 and September 15 sample reads." },
] as const;

const distributors: Distributor[] = [
  { id: 1, pages: 2100, platform: "Shopify", status: "Readable", share: 22.6, competing: 231 },
  { id: 2, pages: 5400, platform: "BigCommerce", status: "Readable", share: 11.9, competing: 542 },
  { id: 3, pages: 900, platform: "WooCommerce", status: "Readable", share: 24.5, competing: 72 },
  { id: 4, pages: 3300, platform: "Custom", status: "Readable", share: 8.1, competing: 260 },
  { id: 5, pages: null, platform: "Dealer portal", status: "Gated", share: null, competing: null },
  { id: 6, pages: null, platform: "Pending review", status: "Not read", share: null, competing: null },
];
const readable = distributors.filter((distributor) => distributor.status === "Readable");
const ranked = [...readable].sort((a, b) => (b.share ?? 0) - (a.share ?? 0));
const competitors = [
  { name: "Brand X", parts: 339, share: 31, color: "#605a96" },
  { name: "Brand Y", parts: 302, share: 27, color: "#8b81b0" },
  { name: "Brand Z", parts: 283, share: 26, color: "#b0a7cb" },
  { name: "Other brands", parts: 181, share: 16, color: "#d7d2e3" },
];
const opportunities: Opportunity[] = [
  { id: "e4", distributor: 4, category: "Category E", type: "Whitespace", title: "An open shelf for Category E", description: "No manufacturer is listed in this category at Distributor 4. Your range includes 29 parts already listed at other distributors.", metric: "29", metricLabel: "relevant parts in your range", next: "Validate demand with the account team, then introduce your Category E range." },
  { id: "f2", distributor: 2, category: "Category F", type: "Whitespace", title: "Bring a new category to Distributor 2", description: "Category F is empty in the public catalogue. Two of three peer distributors list this category, including 16 parts from your range.", metric: "16", metricLabel: "relevant parts in your range", next: "Discuss Category F with your distributor and share a focused line card." },
  { id: "d3", distributor: 3, category: "Category D", type: "Whitespace", title: "Close the Category D gap", description: "Distributor 3 has no published Category D listings. All three peers carry the category, and 25 of your parts are listed elsewhere.", metric: "25", metricLabel: "relevant parts in your range", next: "Confirm the catalogue gap with the buyer and review your Category D assortment." },
  { id: "f4", distributor: 4, category: "Category F", type: "Whitespace", title: "Extend your range at Distributor 4", description: "Category F is absent from this readable catalogue. Sixteen of your relevant parts appear at other distributors.", metric: "16", metricLabel: "relevant parts in your range", next: "Explore a Category F range extension with your existing account contact." },
  { id: "cross2", distributor: 2, category: "5 categories", type: "Cross-reference", title: "88 listings with a direct replacement", description: "Competitor listings from Brands W, X, Y and Z have a direct replacement in your catalogue across five categories.", metric: "88", metricLabel: "competitor listings to review", next: "Validate fit and send a focused cross-reference list to the distributor." },
  { id: "defend2", distributor: 2, category: "Category B", type: "Competitor movement", title: "Brand X is expanding in Category B", description: "Brand X grew from 38 to 47 published listings in this category between catalogue reads. Review your positioning with the account team.", metric: "+9", metricLabel: "competitor listings since last read", next: "Review the new listings and prepare a category conversation with your distributor." },
];
const changes: Change[] = [
  { id: "x-b2", distributor: 2, category: "Category B", brand: "Brand X", type: "Expansion", before: 38, after: 47 },
  { id: "z-e2", distributor: 2, category: "Category E", brand: "Brand Z", type: "Expansion", before: 24, after: 32 },
  { id: "x-e2", distributor: 2, category: "Category E", brand: "Brand X", type: "Expansion", before: 39, after: 46 },
  { id: "y-b2", distributor: 2, category: "Category B", brand: "Brand Y", type: "Expansion", before: 39, after: 45 },
  { id: "x-c3", distributor: 3, category: "Category C", brand: "Brand X", type: "Expansion", before: 4, after: 9 },
  { id: "yb1031", distributor: 2, category: "Category A", brand: "YB-1031", type: "Removed", before: 1, after: 0 },
  { id: "f2", distributor: 2, category: "Category F", brand: "All brands", type: "Whitespace", before: 3, after: 0 },
  { id: "d3", distributor: 3, category: "Category D", brand: "All brands", type: "Whitespace", before: 2, after: 0 },
];
const categoryRows = [
  { category: "Category B", listed: 159, yours: 14, competing: 136 },
  { category: "Category C", listed: 143, yours: 29, competing: 100 },
  { category: "Category E", listed: 142, yours: 14, competing: 118 },
  { category: "Category D", listed: 130, yours: 9, competing: 111 },
  { category: "Category A", listed: 99, yours: 14, competing: 77 },
];
const format = (number: number) => number.toLocaleString("en-CA");

function useNativeDialog(open: boolean, ref: React.RefObject<HTMLDialogElement | null>) {
  useEffect(() => {
    if (!open) return;
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    return () => {
      dialog?.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [open, ref]);
}

export function PlatformDemo({ className = "", scenarioRequest }: { className?: string; scenarioRequest?: ScenarioRequest }) {
  const [view, setView] = useState<View>("overview");
  const [activeScenario, setActiveScenario] = useState<DemoScenario | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [query, setQuery] = useState("");
  const [coverage, setCoverage] = useState("all");
  const [changeFilter, setChangeFilter] = useState("All changes");
  const [signalFilter, setSignalFilter] = useState("All signals");
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [signalStatuses, setSignalStatuses] = useState<Record<string, SignalStatus>>({});
  const [detail, setDetail] = useState<Detail | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [notice, setNotice] = useState("");
  const expandedRef = useRef<HTMLDialogElement>(null);
  const detailRef = useRef<HTMLDialogElement>(null);
  const baseScrollRef = useRef<HTMLDivElement>(null);
  const expandedScrollRef = useRef<HTMLDivElement>(null);
  const demoId = useId();
  useNativeDialog(expanded, expandedRef);
  useNativeDialog(detail !== null, detailRef);
  const modalOpen = expanded || detail !== null;
  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [modalOpen]);
  const savedCount = shortlist.length;
  const pitchedCount = Object.values(signalStatuses).filter((status) => status === "pitched").length;

  const startScenario = useCallback((scenario: DemoScenario) => {
    setActiveScenario(scenario);
    setNotice("");
    setDetail(null);
    if (scenario === "census") {
      setView("distributors");
      setCoverage("all");
      setQuery("");
    } else if (scenario === "competitors") {
      setView("displacement");
      setCategoryFilter("Category B");
    } else if (scenario === "category-gap") {
      setView("whitespace");
      setDetail({ kind: "opportunity", opportunity: opportunities[1] });
    } else if (scenario === "changes") {
      setView("monitoring");
      setChangeFilter("Expansion");
    } else if (scenario === "sales-signals") {
      setView("signals");
      setSignalFilter("All signals");
    }
    baseScrollRef.current?.scrollTo(0, 0);
    expandedScrollRef.current?.scrollTo(0, 0);
  }, []);
  const requestedScenario = scenarioRequest?.scenario;
  const requestId = scenarioRequest?.requestId;
  useEffect(() => {
    if (requestedScenario && requestId !== undefined) startScenario(requestedScenario);
  }, [requestedScenario, requestId, startScenario]);

  useEffect(() => {
    baseScrollRef.current?.scrollTo(0, 0);
    expandedScrollRef.current?.scrollTo(0, 0);
  }, [view]);
  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 4200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  function navigate(next: View) { setView(next); setActiveScenario(null); }
  function reset() {
    setView("overview"); setQuery(""); setCoverage("all"); setChangeFilter("All changes");
    setSignalFilter("All signals"); setSignalStatuses({}); setShortlist([]); setDetail(null);
    setActiveScenario(null); setCategoryFilter("All categories");
    baseScrollRef.current?.scrollTo(0, 0);
    expandedScrollRef.current?.scrollTo(0, 0);
    setNotice("Demo reset. Your sample workspace is ready to explore.");
  }
  function save(opportunity: Opportunity) {
    const wasSaved = shortlist.includes(opportunity.id);
    setShortlist((current) => current.includes(opportunity.id) ? current.filter((id) => id !== opportunity.id) : [...current, opportunity.id]);
    setNotice(wasSaved ? "Opportunity removed from your demo shortlist." : "Opportunity saved. Find it in Sales signals → Shortlist.");
  }
  function pitch(opportunity: Opportunity) {
    setShortlist((current) => current.includes(opportunity.id) ? current : [...current, opportunity.id]);
    setSignalStatuses((current) => ({ ...current, [opportunity.id]: "pitched" }));
    setNotice("Marked as pitched in this demo. No message was sent.");
  }
  function openOpportunity(opportunity: Opportunity) { setDetail({ kind: "opportunity", opportunity }); }
  function saveButton(opportunity: Opportunity, compact = false) {
    const saved = shortlist.includes(opportunity.id);
    return <button type="button" className={`${compact ? styles.iconButton : styles.smallButton} ${saved ? styles.savedButton : ""}`} onClick={() => save(opportunity)} aria-pressed={saved} aria-label={`${saved ? "Remove" : "Save"} ${opportunity.title}${saved ? " from" : " to"} shortlist`} title={saved ? "Remove from shortlist" : "Save to shortlist"}>
      {saved ? <Check size={14} aria-hidden="true" /> : <Bookmark size={14} aria-hidden="true" />}{!compact && (saved ? "Saved" : "Save")}
    </button>;
  }

  function panelHeading(title: string, subtitle: string, action?: ReactNode) {
    return <div className={styles.panelHeading}><div><h3>{title}</h3><p>{subtitle}</p></div>{action}</div>;
  }
  function shareChart() {
    return <div className={styles.shareChart}>
      {ranked.map((distributor) => <button type="button" key={distributor.id} className={styles.shareRow} onClick={() => setDetail({ kind: "distributor", distributor })} aria-label={`View Distributor ${distributor.id}, ${distributor.share}% listing share`}>
        <span className={styles.shareLabel}>Distributor {distributor.id}</span><span className={styles.shareTrack}><span style={{ width: `${(distributor.share ?? 0)}%` }} /></span><strong>{distributor.share}%</strong><ChevronRight size={12} aria-hidden="true" />
      </button>)}
      <div className={styles.chartScale}><span>Your share of published listings in your categories</span></div>
    </div>;
  }
  function metric(label: string, value: ReactNode, note: string, icon: ReactNode, accent = false) {
    return <div className={`${styles.metric} ${accent ? styles.accentMetric : ""}`}><span className={styles.metricLabel}>{label}{icon}</span><strong>{value}</strong><span className={styles.metricNote}>{note}</span></div>;
  }
  function sectionHeading(title: string, description: string, action?: ReactNode) {
    return <div className={styles.sectionHeading}><div><h2>{title}</h2><p>{description}</p></div>{action}</div>;
  }
  function competitorTable() {
    return <div className={styles.competitorRows}>
      <div className={styles.tableLabels}><span>Competitor</span><span>Listings</span><span>Of competing</span></div>
      {competitors.map((competitor) => <div className={styles.competitorRow} key={competitor.name}><span><i style={{ backgroundColor: competitor.color }} />{competitor.name}</span><strong>{format(competitor.parts)}</strong><span className={styles.miniTrack}><span style={{ width: `${competitor.share}%`, backgroundColor: competitor.color }} /><small>{competitor.share}%</small></span></div>)}
    </div>;
  }
  function overview() {
    return <>
      {sectionHeading("Your channel, at a glance.", "A clearer picture of the network. A better next conversation.", <span className={styles.datePill}><span /> Sep 15, 2026</span>)}
      <div className={styles.metrics}>
        {metric("Distributors", "6", "4 public catalogues readable", <Network size={14} />)}
        {metric("Competitor listings", "1,105", "Across 6 competing brands", <BarChart3 size={14} />)}
        {metric("Whitespace", "4", "Empty categories to explore", <Grid2X2 size={14} />, true)}
        {metric("Your shortlist", savedCount, pitchedCount ? `${pitchedCount} marked as pitched` : "Save a signal to get started", <Bookmark size={14} />)}
      </div>
      <div className={styles.overviewGrid}>
        <section className={styles.panel}>
          {panelHeading("Your listing share", "Where your range stands across the network", <button type="button" className={styles.textButton} onClick={() => navigate("displacement")}>Explore <ArrowUpRight size={13} /></button>)}
          {shareChart()}
        </section>
        <section className={styles.panel}>
          {panelHeading("Room to grow", "Open categories. More informed conversations.", <span className={styles.countBadge}>4</span>)}
          <div className={styles.opportunityRows}>{opportunities.slice(0, 2).map((opportunity) => <div className={styles.opportunityRow} key={opportunity.id}>
            <button type="button" className={styles.opportunityLink} onClick={() => openOpportunity(opportunity)}><span className={styles.opportunitySymbol}><Plus size={16} /></span><span><strong>{opportunity.category}</strong><small>Distributor {opportunity.distributor} · {opportunity.metric} relevant parts</small></span><ArrowUpRight size={13} /></button>{saveButton(opportunity, true)}
          </div>)}</div>
          <button type="button" className={`${styles.textButton} ${styles.panelLink}`} onClick={() => navigate("whitespace")}>Explore all opportunities <ArrowRight size={13} /></button>
        </section>
      </div>
      <div className={styles.overviewGrid}>
        <section className={styles.panel}>{panelHeading("Competitor landscape", "Published presence in your categories")}{competitorTable()}</section>
        <section className={styles.panel}>
          {panelHeading("What changed", "Since the previous catalogue read", <button type="button" className={styles.textButton} onClick={() => navigate("monitoring")}>View all <ArrowUpRight size={13} /></button>)}
          <div className={styles.recentChanges}>{[changes[0], changes[6], changes[5]].map((change) => <button type="button" key={change.id} onClick={() => setDetail({ kind: "change", change })}><span className={`${styles.changeIcon} ${change.type === "Expansion" ? styles.purpleIcon : ""}`}>{change.type === "Expansion" ? <TrendingUp size={15} /> : change.type === "Whitespace" ? <Grid2X2 size={15} /> : <ArrowDownRight size={15} />}</span><span><strong>{change.type === "Expansion" ? `${change.brand} added ${change.after - change.before} listings` : change.type === "Whitespace" ? `${change.category} is now empty` : `${change.brand} listing removed`}</strong><small>Distributor {change.distributor} · {change.category}</small></span><ChevronRight size={13} /></button>)}</div>
        </section>
      </div>
      <p className={styles.disclaimer}><ShieldCheck size={13} /> Catalogue presence, not sales share. All information shown is demonstration data.</p>
    </>;
  }
  function distributorView() {
    const filtered = distributors.filter((distributor) => (`distributor ${distributor.id} ${distributor.platform}`.toLowerCase().includes(query.toLowerCase())) && (coverage === "all" || (coverage === "readable" ? distributor.status === "Readable" : distributor.status !== "Readable")));
    return <>
      {sectionHeading("Your distributor network", "Understand what you can see before deciding where to act.")}
      <div className={styles.toolbar}><label className={styles.search}><Search size={15} aria-hidden="true" /><input type="search" placeholder="Search distributors…" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search demo distributors" /></label><label className={styles.selectLabel}><span className={styles.srOnly}>Filter catalogue coverage</span><select value={coverage} onChange={(event) => setCoverage(event.target.value)}><option value="all">All coverage</option><option value="readable">Readable catalogues</option><option value="limited">Limited access</option></select><ChevronDown size={12} aria-hidden="true" /></label></div>
      <div className={`${styles.panel} ${styles.tablePanel}`}><div className={styles.tableScroll}><table className={styles.dataTable}><thead><tr><th>Distributor</th><th>Catalogue</th><th>Product pages</th><th>Listing share</th><th><span className={styles.srOnly}>Details</span></th></tr></thead><tbody>{filtered.map((distributor) => <tr key={distributor.id}><td><button type="button" className={styles.distributorButton} onClick={() => setDetail({ kind: "distributor", distributor })}><span className={styles.avatar}>D{distributor.id}</span><span><strong>Distributor {distributor.id}</strong><small>{distributor.platform}</small></span></button></td><td><span className={`${styles.status} ${distributor.status === "Readable" ? styles.readable : styles.limited}`}>{distributor.status === "Readable" && <span />}{distributor.status}</span></td><td>{distributor.pages === null ? "—" : format(distributor.pages)}</td><td>{distributor.share === null ? "—" : `${distributor.share}%`}</td><td><button type="button" className={styles.iconButton} onClick={() => setDetail({ kind: "distributor", distributor })} aria-label={`View Distributor ${distributor.id} details`}><ArrowUpRight size={15} /></button></td></tr>)}</tbody></table></div>{filtered.length === 0 && <div className={styles.emptyState}><Search size={24} /><strong>No distributors match your search.</strong><button type="button" className={styles.textButton} onClick={() => { setQuery(""); setCoverage("all"); }}>Clear filters <ArrowRight size={13} /></button></div>}</div>
      <p className={styles.disclaimer}><CircleHelp size={13} /> Gated and unread catalogues are coverage limits, not whitespace opportunities.</p>
    </>;
  }
  function displacementView() {
    const visibleCategories = categoryRows.filter((row) => categoryFilter === "All categories" || row.category === categoryFilter);
    const categoryComparison = <section className={styles.panel}>
      {panelHeading("A closer look: Distributor 2", "673 listings in your categories · 11.9% yours", <label className={styles.selectLabel}><span className={styles.srOnly}>Filter Distributor 2 categories</span><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option>All categories</option>{categoryRows.map((row) => <option key={row.category}>{row.category}</option>)}</select><ChevronDown size={12} aria-hidden="true" /></label>)}
      <div className={styles.legend}><span><i className={styles.yourSwatch} />Your parts</span><span><i className={styles.competitorSwatch} />Competitors</span><span><i className={styles.otherSwatch} />Other / unbranded</span></div>
      <div className={styles.categoryChart}>{visibleCategories.map((row) => <div className={styles.categoryRow} key={row.category}><div><strong>{row.category}</strong><span>{row.listed} listed · {row.competing} competing</span><b>{(row.yours / row.listed * 100).toFixed(1)}% yours</b></div><div className={styles.stackedBar} role="img" aria-label={`${row.category}: ${row.yours} your listings, ${row.competing} competing, ${row.listed - row.yours - row.competing} other`}><span style={{ width: `${row.yours / row.listed * 100}%` }} /><span style={{ width: `${row.competing / row.listed * 100}%` }} /><span style={{ flex: 1 }} /></div></div>)}</div>
      {categoryFilter === "Category B" && <div className={styles.categoryBrands} aria-label="Competing brands in Category B"><span>Brand X <strong>47 listings</strong></span><span>Brand Y <strong>45 listings</strong></span><span>Other competitors <strong>44 listings</strong></span></div>}
      <div className={styles.panelFooter}><span><Grid2X2 size={14} />Category F has no published listings.</span><button type="button" className={styles.textButton} onClick={() => openOpportunity(opportunities[1])}>Explore the gap <ArrowRight size={13} /></button></div>
    </section>;
    return <>
      {sectionHeading("Know who shares your shelf.", "Compare catalogue presence across distributors and product categories.")}
      {activeScenario === "competitors" && <div className={styles.scenarioComparison}>{categoryComparison}</div>}
      <div className={styles.overviewGrid}><section className={styles.panel}>{panelHeading("Listing share by distributor", "Select a distributor to inspect its coverage")}{shareChart()}</section><section className={styles.panel}>{panelHeading("1,105 competing listings", "Across six brands in your categories")}{competitorTable()}</section></div>
      {activeScenario !== "competitors" && categoryComparison}
      <p className={styles.disclaimer}>Listing share measures catalogue presence. It does not measure sales or sell-through.</p>
    </>;
  }
  function whitespaceView() {
    return <>
      {sectionHeading("Find your next opening.", "Empty categories in readable catalogues, with the context to evaluate them.")}
      <div className={styles.insightBanner}><span className={styles.insightIcon}><Sparkles size={21} /></span><div><strong>4 empty categories. A focused starting point.</strong><p>Each is a potential conversation. Confirm demand and fit with your distributor.</p></div></div>
      <div className={`${styles.panel} ${styles.tablePanel}`}><div className={styles.tableScroll}><table className={styles.dataTable}><thead><tr><th>Opportunity</th><th>Distributor</th><th>Your relevant parts</th><th>Status</th><th><span className={styles.srOnly}>Actions</span></th></tr></thead><tbody>{opportunities.filter((opportunity) => opportunity.type === "Whitespace").map((opportunity) => <tr key={opportunity.id}><td><button type="button" className={styles.tableLink} onClick={() => openOpportunity(opportunity)}>{opportunity.category}<ArrowUpRight size={13} /></button></td><td>Distributor {opportunity.distributor}</td><td><strong>{opportunity.metric}</strong><small className={styles.cellNote}>listed at other distributors</small></td><td><span className={styles.pinkBadge}>Empty</span></td><td>{saveButton(opportunity, true)}</td></tr>)}</tbody></table></div></div>
      <div className={styles.educationCard}><ShieldCheck size={20} /><div><h3>Evidence before outreach.</h3><p>“Empty” means no manufacturer was listed in the category during the sample read. It does not prove there is demand or that the distributor carries no offline inventory.</p></div></div>
    </>;
  }
  function monitoringView() {
    const filtered = changes.filter((change) => changeFilter === "All changes" || change.type === changeFilter);
    return <>
      {sectionHeading("Keep up with your channel.", "Compare public catalogue reads and spot changes worth a conversation.", <span className={styles.datePill}>Aug 17 → Sep 15</span>)}
      <div className={styles.filterTabs} aria-label="Filter sample changes">{["All changes", "Expansion", "Removed", "Whitespace"].map((filter) => <button type="button" key={filter} className={changeFilter === filter ? styles.filterActive : ""} aria-pressed={changeFilter === filter} onClick={() => setChangeFilter(filter)}>{filter}<span>{filter === "All changes" ? changes.length : changes.filter((change) => change.type === filter).length}</span></button>)}</div>
      <div className={`${styles.panel} ${styles.tablePanel}`}><div className={styles.tableScroll}><table className={styles.dataTable}><thead><tr><th>Change</th><th>Distributor / category</th><th>Before</th><th>Now</th><th>Change</th><th><span className={styles.srOnly}>Details</span></th></tr></thead><tbody>{filtered.map((change) => <tr key={change.id}><td><strong className={styles.cellTitle}>{change.brand}</strong><small className={styles.cellNote}>{change.type === "Expansion" ? "Competitor expansion" : change.type === "Removed" ? "Listing removed" : "Category now empty"}</small></td><td>Distributor {change.distributor}<small className={styles.cellNote}>{change.category}</small></td><td>{change.before}</td><td>{change.after}</td><td><span className={change.type === "Expansion" ? styles.purpleBadge : styles.pinkBadge}>{change.after > change.before ? "+" : ""}{change.after - change.before}</span></td><td><button type="button" className={styles.iconButton} onClick={() => setDetail({ kind: "change", change })} aria-label={`Inspect ${change.brand} ${change.category} change at Distributor ${change.distributor}`}><ArrowUpRight size={15} /></button></td></tr>)}</tbody></table></div></div>
      <p className={styles.disclaimer}><Bell size={13} /> An illustrative selection of changes from the demo network. No live monitoring is running.</p>
    </>;
  }
  function signalView() {
    const filtered = opportunities.filter((opportunity) => signalFilter === "All signals" || (signalFilter === "Shortlist" ? shortlist.includes(opportunity.id) : signalStatuses[opportunity.id] === "pitched"));
    return <>
      {sectionHeading("Turn a signal into a conversation.", "Explore the evidence, build your shortlist, and track your next step.")}
      <div className={styles.filterTabs} aria-label="Filter sales signals">{[{ label: "All signals", count: opportunities.length }, { label: "Shortlist", count: savedCount }, { label: "Pitched", count: pitchedCount }].map((filter) => <button type="button" key={filter.label} className={signalFilter === filter.label ? styles.filterActive : ""} aria-pressed={signalFilter === filter.label} onClick={() => setSignalFilter(filter.label)}>{filter.label}<span>{filter.count}</span></button>)}</div>
      <div className={styles.signalList}>{filtered.map((opportunity) => <article className={styles.signalCard} key={opportunity.id}><div className={styles.signalTop}><span className={styles.pinkBadge}>{opportunity.type}</span><span>Distributor {opportunity.distributor} · {opportunity.category}</span>{signalStatuses[opportunity.id] === "pitched" && <span className={styles.pitchedBadge}><Check size={11} /> Pitched</span>}</div><button type="button" className={styles.signalTitle} onClick={() => openOpportunity(opportunity)}>{opportunity.title}<ArrowUpRight size={15} /></button><p>{opportunity.description}</p><div className={styles.signalActions}><button type="button" className={styles.textButton} onClick={() => openOpportunity(opportunity)}><FileText size={13} /> Review evidence</button><span />{saveButton(opportunity)}<button type="button" className={styles.smallPrimary} onClick={() => pitch(opportunity)} disabled={signalStatuses[opportunity.id] === "pitched"}>{signalStatuses[opportunity.id] === "pitched" ? <><Check size={13} /> Pitched</> : "Mark pitched"}</button></div></article>)}</div>
      {filtered.length === 0 && <div className={styles.emptyState}><Bookmark size={27} /><strong>{signalFilter === "Pitched" ? "No signals marked as pitched yet." : "Your shortlist starts with one good opportunity."}</strong><p>{signalFilter === "Pitched" ? "Review a signal, then mark it as pitched to try the workflow." : "Save an opportunity and it will appear here for this visit."}</p><button type="button" className={styles.smallPrimary} onClick={() => setSignalFilter("All signals")}>Explore sample signals <ArrowRight size={13} /></button></div>}
    </>;
  }

  function workspace(isExpanded: boolean) {
    const current = navigation.find((item) => item.id === view)!;
    const selectedScenario = activeScenario === "census"
      ? { context: "Your sample distributor network", hint: "Compare readable catalogues, public product pages and access limits before choosing where to investigate." }
      : activeScenario === "sales-signals"
        ? { context: "From sample finding to next step", hint: "Review the evidence, save a relevant opportunity, or mark it as pitched to try the workflow." }
        : scenarios.find((scenario) => scenario.id === activeScenario);
    const selectedCategory = categoryRows.find((row) => row.category === categoryFilter);
    const scenarioContext = activeScenario === "competitors" ? `Distributor 2 · ${categoryFilter}` : activeScenario === "changes" ? changeFilter : selectedScenario?.context;
    const scenarioHint = activeScenario === "competitors" ? (selectedCategory ? `Compare your ${selectedCategory.yours} listings with ${selectedCategory.competing} competitor listings in the same category.` : "Compare your published range with competitor listings across the account.") : activeScenario === "changes" && changeFilter !== "Expansion" ? "Compare sample catalogue reads and inspect a change for the supporting context." : selectedScenario?.hint;
    return <div className={`${styles.workspace} ${isExpanded ? styles.expandedWorkspace : ""}`}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}><LogoMark size={25} /><span>praxes<span className={styles.brandPeriod}>.</span></span></div>
        <div className={styles.account}><span className={styles.accountMark}>DM</span><span><strong>Demo Manufacturing</strong><small>Sample workspace</small></span></div>
        <p className={styles.navLabel}>YOUR CHANNEL</p>
        <nav className={styles.demoNav} aria-label={`${isExpanded ? "Expanded " : ""}Demo platform navigation`}>{navigation.map((item) => <button type="button" key={item.id} className={view === item.id ? styles.navActive : ""} onClick={() => navigate(item.id)} aria-current={view === item.id ? "page" : undefined}><item.icon size={16} aria-hidden="true" /><span>{item.label}</span>{item.id === "signals" && savedCount > 0 && <span className={styles.navCount}>{savedCount}</span>}</button>)}</nav>
        <div className={styles.sidebarBottom}><span className={styles.sampleDot} /><span>Interactive demo</span><span className={styles.demoHelp} title="Explore sample data. No sign-up required."><CircleHelp size={13} /></span></div>
      </aside>
      <div className={styles.main}>
        <header className={styles.appHeader}><div className={styles.breadcrumb}><span>Workspace</span><ChevronRight size={12} /><strong>{current.label}</strong></div><div className={styles.headerActions}><span className={styles.demoBadge}>Demo data</span><button type="button" className={styles.resetButton} onClick={reset} aria-label="Reset interactive demo" title="Reset demo"><RotateCcw size={13} /><span>Reset</span></button><span className={styles.headerDivider} /><button type="button" className={styles.iconButton} onClick={() => setExpanded(!isExpanded)} aria-label={isExpanded ? "Close expanded demo" : "Expand interactive demo"} title={isExpanded ? "Close expanded demo" : "Expand demo"}>{isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}</button></div></header>
        <div ref={isExpanded ? expandedScrollRef : baseScrollRef} className={styles.content} tabIndex={0} aria-label={`${current.label} demo content`}>
          <div className={styles.scenarioPicker} role="group" aria-label="Try a sample workflow">
            <span className={styles.scenarioLabel}>Try a sample workflow</span>
            <div className={styles.scenarioChoices}>{scenarios.map((scenario) => <button type="button" key={scenario.id} className={activeScenario === scenario.id ? styles.scenarioActive : ""} aria-pressed={activeScenario === scenario.id} onClick={() => startScenario(scenario.id)}><scenario.icon size={13} aria-hidden="true" /><span>{scenario.label}</span><ArrowUpRight size={12} aria-hidden="true" /></button>)}</div>
            {selectedScenario && <p className={styles.scenarioContext} role="status"><strong>{scenarioContext}.</strong> {scenarioHint}</p>}
          </div>
          {view === "overview" ? overview() : view === "distributors" ? distributorView() : view === "displacement" ? displacementView() : view === "whitespace" ? whitespaceView() : view === "monitoring" ? monitoringView() : signalView()}
        </div>
        <div className={styles.appFooter}><span><span /> Demo Manufacturing</span><span>Sample data · Explore freely</span></div>
      </div>
      {notice && <div className={styles.toast} role="status"><Check size={15} /><span>{notice}</span><button type="button" aria-label="Dismiss demo notification" onClick={() => setNotice("")}><X size={13} /></button></div>}
    </div>;
  }

  function detailContent() {
    if (!detail) return null;
    if (detail.kind === "distributor") {
      const distributor = detail.distributor;
      const related = opportunities.filter((opportunity) => opportunity.distributor === distributor.id);
      return <><div className={styles.detailEyebrow}><span className={styles.avatar}>D{distributor.id}</span>Distributor profile</div><h2 id={`${demoId}-detail-title`}>Distributor {distributor.id}</h2><p className={styles.detailDescription}>{distributor.platform} · Illustrative account in the sample network</p><div className={styles.detailMetrics}><div><span>Catalogue access</span><strong>{distributor.status}</strong></div><div><span>Public product pages</span><strong>{distributor.pages === null ? "Not available" : format(distributor.pages)}</strong></div><div><span>Your listing share</span><strong>{distributor.share === null ? "Not measured" : `${distributor.share}%`}</strong></div></div>{distributor.status === "Readable" ? <><div className={styles.evidenceBlock}><h3><ShieldCheck size={16} /> Coverage you can understand</h3><p>The sample catalogue was read on September 15, 2026. {format(distributor.competing ?? 0)} competing listings were identified in your categories. Listing share is based on published catalogue presence.</p></div><h3 className={styles.detailSectionTitle}>Signals worth a closer look</h3>{related.length ? <div className={styles.detailOpportunities}>{related.map((opportunity) => <button type="button" key={opportunity.id} onClick={() => openOpportunity(opportunity)}><span><small>{opportunity.type} · {opportunity.category}</small><strong>{opportunity.title}</strong></span><ArrowRight size={15} /></button>)}</div> : <p className={styles.detailDescription}>No opportunities selected for this account in the website demo. Explore the other distributors for a sample workflow.</p>}</> : <div className={styles.evidenceBlock}><h3><CircleHelp size={16} /> A coverage limit, clearly reported</h3><p>{distributor.status === "Gated" ? "This example catalogue requires a dealer login. We have not measured its product range or competitor presence." : "This example account is awaiting a catalogue review. No range or competitor findings have been inferred."} This is not classified as an empty category.</p></div>}</>;
    }
    if (detail.kind === "opportunity") {
      const opportunity = detail.opportunity;
      return <><div className={styles.detailEyebrow}><Sparkles size={15} />{opportunity.type} · Distributor {opportunity.distributor}</div><h2 id={`${demoId}-detail-title`}>{opportunity.title}</h2><p className={styles.detailDescription}>{opportunity.description}</p><div className={styles.opportunityMetric}><strong>{opportunity.metric}</strong><span>{opportunity.metricLabel}</span></div><div className={styles.evidenceBlock}><h3><FileText size={16} /> Sample evidence</h3><dl><div><dt>Distributor</dt><dd>Distributor {opportunity.distributor}</dd></div><div><dt>Category</dt><dd>{opportunity.category}</dd></div><div><dt>Catalogue read</dt><dd>September 15, 2026</dd></div><div><dt>Evidence type</dt><dd>Published catalogue listings</dd></div></dl><p>This is an illustrative finding from the demo dataset. A real engagement includes the source listings and supporting evidence.</p></div><div className={styles.nextStep}><span>YOUR NEXT CONVERSATION</span><p>{opportunity.next}</p></div><div className={styles.detailActions}>{saveButton(opportunity)}<button type="button" className={styles.smallPrimary} onClick={() => pitch(opportunity)} disabled={signalStatuses[opportunity.id] === "pitched"}>{signalStatuses[opportunity.id] === "pitched" ? <><Check size={14} /> Marked as pitched</> : <>Mark pitched <ArrowRight size={14} /></>}</button></div><p className={styles.localNote}>Changes stay in this demo for your visit. No outreach is sent.</p></>;
    }
    const change = detail.change;
    return <><div className={styles.detailEyebrow}><Bell size={15} />Change monitoring · Sample evidence</div><h2 id={`${demoId}-detail-title`}>{change.type === "Expansion" ? `${change.brand} is expanding.` : change.type === "Removed" ? "A listing was removed." : "A category is now empty."}</h2><p className={styles.detailDescription}>Distributor {change.distributor} · {change.category} · {change.brand}</p><div className={styles.changeComparison}><div><span>Aug 17, 2026</span><strong>{change.before}</strong><small>published listings</small></div><ArrowRight size={22} /><div><span>Sep 15, 2026</span><strong>{change.after}</strong><small>published listings</small></div></div><div className={styles.evidenceBlock}><h3><FileText size={16} /> What this tells you</h3><p>{change.type === "Expansion" ? `${change.brand} gained ${change.after - change.before} published listings in this category between sample reads. This indicates a catalogue change, not an increase in sales.` : change.type === "Removed" ? "The listing appeared in the previous sample read and was absent from the latest one. Availability and offline stock should be checked with the distributor." : "No manufacturer was listed in this category at the latest sample read. Confirm the gap and commercial fit before treating it as an opportunity."}</p><p>Illustrative comparison from the demo dataset. Real findings are linked to supporting source listings.</p></div><button type="button" className={styles.smallPrimary} onClick={() => { setDetail(null); navigate("signals"); setSignalFilter("All signals"); }}>Explore related sales signals <ArrowRight size={14} /></button></>;
  }

  return <div className={`${styles.demo} ${className}`} role="region" aria-label="Interactive Praxes platform demo">
    <div inert={expanded} aria-hidden={expanded || undefined}>{workspace(false)}</div>
    <dialog ref={expandedRef} className={`${styles.demoDialog} ${styles.expandDialog}`} aria-label="Expanded interactive Praxes demo" onCancel={(event) => { event.preventDefault(); setExpanded(false); }} onClick={(event) => { if (event.target === event.currentTarget) setExpanded(false); }}>{expanded && workspace(true)}</dialog>
    <dialog ref={detailRef} className={`${styles.demoDialog} ${styles.detailDialog}`} aria-labelledby={`${demoId}-detail-title`} onCancel={(event) => { event.preventDefault(); setDetail(null); }} onClick={(event) => { if (event.target === event.currentTarget) setDetail(null); }}><div className={styles.detailBody}><button type="button" className={styles.closeDetail} aria-label="Close demo details" onClick={() => setDetail(null)}><X size={19} /></button>{detailContent()}</div></dialog>
  </div>;
}
