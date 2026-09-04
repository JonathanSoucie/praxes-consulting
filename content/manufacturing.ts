/**
 * Home page content for the manufacturing focus.
 *
 * Three things live here: the pain points that sit inside the black hole,
 * the solutions arranged around it once the page zooms out, and the short
 * proof points under both. Copy only — the two scenes that draw these are in
 * components/sections/spacetime-hero.tsx and black-hole-scene.tsx.
 */

/** The hero, beneath the wordmark. */
export const hero = {
  kicker: "AI automation for manufacturers",
  sub: "We find the hours your operation loses to quoting, scheduling, paperwork and rework — and build the systems that take them back.",
} as const;

/** Inside the black hole. Each one is a place hours disappear on a shop floor
    without appearing on any timesheet. */
export const painPoints = [
  {
    n: "01",
    title: "Quotes take days, not minutes",
    body: "An RFQ waits on an estimator who is also running the floor. By the time the number goes out, two competitors have already answered.",
  },
  {
    n: "02",
    title: "The schedule lives in a spreadsheet",
    body: "One person holds the real plan in their head. A rush order or a machine down means an afternoon of re-juggling by hand.",
  },
  {
    n: "03",
    title: "Paperwork typed three times",
    body: "The traveller, the ERP and the QC sheet all carry the same data, entered separately, disagreeing by the time anyone reconciles them.",
  },
  {
    n: "04",
    title: "Problems found at final inspection",
    body: "Inspection data is on paper or in a machine nobody exports from, so a drifting process is caught after the batch, not during it.",
  },
] as const;

/** Around the black hole, once the page zooms out. Order is clockwise from
    the left, along the dashed arc. */
export const solutions = [
  {
    label: "Quoting",
    title: "Quotes out in hours",
    body: "Drawings and RFQs read on arrival, matched to past jobs and material prices, and a costed quote drafted for the estimator to approve rather than build.",
  },
  {
    label: "Scheduling",
    title: "A schedule that re-plans itself",
    body: "Orders, capacity and material availability in one place, so a rush job or a down machine re-sequences the floor in minutes with the constraints respected.",
  },
  {
    label: "Work orders",
    title: "Enter it once",
    body: "The traveller, the ERP and the QC record generated from one source, so nothing is retyped and the three never disagree.",
  },
  {
    label: "Quality",
    title: "Drift caught mid-run",
    body: "Inspection and machine data pulled continuously and watched against limits, so a process moving out of tolerance is flagged during the batch, not after it.",
  },
  {
    label: "Maintenance",
    title: "Fix it before it stops",
    body: "Runtime, alarms and sensor data turned into a maintenance queue ranked by what will actually fail next, instead of by the calendar.",
  },
  {
    label: "Inventory",
    title: "Stock that matches the system",
    body: "Consumption reconciled from what the floor actually ran, reorder points that move with the schedule, and shortages seen before they stop a job.",
  },
  {
    label: "Reporting",
    title: "OEE without the spreadsheet",
    body: "Throughput, downtime, scrap and on-time delivery assembled from the live systems and delivered finished — same definitions every week.",
  },
] as const;

export type Solution = (typeof solutions)[number];

/** The three reasons the argument holds for a plant specifically. */
export const whyManufacturing = [
  {
    title: "Measured on the floor, not in a deck",
    body: "Cycle time, on-time delivery, scrap rate and quote turnaround are already numbers you track. We baseline them before building and re-measure them after, so the return is in your own metrics.",
  },
  {
    title: "Built around the systems you already run",
    body: "Your ERP, your machines and your inspection equipment stay. What we build reads from them and writes to them — no rip-and-replace, and nothing that stops the floor to install.",
  },
  {
    title: "Honest when the answer is no",
    body: "Roughly one audit in three concludes that building isn't worth it yet. You get that in writing with the model behind it, because an accurate answer is the product.",
  },
  {
    title: "You own everything we build",
    body: "The models, the documentation and the admin access are yours. No proprietary black box and no licence you have to keep paying for.",
  },
] as const;
