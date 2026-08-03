/**
 * Booking provider abstraction.
 *
 * Default provider is Cal.com. To swap to Calendly, set:
 *   NEXT_PUBLIC_BOOKING_PROVIDER=calendly
 *   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/you/discovery
 *
 * Everything else in the app talks to the helpers below, so no component
 * needs to know which provider is in use.
 */

export type BookingProvider = "cal" | "calendly";

export const bookingProvider: BookingProvider =
  process.env.NEXT_PUBLIC_BOOKING_PROVIDER === "calendly" ? "calendly" : "cal";

/** e.g. "praxes/discovery" — the Cal.com link without the https://cal.com/ prefix. */
export const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? "";

/** Full Calendly scheduling URL. */
export const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

/** Namespace keeps multiple Cal embeds on one page from colliding. */
export const calNamespace = "discovery";

/**
 * True when a real booking link is configured. When false, every "Book a Call"
 * CTA degrades to an internal link to /contact so the site still works with no
 * env vars set at all.
 */
export const bookingConfigured =
  bookingProvider === "cal" ? calLink.length > 0 : calendlyUrl.length > 0;

/** Absolute URL for the booking page — used for no-JS fallbacks and new-tab links. */
export function bookingHref(): string {
  if (bookingProvider === "calendly") return calendlyUrl || "/contact";
  return calLink ? `https://cal.com/${calLink}` : "/contact";
}
