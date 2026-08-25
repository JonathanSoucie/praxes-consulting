"use client";

import * as React from "react";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { validateContact, type FieldErrors } from "@/lib/contact-schema";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""), // honeypot
    };

    const clientErrors = validateContact(payload);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (result.errors) setErrors(result.errors as FieldErrors);
        setFormError(
          result.error ??
            "Something went wrong. Please check the fields and try again.",
        );
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setFormError(
        `We couldn't reach the server. Please email us at ${site.email}.`,
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-10 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-pink-soft">
          <Check aria-hidden className="size-5 text-pink-ink" />
        </span>
        <h3 className="mt-5 font-display text-2xl">Message received</h3>
        <p className="mx-auto mt-3 max-w-sm text-ink-soft">
          We reply to everything within one business day. If it's urgent, book
          the 15-minute call above and take the first slot that suits you.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-8"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
      </div>

      <Field id="company" label="Company" error={errors.company}>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          required
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "company-error" : undefined}
        />
      </Field>

      <Field
        id="message"
        label="What's slowing you down?"
        error={errors.message}
      >
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="A sentence or two about the process that frustrates you most is plenty."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </Field>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div
        aria-hidden
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {formError ? (
        <p role="alert" className="text-sm text-pink-ink">
          {formError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 aria-hidden className="animate-spin" />
              Sending
            </>
          ) : (
            "Send message"
          )}
        </Button>
        <p className="text-xs text-muted">
          Or email{" "}
          <a
            href={`mailto:${site.email}`}
            className="link-underline text-pink-ink"
          >
            {site.email}
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-1">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-pink-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}
