import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Database,
  Factory,
  Globe2,
  Layers3,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { BookACall } from "@/components/book-a-call";
import { Button } from "@/components/ui/button";
import { StepPanelView } from "@/components/process/step-panel";
import { FaqList } from "@/components/sections/faq";
import { services } from "@/content/services";
import { industries, whyManufacturing } from "@/content/manufacturing";
import {
  integrationApproach,
  integrationSystems,
} from "@/content/integrations";
import { processSteps } from "@/content/process";
import { generalFaqs } from "@/content/faqs";

function Chapter({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="home-chapter">
      <span>{n}</span>
      {children}
    </p>
  );
}

function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="home-text-link" href={href}>
      {children}
      <ArrowUpRight size={17} aria-hidden />
    </Link>
  );
}

/** The homepage's editorial continuation. Shared page components remain independent. */
export function HomeContinuation() {
  const [census, ...otherServices] = services;
  return (
    <div className="home-continuation">
      <section
        className="home-band home-offerings"
        aria-labelledby="offerings-title"
      >
        <Container>
          <Reveal className="home-section-intro">
            <div>
              <Chapter n="01">Inside Channel Intelligence</Chapter>
              <h2 id="offerings-title">
                Start with a census.
                <br />
                <span>Build the whole picture.</span>
              </h2>
            </div>
            <div>
              <p>
                Five ways to turn your distributor network into evidence your
                commercial team can use. Start with what is there. Then see what
                is missing, and what changes.
              </p>
              <TextLink href="/services">Explore all services</TextLink>
            </div>
          </Reveal>
          <Reveal className="home-census">
            <div className="home-service-copy">
              <span className="home-kicker">01 / The starting point</span>
              <h3>{census.name}</h3>
              <p>{census.showcase.blurb}</p>
              <TextLink href={`/services/${census.slug}`}>
                See what a census delivers
              </TextLink>
            </div>
            <div className="home-census-preview">
              <span className="home-kicker">An example of the output</span>
              <StepPanelView panel={census.showcase.panel} active />
            </div>
          </Reveal>
          <div className="home-service-grid">
            {otherServices.map((service, i) => (
              <Reveal
                key={service.slug}
                className="home-service-card"
                delay={(i % 2) * 70}
              >
                <div className="home-service-copy">
                  <span className="home-kicker">
                    0{i + 2} / Channel intelligence
                  </span>
                  <h3>{service.name}</h3>
                  <p>{service.showcase.blurb}</p>
                  <TextLink href={`/services/${service.slug}`}>
                    Explore the service
                  </TextLink>
                </div>
                <div className="home-service-preview">
                  <StepPanelView panel={service.showcase.panel} active />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="home-band home-connections"
        aria-labelledby="connections-title"
      >
        <Container>
          <Reveal className="home-section-intro">
            <div>
              <Chapter n="02">Connected to your world</Chapter>
              <h2 id="connections-title">
                Public catalogs in.
                <br />
                <span>Commercial intelligence out.</span>
              </h2>
            </div>
            <p>
              We read the platforms your distributors publish on and deliver
              findings where your team works. Enterprise delivery connects the
              evidence to your existing systems.
            </p>
          </Reveal>
          <Reveal className="home-system-map">
            <div className="home-system-column">
              <Globe2 aria-hidden />
              <h3>Where the data lives</h3>
              <ul>
                {integrationSystems
                  .filter((s) => s.kind === "Storefront")
                  .map((s) => (
                    <li key={s.name}>{s.name}</li>
                  ))}
              </ul>
            </div>
            <div className="home-engine">
              <div className="home-engine-symbol">
                <ScanLine aria-hidden />
              </div>
              <span className="home-kicker">Praxes</span>
              <h3>
                Read. Resolve.
                <br />
                Report.
              </h3>
              <p>
                Source-linked evidence
                <br />
                at every step.
              </p>
              <ArrowDown aria-hidden />
            </div>
            <div className="home-system-column">
              <Database aria-hidden />
              <h3>Where findings land</h3>
              <ul>
                {integrationSystems
                  .filter((s) => s.kind !== "Storefront")
                  .map((s) => (
                    <li key={s.name}>
                      {s.name}
                      <small>{s.kind}</small>
                    </li>
                  ))}
              </ul>
            </div>
          </Reveal>
          <div className="home-method">
            <Reveal>
              <Chapter n="↳">How we read</Chapter>
              <h3>{integrationApproach.title}</h3>
              <p>{integrationApproach.deck}</p>
            </Reveal>
            <Reveal className="home-method-details">
              {integrationApproach.points.map((point, i) => (
                <details key={point.title}>
                  <summary>
                    <span>0{i + 1}</span>
                    {point.title}
                    <span className="home-detail-plus" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p>{point.body}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        className="home-band home-industries"
        aria-labelledby="industries-title"
      >
        <Container>
          <div className="home-industries-layout">
            <Reveal className="home-industries-intro">
              <Chapter n="03">Who we help</Chapter>
              <Factory size={42} strokeWidth={1} aria-hidden />
              <h2 id="industries-title">
                Industrial channels.
                <br />
                <span>Real-world complexity.</span>
              </h2>
              <p>
                Eight-figure manufacturers and independent distributors.
                Businesses where a rival brand can take a shelf one listing at a
                time, and nobody upstream is reading what those distributors
                publish.
              </p>
              <TextLink href="/contact">Talk about your channel</TextLink>
            </Reveal>
            <ul className="home-industry-list">
              {industries.map((industry, i) => (
                <Reveal as="li" key={industry.name} delay={(i % 3) * 50}>
                  <span className="home-industry-number">0{i + 1}</span>
                  <div>
                    <h3>{industry.name}</h3>
                    <p>{industry.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        className="home-band home-engagement"
        aria-labelledby="engagement-title"
      >
        <Container className="home-engagement-layout">
          <Reveal className="home-engagement-intro">
            <Chapter n="04">The engagement</Chapter>
            <h2 id="engagement-title">
              A clear path.
              <br />
              <span>A checkable result.</span>
            </h2>
            <p>
              Nothing is harvested from a domain until we know what it is.
              Nothing is reported without the source URL it came from.
            </p>
            <TextLink href="/process">Walk through the full process</TextLink>
            <div className="home-start-note">
              <span>Start here</span>
              <strong>30 minutes</strong>
              <p>
                A free scoping call to agree your domains, categories, and
                competitors.
              </p>
            </div>
          </Reveal>
          <ol className="home-timeline">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={50}>
                <span className="home-timeline-node">{step.n}</span>
                <div>
                  <div className="home-timeline-meta">
                    <span>
                      {i === 0
                        ? "Define the scope"
                        : i === 4
                          ? "Keep the picture current"
                          : "Build the evidence"}
                    </span>
                    <span>{step.duration}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.summary}</p>
                  <span className="home-deliverable">
                    <Check size={14} aria-hidden />
                    {step.deliverables[0]}
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section
        className="home-band home-evidence"
        aria-labelledby="evidence-title"
      >
        <Container>
          <Reveal className="home-section-intro">
            <div>
              <Chapter n="05">Why Praxes</Chapter>
              <h2 id="evidence-title">
                Bring evidence
                <br />
                <span>to the conversation.</span>
              </h2>
            </div>
            <p>
              Built for industrial distribution, with findings your team can
              open, check, and use in the next distributor meeting.
            </p>
          </Reveal>
          <div className="home-evidence-grid">
            {whyManufacturing.map((reason, i) => {
              const Icon = [ShieldCheck, Factory, Layers3, ScanLine][i];
              return (
                <Reveal
                  key={reason.title}
                  className={`home-proof home-proof-${i + 1}`}
                  delay={(i % 2) * 70}
                >
                  <div className="home-proof-top">
                    <Icon size={28} strokeWidth={1.3} aria-hidden />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{reason.title}</h3>
                  <p>{reason.body}</p>
                  {i === 0 && (
                    <div className="home-evidence-chain">
                      <span>Finding</span>
                      <ArrowRight size={14} aria-hidden />
                      <span>Source URL</span>
                      <ArrowRight size={14} aria-hidden />
                      <span>Live listing</span>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        className="home-band home-questions"
        aria-labelledby="questions-title"
      >
        <Container className="home-faq-layout">
          <Reveal>
            <Chapter n="06">Before we begin</Chapter>
            <h2 id="questions-title">
              Good questions.
              <br />
              <span>Straight answers.</span>
            </h2>
            <p>
              Coverage, access, accuracy, and what working together looks like.
            </p>
            <TextLink href="/contact">Ask us something else</TextLink>
          </Reveal>
          <Reveal className="home-faq">
            <FaqList items={generalFaqs} />
          </Reveal>
        </Container>
      </section>

      <section className="home-closing" aria-labelledby="closing-title">
        <Container>
          <Reveal className="home-closing-inner">
            <div>
              <Chapter n="↗">Your next move</Chapter>
              <h2 id="closing-title">
                Which distributors
                <br />
                <span>carry you?</span>
              </h2>
            </div>
            <div className="home-closing-copy">
              <p>
                Thirty minutes, no preparation needed. Tell us about your
                distributors, categories, and competitors. We’ll tell you
                whether a census is worth running — including when the answer is
                no.
              </p>
              <div className="home-closing-actions">
                <BookACall variant="onDark" size="lg" withArrow />
                <Button variant="onDarkGhost" size="lg" asChild>
                  <Link href="/process">See how it runs</Link>
                </Button>
              </div>
              <span className="home-closing-note">
                Free · 30 minutes · no obligation
              </span>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
