/**
 * The blog.
 *
 * Posts are structured blocks rather than MDX. That is a deliberate trade:
 * MDX buys arbitrary components inside prose, which this blog does not need,
 * at the cost of a compiler plugin, a second content pipeline and a class of
 * build error that only shows up in production. Blocks typecheck, and adding
 * a block kind is one case in one renderer.
 *
 * Inline markup inside `text` is limited to **strong** and [links](/path).
 * See components/blog/rich-text.tsx.
 *
 * On what belongs here: the rubric this site was built against scores a blog
 * of announcements as worth nothing and a founder making arguments as the
 * top of the scale. So every post takes a position that costs something to
 * hold — the first argues against the thing most of this industry sells, the
 * second against our own upsell, the third against the buyer's instinct.
 * A post that our competitors would also publish does not go up.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  /** A short aside on a tinted ground. Use sparingly — one per post. */
  | { type: "note"; text: string };

export type Post = {
  slug: string;
  title: string;
  /** The argument in one sentence, used on the card and as the description. */
  standfirst: string;
  /** ISO date. */
  date: string;
  author: string;
  authorRole: string;
  /** Reading time, in minutes. Written down rather than computed so it can be
      honest about a post that is dense versus one that is long. */
  readingTime: number;
  tag: string;
  featured?: boolean;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "nobody-designed-your-workflow",
    title: "Nobody designed your workflow. It accumulated.",
    standfirst:
      "Every business over five years old is running on a process that no one chose, that has never been measured, and that takes a fixed cut of every week.",
    date: "2026-08-18",
    author: "Jonathan Soucie",
    authorRole: "Engineering & Implementation, Praxes",
    readingTime: 6,
    tag: "The black hole",
    featured: true,
    body: [
      {
        type: "p",
        text: "Ask anyone in an established business to describe how a given process works and you will get a confident answer. Ask three people and you will get three answers, all confident, none matching. Then sit with each of them for an afternoon and you will find that the real process matches none of the three.",
      },
      {
        type: "p",
        text: "This is not incompetence. It is the ordinary result of a business surviving long enough to change. A client asked for something in 2021 and a step got added. Someone left and their half of a process went to whoever had capacity. A system was bought to fix one thing and created a gap somewhere else, and a person quietly filled the gap. Nobody made a bad decision. There was no decision.",
      },
      {
        type: "p",
        text: "That accumulation is what we call **the black hole**: the repetitive work nobody designed, that has never been measured, and that takes its cut whether or not the week was profitable.",
      },
      { type: "h2", text: "Why it is not just a backlog" },
      {
        type: "p",
        text: "A backlog is work you are behind on. Work harder and it shrinks. This does the opposite, and the difference is the whole reason the metaphor is worth using.",
      },
      {
        type: "p",
        text: "Every new client adds volume to it. Every new tool adds a boundary that someone has to carry data across. Every new hire adds a person who has to be told which of the four undocumented variants is the real one. The pull grows with the business, which produces the result that surprises people most: the busiest, fastest-growing operations are usually the ones losing the largest share of their week to it.",
      },
      {
        type: "quote",
        text: "The strongest predictor of how much a business is losing to unmeasured work is not how badly it is run. It is how much it has grown since anyone last looked.",
      },
      {
        type: "p",
        text: "It also has the property that makes black holes a useful image rather than a dramatic one: you cannot see it directly. It does not appear in your P&L, because it is distributed across salaries that are coded to departments. It does not appear in a timesheet, because nobody has a code for 'chased a document' or 'checked whether the two systems agreed'. You detect it the way astronomers detect the real thing — by the behaviour of everything around it.",
      },
      { type: "h2", text: "What it looks like from inside" },
      {
        type: "p",
        text: "There is a set of symptoms that shows up in nearly every operation we audit, across industries that have nothing else in common:",
      },
      {
        type: "ul",
        items: [
          "Your best people spend a meaningful share of their week on work that requires none of what makes them your best people.",
          "Two systems disagree, and rather than fix the disagreement, someone reconciles them on a schedule.",
          "There is a step everyone knows is stupid, that nobody has authority to remove, and that has survived two software migrations.",
          "The answer to 'why do we do it that way' is a person's name, and that person left.",
          "Capacity problems get solved by hiring, and the new hire is absorbed within a quarter.",
        ],
      },
      {
        type: "p",
        text: "That last one is the tell. If adding a person does not durably increase output, the constraint is not people.",
      },
      { type: "h2", text: "The measurement problem" },
      {
        type: "p",
        text: "Here is what makes this genuinely hard rather than merely neglected: the thing you need to measure is specifically the thing your measurement systems were not built to see.",
      },
      {
        type: "p",
        text: "Your accounting system knows what you spent on payroll. It does not know that 31% of it went to re-typing. Your project tool knows a job took eleven days. It does not know that nine of them were spent waiting, or that the waiting was avoidable. Every instrument you already own measures output, and the black hole is made of input that produced none.",
      },
      {
        type: "note",
        text: "This is also why asking your team is not sufficient on its own. People are good at reporting what annoys them and poor at reporting what takes time — and those correlate weakly. The process everyone complains about is often not the expensive one.",
      },
      {
        type: "p",
        text: "So the measurement has to be direct: sit with the people doing the work, time the steps including the dead ones, and price the result at the business's own loaded labour cost. It takes about a week. It is unglamorous. And it is the only way to get a number that survives being argued with, which matters, because the number's whole job is to be argued with.",
      },
      { type: "h2", text: "Why this is the first thing, not the second" },
      {
        type: "p",
        text: "The reason to insist on this order — measure, then build — is not methodological tidiness. It is that the alternative has a predictable failure mode.",
      },
      {
        type: "p",
        text: "Without a measured baseline, the thing that gets automated is whichever process was described most vividly in the sales meeting. That is a real selection criterion in this industry and it selects for annoyance, not cost. The result is a project that works exactly as specified, is genuinely well built, and moves no number anybody cares about — after which the business concludes that automation does not work for them, which is now true for the next several years.",
      },
      {
        type: "p",
        text: "Measure first and you get the other failure mode available to you as well: finding out that the answer is not to build anything. That happens in roughly a third of the audits we run, and I would rather deliver that conclusion than the well-built system nobody needed.",
      },
      {
        type: "p",
        text: "The black hole is not a moral failing and it is not a sign anything is wrong with how you run your business. It is what happens to any operation that lasts. But it is the largest unpriced line item most businesses have, and the first step is simply to look at it directly and put a number on it.",
      },
    ],
  },

  {
    slug: "we-tell-a-third-of-clients-not-to-build",
    title: "We tell a third of our clients not to build anything",
    standfirst:
      "Charging for the audit is the only way to make the recommendation independent of whether you buy the build. Here is the arithmetic that makes that survivable as a business.",
    date: "2026-07-29",
    author: "Jonathan Soucie",
    authorRole: "Engineering & Implementation, Praxes",
    readingTime: 5,
    tag: "How we work",
    body: [
      {
        type: "p",
        text: "The standard structure in this industry is a free assessment that leads to a paid build. It is offered in good faith and it is structurally incapable of producing an honest recommendation, for a reason that has nothing to do with the integrity of the people doing it.",
      },
      {
        type: "p",
        text: "If the assessment is free, it is a cost of sale. A cost of sale is justified by conversion. Everything downstream of that — which processes get flagged, how the projection is framed, whether 'do nothing' is presented as a live option — is shaped by a pressure that nobody has to consciously act on for it to work.",
      },
      { type: "h2", text: "What charging changes" },
      {
        type: "p",
        text: "We charge a fixed fee for the audit, and the audit is the product. The deliverable is a ranked map of what each process costs annually, a model with its assumptions written out, and a recommendation. It is yours whatever it says and whatever you do next. Several clients have taken it to their internal team or another supplier, which is a perfectly good outcome.",
      },
      {
        type: "p",
        text: "Roughly a third of the time the recommendation is not to build. The reasons cluster:",
      },
      {
        type: "ol",
        items: [
          "The volume is too low. It is genuinely annoying and it happens eleven times a month. Eleven times a month does not repay an integration.",
          "The process is about to change. Automating a workflow that is being restructured next quarter means building it twice.",
          "The fix is a policy, not a system. The most common version: a required field nobody enforces, generating downstream correction work that a validation rule at source removes for nothing.",
          "The bottleneck is not automatable. Sometimes the constraint is a supplier, a regulator, or a decision one person will not delegate. No amount of software touches that.",
        ],
      },
      {
        type: "quote",
        text: "A third of the time, the most valuable thing we can hand a client is a number and the word no.",
      },
      { type: "h2", text: "The arithmetic that makes this work" },
      {
        type: "p",
        text: "The obvious objection is that this is a nice principle that a business cannot afford. It is worth showing why it is affordable, because the argument only holds if the economics work.",
      },
      {
        type: "p",
        text: "A free assessment converts somewhere in the region of one in ten, and its cost is carried entirely by the builds. A paid audit is sold to people who have already decided the problem is worth money to understand, which is a qualification step disguised as a product. It covers its own delivery cost. So the two-thirds that do proceed are not subsidising the third that do not — the audit fee already did.",
      },
      {
        type: "note",
        text: "The second-order effect is larger than the first. A recommendation not to build is the most persuasive thing we produce, and it is the reason a meaningful share of our work is referred by people who did not buy a build from us.",
      },
      { type: "h2", text: "The part that is genuinely a cost" },
      {
        type: "p",
        text: "I do not want to present this as a pure arbitrage where being honest turns out to be more profitable. There is a real cost and it is worth naming.",
      },
      {
        type: "p",
        text: "It is slower. A free assessment can be booked by anyone curious; a paid one requires a decision, and some businesses that would have benefited never get past it. We lose those. We have decided that is the right trade, but it is a trade, not a free lunch, and any firm telling you their integrity costs them nothing is describing a marketing position rather than an operating model.",
      },
      {
        type: "p",
        text: "The test for whether an assessment is real is simple, and it works on us as well as on anyone else: ask what the last three engagements concluded, and whether any of them concluded nothing. If the answer is that every assessment found a project, the assessment is a proposal.",
      },
    ],
  },

  {
    slug: "the-fifteen-percent-that-kills-automation",
    title: "The exceptions are the project",
    standfirst:
      "Automation projects rarely fail on the standard case. They fail on the fifteen percent that is unusual — and the fifteen percent is where all the time went in the first place.",
    date: "2026-07-08",
    author: "Jonathan Soucie",
    authorRole: "Engineering & Implementation, Praxes",
    readingTime: 6,
    tag: "Building",
    body: [
      {
        type: "p",
        text: "Map any business process onto a whiteboard and you get a clean line of six or seven boxes. Everyone agrees it is correct. Everyone is looking at a description of about 85% of what happens.",
      },
      {
        type: "p",
        text: "The other 15% is the invoice that arrives for the parent company instead of the subsidiary. The customer who sends a photograph of a document instead of the document. The order where the delivery address is in the notes field because the address field would not take it. Individually each one is a special case; collectively they are not special at all, because they occur constantly.",
      },
      {
        type: "p",
        text: "Here is the part that reverses most people's intuition: **the exceptions are where nearly all of the time is going.** The standard case is fast. That is why it is standard. The 15% consumes something closer to half the handling time, and it is the reason the process feels expensive.",
      },
      { type: "h2", text: "The failure this produces" },
      {
        type: "p",
        text: "A system built for the happy path goes live and works exactly as demonstrated. Then the fortnight arrives, and the picture in production looks like this:",
      },
      {
        type: "ul",
        items: [
          "The standard cases are handled. They were the cheap ones.",
          "The unusual cases fall out, and a person picks them up — but now without the context the old process gave them, because the pipeline swallowed the first half.",
          "Somebody has to monitor the system on top of doing the exceptions.",
          "Total time goes up. Everyone can see it. Nobody wants to say it, because the project was approved on a business case.",
        ],
      },
      {
        type: "p",
        text: "That is the arithmetic that turns a technically successful project into a failed one. You removed the cheap half of the work and added a supervision job on top of the expensive half.",
      },
      {
        type: "quote",
        text: "A system that handles the standard case and falls over on the rest creates more work than it removes, because now somebody is doing the hard cases and babysitting a robot.",
      },
      { type: "h2", text: "What we do differently, concretely" },
      {
        type: "p",
        text: "Mapping the happy path takes an afternoon. We spend the rest of the week on the exceptions, and it is the single largest difference between builds that hold and builds that quietly get switched off.",
      },
      {
        type: "ol",
        items: [
          "Pull a real sample. Not a described process — a hundred actual items from the last quarter, sorted by how long each took. The long tail is the specification.",
          "Name every branch and give it an owner. Each exception is either automated, routed to a named person, or explicitly left in the manual process. There is no fourth category, and 'we will handle that later' is how a project acquires one.",
          "Put a confidence gate on the whole thing. Every item is scored; anything below the threshold routes to a human queue rather than being guessed at. The client sets the threshold and can move it.",
          "Start the threshold high. At go-live, more gets held for review than strictly needs to be. That is deliberate — a first fortnight where the system is over-cautious is recoverable, and one where it confidently wrote wrong data into the ledger is not.",
          "Run both paths on the same live work until they agree. If the system disagrees with the humans, the humans are usually right, and that means going back to the map.",
        ],
      },
      {
        type: "note",
        text: "A useful question for any vendor, including us: what percentage of items do you expect to route to a human at go-live, and what is that number at ninety days? Anyone who answers zero has not looked at your exceptions.",
      },
      { type: "h2", text: "Why nobody sells it this way" },
      {
        type: "p",
        text: "Because exceptions demo badly. A pipeline that reads a clean invoice and posts it correctly is a thirty-second demonstration that sells the work. A confidence gate holding 14% of items for review is a harder thing to show, even though it is the feature that determines whether the system survives contact with your actual mail.",
      },
      {
        type: "p",
        text: "There is also a scoping incentive. Exceptions are where the effort is, so a proposal that quietly assumes the happy path is cheaper, wins more often, and discovers the real scope after the contract is signed. That is not always cynical. Frequently the vendor also believed the whiteboard.",
      },
      {
        type: "p",
        text: "The honest version costs more up front and less in total. It is the difference between a system your team trusts by month two and one they have started routing around by month four — and once a team has started routing around a system, no amount of engineering brings them back.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Newest first. */
export const postsByDate = [...posts].sort((a, b) =>
  a.date < b.date ? 1 : -1
);

export function getFeaturedPost(): Post {
  return posts.find((p) => p.featured) ?? postsByDate[0];
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
