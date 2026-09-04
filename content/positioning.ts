/**
 * The positioning spine.
 *
 * Everything the site says about the problem comes from this file. That is
 * deliberate: the failure mode for a consultancy site is five pages that each
 * describe the problem slightly differently, which reads as five different
 * companies. One vocabulary, defined once, quoted everywhere.
 *
 * The two terms, and the rule for using them:
 *
 *   THE BLACK HOLE — the named enemy. Repetitive work that nobody designed
 *   and that accumulated: the retyping, the chasing, the reconciling, the
 *   checking. It is a black hole rather than a backlog because it has mass —
 *   the bigger you get, the harder it pulls, and it never gives anything back.
 *   Always lowercase "the black hole" in running prose. Never "your black
 *   hole" (it is not the client's fault) and never pluralised.
 *
 *   ESCAPE VELOCITY — the coined term the firm owns, and the thing being
 *   sold. The point at which the systems you run give back more hours than
 *   they take to run. It is a threshold, so it is always something a business
 *   reaches, crosses or is short of — never something we "provide".
 *
 * The rocket is the visual consequence of escape velocity, not a third term.
 * It appears in artwork and in the home page's closing movement. It is not a
 * word that should turn up in body copy as a metaphor for the work.
 */

export const positioning = {
  /** The category the firm competes in. Used in schema and in metadata. */
  category: "AI automation consulting",

  /** The one-line position. Kept under 90 characters so it fits a title tag
      alongside the brand without truncating in a SERP. */
  position:
    "We find the repetitive work eating your week, price it, and automate it.",

  enemy: {
    name: "the black hole",
    /** The definition, as it appears on the home page and /about verbatim. */
    definition:
      "The repetitive work nobody designed. It accumulated one workaround at a time, it has never been measured, and it takes a fixed cut of every week whether or not the week was profitable.",
    /** Why it is a black hole and not just a backlog — the argument that
        makes the metaphor earn its place. */
    mechanic:
      "A backlog shrinks when you work harder. This does the opposite: every new client, tool and hire adds mass, and the pull grows with the business. That is why the busiest operations are the ones losing the most to it.",
  },

  coinage: {
    term: "escape velocity",
    definition:
      "The point at which the systems you run give back more hours than they take to run. Before it, automation is a project you maintain. After it, it is capacity you own.",
    /** How the firm claims to measure it — the credibility leg of the term. */
    measure:
      "We put a number on the pull before we build anything: hours per week, by process, priced at your own loaded labour cost. Escape velocity is the point where the build crosses that number. If we cannot see it crossing, we say so.",
  },
} as const;

/**
 * The problem section on the home page.
 *
 * These are symptoms, not services, and they are written as things a reader
 * recognises in their own week rather than as categories. The `cost` line is
 * what turns a gesture at a problem into stakes — the rubric this site was
 * designed against scores "a problem with no stakes" as a 2.
 *
 * ⚠️ The `cost` figures are illustrative ranges drawn from typical audit
 * findings, not measured client averages. Keep them as ranges.
 */
export const symptoms = [
  {
    line: "Somebody re-types last week's invoices into the accounting system.",
    cost: "4–9 hrs / week",
    fix: "Invoice intake",
  },
  {
    line: "Half the morning goes on sorting the inbox before any real work starts.",
    cost: "5–12 hrs / week",
    fix: "Enquiry triage",
  },
  {
    line: "The CRM and the accounting package disagree, so someone reconciles them by hand.",
    cost: "3–6 hrs / week",
    fix: "Systems sync",
  },
  {
    line: "A lead sits unanswered for two days, because nobody knew it was waiting.",
    cost: "Unmeasured, and usually the expensive one",
    fix: "Lead capture",
  },
  {
    line: "The month-end pack is assembled by hand from four systems, every month.",
    cost: "2–4 days / month",
    fix: "Reporting",
  },
] as const;

/**
 * The labels orbiting the hero.
 *
 * The work being eaten, not the services. Five of them are the symptoms'
 * own `fix` names, taken from the array above rather than retyped, so the
 * ring cannot drift out of step with the list two screens below it. The last
 * two are the verbs that recur across all five — they have no single symptom
 * because they are what most of the symptoms are made of.
 */
export const pull = [
  ...symptoms.map((symptom) => symptom.fix),
  "Chasing",
  "Reconciling",
] as const;

/**
 * Who this is for. Written as a qualification, with a genuine exclusion —
 * a page that says "we work with everyone" says nothing, and the exclusion
 * is what makes the inclusion credible.
 */
