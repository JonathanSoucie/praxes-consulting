/**
 * What we offer: three services, not a menu.
 *
 * The previous build listed six capability-shaped services (document intake,
 * knowledge assistants, reporting…). Those are things we build, not things
 * you buy — they now live as `examples` under the two automation services,
 * where they belong. What you buy is an audit, or one of two families of
 * automation work, and the site says so in three places instead of six.
 *
 * The `process` array on each service is the spine of its page: a sticky
 * visual on one side, the steps on the other, the visual changing as each
 * step becomes the live one. See components/process/process-steps.tsx.
 */

/** What the sticky panel draws for a given step. Three shapes cover every
    step on the site; adding a fourth means teaching the renderer about it. */
export type StepPanel =
  /** A left-to-right chain. Used for anything that is a pipeline. */
  | {
      kind: "flow";
      nodes: { label: string; note?: string; state?: "live" | "idle" | "flag" }[];
    }
  /** A list with a value and a state per row. Used for findings and queues. */
  | {
      kind: "rows";
      caption?: string;
      rows: { label: string; value: string; state?: "ok" | "warn" | "idle" }[];
    }
  /** Horizontal bars, 0–100. Used wherever the point is a comparison. */
  | {
      kind: "bars";
      caption?: string;
      bars: { label: string; value: number; note?: string; muted?: boolean }[];
    };

/**
 * The glyph shown in the chip above a step's heading. A string rather than an
 * imported icon component: this file is plain data, and lib/schema.ts imports
 * it to build JSON-LD — pulling React components in here would drag the whole
 * icon set into a module that only wants strings. The mapping to real icons
 * lives in components/process/process-steps.tsx.
 */
export type StepIcon =
  | "users"
  | "timer"
  | "calculator"
  | "ranking"
  | "route"
  | "target"
  | "branches"
  | "plug"
  | "gate"
  | "compare"
  | "measure"
  | "audience"
  | "approve"
  | "send"
  | "revenue";

export type ProcessStep = {
  n: string;
  title: string;
  body: string;
  icon: StepIcon;
  /** The one thing the client is left holding after this step. */
  output?: string;
  panel: StepPanel;
};

export type ServiceExample = {
  title: string;
  body: string;
  /** Two or three, each short enough to set on one line. */
  points: readonly string[];
};

export type Service = {
  slug: string;
  /** Short label for nav and cards. */
  name: string;
  /** Full title for the page H1. */
  title: string;
  /** The line under the H1. */
  standfirst: string;
  /** One line, used on the services index and in the home page grid. */
  summary: string;
  /** The situation the service exists for, framed against the black hole. */
  problem: string;
  /** What the engagement actually is, in plain terms. */
  definition: string;
  /** Commercial shape. Deliberately concrete. */
  shape: { label: string; value: string }[];
  processTitle: string;
  processStandfirst: string;
  process: ProcessStep[];
  examplesTitle?: string;
  examplesStandfirst?: string;
  examples?: ServiceExample[];
};

