/**
 * The competitive alternatives, named.
 *
 * A 40-person accounting practice deciding what to do about its January is
 * not choosing between us and nothing. It is choosing between us, another
 * admin hire, a freelancer with Zapier, the automation module its practice
 * software keeps upselling, and giving an internal ops person a weekend with
 * n8n. Every page that does not name those is implicitly claiming to be the
 * only option, which the reader knows is false and discounts the rest of the
 * page for.
 *
 * THE RULE THIS FILE IS WRITTEN UNDER: every alternative gets a `strength`
 * that is true and a `verdict` that can send the reader away from us. If no
 * entry here could plausibly lose us an engagement, the section is a rigged
 * comparison table and is worth less than no section at all — a reader who
 * has actually considered these options can tell the difference in one
 * paragraph.
 *
 * Two of these verdicts say "do this instead of hiring us" outright, and one
 * proposes splitting the work. That is the point.
 *
 * Keep `strength` and `breaks` to one sentence that fits on ONE rendered line
 * — roughly 78 characters. `verdict` may take two, because it is the line
 * doing the work. The section earns its place by being scannable, and an
 * earlier draft ran three full paragraphs each: three screens of black that
 * turned an honest section into a hedge nobody finishes. An honest section
 * that does not get read is worth no more than a dishonest one.
 *
 * ⚠️ The figures are indicative Ottawa-market ranges, not quotes.
 */

export type Alternative = {
  /** What the buyer calls it, in their words. */
  name: string;
  /** Roughly what it costs them, framed the way they would frame it. */
  cost: string;
  /** What it genuinely does better than we do. Must be true. One sentence. */
  strength: string;
  /** Where it stops working. One sentence. */
  breaks: string;
  /** When to choose it over us. Must be capable of losing us the work. */
  verdict: string;
};

export const alternatives: Alternative[] = [
  {
    name: "Hire another admin",
    cost: "$48–62k a year, loaded",
    strength:
      "The exceptions — no automation handles those as well as its vendor implies.",
    breaks:
      "You are buying capacity, not removing work. It recurs in eighteen months.",
    verdict:
      "Every case needs a judgement call. If it is the same one two hundred times, you are paying a person to be a script.",
  },
  {
    name: "A freelancer and Zapier",
    cost: "$1,500–3,000, once",
    strength:
      "One connection you have already proven you need, at a tenth of our price.",
    breaks:
      "Nobody checked it was the right connection. In four months it has no owner.",
    verdict:
      "You can name the integration and someone in-house will own it. We have said so instead of taking the work.",
  },
  {
    name: "Your vendor's automation module",
    cost: "Often bundled, or $50–200 a month",
    strength:
      "Already in your stack, already supported, and correct inside its own product.",
    breaks:
      "It stops at that vendor's boundary. Your bottleneck is the seam between two.",
    verdict:
      "The process lives inside one system. Check this before you call anyone, us included.",
  },
  {
    name: "An internal ops person with n8n",
    cost: "A weekend, then the maintenance",
    strength:
      "They know your process better than we will, and that is the expensive half.",
    breaks:
      "It becomes a dependency with one name on it, maintained in the gaps.",
    verdict:
      "Not either/or — we measure and rank, they build. A good share of our audits end there.",
  },
  {
    name: "Do nothing",
    cost: "Whatever the black hole is already taking",
    strength:
      "Free today, and right when volumes are low or the process is about to change.",
    breaks: "The cost is real, unbilled, and grows with the business.",
    verdict:
      "For roughly a third of the businesses we audit, this is what we recommend.",
  },
];