export const audience = {
  forWho: [
    {
      title: "10 to 250 people",
      short: "Big enough that one process eats real payroll. Small enough that someone can still describe it.",
      body: "Big enough that a single process consumes a real share of payroll, small enough that one person can still describe how the whole thing works. That second part matters more than the first.",
    },
    {
      title: "Running on tools that don't talk",
      short: "A CRM, a ledger, a scheduler, an inbox — and a person in the middle being the integration.",
      body: "A CRM, an accounting package, a scheduler, a shared inbox, and a person in the middle acting as the integration. The more systems you have bought, the more likely this is the shape of your problem.",
    },
    {
      title: "Owner-operated, or close to it",
      short: "Whoever feels the cost can approve the fix. Four committees is not our engagement.",
      body: "The person who feels the cost is the person who can approve the fix. Engagements that need four committees to sanction a change are not ones we are good at.",
    },
  ],
  notForWho: {
    title: "Who we turn down",
    body: "Under about ten people, the numbers rarely justify the engagement and we will say so on the call. Pre-revenue startups looking for an AI feature to sell are a different job than this one. And if the process changes every month, there is nothing stable enough to automate yet — fix the process first, then come back.",
  },
} as const;

/**
 * The engagement, as it appears on the home page. The service pages carry
 * their own, more specific process; this is the shape of the whole thing.
 */
export const howItWorks = [
  {
    n: "01",
    title: "Discovery call",
    tag: "Free · 15 min",
    short: "A straight read on whether there is a case worth measuring.",
    body: "A short conversation about how the operation actually runs and where work queues up. If we cannot see a credible case, you get told that on this call rather than in a proposal three weeks later.",
  },
  {
    n: "02",
    title: "The audit",
    tag: "Paid · 1 week",
    short: "We time the work and price it. A third of these say don't build.",
    body: "We sit with the people who do the work, time the steps, and price the waste at your own labour cost. You get a map of the pull ranked by what it costs a year, and a recommendation — including 'don't build', which is roughly a third of them.",
  },
  {
    n: "03",
    title: "Build and integration",
    tag: "Fixed price · 2–3 weeks",
    short: "Into the tools you already run, tested against your real data.",
    body: "We build into the tools you already run rather than adding another one. Tested against your real data before it touches live work, and rolled out with the old process still running underneath as a fallback.",
  },
  {
    n: "04",
    title: "Escape velocity",
    tag: "Measured at 30 and 90 days",
    short: "Re-measured against the baseline. You own everything.",
    body: "We re-measure the same metrics, with the same definitions, against the baseline the audit established. You own the system, the documentation and the admin access outright. We keep watching it, because an unwatched system drifts.",
  },
] as const;

/**
 * Integration board. These are the categories of system we connect to, with
 * named examples — naming them is the point, since "integrates with your
 * stack" is what every competitor says and none of them evidence.
 */
export const integrations = [
  {
    category: "Accounting & finance",
    tools: ["QuickBooks", "Xero", "Sage", "Stripe", "Dext"],
  },
  {
    category: "CRM & sales",
    tools: ["HubSpot", "Salesforce", "Pipedrive", "Zoho", "Close"],
  },
  {
    category: "Comms & scheduling",
    tools: ["Outlook", "Gmail", "Slack", "Calendly", "Twilio"],
  },
  {
    category: "Documents & storage",
    tools: ["SharePoint", "Google Drive", "Dropbox", "DocuSign", "Box"],
  },
  {
    category: "Operations",
    tools: ["Monday", "Asana", "Jobber", "ServiceTitan", "Shopify"],
  },
  {
    category: "Marketing",
    tools: ["Meta Ads", "Google Ads", "Klaviyo", "Mailchimp", "Higgsfield"],
  },
] as const;

/**
 * Data handling. Written as commitments with a mechanism attached, because
 * "we take security seriously" is not a commitment.
 */
export const dataPractice = [
  {
    title: "It runs in your accounts",
    short: "Your tenancy, your API keys, your storage.",
    body: "Wherever the tools allow it, the automation runs on your own tenancy, your own API keys and your own storage. We are a user on your systems, not a middleman holding your data on ours.",
  },
  {
    title: "Scoped to the workflow",
    short: "Access per process, not per company.",
    body: "Access is granted per process, not per company. An invoice pipeline gets the invoice mailbox and the accounting ledger, and it does not get your HR folder because nobody had time to work out the permissions.",
  },
  {
    title: "Nothing trains a public model",
    short: "Zero-retention endpoints, provider named in the audit.",
    body: "Your documents, customers and figures are not used to train anyone's model, ours included. Where a third-party model is in the path we use the zero-retention endpoints and name the provider in the audit before you sign anything.",
  },
  {
    title: "A person on anything uncertain",
    short: "A confidence gate you set, not one we hide.",
    body: "Every pipeline has a confidence gate. Below the threshold, the item routes to a human queue instead of being guessed at, and the threshold is a number you set rather than one we hide.",
  },
  {
    title: "You keep the keys",
    short: "Admin access and docs at handover. End it and it still runs.",
    body: "At handover you get the admin access, the documentation, the prompts and the integration credentials. If you end the engagement tomorrow, the system keeps running and you can hand it to anyone.",
  },
] as const;
