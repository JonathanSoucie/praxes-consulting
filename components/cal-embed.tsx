"use client";

import * as React from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Calendar } from "lucide-react";

import {
  bookingConfigured,
  bookingHref,
  bookingProvider,
  calLink,
  calNamespace,
} from "@/lib/booking";
import { Button } from "@/components/ui/button";

/**
 * Inline booking widget for the Contact page.
 *
 * Renders the Cal.com inline embed when NEXT_PUBLIC_CAL_LINK is set, the
 * Calendly widget when that provider is selected, and a clear placeholder
 * when neither is configured — so the page always builds and reviews cleanly.
 */
export function BookingEmbed() {
  if (bookingProvider === "calendly" && bookingConfigured) {
    return <CalendlyInline />;
  }

  if (bookingProvider === "cal" && bookingConfigured) {
    return <CalInline />;
  }

  return <BookingPlaceholder />;
}

function CalInline() {
  React.useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi({ namespace: calNamespace });
        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
          cssVarsPerTheme: {
            light: { "cal-brand": "#5b5be6" },
            dark: { "cal-brand": "#5b5be6" },
          },
        });
      } catch {
        // Non-fatal: the static fallback link below remains available.
      }
    })();
  }, []);

  return (
    <div className="card-raise overflow-hidden rounded-2xl bg-surface p-2">
      <Cal
        namespace={calNamespace}
        calLink={calLink}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
      <noscript>
        <p className="p-6 text-sm text-muted">
          Booking needs JavaScript.{" "}
          <a className="text-accent underline" href={bookingHref()}>
            Open the scheduler in a new tab
          </a>
          .
        </p>
      </noscript>
    </div>
  );
}

function CalendlyInline() {
  // Calendly's inline widget is a plain iframe — no extra script required.
  const url = `${bookingHref()}?hide_gdpr_banner=1&primary_color=5b5be6`;
  return (
    <div className="card-raise overflow-hidden rounded-2xl bg-surface p-2">
      <iframe
        src={url}
        title="Book a discovery call"
        className="h-176 w-full rounded-xl"
        loading="lazy"
      />
    </div>
  );
}

function BookingPlaceholder() {
  return (
    <div className="card-raise grid-rule rounded-2xl bg-surface p-10 text-center sm:p-16">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent-soft">
        <Calendar aria-hidden className="size-5 text-accent" />
      </span>
      <h3 className="mt-5 text-xl">Scheduler not connected yet</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
        Set <code className="font-mono text-ink">NEXT_PUBLIC_CAL_LINK</code> in
        your environment to embed the live Cal.com booking calendar here. Until
        then, the form below reaches us directly.
      </p>
      <Button asChild variant="soft" size="sm" className="mt-6">
        <a href="#contact-form">Use the contact form</a>
      </Button>
    </div>
  );
}