export const services: Service[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "automations-audit",
    name: "Automations Audit",
    title: "The Automations Audit",
    standfirst:
      "One week. We measure what the black hole is actually taking, price it at your own labour cost, and tell you whether it is worth fixing.",
    summary:
      "A measured, priced map of where your week goes — before anyone builds anything.",
    problem:
      "You suspect automation would help somewhere. Nobody has established which process is costing the most, what fixing it would be worth, or whether the answer is a build at all. So the decision gets made on a vendor's demo instead of on your own numbers.",
    definition:
      "A fixed-fee week of measurement. We sit with the people who run the work, time the steps, and put an annual figure against each one. You leave with a ranked map of the pull, a model with its assumptions written out, and a recommendation you can act on with us, with someone else, or on your own.",
    shape: [
      { label: "Duration", value: "One week" },
      { label: "Price", value: "Fixed fee, quoted on the call" },
      { label: "Your time", value: "A few hours, spread across the week" },
      { label: "You keep", value: "Everything, regardless of what follows" },
    ],
    processTitle: "How the audit runs",
    processStandfirst:
      "Five days, in the same order every time. The point is not to be clever about your business — it is to measure it the same way we measure everyone's, so the number means something.",
    process: [
      {
        n: "01",
        title: "We sit with the people who do the work",
        icon: "users",
        body:
          "Not the org chart, and not the process document — the people. Documented processes describe what should happen; the black hole is made almost entirely of what actually happens. Every workaround in your operation exists because somebody needed it, and none of them are written down.",
        output: "A path map of the real process, exceptions included",
        panel: {
          kind: "rows",
          caption: "Session log",
          rows: [
            { label: "Intake coordinator", value: "2 sessions", state: "ok" },
            { label: "Bookkeeper", value: "2 sessions", state: "ok" },
            { label: "Ops manager", value: "1 session", state: "ok" },
            { label: "Documented process", value: "Ignored by 3 of 3", state: "warn" },
          ],
        },
      },
      {
        n: "02",
        title: "We time the steps",
        icon: "timer",
        body:
          "Every hand-off, every re-entry, every wait. Waiting counts: the days a file sits open because it is blocked on something is usually a bigger number than the handling time everybody assumes is the problem, and it is invisible in a timesheet.",
        output: "Handling time and dead time, per step",
        panel: {
          kind: "bars",
          caption: "Where the time actually goes",
          bars: [
            { label: "Waiting on documents", value: 46, note: "9.4 days avg" },
            { label: "Re-keying between systems", value: 31 },
            { label: "Checking and correcting", value: 14 },
            { label: "The work itself", value: 9, muted: true },
          ],
        },
      },
      {
        n: "03",
        title: "We price it at your cost, not ours",
        icon: "calculator",
        body:
          "Hours become money using your loaded labour cost, your volumes and your seasonality. The model states its assumptions on the same page as its conclusion, so you can argue with it — and clients do, which is the point. A number you cannot interrogate is a sales tool, not a finding.",
        output: "A cost model with every assumption stated",
        panel: {
          kind: "rows",
          caption: "Annual cost of the current path",
          rows: [
            { label: "Loaded rate (yours)", value: "$41 / hr", state: "idle" },
            { label: "Volume", value: "240 / yr", state: "idle" },
            { label: "Hours per unit", value: "6.2", state: "idle" },
            { label: "Annual cost", value: "$61,000", state: "warn" },
          ],
        },
      },
      {
        n: "04",
        title: "We rank it by what it takes a year",
        icon: "ranking",
        body:
          "Every candidate process, ordered by annual cost against the effort to fix it. This is usually where the surprise is. The process people complain about is rarely the expensive one — complaining tracks how annoying work is, not how much of it there is.",
        output: "A ranked map of every candidate",
        panel: {
          kind: "bars",
          caption: "Candidates, by annual cost",
          bars: [
            { label: "Client onboarding", value: 100, note: "$61k" },
            { label: "Invoice intake", value: 62, note: "$38k" },
            { label: "Month-end pack", value: 41, note: "$25k" },
            { label: "Quote turnaround", value: 18, note: "$11k" },
          ],
        },
      },
      {
        n: "05",
        title: "We recommend a sequence — or tell you not to build",
        icon: "route",
        body:
          "What to do first, what to do after it, and what to leave alone. Roughly a third of audits recommend against building: the process is about to change, the volume is too low, or the fix is a policy change that costs nothing. You paid for an accurate answer, and that is one of the accurate answers.",
        output: "A sequence, a fixed price, and a stated case for not proceeding",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Fix the chase", note: "First — 46% of the cost", state: "live" },
            { label: "Then extraction", note: "Second — 31%", state: "idle" },
            { label: "Leave quoting", note: "Volume too low", state: "flag" },
          ],
        },
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "operations-automations",
    name: "Operations Automations",
    title: "Operations Automations",
    standfirst:
      "The work that keeps the business running, running without a person in the middle of it. This is the half that gets the week back.",
    summary:
      "Custom systems for the internal work — intake, sync, routing, reporting, supply.",
    problem:
      "Your systems do not talk, so a person is the integration. They copy from one screen into another, chase what has not arrived, reconcile what disagrees, and check the things that go wrong often enough to need checking. None of it was designed. All of it is load-bearing.",
    definition:
      "One process at a time, built into the tools you already run rather than added alongside them. We start with whatever the audit ranked first, prove it against your real data before it touches live work, and put a person on anything the system is not confident about.",
    shape: [
      { label: "Duration", value: "2–3 weeks per process" },
      { label: "Price", value: "Fixed, quoted from the audit" },
      { label: "Runs on", value: "Your accounts and your keys" },
      { label: "Handover", value: "Admin access, docs, training" },
    ],
    processTitle: "How we build one",
    processStandfirst:
      "The same six steps whether it is invoice intake or supply management. Most of the risk in this work is in steps two and four, and most vendors skip both.",
    process: [
      {
        n: "01",
        title: "One process, the one that costs most",
        icon: "target",
        body:
          "Not a platform, not a transformation. One process, chosen because the audit put the biggest annual number against it. Automating three things badly at once is the most reliable way to end up back on spreadsheets in six months.",
        output: "A scoped process with a baseline attached",
        panel: {
          kind: "rows",
          caption: "Scope",
          rows: [
            { label: "In scope", value: "Client onboarding", state: "ok" },
            { label: "Baseline", value: "6.2 hrs / unit", state: "idle" },
            { label: "Target", value: "Under 2.0 hrs", state: "idle" },
            { label: "Out of scope", value: "Everything else", state: "idle" },
          ],
        },
      },
      {
        n: "02",
        title: "Map the path, including what goes wrong",
        icon: "branches",
        body:
          "The happy path takes an afternoon to map. The exceptions take the rest of the week, and they are the reason automation projects fail — a system that handles the standard case and falls over on the other fifteen percent creates more work than it removes, because now somebody is doing the hard cases and supervising a robot.",
        output: "Every branch, with an owner for each exception",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Request", state: "live" },
            { label: "Received", state: "live" },
            { label: "Incomplete", note: "17% of cases", state: "flag" },
            { label: "Wrong entity", note: "4%", state: "flag" },
          ],
        },
      },
      {
        n: "03",
        title: "Build into the tools you already run",
        icon: "plug",
        body:
          "Into your CRM, your accounting package, your inbox — not a new dashboard your team has to remember to open. The measure of whether this worked is that nobody had to change what they open in the morning.",
        output: "A working pipeline in your own accounts",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Inbox", note: "Existing", state: "idle" },
            { label: "Extract & check", note: "New", state: "live" },
            { label: "Your CRM", note: "Existing", state: "idle" },
            { label: "Your ledger", note: "Existing", state: "idle" },
          ],
        },
      },
      {
        n: "04",
        title: "Put a confidence gate on it",
        icon: "gate",
        body:
          "Every item gets a confidence score, and anything under the threshold routes to a person instead of being guessed at. You set the threshold. Set it high at go-live and walk it down as the numbers come in — that is what makes the first month survivable.",
        output: "A review queue, and a threshold you control",
        panel: {
          kind: "rows",
          caption: "Live queue",
          rows: [
            { label: "Auto-processed", value: "83%", state: "ok" },
            { label: "Held for review", value: "14%", state: "warn" },
            { label: "Rejected outright", value: "3%", state: "warn" },
            { label: "Threshold", value: "0.92 — yours to move", state: "idle" },
          ],
        },
      },
      {
        n: "05",
        title: "Run both, then switch",
        icon: "compare",
        body:
          "The new path runs alongside the old one, on the same live work, until the outputs agree. Nobody is asked to trust it on the strength of a demo. If it disagrees with the humans, the humans are usually right and we go back to step two.",
        output: "A parallel-run report before anything is turned off",
        panel: {
          kind: "bars",
          caption: "Parallel run, agreement by week",
          bars: [
            { label: "Week 1", value: 71 },
            { label: "Week 2", value: 88 },
            { label: "Week 3", value: 97, note: "Cutover" },
          ],
        },
      },
      {
        n: "06",
        title: "Measure at 30 and 90 days",
        icon: "measure",
        body:
          "Same metrics, same definitions, against the baseline the audit established. At ninety days you get the comparison whether or not it flatters us. A system nobody is watching drifts, and drift is how these quietly stop paying back.",
        output: "A measured return against the original baseline",
        panel: {
          kind: "bars",
          caption: "Hours per unit",
          bars: [
            { label: "Baseline", value: 100, note: "6.2 hrs", muted: true },
            { label: "Day 30", value: 42, note: "2.6 hrs" },
            { label: "Day 90", value: 31, note: "1.9 hrs" },
          ],
        },
      },
    ],
    examplesTitle: "What operations work looks like",
    examplesStandfirst:
      "Six of the systems we are asked for most. Every one of them started as somebody's afternoon.",
    examples: [
      {
        title: "Supply and inventory management",
        body:
          "Stock positions, reorder points and supplier lead times held in one place, with purchase orders raised before something runs out rather than after somebody notices.",
        points: [
          "Reorder triggered on live position, not a weekly check",
          "Supplier lead times tracked against what was promised",
          "Shortfalls flagged with a date, not a colour",
        ],
      },
      {
        title: "Document and invoice intake",
        body:
          "Files read the moment they arrive — from the inbox, the portal, or a scanner — and written into the system of record with the fields already checked.",
        points: [
          "Email and portal attachments both",
          "Validated against your own rules on the way in",
          "Anything uncertain goes to a person",
        ],
      },
      {
        title: "Systems that don't talk",
        body:
          "Your CRM, accounting package and scheduler kept in step without anyone retyping. The most common thing we are asked to build, and the most common thing an audit ranks first.",
        points: [
          "Two-way sync with rules for which side wins",
          "Conflicts surfaced instead of silently overwritten",
          "No new system for anyone to learn",
        ],
      },
      {
        title: "Queue and approval routing",
        body:
          "Work assigned to whoever should have it, escalated when it has sat too long, and visible while it is still fixable rather than at month-end.",
        points: [
          "Assignment on the actual content of the request",
          "Ageing work escalates on its own",
          "Approvals that don't stall on one inbox",
        ],
      },
      {
        title: "Reports and reconciliations",
        body:
          "The month-end pack assembled from source on a schedule and delivered finished, with the same definitions every cycle and discrepancies flagged rather than buried.",
        points: [
          "Pulled from live systems, not last week's export",
          "Same definitions every cycle",
          "Variance caught in-period",
        ],
      },
      {
        title: "Inbox and enquiry triage",
        body:
          "Incoming mail sorted by what it actually is, routed to the right person, with the account history already attached when it lands.",
        points: [
          "Categorised on content, not on sender",
          "Context attached on arrival",
          "Sensitive categories always go to a human",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "marketing-automations",
    name: "Marketing Automations",
    title: "Marketing Automations",
    standfirst:
      "The half that puts the recovered week to work. Nothing here is worth building until operations has freed the time to run it — that order is the argument, not a preference.",
    summary:
      "Lead generation, outbound, and ad production that runs without a marketing hire.",
    problem:
      "Growth work is the first thing to get dropped when the week fills up, and the week always fills up. So outbound goes out in bursts, leads sit unanswered overnight, and ad creative is whatever was made last quarter — not because anyone decided that, but because the black hole took the hours that would have gone to it.",
    definition:
      "Systems that generate, qualify and follow up on demand at a pace a person cannot sustain, with a human approval step wherever your name is on the output. Built after operations work, judged on revenue rather than on opens.",
    shape: [
      { label: "Duration", value: "2–3 weeks per system" },
      { label: "Price", value: "Fixed, quoted from the audit" },
      { label: "Prerequisite", value: "Operations work, first" },
      { label: "Judged on", value: "Pipeline and revenue" },
    ],
    processTitle: "How we build one",
    processStandfirst:
      "Marketing automation fails differently than operations automation: it fails by producing volume nobody wanted. Steps one and five exist to stop that.",
    process: [
      {
        n: "01",
        title: "Start from what already converts",
        icon: "target",
        body:
          "Your closed-won list, your best accounts, the emails that actually got replies. Automation multiplies whatever you point it at, which means pointing it at an untested message is the fastest way to burn a domain and a list at the same time.",
        output: "The segment and message worth multiplying",
        panel: {
          kind: "rows",
          caption: "Closed-won, last 18 months",
          rows: [
            { label: "Accounting practices", value: "31 won", state: "ok" },
            { label: "Clinics", value: "18 won", state: "ok" },
            { label: "Logistics", value: "4 won", state: "warn" },
            { label: "Everything else", value: "Not multiplied", state: "idle" },
          ],
        },
      },
      {
        n: "02",
        title: "Build the audience from real customers",
        icon: "audience",
        body:
          "Lists built and verified against the pattern of who already buys, not bought wholesale. For paid, the audiences are seeded from your own customer list rather than from a platform's guess at your market.",
        output: "A verified list, and audiences seeded from your own data",
        panel: {
          kind: "flow",
          nodes: [
            { label: "Customer list", state: "idle" },
            { label: "Pattern", note: "Size, sector, stack", state: "live" },
            { label: "Sourced", note: "Verified", state: "live" },
            { label: "Audience", state: "live" },
          ],
        },
      },
      {
        n: "03",
        title: "Generate, then approve",
        icon: "approve",
        body:
          "Copy, creative and variants generated against your own material and your own voice — then held for one-click approval before anything goes out under your name. The approval step is not a formality; it is the thing standing between automation and embarrassment.",
        output: "A queue of drafts, none of them sent yet",
        panel: {
          kind: "rows",
          caption: "Approval queue",
          rows: [
            { label: "Ad variants", value: "12 drafted", state: "warn" },
            { label: "Cold sequences", value: "4 drafted", state: "warn" },
            { label: "Approved today", value: "9", state: "ok" },
            { label: "Sent without approval", value: "0", state: "ok" },
          ],
        },
      },
      {
        n: "04",
        title: "Send at a pace the domain survives",
        icon: "send",
        body:
          "Warmed sending infrastructure, volume ramped rather than switched on, and replies routed to a human immediately. The constraint on outbound has never been how fast you can generate messages — it is deliverability, and it is unforgiving.",
        output: "A ramp schedule and a reply path to a person",
        panel: {
          kind: "bars",
          caption: "Daily send volume, by week",
          bars: [
            { label: "Week 1", value: 18, note: "20 / day" },
            { label: "Week 2", value: 42, note: "48 / day" },
            { label: "Week 4", value: 78, note: "90 / day" },
            { label: "Deliverability", value: 97, note: "Held above 95%" },
          ],
        },
      },
      {
        n: "05",
        title: "Judge it on revenue",
        icon: "revenue",
        body:
          "Opens and impressions are how a channel reports on itself. We instrument through to closed revenue and kill what does not produce any, including things we built. A marketing system with no off-switch is a subscription, not an asset.",
        output: "Attribution through to closed-won, and a kill list",
        panel: {
          kind: "bars",
          caption: "Pipeline by source, last quarter",
          bars: [
            { label: "Cold outbound", value: 100, note: "$214k" },
            { label: "Paid social", value: 54, note: "$116k" },
            { label: "Nurture / win-back", value: 37, note: "$79k" },
            { label: "Retired: display", value: 6, note: "Killed at day 60", muted: true },
          ],
        },
      },
    ],
    examplesTitle: "What marketing work looks like",
    examplesStandfirst:
      "The three we are asked for most, and three that tend to follow them.",
    examples: [
      {
        title: "Lead generation",
        body:
          "Every enquiry enriched, scored and answered within minutes of arriving, at whatever hour it arrives — and written into the CRM before anyone touches it.",
        points: [
          "Enriched and scored on arrival",
          "First reply in minutes, not next morning",
          "Routed by fit, not by whoever is free",
        ],
      },
      {
        title: "Cold email",
        body:
          "Verified lists, genuine per-account research rather than a merge field, and pacing that keeps the domain healthy. Replies land with a person immediately.",
        points: [
          "Research per account, not per template",
          "Warmed infrastructure and a ramped volume",
          "Sequence stops the moment they reply",
        ],
      },
      {
        title: "Ad creation and upload",
        body:
          "Creative generated with Higgsfield, assembled into variants, and pushed straight into Meta and Google as campaigns — with a human approving each batch before it spends anything.",
        points: [
          "Higgsfield for generation, your brief and brand",
          "Variants built and uploaded as campaigns",
          "Nothing spends before someone approves it",
        ],
      },
      {
        title: "Nurture and re-engagement",
        body:
          "Sequences paced to the stage a deal is actually at, that stop when someone replies, and that go back over old pipeline nobody has time to revisit.",
        points: [
          "Paced to the stage, not to a calendar",
          "Stops instantly on a reply",
          "Win-backs on pipeline that went cold",
        ],
      },
      {
        title: "Social post generation",
        body:
          "A week of posts drafted in your voice from work you have already done — the job you finished, the result you got — then scheduled after approval.",
        points: [
          "Written from your own material",
          "Approval before anything posts",
          "Scheduled across your channels",
        ],
      },
      {
        title: "Reviews and referrals",
        body:
          "Asks that go out when a customer is happiest, which is a narrow window and one nobody remembers to catch by hand.",
        points: [
          "Timed to the work finishing",
          "Referral prompt built into the ask",
          "Escalates an unhappy response to a person",
        ],
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** The kinds of plant we name. Structured-data audience only — the site
    itself says "manufacturers" and lets the solutions do the specifying. */
export const industries = [
  { name: "Precision machining and job shops" },
  { name: "Metal fabrication" },
  { name: "Plastics and moulding" },
  { name: "Electronics and assembly" },
  { name: "Food and beverage processing" },
] as const;
