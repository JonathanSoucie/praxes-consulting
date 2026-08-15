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
    title: "The number comes before the build",
    body: "Every engagement starts with a measured baseline. If we can't establish what the current process costs, we can't prove we improved it — and we won't claim we did.",
  },
  {
    title: "We say no often",
    body: "Roughly a third of the audits we deliver recommend against building. That's not a failure of the audit; it's the audit working. You paid for an accurate answer, not a sale.",
  },
  {
    title: "You own everything",
    body: "The models, the documentation, the admin access, the integrations. No proprietary black box and no licence you have to keep paying for. We monitor and maintain the system because that is how the return holds, not to keep you tied to us.",
  },
  {
    title: "Conservative by default",
    body: "Our projections state their assumptions and lead with the conservative case. We would rather be quietly beaten by our own forecast than explain a miss.",
  },
] as const;
