/**
 * Per-segment pages.
 *
 * The rule these were written under: if a paragraph would survive having its
 * industry noun swapped for another industry's noun, it has failed and gets
 * rewritten. A page that says "streamline your clinic operations" is the same
 * page as "streamline your logistics operations" and is worth nothing to
 * either reader.
 *
 * So each segment below is written in its own vocabulary — trial balances and
 * engagement letters for the practices, PODs and detention for the carriers,
 * recalls and predeterminations for the clinics. Someone in the trade should
 * be able to tell we have been in one of these businesses; someone outside it
 * should find the page slightly opaque. That second part is the test.
 *
 * ⚠️ The `proof` figures on each segment are illustrative of typical audit
 * findings in that vertical, not measured client results. They are ranges for
 * that reason. Replace with real measured numbers as engagements close.
 */

export type Segment = {
  slug: string;
  /** Nav and card label. */
  name: string;
  /** The reader, named. Appears as the eyebrow on the page. */
  who: string;
  title: string;
  standfirst: string;
  /** One line for the index grid. */
  summary: string;
  /** What the black hole is made of in this specific trade. */
  blackHole: { title: string; body: string };
  /** Symptoms in the trade's own words. */
  symptoms: { line: string; cost: string }[];
  /** What we typically build here, first. */
  builds: { title: string; body: string }[];
  /** The objection this particular buyer raises, and the answer. */
  objection: { q: string; a: string };
  proof: { value: string; label: string; note?: string }[];
};

