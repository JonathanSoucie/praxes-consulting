# Praxes — marketing site

Marketing site for Praxes, an AI consulting firm. Every page funnels to one
action: **book a free 15-minute discovery call**.

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · shadcn/ui primitives.

---

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev                  # http://localhost:3000
```

The site builds and runs with **no environment variables set at all** — the
booking CTA falls back to `/contact` and the contact form logs instead of
emailing. Nothing breaks; you just don't get bookings or mail.

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

---

## Environment variables

| Variable | Required | What it does |
|---|---|---|
| `NEXT_PUBLIC_CAL_LINK` | for booking | Cal.com link **without** the `https://cal.com/` prefix, e.g. `praxes/discovery`. Unset → all "Book a Call" CTAs link to `/contact`. |
| `NEXT_PUBLIC_BOOKING_PROVIDER` | no | `cal` (default) or `calendly`. |
| `NEXT_PUBLIC_CALENDLY_URL` | if using Calendly | Full Calendly URL. |
| `RESEND_API_KEY` | for email | Unset → submissions are logged server-side and the visitor still sees success. |
| `CONTACT_TO_EMAIL` | no | Where enquiries go. Defaults to `site.email`. |
| `CONTACT_FROM_EMAIL` | no | Must be a domain verified in Resend. Defaults to Resend's sandbox sender. |
| `NEXT_PUBLIC_SITE_URL` | for SEO | Canonical origin, no trailing slash. Used for metadata, OG tags and `sitemap.xml`. |
| `NEXT_PUBLIC_ANALYTICS` | no | Spare slot for a third-party analytics id. Vercel Analytics is already wired and needs no key. |

Set the `NEXT_PUBLIC_*` ones in Vercel for **all** environments; secrets
(`RESEND_API_KEY`) for Production and Preview only.

---

## ⚠️ Before you launch

The copy is written to be realistic, not to be true. Replace it:

- **`content/testimonials.ts`** — every quote, name and company is invented.
  Publishing them as-is presents fabricated endorsements as genuine. Replace
  with real, permitted quotes or delete the section (it degrades gracefully).
- **`content/case-studies/*.ts`** — invented clients and figures. Same rule.
- **`content/stats.ts`** — invented aggregate figures.
- **`components/sections/roi-readout.tsx`** — the hero panel's numbers.
- **`app/privacy/page.tsx` / `app/terms/page.tsx`** — templates, not legal
  advice. Have them reviewed against your jurisdiction and actual practices.

Team details in `content/team.ts` and contact details in `content/site.ts` are
carried over from the previous site and are real — check them anyway.

---

## Where the content lives

All swappable content is in `content/`. You should rarely need to touch a
component to change what the site says.

```
content/
  site.ts             company details, navigation, primary CTA labels
  services.ts         service categories (problem → solution → ROI) + industries
  process.ts          the 5 engagement steps + investment framing
  stats.ts            headline / credibility / aggregate figures
  team.ts             team members + the values section
  testimonials.ts     client quotes
  faqs.ts             three FAQ sets: general, process, contact
  case-studies/
    index.ts          the collection + helpers (edit this to add an entry)
    types.ts          the CaseStudy shape
    *.ts              one file per case study
```

### Adding a case study

1. Copy an existing file in `content/case-studies/`, e.g. `northgate-accounting.ts`.
2. Give it a unique `slug`, and an `industry` that **matches one of the names in
   `industries`** (`content/services.ts`) so the filter picks it up.
3. Import it in `content/case-studies/index.ts` and add it to the `caseStudies`
   array. Position in the array is display order.

That's it. The detail page at `/case-studies/<slug>`, the industry filter, the
related-studies block and the `sitemap.xml` entry are all generated from that
array. Set `featured: true` on exactly one entry to control which study appears
in the featured slot on Home, Services and the Case Studies index.

---

## Design tokens

Everything visual is driven by the `@theme` block at the top of
[`app/globals.css`](app/globals.css) — colours, type faces, radii, motion easing.
Change a token there and the whole site follows.

- **Palette.** White and neutral greys carry the page. Teal `#0F766E` is an
  accent only: CTAs, key figures, active states, the thin rule under section
  labels. Resist widening its use — the restraint is the look.
