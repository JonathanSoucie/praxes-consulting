/**
 * The platforms we read, and the systems findings land in.
 *
 * ⚠️ READ BEFORE LAUNCH — the list below is a capability claim.
 *
 * The `Storefront` entries are the platforms distributor catalogs are built
 * on, which the census layer detects and reports; naming one here says we can
 * read catalogs published on it. The `CRM`, `BI` and `Export` entries are
 * where findings are delivered for enterprise engagements. Confirm each one
 * you are willing to stand behind and delete the others.
 *
 * Set as wordmarks rather than brand logos. Every one of these is a third
 * party's trademark, we hold no partnership with any of them, and a wall of
 * other people's logos reads as endorsement whether or not it is meant to.
 * Type says the same thing and claims nothing extra. If you want real marks
 * here, they need to be files you have the right to use.
 */

export type IntegrationSystem = {
  name: string;
  /** Storefront, CRM, BI, Export — shown under the name in the row. */
  kind: string;
  /** True when this is a platform we read distributor catalogs from. */
  fromDeck?: boolean;
};

export const integrationSystems: IntegrationSystem[] = [
  { name: "Shopify", kind: "Storefront", fromDeck: true },
  { name: "WooCommerce", kind: "Storefront", fromDeck: true },
  { name: "Adobe Commerce", kind: "Storefront" },
  { name: "BigCommerce", kind: "Storefront" },
  { name: "Salesforce B2B Commerce", kind: "Storefront" },
  { name: "Optimizely", kind: "Storefront" },
  { name: "Unilog CIMM2", kind: "Storefront" },
  { name: "Custom catalogs", kind: "Storefront", fromDeck: true },
  { name: "Marketplace storefronts", kind: "Storefront", fromDeck: true },
  { name: "Salesforce", kind: "CRM" },
  { name: "HubSpot", kind: "CRM" },
  { name: "Microsoft Dynamics", kind: "CRM" },
  { name: "SAP", kind: "ERP" },
  { name: "Power BI", kind: "BI" },
  { name: "Tableau", kind: "BI" },
  { name: "Looker", kind: "BI" },
  { name: "Snowflake", kind: "Warehouse" },
  { name: "Scheduled CSV", kind: "Export" },
  { name: "REST API", kind: "Export" },
];

/**
 * How the crawling is actually done. These are the answers to the question
 * the row above provokes: fine, but what exactly are you doing to my
 * distributors' websites?
 */
export const integrationApproach = {
  eyebrow: "How we work",
  title: "Public pages, one request per second",
  deck: "Nothing here depends on your distributors' cooperation, and nothing here goes anywhere a browser could not. We read what they chose to publish, at a rate that costs them nothing, and we keep the receipt for every value we report.",
  points: [
    {
      title: "Reconnaissance before extraction",
      body: "We establish what each domain is — reachable, catalogued, gated, parked — before harvesting anything from it. That is what makes the first layer cheap, and what stops a project being scoped against a channel nobody has looked at.",
    },
    {
      title: "robots.txt and dealer logins are respected",
      body: "A site that excludes automated access, or puts its catalog behind a dealer login, is reported as gated with a recommendation for manual review or direct outreach. It is never worked around and never counted as an empty catalog.",
    },
    {
      title: "Evidence stored with every value",
      body: "The source URL and a verbatim quote are kept for every field we report. A finding you cannot open and check is a finding your sales team will not use in front of a distributor, and they would be right not to.",
    },
    {
      title: "Resolution cached permanently",
      body: "Mapping a part number to its manufacturer is the one step in the pipeline with real per-part work behind it. Every result is cached forever, so the same part is only ever resolved once and recurring runs are a fraction of the first.",
    },
    {
      title: "Your channel data stays yours",
      body: "Your distributor list, categories, competitor universe and reports are confidential and are not sold on. The one asset we build across clients is the interchange database of cross-reference tables distributors publish themselves, and access to that is licensed selectively.",
    },
  ],
} as const;
