"use client";

import { createContext, useContext, useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Maximize2,
  ExternalLink,
  X,
} from "lucide-react";

import { BookACall } from "@/components/book-a-call";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LogoMark } from "@/components/layout/logo-mark";
import { PlatformDemo, type DemoScenario } from "./platform-demo";
import { HeroNetwork } from "./hero-network";
import { ChannelWorkflow } from "./channel-workflow";
import { NetworkGrowth } from "./network-growth";
import styles from "./homepage.module.css";

const platformViews = [
  {
    id: "census",
    label: "Census",
    eyebrow: "Channel census",
    outcome: "Start with a map of your network.",
    body: "See which distributors have readable catalogues, what they publish and where access is restricted.",
    image: "/platform/channel-census.webp",
    width: 1272,
    height: 365,
    alt: "Praxes channel census showing distributor catalogue coverage and accessibility in the demo account",
  },
  {
    id: "displacement",
    label: "Displacement",
    eyebrow: "Displacement mapping",
    outcome: "Understand the brands on the shelf.",
    body: "Compare your listings with competing brands, by distributor and product category.",
    image: "/platform/displacement.webp",
    width: 1270,
    height: 598,
    alt: "Praxes displacement map showing competing brands and category-level catalogue presence in the demo account",
  },
  {
    id: "whitespace",
    label: "Whitespace",
    eyebrow: "Whitespace mapping",
    outcome: "See what is missing.",
    body: "Find empty categories in readable catalogues and match them to relevant parts in your range.",
    image: "/platform/whitespace.webp",
    width: 1272,
    height: 482,
    alt: "Praxes whitespace analysis showing potential category opportunities across demo distributors",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    eyebrow: "Change monitoring",
    outcome: "Keep the picture current.",
    body: "Compare catalogue reads to see which brands and products have been added or removed.",
    image: "/platform/change-monitor.webp",
    width: 1272,
    height: 463,
    alt: "Praxes change monitor comparing catalogue changes across demo distributors",
  },
] as const;

const faqs = [
  {
    question: "What does Praxes measure?",
    answer: "We measure what distributors publish in their public catalogues: product listings, brands, categories and changes over time. Catalogue presence is not actual sales share, order volume or sell-through. Every engagement makes its coverage and limitations clear.",
  },
  {
    question: "Can we check the evidence behind a finding?",
    answer: "Yes. Findings include source URLs and supporting evidence from the published listing. We validate manufacturer resolution, competitor classification and category mapping so your team can trace the analysis back to its source.",
  },
  {
    question: "What happens if a distributor’s catalogue is gated?",
    answer: "Sites that require a dealer login or restrict automated access are reported as gated. We respect access restrictions and keep these cases separate from distributors with no published catalogue. Manual review or direct outreach may be recommended.",
  },
  {
    question: "What do you need from us to get started?",
    answer: "A list of distributor websites, your product categories and the competitor brands you care about. We start with a scoping conversation to understand your network and agree on what the work should cover.",
  },
] as const;

type PreviewImage = { src: string; alt: string; title: string };
const ImagePreviewContext = createContext<(image: PreviewImage) => void>(() => {});

function ProductFrame({ src, alt, title, width = 1272, height = 610,
  className = "", eager = false, mobileSrc, expandedSrc,
}: PreviewImage & { width?: number; height?: number; className?: string; eager?: boolean; mobileSrc?: string; expandedSrc?: string }) {
  const openPreview = useContext(ImagePreviewContext);
  const enlarge = () => openPreview({ src: expandedSrc ?? src, alt, title });
  return (
    <figure className={`${styles.productFrame} ${className}`}>
      <figcaption className={styles.productChrome}>
        <span className={styles.productIdentity}><span className={styles.appMark} aria-hidden="true"><LogoMark size={20} /></span>{title}</span>
        <span className={styles.productTools}>
          <span className={styles.demoTag}>Demo data</span>
          <button type="button" className={styles.expandButton} aria-label={`Expand ${title} screenshot`} onClick={enlarge}>
            <Maximize2 size={14} aria-hidden="true" />
          </button>
        </span>
      </figcaption>
      <button type="button" className={styles.imageButton} aria-label={`Enlarge ${title} screenshot`}
        onClick={enlarge}>
        <picture>
          {mobileSrc && <source media="(max-width: 600px)" srcSet={mobileSrc} />}
          <img src={src} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} decoding="async" fetchPriority={eager ? "high" : "auto"} />
        </picture>
        <span className={styles.imageHint}><Maximize2 size={13} /> Take a closer look</span>
      </button>
    </figure>
  );
}

