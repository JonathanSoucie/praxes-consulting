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
  title: "Careful collection. Clear evidence.",
  deck: "Public pages. One request per second. Every finding linked to its source.",
  points: [
    {
      title: "Check before we crawl",
      body: "We check each domain’s access, platform, and catalog before collecting data.",
    },
    {
      title: "Respect the boundaries",
      body: "We respect robots.txt and dealer logins. Restricted sites are flagged, never bypassed.",
    },
    {
      title: "Keep the evidence",
      body: "Every finding includes a source URL and a verbatim quote, ready to open and verify.",
    },
    {
      title: "Resolve once. Reuse forever.",
      body: "Manufacturer matches are cached, making repeat runs faster and less costly.",
    },
    {
      title: "Your data stays yours",
      body: "Your distributor list and reports stay confidential. Public interchange data is built and licensed separately.",
    },
  ],
} as const;
