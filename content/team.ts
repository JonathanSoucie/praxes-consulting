/**
 * The team. Credentials matter more than warmth here — this is a high-ticket
 * sale and the buyer is deciding whether to trust the analysis.
 *
 * Photos live in /public/team/.
 */

export type TeamMember = {
  name: string;
  role: string;
  /** Path under /public. */
  image: string;
  /**
   * How to crop the portrait. All three source files are wider than the 4:5
   * card, so object-cover only ever trims width — the loose headroom in the
   * originals survives any aspect ratio you pick. These pull the crop in on
   * the face instead.
   *
   * `focus` is the face centre as a CSS object-position, and doubles as the
   * transform-origin so the zoom happens about the face rather than the
   * middle of the frame. `zoom` is chosen per photo to bring the head to
   * roughly two thirds of the frame height: the originals sit at 43%, 45%
   * and 57%, so they need different amounts.
   */
  focus: string;
  zoom: number;
  bio: string;
  /** Short credential chips shown under the bio. */
  credentials: string[];
};

export const team: TeamMember[] = [
  {
    name: "Jonathan Soucie",
    role: "Engineering & Implementation",
    image: "/team/jon.jpg",
    focus: "50% 48%",
    zoom: 1.5,
    bio: "Canadian engineer with a background in robotics, embedded systems and automation design. Leads technical assessment, system architecture and the build — including the part where we prove a solution works against your real data before it touches live work.",
    credentials: [
      "Robotics engineering",
      "Systems integration",
      "Technical assessment",
    ],
  },
  {
    name: "Karlo Bunjački",
    role: "Finance & ROI Modelling",
    image: "/team/karlo.jpeg",
    focus: "50% 37%",
    zoom: 1.4,
    bio: "Finance and accounting specialist. Builds the ROI models behind every audit and holds the assumptions to account — the reason our projections are ranges with stated conditions rather than a single flattering number.",
    credentials: ["Finance & accounting", "ROI modelling", "Business analysis"],
  },
  {
    name: "Nicola Sartori",
    role: "Strategy & Client Engagement",
    image: "/team/nick.jpeg",
    focus: "50% 43%",
    zoom: 1.2,
    bio: "International business graduate with experience in strategy, market research and brand positioning across Italy and North America. Leads client engagement, discovery and the translation between what a business needs and what gets built.",
    credentials: [
      "International business",
      "Strategy & positioning",
      "Client engagement",
    ],
  },
];

/** How we think — the values section on /about. */
export const values = [
  {
    title: "Evidence, or it does not ship",
    body: "A match arrives with what it was matched on and how confident the system is. Anything below your threshold, and anything safety-critical, goes to a person. A system that silently invents a fitment relationship is worse than no system, because it is wrong at scale.",
  },
  {
    title: "Your ERP stays the system of record",
    body: "We build a layer around what you run, not a replacement for it. Read-only first, controlled write-back only after your approvals exist, and RPA where a legacy system has no usable API. Nobody should have to replace a working ERP to fix a search problem.",
  },
  {
    title: "You own the enriched data",
    body: "The records, the relationships, the documentation and the admin access are yours, and you keep them if the engagement ends. Ongoing operations are how the return holds as suppliers and systems change — not a licence you have to keep buying to use your own catalog.",
  },
  {
    title: "The measures are agreed before we start",
    body: "Search time, unmatched RFQ lines, time to first quote, publish-ready SKU rate, document-error rate. Same definitions before and after, written down first, precisely so the answer cannot be moved once the results are in.",
  },
] as const;