export function Homepage() {
  const [scenarioRequest, setScenarioRequest] = useState<{ scenario: DemoScenario; requestId: number }>();
  function exploreScenario(scenario: DemoScenario) {
    const demo = document.getElementById("demo");
    demo?.scrollIntoView({ behavior: "instant", block: "start" });
    demo?.focus({ preventScroll: true });
    setScenarioRequest((current) => ({ scenario, requestId: (current?.requestId ?? 0) + 1 }));
  }
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!previewImage) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [previewImage]);
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedView = platformViews[activeTab];

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % platformViews.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + platformViews.length) % platformViews.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = platformViews.length - 1;
    else return;
    event.preventDefault();
    setActiveTab(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <ImagePreviewContext.Provider value={setPreviewImage}>
    <div className={styles.page}>
      <Navbar />

      <main id="main">
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroAtmosphere} aria-hidden="true" />
        <HeroNetwork />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.eyebrowDot} /> Channel intelligence for manufacturers</p>
          <h1 id="home-title">Know your channel.</h1>
          <p className={styles.heroDescription}>See what your distributors list. Know where to focus next.</p>
          <div className={styles.heroActions}>
            <BookACall label="Book a call" className={styles.primaryButton} />
          </div>
        </div>
        <div className={styles.heroShowcase}>
          <div id="demo" role="region" aria-label="Interactive Praxes demo" tabIndex={-1} className={styles.demoAnchor}>
            <PlatformDemo scenarioRequest={scenarioRequest} />
          </div>
        </div>
        <p className={styles.heroCaption}>Interactive demo · Sample data</p>
      </section>

      <div className={styles.lowerPage}>
      <section id="platform" className={`${styles.platformSection} ${styles.container}`} aria-labelledby="platform-title">
        <div className={`${styles.sectionHeading} ${styles.platformHeading}`}>
          <p className={styles.eyebrow}>Explore the platform</p>
          <h2 id="platform-title">The main engine.<br /><span>Four connected views.</span></h2>
          <div id="platform-description" className={styles.platformDescription} aria-live="polite" aria-atomic="true">
            <strong className={styles.platformOutcome}>{selectedView.outcome}</strong>
            <p>{selectedView.body}</p>
            <a href="#how-it-works" className={styles.textLink}>Follow a typical workflow <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className={styles.tabs} role="tablist" aria-label="Explore platform capabilities">
          {platformViews.map((view, index) => (
            <button
              key={view.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              type="button"
              id={`tab-${view.id}`}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls="platform-panel"
              tabIndex={activeTab === index ? 0 : -1}
              className={`${styles.tab} ${activeTab === index ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(index)}
              onKeyDown={(event) => handleTabKey(event, index)}
            >
              {view.label}
            </button>
          ))}
        </div>
        <div
          className={styles.platformPanel}
          role="tabpanel"
          id="platform-panel"
          aria-labelledby={`tab-${selectedView.id}`}
          aria-describedby="platform-description"
          tabIndex={0}
        >
          <div className={styles.platformVisual}>
            <ProductFrame src={selectedView.image} alt={selectedView.alt} title={selectedView.eyebrow} width={selectedView.width} height={selectedView.height} />
          </div>
          <div className={styles.showcaseControls} aria-label="Browse platform capabilities">
            <button type="button" aria-label="Previous platform capability" onClick={() => setActiveTab((index) => (index - 1 + platformViews.length) % platformViews.length)}><ArrowLeft size={18} aria-hidden="true" /></button>
            <button type="button" aria-label="Next platform capability" onClick={() => setActiveTab((index) => (index + 1) % platformViews.length)}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
      </section>

      <ChannelWorkflow onExplore={exploreScenario} />
      <NetworkGrowth />

      <section className={`${styles.container} ${styles.faqSection}`} aria-labelledby="faq-title">
        <div className={styles.faqHeading}>
          <p className={styles.eyebrow}>A few practical details</p>
          <h2 id="faq-title">Before you begin.</h2>

        </div>
        <div className={styles.faqList}>
          {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span className={styles.faqPlus} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      </div>
      <section className={styles.closingSection} aria-labelledby="closing-title">
        <div className={`${styles.container} ${styles.closingContent}`}>
          <div><p className={styles.closingEyebrow}>Your network, next</p><h2 id="closing-title">See it with<br />your own distributors.</h2><p>Bring your distributor list. We’ll work through where Praxes fits.</p></div>
          <div className={styles.closingAction}><div><BookACall label="Book a call" withArrow className={styles.primaryButton} /><a href="#demo" className={styles.closingDemo}>Explore the demo <ArrowUpRight size={16} aria-hidden="true" /></a></div><span>A focused conversation about your channel</span></div>
        </div>
      </section>

      </main>
      <Footer />
      {previewImage && <dialog ref={dialogRef} className={styles.imageDialog}
        aria-labelledby="screenshot-title" onCancel={() => setPreviewImage(null)}
        onClick={(event) => { if (event.target === event.currentTarget) setPreviewImage(null); }}>
        <div className={styles.dialogContent}>
          <div className={styles.dialogHeader}>
            <div><h2 id="screenshot-title">{previewImage.title}</h2><p>Praxes platform · demonstration data</p></div>
            <button type="button" onClick={() => setPreviewImage(null)} aria-label="Close screenshot"><X size={23} /></button>
          </div>
          <div className={styles.dialogImage}><img src={previewImage.src} alt={previewImage.alt} /></div>
          <p className={styles.dialogNote}>Explore the details. <a href={previewImage.src} target="_blank" rel="noopener noreferrer">Open full-size image <ExternalLink size={12} /></a></p>
        </div>
      </dialog>}
    </div>
    </ImagePreviewContext.Provider>
  );
}
