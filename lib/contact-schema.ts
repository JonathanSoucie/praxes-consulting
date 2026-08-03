/**
 * Shared contact-form validation. Used by both the client (before submit) and
 * the route handler (which never trusts the client), so the rules can't drift.
 */

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
  /** Honeypot — must stay empty. Real users never see this field. */
  website?: string;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(payload: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (name.length < 2) errors.name = "Please enter your name.";
  if (name.length > 120) errors.name = "That name is too long.";

  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (email.length > 200) errors.email = "That email address is too long.";

  if (company.length < 2) errors.company = "Please enter your company.";
  if (company.length > 160) errors.company = "That company name is too long.";

  if (message.length < 10)
    errors.message = "Please add a little more detail (10 characters minimum).";
  if (message.length > 5000) errors.message = "That message is too long.";

  return errors;
}
