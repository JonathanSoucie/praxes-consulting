/** FAQ sets. Keyed by where they appear. */

export type Faq = { q: string; a: string };

/** Home page — general objections. */
export const generalFaqs: Faq[] = [
  {
    q: "How is this different from hiring an AI agency?",
    a: "Most agencies sell you a build. We sell you an answer first. The engagement starts with a paid audit whose only job is to establish what your bottleneck costs and whether fixing it is worth the money — and we deliver that conclusion whether or not it leads to a project. Roughly a third of the time it doesn't.",
  },
  {
    q: "What size of business do you work with?",
    a: "Established small and mid-sized businesses, typically 10–250 staff, where a single process is consuming a meaningful share of payroll. Below that scale, the numbers usually don't justify the engagement, and we'll tell you so on the discovery call.",
  },
  {
    q: "We're not a tech company. Does that matter?",
    a: "No. Most of our clients are accounting practices, clinics, clubs, logistics operators and property managers. What matters is that a process is repetitive, high-volume and measurable — not that your team is technical.",
  },
  {
    q: "What if the audit concludes AI won't help us?",
    a: "Then that's what the audit says, in writing, with the numbers behind it. You keep the bottleneck map and the model, which typically surface non-AI improvements worth acting on anyway. We'd rather lose the build than sell you one that won't pay back.",
  },
  {
    q: "Do you resell software or take vendor commissions?",
    a: "No. We hold no reseller agreements and take no commissions from any platform. Our recommendation is shaped by your process, not by someone else's margin.",
  },
  {
    q: "How do you actually measure ROI?",
    a: "During the audit we establish a baseline: cycle times, touch counts, error and rework rates, and cost per transaction on the current process. After go-live we re-measure the same metrics at 30 and 90 days against that baseline. Same definitions, same method, results in writing.",
  },
  {
    q: "Will this replace our staff?",
    a: "In practice it changes what they spend their day on rather than how many of them you need. Most of our engagements target work people are glad to stop doing — retyping, chasing, reconciling — in businesses that already can't hire fast enough.",
  },
  {
    q: "What happens to our data?",
    a: "It stays yours. We work inside your systems and accounts wherever possible, scope access to what the specific workflow requires, and hand over full administrative control at go-live. Specific handling terms are agreed in writing before the audit begins.",
  },
];

/** /process — commercial and engagement mechanics. */
export const processFaqs: Faq[] = [
  {
    q: "What if the audit says AI won't help me?",
    a: "You get that answer in writing, with the model behind it, and the engagement ends there with no pressure to proceed. This happens in roughly a third of audits. You still keep the bottleneck map and the cost model — clients regularly act on those independently, because the exercise of pricing your own inefficiency is useful whatever the conclusion.",
  },
  {
    q: "Why is the audit paid when the first two calls are free?",
    a: "The calls are a qualification exercise for both sides. The audit is real work: measuring your process, building a financial model, and staking our recommendation on it. Charging for it is what lets the conclusion be genuinely independent of whether you buy a build.",
  },
  {
    q: "Can we take the audit and implement it ourselves?",
    a: "Yes. The deliverable is yours, it's specific enough to act on, and some clients hand it to their internal team or another supplier. We'd rather be the firm whose analysis is worth taking elsewhere than the one that holds it hostage.",
  },
  {
    q: "How long does the whole thing take?",
    a: "Discovery call: 15 minutes. Deep-dive: 60–90 minutes. Audit: 2–3 weeks. Build and integration: 4–10 weeks depending on scope. Measurement runs 90 days past go-live. Most engagements are three to five months end to end.",
  },
  {
    q: "How much disruption should we expect?",
    a: "The audit needs a few hours from the people who run the process, spread over two to three weeks. Build happens alongside your operation, not through it. Go-live is staged with the previous process running as fallback until the numbers hold.",
  },
  {
    q: "What if it doesn't hit the projected ROI?",
    a: "We measure and report it regardless, and we work the gap. Our projections lead with a conservative case precisely so this is rare — but when a forecast misses, you'll hear it from us first, with the reason.",
  },
  {
    q: "Do we need to sign an ongoing retainer?",
    a: "No. Support is available if you want it, but the system is built to be run by your team, and you get the documentation and access to do that. A retainer you don't need is not a business we're interested in.",
  },
];

/** /contact — short set, focused on the call itself. */
export const contactFaqs: Faq[] = [
  {
    q: "What happens on the 15-minute call?",
    a: "We ask about how your operation runs and where work backs up, and give you a straight read on whether there's a case worth measuring. No presentation, no pricing pressure. If the answer is no, you'll get that on the call.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "No. A rough sense of your team size and which process frustrates you most is plenty. Anything precise we need, we'll gather properly at the deep-dive stage.",
  },
  {
    q: "Will you try to sell me something on the call?",
    a: "The only thing on offer at that stage is a longer analysis call, and only if there's something worth analysing. The first paid step is the audit, and it comes several conversations later.",
  },
  {
    q: "Can we talk by email instead?",
    a: "Yes — use the form below or write to us directly. A call is faster for the first pass, but we'll work the way you prefer.",
  },
];
