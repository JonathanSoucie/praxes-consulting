import type { Metadata } from "next";

import { LegalPage, LegalSection } from "@/components/sections/legal-page";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses and protects personal data submitted through this website.`,
  path: "/privacy",
  // follow: true — these pages link back into the site, and blocking that
  // discards internal link signal for no benefit.
  robots: { index: true, follow: true },
});

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="2026-08-03">
      <LegalSection heading="Who we are">
        <p>
          {site.legalName} ({site.name}) is an AI consulting firm based in{" "}
          {site.address.locality}, {site.address.region}, {site.address.country}
          . We are the data controller for personal data collected through this
          website. You can reach us at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <ul>
          <li>
            <strong className="text-ink">Contact form submissions.</strong> Your
            name, email address, company name and the content of your message.
          </li>
          <li>
            <strong className="text-ink">Booking details.</strong> If you book a
            call, the scheduling provider collects your name, email address and
            chosen time. That data is processed under their own privacy policy.
          </li>
          <li>
            <strong className="text-ink">Analytics.</strong> Aggregated,
            privacy-preserving page view data via Vercel Analytics. This does
            not use cookies and does not identify individual visitors.
          </li>
        </ul>
        <p>
          We do not collect special category data through this website, and we
          ask that you don&apos;t send it to us through the contact form.
        </p>
      </LegalSection>

      <LegalSection heading="Why we process it">
        <p>
          To respond to your enquiry, arrange and conduct calls, and — where a
          business relationship follows — to deliver the engagement. Our lawful
          basis is your consent when you submit the form, and our legitimate
          interest in responding to business enquiries and in understanding
          aggregate site usage.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <p>
          Only the service providers needed to operate the site and respond to
          you: our hosting provider (Vercel), our transactional email provider
          (Resend), and our scheduling provider (Cal.com). Each processes data
          on our instructions under its own terms. We do not sell personal data
          or share it for advertising.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          Enquiries that do not lead to an engagement are deleted within 24
          months. Where an engagement follows, records are retained for the
          period required by applicable contractual and tax law.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Under the GDPR you may request access to your personal data, ask us to
          correct or erase it, object to or restrict its processing, and request
          portability. Email <a href={`mailto:${site.email}`}>{site.email}</a>{" "}
          and we will respond within one month. You also have the right to
          complain to your national supervisory authority.
        </p>
      </LegalSection>

      <LegalSection heading="Client data during engagements">
        <p>
          Data handling within a client engagement is governed by the written
          agreement for that engagement, not by this policy. As a rule we work
          inside your own systems and accounts wherever possible, scope access
          to what the specific workflow requires, and hand over full
          administrative control at go-live.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          If we change this policy we will update the date at the top of this
          page. Material changes affecting existing enquiries will be
          communicated directly.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