- **Type.** Serif headings (Source Serif 4), sans body (Inter), monospace stat
  figures (JetBrains Mono). To switch headings to a grotesk, point
  `--font-serif` at `--font-sans` in the `@theme` block — one line.
- **Data marks.** `--color-chart-before` (`#949494`) and `--color-chart-after`
  (teal) are the before/after comparison pair. They were checked for ≥3:1
  contrast on white and for separation under protan/deutan/tritan simulation,
  and every bar is direct-labelled so colour is never the only channel. If you
  change them, keep both properties.

Utility classes `container-page`, `figure-num`, `label-eyebrow` and `grid-rule`
are defined at the bottom of the same file.

---

## Structure

```
app/
  layout.tsx              fonts, metadata, Navbar/Footer, Vercel Analytics
  page.tsx                Home (+ Organization JSON-LD)
  services/ process/ about/ contact/
  case-studies/page.tsx           index with industry filter
  case-studies/[slug]/page.tsx    generated detail page
  privacy/ terms/ not-found.tsx
  api/contact/route.ts    Resend handler (validation + honeypot)
  sitemap.ts robots.ts    generated from the route list + case studies
  icon.tsx opengraph-image.tsx    generated, no binary assets

components/
  book-a-call.tsx         THE shared CTA — used everywhere, change once
  cal-embed.tsx           inline booking widget (Cal / Calendly / placeholder)
  contact-form.tsx        client validation, honeypot, success state
  container.tsx           Container + Section (vertical rhythm, tones)
  section-heading.tsx     eyebrow + serif headline + deck
  reveal.tsx              subtle scroll reveal, respects reduced-motion
  icon.tsx                name → lucide icon lookup for content files
  layout/                 navbar, footer, logo
  sections/               hero, stats-block, case-study-card, testimonial-slider,
                          process-timeline, faq, cta, page-header, trust-bar,
                          roi-readout, case-study-grid, legal-page
  ui/                     shadcn primitives: button, input, textarea, label, accordion

lib/
  booking.ts              provider abstraction (Cal ↔ Calendly)
  contact-schema.ts       validation shared by client and server
  utils.ts                cn()
```

### Swapping Cal.com for Calendly

Set `NEXT_PUBLIC_BOOKING_PROVIDER=calendly` and `NEXT_PUBLIC_CALENDLY_URL`.
`lib/booking.ts` and `components/cal-embed.tsx` handle both; no other file
knows which provider is in use.

---

## Accessibility & performance notes

- Semantic landmarks, a skip link, labelled form fields with `aria-invalid` /
  `aria-describedby`, `aria-pressed` on the case-study filters, and an
  `aria-live` result count.
- Focus ring is a 2px teal outline, visible on every interactive element.
- All motion is suppressed under `prefers-reduced-motion`.
- `next/font` (self-hosted, no layout shift), `next/image` for team photos,
  static rendering for every page except the contact API route.

Re-check contrast if you change `--color-muted` — it is the one token close to
the 4.5:1 line for small text.

---

## Deploy to Vercel

1. Push to GitHub.
2. In Vercel: **Add New → Project → Import** the repo. The framework preset
   (Next.js), build command and output directory are detected automatically.
3. **Settings → Environment Variables**: add the variables from the table above.
   `NEXT_PUBLIC_SITE_URL` should be your final domain, e.g.
   `https://praxes.consulting`.
4. Deploy. Then **Settings → Domains** to attach the domain, and
   **Analytics** to switch on Vercel Analytics (the client is already installed).
5. Redeploy after adding env vars — `NEXT_PUBLIC_*` values are inlined at build
   time, so they don't take effect until the next build.

For the contact form in production, verify your sending domain in Resend and
set `CONTACT_FROM_EMAIL` to an address on it; the sandbox sender only delivers
to the account owner.

---

## Previous site

The original automation-consulting site (3D cobot hero, HR/EN/IT) is preserved:

- git tag `v1-robotics-site` and branch `archive/v1-robotics-site` (both pushed)
- a working copy at `../praxes-site-v1-backup/`
