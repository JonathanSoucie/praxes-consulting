import type { LucideIcon } from "lucide-react";
import {
  DatabaseZap,
  FileSpreadsheet,
  FileStack,
  Inbox,
  ListChecks,
  Megaphone,
  MessagesSquare,
  PenLine,
  Send,
  Star,
  Workflow,
  Zap,
} from "lucide-react";

/**
 * The systems we build, in the two families the home page flies you through.
 *
 * Operations gets the week back; marketing puts it to work. The order is the
 * argument — nothing in the second family is worth building until the first
 * one has freed the time to run it.
 *
 * Lifted out of app/page.tsx when the home page became the flight, because
 * three things read it now: the cards that emerge from the singularity, the
 * detail panel each one opens, and the family headers between them.
 */
export type Build = {
  /** Addresses the detail panel. Not a route — these are overlays. */
  slug: string;
  icon: LucideIcon;
  title: string;
  /** One line. If it needs two sentences, it belongs in the points. */
  summary: string;
  /** Two to four, each short enough to set on one line. */
  points: readonly string[];
};

export const families = {
  operations: {
    kicker: "Family 01",
    name: "Operations",
    line: "Automating how the business runs, so the week stops disappearing into admin.",
  },
  marketing: {
    kicker: "Family 02",
    name: "Marketing",
    line: "Automating how it gets found and sells, so the week you got back turns into pipeline.",
  },
} as const;

export type FamilyKey = keyof typeof families;

export const operationsBuilds: readonly Build[] = [
  {
    icon: FileStack,
    slug: "intake",
    title: "Document and invoice intake",
    summary:
      "Files read the moment they arrive and written straight into the system of record.",
    points: [
      "Email and portal attachments",
      "Fields checked on the way in",
      "Exceptions go to a person",
    ],
  },
  {
    icon: Workflow,
    slug: "sync",
    title: "Systems that don't talk",
    summary:
      "Your CRM, accounting package and scheduler kept in step without anyone retyping.",
    points: [
      "Two-way sync",
      "Rules for which side wins",
      "The most common thing we build",
    ],
  },
  {
    icon: ListChecks,
    slug: "routing",
    title: "Queue and approval routing",
    summary:
      "Work assigned to whoever should have it, and escalated when it has sat too long.",
    points: [
      "Automatic assignment",
      "Alerts on ageing work",
      "Approvals that don't stall",
    ],
  },
  {
    icon: FileSpreadsheet,
    slug: "reports",
    title: "Reports and reconciliations",
    summary:
      "The month-end pack assembled from source on a schedule and delivered finished.",
    points: [
      "Pulled from the live systems",
      "Same definitions every cycle",
      "Discrepancies flagged",
    ],
  },
  {
    icon: Inbox,
    slug: "triage",
    title: "Inbox and enquiry triage",
    summary:
      "Incoming mail sorted, categorised and routed with the history already attached.",
    points: [
      "Sorted by what it actually is",
      "Straight to the right person",
      "Context attached on arrival",
    ],
  },
  {
    icon: DatabaseZap,
    slug: "records",
    title: "Data entry and record hygiene",
    summary:
      "Forms and portals filled from the record you already hold, then kept clean.",
    points: [
      "No retyping what you have",
      "Duplicates merged",
      "Typos caught before reporting",
    ],
  },
];
export const marketingBuilds: readonly Build[] = [
  {
    icon: Megaphone,
    slug: "ads",
    title: "Meta and Google ads",
    summary:
      "Creative generated and rotated, with audiences built from your own customer list.",
    points: [
      "Variants tested continuously",
      "Audiences from real customers",
      "Judged on revenue",
    ],
  },
  {
    icon: Send,
    slug: "cold-email",
    title: "Cold email that gets replies",
    summary:
      "Verified lists, personalised per account, paced so your domain survives it.",
    points: [
      "Lists built and verified",
      "Research per account",
      "Replies land with a human",
    ],
  },
  {
    icon: PenLine,
    slug: "social",
    title: "Social post generation",
    summary:
      "A week of posts drafted in your voice from work you have already done.",
    points: [
      "Written from your own material",
      "Approval before it posts",
      "Scheduled across your channels",
    ],
  },
  {
    icon: Zap,
    slug: "capture",
    title: "Lead capture to first reply",
    summary:
      "Every enquiry enriched, scored and answered within minutes, at whatever hour it arrives.",
    points: [
      "Enriched and scored on arrival",
      "Written into the CRM",
      "Minutes, not next morning",
    ],
  },
  {
    icon: MessagesSquare,
    slug: "nurture",
    title: "Nurture and re-engagement",
    summary:
      "Sequences that keep a lead warm for as long as the deal is realistically alive.",
    points: [
      "Paced to the stage they're at",
      "Stops the moment they reply",
      "Win-backs on old pipeline",
    ],
  },
  {
    icon: Star,
    slug: "reviews",
    title: "Reviews and referrals",
    summary:
      "Asks that go out when a customer is happiest, without anyone remembering to send them.",
    points: [
      "Timed to the work finishing",
      "Referral prompts built in",
      "Win-backs on past customers",
    ],
  },
];
export const buildsByFamily: Record<FamilyKey, readonly Build[]> = {
  operations: operationsBuilds,
  marketing: marketingBuilds,
};

export const allBuilds = [...operationsBuilds, ...marketingBuilds];

export function buildBySlug(slug: string) {
  return allBuilds.find((b) => b.slug === slug);
}
