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
 * ⚠️ The figures are indicative Ottawa-market ranges, not quotes.
 */

export type Alternative = {
  /** What the buyer calls it, in their words. */
  name: string;
  /** Roughly what it costs them, framed the way they would frame it. */
  cost: string;
  /** What it genuinely does better than we do. Must be true. */
  strength: string;
  /** Where it stops working, and why. */
  breaks: string;
  /** When to choose it over us. Must be capable of losing us the work. */
  verdict: string;
};

export const alternatives: Alternative[] = [
  {
    name: "Hire another admin",
    cost: "$48–62k a year, loaded",
    strength:
      "A person handles the fifteen percent that is genuinely different every time — the exception, the awkward client, the thing nobody wrote down. No automation does that well, and most that claim to are quiet about their error rate.",
    breaks:
      "You are buying capacity, not removing work. Volume grows into it, the same job needs doing again in eighteen months, and by then it costs you a salary as well as the hours.",
    verdict:
      "Hire if the work needs a judgement call every time. If it is the same decision two hundred times a year, you are paying a person to be a script.",
  },
  {
    name: "A freelancer and Zapier",
    cost: "$1,500–3,000, once",
    strength:
      "For one well-defined connection you have already proven you need, this is genuinely the right answer. It is a tenth of our price and it will work. We have told people to do this instead of hiring us.",
    breaks:
      "Nobody established that it was the connection worth automating. Exceptions fall through silently rather than loudly. Four months later it breaks, the freelancer has moved on, and there is no documentation and no owner.",
    verdict:
      "Do this if you can name the single integration, you already know it is the expensive one, and someone in-house will own it. If any of those three is missing, you are buying a future outage at a discount.",
  },
  {
    name: "Your software vendor's automation module",
    cost: "Often bundled, or $50–200 a month",
    strength:
      "It is already in your stack, it is supported by someone whose job that is, and inside its own product it works properly. Check this before you call anyone, including us.",
    breaks:
      "It automates within one vendor's boundary. Your bottleneck is almost always the seam between two systems, and neither vendor has a commercial reason to close a seam that keeps you paying both of them.",
    verdict:
      "Use it if the process you are fixing lives entirely inside one system. If describing the fix requires the word “export”, the module will not reach it.",
  },
  {
    name: "An internal ops person with a weekend and n8n",
    cost: "A weekend, then whatever maintaining it costs",
    strength:
      "They understand your process better than we ever will, and that knowledge is the expensive half of this work. Give someone with real capacity and some technical instinct a clear brief and this goes well.",
    breaks:
      "A weekend project becomes a dependency maintained in the gaps between their actual job. It ends as a single point of failure with one person's name on it, and the documentation leaves when they do. They will also build what they were asked for rather than what is costing the most.",
    verdict:
      "The strongest version of this is not either/or: we measure and rank, they build. A useful share of our audits end exactly there, and we are happy when they do.",
  },
  {
    name: "Do nothing",
    cost: "Whatever the black hole is already taking",
    strength:
      "Free today, breaks nothing, and occasionally correct. If your volumes are low, your process is about to change, or the fix is a policy nobody has written down yet, waiting is the right call.",
    breaks:
      "The cost is real, unbilled and growing with the business. Doing nothing is a decision — most businesses make it by never pricing the alternative, which is not the same as choosing it.",
    verdict:
      "For roughly a third of the businesses we audit, this is what we recommend. With the number attached, so that it is a decision rather than a default.",
  },
];
