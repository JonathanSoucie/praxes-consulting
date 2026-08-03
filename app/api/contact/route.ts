import { NextResponse } from "next/server";

import { validateContact, type ContactPayload } from "@/lib/contact-schema";
import { site } from "@/content/site";

/** Escape user input before it goes into the HTML email body. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill every field they find. Return 200 so they learn nothing.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Server-side validation — the client checks are a convenience, not a gate.
  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const payload = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    company: body.company!.trim(),
    message: body.message!.trim(),
  };

  const apiKey = process.env.RESEND_API_KEY;

  // No key configured — log and succeed, so local dev and preview builds work
  // without secrets rather than showing visitors a false error.
  if (!apiKey) {
    console.info(
      "[contact] RESEND_API_KEY not set — submission logged instead of sent:",
      payload
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ??
        "Praxes Website <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? site.email,
      replyTo: payload.email,
      subject: `Website enquiry — ${payload.company}`,
      text: [
        `Name:    ${payload.name}`,
        `Email:   ${payload.email}`,
        `Company: ${payload.company}`,
        "",
        payload.message,
      ].join("\n"),
      html: `
        <table style="font-family:system-ui,sans-serif;font-size:14px;color:#111">
          <tr><td style="padding:2px 12px 2px 0;color:#6b7280">Name</td><td>${escapeHtml(payload.name)}</td></tr>
          <tr><td style="padding:2px 12px 2px 0;color:#6b7280">Email</td><td>${escapeHtml(payload.email)}</td></tr>
          <tr><td style="padding:2px 12px 2px 0;color:#6b7280">Company</td><td>${escapeHtml(payload.company)}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
        <p style="font-family:system-ui,sans-serif;font-size:14px;color:#111;white-space:pre-wrap">${escapeHtml(payload.message)}</p>
      `,
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return NextResponse.json(
        { error: "We couldn't send that. Please email us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected failure:", err);
    return NextResponse.json(
      { error: "We couldn't send that. Please email us directly." },
      { status: 500 }
    );
  }
}
