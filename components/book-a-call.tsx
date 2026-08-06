"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  bookingConfigured,
  bookingHref,
  bookingProvider,
  calLink,
  calNamespace,
} from "@/lib/booking";
import { primaryCta } from "@/content/site";
import { cn } from "@/lib/utils";

/** Cal's UI only needs configuring once per page load. */
let calUiInitialised = false;

/**
 * The single "Book a Call" CTA used everywhere on the site.
 *
 * - Cal.com configured  -> opens the Cal modal in place.
 * - Calendly configured -> opens the Calendly scheduler in a new tab.
 * - Nothing configured  -> links to /contact, so the site never has a dead CTA.
 */
export function BookACall({
  label = primaryCta.label,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  ...props
}: Omit<ButtonProps, "asChild"> & {
  label?: string;
  withArrow?: boolean;
}) {
  const useCalModal = bookingProvider === "cal" && bookingConfigured;

  React.useEffect(() => {
    if (!useCalModal || calUiInitialised) return;
    calUiInitialised = true;

    let cancelled = false;
    (async () => {
      try {
        const { getCalApi } = await import("@calcom/embed-react");
        const cal = await getCalApi({ namespace: calNamespace });
        if (cancelled) return;
        cal("ui", {
          // Pin to light so the modal matches the site rather than the
          // visitor's OS colour scheme.
          theme: "light",
          hideEventTypeDetails: false,
          layout: "month_view",
          cssVarsPerTheme: {
            light: { "cal-brand": "#d6146e" },
            dark: { "cal-brand": "#d6146e" },
          },
        });
      } catch {
        // Embed script blocked or offline — the href fallback below still works.
        calUiInitialised = false;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [useCalModal]);

  const content = (
    <>
      {label}
      {withArrow ? <ArrowRight aria-hidden /> : null}
    </>
  );

  // Cal modal: a real <button> carrying the data-cal-* attributes the embed
  // script binds to.
  if (useCalModal) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn(className)}
        data-cal-namespace={calNamespace}
        data-cal-link={calLink}
        data-cal-config={`{"layout":"month_view","theme":"light"}`}
        {...props}
      >
        {content}
      </Button>
    );
  }

  const href = bookingHref();
  const external = href.startsWith("http");

  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <Link href={href}>{content}</Link>
      )}
    </Button>
  );
}

/** The reassurance line that sits under a CTA. */
export function BookingNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs tracking-wide text-muted", className)}>
      {primaryCta.note}
    </p>
  );
}
