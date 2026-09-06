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
    bio: "Canadian engineer with a background in robotics, embedded systems and automation design. Leads the crawling and extraction pipeline, manufacturer resolution, and the evidence layer — the part that makes every number in a report clickable back to the page it came from.",
    credentials: [
      "Crawling & extraction",
      "Data engineering",
      "Evidence pipelines",
    ],
  },
  {
    name: "Karlo Bunjački",
    role: "Finance & ROI Modelling",
    image: "/team/karlo.jpeg",
    focus: "50% 37%",
    zoom: 1.4,
    bio: "Finance and accounting specialist. Builds the commercial case under every engagement and holds the assumptions to account — the reason a displacement finding arrives as a ranked account opportunity rather than a part count.",
    credentials: ["Finance & accounting", "Opportunity modelling", "Business analysis"],
  },
  {
    name: "Nicola Sartori",
    role: "Strategy & Client Engagement",
    image: "/team/nick.jpeg",
    focus: "50% 43%",
    zoom: 1.2,
    bio: "International business graduate with experience in strategy, market research and brand positioning across Italy and North America. Leads client engagement, category and competitor scoping, and the translation of a crawl into the conversation a rep actually has with a distributor.",
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
    body: "Every value we report carries the source URL and a verbatim quote from the page it came from. No estimates, no modelled share, no dashboard without a source. A number your distributor can contradict by opening their own website costs your rep the meeting.",
  },
  {
    title: "We name the ceiling first",
    body: "This measures what distributors publish, not what they sell. Not order volume, not content behind a dealer login, not prices nobody posts. We say that before an engagement rather than when a client finds it — naming the limit is what makes the rest credible.",
  },
  {
    title: "Public pages, and nothing else",
    body: "One request per second, robots.txt respected, dealer logins left alone. A gated distributor is reported as gated with a recommendation for manual review, never worked around and never counted as an empty catalog.",
  },
  {
    title: "Your channel data is yours",
    body: "Your distributor list, your categories, your competitor universe and your reports stay confidential and are not sold on. The only thing we build across clients is the interchange database of tables distributors publish themselves.",
  },
] as const;
