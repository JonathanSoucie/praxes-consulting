/**
 * The systems we build against, and how.
 *
 * ⚠️ READ BEFORE LAUNCH — the list below is a capability claim, and only
 * part of it comes from the copy deck.
 *
 * `fromDeck: true` marks the ones the deck names itself: "SAP ECC, SAP
 * S/4HANA, Oracle E-Business Suite, NetSuite, Infor, Epicor, WMS, PIM, CRM,
 * and legacy dealer systems". The rest are the mainstream members of those
 * same categories, added so the row reads as a list of systems rather than a
 * list of six. Confirm each one you are willing to stand behind and delete
 * the others — a name here says "we integrate with this", and the deck's own
 * position is that the integration layer is built around whatever you run.
 *
 * Set as wordmarks rather than brand logos. Every one of these is a third
 * party's trademark, we hold no partnership with any of them, and a wall of
 * other people's logos reads as endorsement whether or not it is meant to.
 * Type says the same thing and claims nothing extra. If you want real marks
 * here, they need to be files you have the right to use.
 */

export type IntegrationSystem = {
  name: string;
  /** ERP, CRM, PIM, WMS, commerce — shown under the name in the row. */
  kind: string;
  /** True when the copy deck names this system explicitly. */
  fromDeck?: boolean;
};

export const integrationSystems: IntegrationSystem[] = [
  { name: "SAP ECC", kind: "ERP", fromDeck: true },
  { name: "SAP S/4HANA", kind: "ERP", fromDeck: true },
  { name: "Oracle E-Business Suite", kind: "ERP", fromDeck: true },
  { name: "NetSuite", kind: "ERP", fromDeck: true },
  { name: "Infor", kind: "ERP", fromDeck: true },
  { name: "Epicor", kind: "ERP", fromDeck: true },
  { name: "Microsoft Dynamics 365", kind: "ERP / CRM" },
  { name: "Sage", kind: "ERP" },
  { name: "IFS", kind: "ERP" },
  { name: "Acumatica", kind: "ERP" },
  { name: "Salesforce", kind: "CRM" },
  { name: "HubSpot", kind: "CRM" },
  { name: "Akeneo", kind: "PIM" },
  { name: "inRiver", kind: "PIM" },
  { name: "Manhattan", kind: "WMS" },
  { name: "Blue Yonder", kind: "WMS" },
  { name: "Shopify", kind: "Commerce" },
  { name: "Adobe Commerce", kind: "Commerce" },
  { name: "Legacy dealer systems", kind: "Bespoke", fromDeck: true },
];

/**
 * How the integration is actually done. The deck's Legacy ERP Integration
 * bullets, which are the answer to the question the row above provokes:
 * fine, but what do you do to my ERP?
 */
export const integrationApproach = {
  eyebrow: "How we connect",
  title: "Your ERP stays the system of record",
  deck: "We do not replace what runs your business. We build a secure layer around it and earn our way from reading to writing — so the first week cannot break anything, and nothing writes back until your people have said it may.",
  points: [
    {
      title: "Read-only to start",
      body: "A pilot connects with no path to changing your system of record. It can prove the matching, the enrichment or the document checks against real data and still be unable to touch it.",
    },
    {
      title: "Controlled write-back after approval",
      body: "Writing is switched on deliberately, once the approval queues exist and your team has decided what the system is allowed to conclude on its own.",
    },
    {
      title: "RPA where the APIs will not reach",
      body: "Older systems often have no usable interface. We drive them the way your team does rather than making their replacement a precondition of the work.",
    },
    {
      title: "Master data harmonized across sites",
      body: "Where the same part is three records in three plants, the relationships are resolved once and kept resolved, rather than reconciled by hand each time someone notices.",
    },
    {
      title: "Audit trails and exception queues",
      body: "Every decision keeps its evidence, its confidence and who approved it. What the system was unsure of goes to a person with the reason attached, not into a silent default.",
    },
  ],
} as const;
