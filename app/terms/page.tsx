import type { Metadata } from "next";

import { LegalPage, LegalSection } from "@/components/sections/legal-page";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms governing the use of the ${site.legalName} website.`,
  path: "/terms",
  // follow: true — see the note in app/privacy/page.tsx.
  robots: { index: true, follow: true },
});

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Use" updated="2026-08-03">
      <LegalSection heading="Scope">
        <p>
          These terms govern your use of this website. They do not govern any
          consulting engagement — that is covered by a separate written
          agreement signed before work begins. Where the two conflict, the
          engagement agreement takes precedence.
        </p>
      </LegalSection>

      <LegalSection heading="No advice, no guarantee">
        <p>
          Nothing on this site constitutes professional, financial, legal or
          technical advice, and nothing here forms an offer or a contract. The
          figures, ranges and outcomes described are drawn from specific past
          engagements under specific conditions. They are not a prediction of
          your results and are not a guarantee of any return.
        </p>
        <p>
          Any projection we produce for you during an engagement will state its
          assumptions explicitly. Those assumptions, not the headline number,
          are what the projection depends on.
        </p>
      </LegalSection>

      <LegalSection heading="Case studies and testimonials">
        <p>
          Case studies describe real engagements and are published with client
          agreement. Some client names and identifying details are changed where
          confidentiality requires it. Metrics are as measured at the stated
          point in time and are not ongoing commitments.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          The content, design and code of this site belong to {site.legalName}{" "}
          unless otherwise stated. You may read, quote with attribution, and
          share links. You may not republish substantial portions or present the
          material as your own.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party services and links">
        <p>
          This site embeds a third-party scheduling widget and links to external
          sites. We don&apos;t control those services and aren&apos;t
          responsible for their content, availability or practices. Your use of
          them is governed by their own terms.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <p>
          Don&apos;t use the contact form to send unsolicited commercial
          messages, attempt to disrupt the site, or submit content you have no
          right to send us. We block and discard submissions that do.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          The site is provided as is. To the extent permitted by law, we exclude
          liability for any loss arising from reliance on its content. Nothing
          here limits liability that cannot lawfully be limited.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of {site.address.country}, and
          disputes fall to the courts of that jurisdiction.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