export const segments: Segment[] = [
  {
    slug: "accounting-practices",
    name: "Accounting & Bookkeeping",
    who: "For practice owners and partners",
    title: "Your January is not a capacity problem.",
    standfirst:
      "It is a chase problem. The hours that disappear in busy season mostly are not spent preparing anything — they are spent waiting for documents and asking again.",
    summary:
      "Onboarding, document chasing, and the month-end assembly that eats the first week of every month.",
    blackHole: {
      title: "What it is made of in a practice",
      body:
        "An engagement letter that goes out, a client who sends four of the seven things, and a junior who remembers on Thursday to ask for the rest. Trial balances rebuilt because the bookkeeper and the software disagree. The same twenty questions answered by email for the third year running. None of it is preparation work, all of it is billed to your capacity, and it is invisible in a timesheet because nobody codes it to anything.",
    },
    symptoms: [
      { line: "Onboarding a new client means three rounds of asking for documents", cost: "9.4 days of dead time per file, typical" },
      { line: "Someone re-keys source documents into the ledger every week", cost: "4–9 hrs / week" },
      { line: "The prior-year file gets rebuilt because nobody trusts the carry-forward", cost: "1–3 hrs per engagement" },
      { line: "Month-end close is assembled by hand from four systems", cost: "2–4 days / month" },
      { line: "Deadline tracking lives in one partner's head and a spreadsheet", cost: "The one that costs a penalty" },
    ],
    builds: [
      {
        title: "Requirement-aware intake",
        body:
          "The system works out which documents this client type actually requires and asks for all of them once, rather than discovering the gaps one round at a time. Outstanding items chase themselves on a schedule and escalate to the engagement lead when they age.",
      },
      {
        title: "Source-document extraction with a review gate",
        body:
          "Statements, invoices and receipts read on arrival and posted into the ledger with the fields validated. Anything below your confidence threshold routes to a review queue instead of being posted on a guess — which is the only version of this a practice can actually sign off on.",
      },
      {
        title: "Close pack assembly",
        body:
          "Working papers and the month-end pack pulled from source on a schedule, with the same definitions every cycle and variances flagged while the period is still open.",
      },
    ],
    objection: {
      q: "Our clients are not going to accept a robot handling their file.",
      a: "Nothing here touches judgement, and nothing goes to a client unreviewed. The work being automated is the collection, the chasing, the re-keying and the assembly — the part your clients already assume is happening invisibly and would be unhappy to learn is billed to a senior. Review, advice and the signature stay exactly where they are.",
    },
    proof: [
      { value: "46%", label: "Of onboarding time is chasing", note: "Not preparation — measured across audits" },
      { value: "9.4 → 2.1", label: "Days to complete intake", note: "Typical after a chase build" },
      { value: "1 in 3", label: "Audits that say don't build" },
    ],
  },

  {
    slug: "logistics",
    name: "Logistics & Distribution",
    who: "For carriers, brokers and 3PLs",
    title: "The margin is in the paperwork, and so is the leak.",
    standfirst:
      "Freight moves fine. What does not move is the POD that arrives as a photograph, the rate quote that took two hours to return, and the detention nobody billed for because the evidence was in a text message.",
    summary:
      "Quote turnaround, POD capture, detention billing, and the status calls that eat a dispatcher's day.",
    blackHole: {
      title: "What it is made of on a dock",
      body:
        "A dispatcher who spends the afternoon answering 'where is my load' by looking it up and typing it back. PODs that arrive as photographs and get filed by hand before anything can be invoiced. Detention and accessorials that go unbilled because proving them means reconstructing a timeline from three sources after the fact. Rate quotes that go out slowly enough that the load is already covered.",
    },
    symptoms: [
      { line: "Dispatch answers status enquiries by looking them up and re-typing them", cost: "6–12 hrs / week per dispatcher" },
      { line: "PODs arrive as photos and are filed by hand before invoicing", cost: "2–5 days added to DSO" },
      { line: "Detention goes unbilled because the evidence is scattered", cost: "Usually the largest single number" },
      { line: "Rate quotes take hours to return and the load is gone", cost: "Lost revenue, never counted" },
      { line: "Carrier compliance documents expire without anyone noticing", cost: "One incident is the whole year's savings" },
    ],
    builds: [
      {
        title: "Quote turnaround",
        body:
          "Inbound rate requests parsed out of email, priced against your lane history and current capacity, and returned as a quote in minutes — with anything unusual held for a human rather than guessed at.",
      },
      {
        title: "POD capture to invoice",
        body:
          "Proof of delivery read on arrival whatever form it takes, matched to the load, and released to invoicing automatically. The gap between delivered and invoiced is the cheapest working capital in the business and almost nobody closes it.",
      },
      {
        title: "Detention and accessorial evidence",
        body:
          "Arrival and departure timestamps assembled into a billable record as the load runs, so the accessorial is provable at invoice time rather than reconstructed during a dispute you will probably concede.",
      },
    ],
    objection: {
      q: "Our customers all want something different. This is too custom to automate.",
      a: "That is true and it is the reason to measure before building. Every carrier we audit has a handful of accounts with genuinely bespoke requirements and a long tail that are all the same job with a different logo. The audit tells you which is which, by volume. We automate the tail and leave the bespoke accounts with the people who know them.",
    },
    proof: [
      { value: "2–5 days", label: "Typical DSO recovered", note: "From closing the delivered-to-invoiced gap" },
      { value: "6–12 hrs", label: "Per dispatcher, per week", note: "Spent on status enquiries alone" },
      { value: "Under 15 min", label: "Quote turnaround, after" },
    ],
  },

  {
    slug: "clinics",
    name: "Healthcare Clinics",
    who: "For practice and clinic managers",
    title: "An empty chair costs more than a busy one.",
    standfirst:
      "Recalls that never went out, no-shows nobody rebooked, and predeterminations sitting in a fax queue. The schedule is the product, and it is being managed by whoever has a spare ten minutes.",
    summary:
      "Recalls, no-show recovery, intake forms and insurance admin — without adding front-desk headcount.",
    blackHole: {
      title: "What it is made of at a front desk",
      body:
        "A recall list that gets worked when someone has time, which is never in the weeks it would matter. Intake forms completed on paper in the waiting room and typed into the chart afterwards. Predeterminations and claim follow-ups chased by phone during the exact hours the phone is needed for booking. A no-show that empties a chair and is never rebooked because rebooking it is somebody's fourth priority.",
    },
    symptoms: [
      { line: "The recall list is worked when someone has a spare hour", cost: "The largest recoverable revenue in the clinic" },
      { line: "Intake forms are filled on paper then typed into the chart", cost: "6–10 min per patient" },
      { line: "No-shows empty a chair and are not rebooked", cost: "Full chair-hour, every time" },
      { line: "Claim and predetermination follow-up happens by phone", cost: "5–9 hrs / week at the desk" },
      { line: "Confirmations go out manually, or not at all", cost: "Directly proportional to the no-show rate" },
    ],
    builds: [
      {
        title: "Recall and reactivation",
        body:
          "The recall list worked continuously rather than in bursts, on the channel each patient actually answers, with booking available in the message itself. This is usually the single largest number in a clinic audit and it is almost always unattended.",
      },
      {
        title: "Digital intake into the chart",
        body:
          "Forms completed before arrival and written into the practice management system directly, with the clinical fields validated and anything ambiguous flagged for the desk rather than entered.",
      },
      {
        title: "Gap and cancellation fill",
        body:
          "A cancellation triggers an offer to the right waiting patients within minutes, ranked by what will actually fit the slot. The window for filling a chair is short and manual processes miss it structurally.",
      },
    ],
    objection: {
      q: "We are in healthcare. Patient data cannot go through this.",
      a: "Correct, and it is the constraint the build is designed around rather than an afterthought. The automation runs inside your practice management system and your own tenancy, access is scoped to the specific workflow, no patient data trains any model, and the provider handling any given step is named in the audit before you sign. Where a step cannot be done compliantly, we do not automate that step — we say so and route it to a person.",
    },
    proof: [
      { value: "6–10 min", label: "Per patient at intake", note: "Recovered from paper-to-chart entry" },
      { value: "Minutes", label: "To fill a cancellation", note: "Against hours, manually" },
      { value: "5–9 hrs", label: "Weekly desk time on claims" },
    ],
  },

  {
    slug: "property-management",
    name: "Property Management",
    who: "For portfolio and property managers",
    title: "Doors scale. Your admin does not.",
    standfirst:
      "Every door added brings a fixed quantum of work orders, lease questions, arrears chasing and turnover coordination — and it lands on the same number of people it landed on last year.",
    summary:
      "Work order triage, lease abstraction, arrears follow-up and turnover coordination.",
    blackHole: {
      title: "What it is made of across a portfolio",
      body:
        "Maintenance requests arriving by text, email and voicemail, triaged by someone reading each one to work out whether it is an emergency. Lease terms that exist as PDFs, so every question about who pays for what means opening a document. Arrears chased in whatever order the manager remembers. Turnovers coordinated across four trades by phone, with the vacancy running the whole time.",
    },
    symptoms: [
      { line: "Work orders arrive by text, email and voicemail and are triaged by hand", cost: "8–15 hrs / week per manager" },
      { line: "Answering a lease question means opening and reading the lease", cost: "10–20 min, several times a day" },
      { line: "Arrears follow-up happens in whatever order gets remembered", cost: "Days of avoidable delinquency" },
      { line: "Turnover coordination is a phone tree across four trades", cost: "Every day of it is vacancy" },
      { line: "Owner reporting is assembled by hand each month", cost: "2–4 days / month" },
    ],
    builds: [
      {
        title: "Work order triage",
        body:
          "Requests captured from every channel into one queue, classified by urgency and trade on what the request actually says, and dispatched with the unit history attached. Genuine emergencies escalate immediately rather than waiting for someone to read down the list.",
      },
      {
        title: "Lease abstraction",
        body:
          "Lease terms extracted into structured, queryable fields — responsibilities, escalations, options, notice periods — with every answer citing the clause it came from so it can be checked against the document.",
      },
      {
        title: "Arrears sequencing",
        body:
          "Follow-up that runs on a schedule and escalates on its own, in the order the balances justify rather than the order they are remembered, and that stops the moment a payment lands.",
      },
    ],
    objection: {
      q: "Our property management software is supposed to do this already.",
      a: "It does some of it, and the parts it does are not the parts costing you. Every platform in this space has a work order module and none of them read a text message, classify it, and dispatch it with history attached. We build into your existing platform rather than replacing it — usually filling the gaps between it and the inbox, which is where the hours actually go.",
    },
    proof: [
      { value: "8–15 hrs", label: "Weekly, on work order triage", note: "Per manager, before" },
      { value: "Cited", label: "Every lease answer", note: "Back to the clause it came from" },
      { value: "2–4 days", label: "Monthly, on owner reporting" },
    ],
  },

  {
    slug: "golf-and-hospitality",
    name: "Golf & Hospitality",
    who: "For club and venue general managers",
    title: "Six months of revenue, twelve months of admin.",
    standfirst:
      "A seasonal operation cannot hire its way through the peak, because the peak is too short to train for and too intense to survive understaffed. The work has to shrink instead.",
    summary:
      "Tee sheets and bookings, member communication, event coordination and seasonal staffing.",
    blackHole: {
      title: "What it is made of at a club",
      body:
        "A tee sheet managed by phone during the exact hours the phone is busiest. Member billing questions answered one at a time from a system nobody but the office manager can read. Event enquiries that take three days to quote because the quote is assembled by hand. Seasonal staff onboarded from scratch every spring, by the same person, using the same paperwork.",
    },
    symptoms: [
      { line: "Bookings and changes come by phone during peak hours", cost: "10–18 hrs / week at the desk" },
      { line: "Event enquiries take days to quote and some go cold", cost: "The highest-margin revenue you have" },
      { line: "Member billing questions are answered one at a time", cost: "4–8 hrs / week" },
      { line: "No-shows on the tee sheet go unfilled", cost: "Unrecoverable — the slot expires" },
      { line: "Seasonal onboarding is rebuilt from scratch each spring", cost: "Two weeks of a manager, annually" },
    ],
    builds: [
      {
        title: "Booking and tee sheet handling",
        body:
          "Enquiries, changes and cancellations handled on the channel members actually use, written straight to the tee sheet, with a released slot offered to the waitlist within minutes rather than at the end of the shift.",
      },
      {
        title: "Event enquiry to quote",
        body:
          "Enquiries parsed, priced against your packages and current availability, and returned same-day with a hold on the date. Event revenue is decided almost entirely by response speed and almost never measured that way.",
      },
      {
        title: "Member communication",
        body:
          "Routine questions — billing, hours, conditions, dress code, statements — answered from your own documented policies with the answer citing where it came from, and anything about an individual account routed to the office.",
      },
    ],
    objection: {
      q: "Our members expect to talk to a person. That is what they pay for.",
      a: "They do, and this is how they get one. Right now the person they want is on the phone taking a tee time change from someone else. Automating the transactional traffic is what frees your staff to be present for the part of the experience members are actually paying for. Anything about a member's own account still goes to a human, by design.",
    },
    proof: [
      { value: "10–18 hrs", label: "Weekly, at the desk", note: "On bookings and changes alone" },
      { value: "Same day", label: "Event quote turnaround", note: "Against two to three days" },
      { value: "Minutes", label: "To offer a released slot" },
    ],
  },
];

export function getSegment(slug: string): Segment | undefined {
  return segments.find((s) => s.slug === slug);
}

/** Names only — used by the case study filter and the JSON-LD service area. */
export const segmentNames = segments.map((s) => s.name);
