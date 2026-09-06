/** FAQ sets. Keyed by where they appear. */

export type Faq = { q: string; a: string };

/** Home page — the questions a manufacturer actually asks about the data. */
export const generalFaqs: Faq[] = [
  {
    q: "How many distributors can you monitor?",
    a: "There is no hard limit. Our reference engagement covered 24 distributors; enterprise clients monitor more than 100 across multiple countries and languages. Pricing scales with distributor count and catalog size, not with seats — a census of 25 domains and a monitoring programme over 60 are different engagements, but neither is priced per user.",
  },
  {
    q: "How do you ensure the findings are accurate?",
    a: "Every value we report is stored with the source URL and a verbatim quote from the page it came from. Nothing is estimated or modelled. Our QA validates manufacturer resolution, competitor classification and category mapping, and you can audit any finding by clicking its evidence link — including in the distributor meeting, on a laptop, in front of the distributor.",
  },
  {
    q: "What if a distributor blocks automated access?",
    a: "We respect robots.txt and access restrictions, without exception. If a site requires a dealer login or blocks automated access, it is reported as gated with a recommendation to handle it by manual review or direct outreach. It is never worked around, and it is never quietly counted as a distributor with no catalog — those are different findings and we keep them separate.",
  },
  {
    q: "How often do you crawl distributor websites?",
    a: "Monthly is standard, and weekly or quarterly cadences are available. Critical changes — a distributor going dark, a major competitor brand appearing across accounts, one of your lines being dropped — trigger an alert when they are detected rather than waiting for the report. Everything else is deliberately not an alert, because a monitoring service that pages you about a price change is one you will mute.",
  },
  {
    q: "Can you track our competitors' distributors too?",
    a: "Yes. Give us the competitor brands you care about and we track which distributors carry them and tell you when that changes. This is included in displacement mapping and in change monitoring rather than priced as an extra, because a displacement map without a competitor universe is just a list of your own listings.",
  },
  {
    q: "Do you integrate with our CRM or BI stack?",
    a: "For enterprise engagements, yes: API access or scheduled data exports into Salesforce, HubSpot, Microsoft Dynamics, SAP, a BI tool or a custom system. For pilots and projects, the deliverable is a report with evidence links, because the first question is whether the findings are worth acting on, not where to pipe them.",
  },
  {
    q: "Do you sell our data to other manufacturers?",
    a: "No. Client data is confidential and we do not sell raw harvested data to third parties. The one thing we build across clients is the interchange database — cross-reference tables that distributors themselves publish — and access to that is licensed selectively. Your distributor list, your categories, your competitor universe and your reports stay yours.",
  },
  {
    q: "How quickly can we start?",
    a: "A census can begin within five business days of signing and delivers in three to five business days after that. Larger displacement and whitespace projects need 10 to 15 business days for setup and the initial crawl. The scoping call in front of both is 30 minutes and needs no preparation from you.",
  },
];

/** /process — commercial and engagement mechanics. */
export const processFaqs: Faq[] = [
  {
    q: "Why start with a census rather than the displacement map?",
    a: "Because the census tells us what the displacement map would actually cost and cover. Until the domains have been checked, nobody knows how many publish a readable catalog, how deep those catalogs go, or how many are gated. A census is a few days and a small number, and it either de-risks the project behind it or tells you not to buy one.",
  },
  {
    q: "What do you need from us to start?",
    a: "A list of distributor domains, your product categories, and the competitor brands you want counted. That is genuinely it — no system access, no integration, no involvement from the distributors. Everything we read is a public page. What helps most is an hour with whoever knows the channel, because their view of who carries what is the thing the census confirms or corrects.",
  },
  {
    q: "How long does each stage take?",
    a: "Scoping call: 30 minutes. Reconnaissance: three to five business days. Harvest and resolution: three to five. Evidence and reporting: three to five. A census alone is 3–5 business days for up to 25 distributors; a full displacement and whitespace project is 10–15 business days for up to 10 distributors; monitoring delivers its first report within 15 business days.",
  },
  {
    q: "Why do recurring runs cost less than the first one?",
    a: "Because manufacturer resolution is the only part of the pipeline with a real per-unit cost — $0.28 per part — and every resolved identity is cached permanently. Reconnaissance and harvesting are HTTP requests at one per second, which cost almost nothing. So the second month pays for the parts that are new, not for the catalog again.",
  },
  {
    q: "What does this not measure?",
    a: "Actual order volume or sell-through — only your own order history is a true demand signal. Content behind dealer logins or gated portals. Prices where a distributor does not publish them. Inventory or stock levels unless the site states them. Coverage is bounded by what each site exposes, and we state that before you find it yourself.",
  },
  {
    q: "Is a whitespace finding reliable? Absence is a strong claim.",
    a: "It is the claim we are most careful with. A category can look empty because the distributor does not serve it, because that part of the catalog is gated, or because they name it something our taxonomy did not match. All three are reported differently, and only the first is called whitespace. An overstated opening is the fastest way to lose a rep's trust in the whole report.",
  },
  {
    q: "Who owns the reports and the underlying data?",
    a: "You do. The reports, the evidence links, the extracted records for your network and the analysis are yours, and you keep them if the engagement ends. Monitoring is how the picture stays current as catalogs change — not a licence you have to keep buying to keep findings you already paid for.",
  },
  {
    q: "Is any of this legally risky for us?",
    a: "We read public pages at one request per second, respect robots.txt and website terms, and never access content behind a dealer login. Gated sites are reported as gated. The data is used for commercial intelligence only, and every finding is traceable to a page the distributor chose to publish.",
  },
];

/** /contact — short set, focused on the call itself. */
export const contactFaqs: Faq[] = [
  {
    q: "What happens on the discovery call?",
    a: "We ask about your distributor network — how many domains, which regions, which categories you are contesting and which competitor brands you want counted. You get a straight read on whether a census is worth running and what it would cover. Nothing is quoted on the call itself.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "No. A rough distributor count, the categories you sell into, and the names of two or three competitors is plenty. If you have a distributor list in a spreadsheet, bring it; if you do not, assembling one is part of the scoping.",
  },
  {
    q: "Can we see a sample report first?",
    a: "Yes. We will share an anonymised displacement or whitespace sample from a reference engagement so you can see the shape of the findings and the evidence links before committing to anything. Ask on the call or by email and it goes out the same day.",
  },
  {
    q: "What if our channel is not a fit?",
    a: "Then we will say so. If your distributors publish nothing online, or you sell direct, or your network is three accounts you already know intimately, there is nothing here worth buying. That is a more useful answer than a proposal.",
  },
];
