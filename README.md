# Praxes — marketing site

Marketing site for Praxes, an AI automation consulting firm. Every page funnels
to one action: **book a free 15-minute discovery call**.

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Radix primitives.

The site is built around one argument, and the vocabulary for it lives in
[`content/positioning.ts`](content/positioning.ts):

- **the black hole** — the named enemy. Repetitive work nobody designed, that
  has never been measured, and that takes a fixed cut of every week. Always
  lowercase in running prose.
- **escape velocity** — the coined term the firm owns. The point at which the
  systems you run give back more hours than they take to run.

Both terms are used identically on every page, which is the point of keeping
them in one file. If you change one, change it there.

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
  Publishing them as-is presents fabricated endorsements as genuine.
- **`content/case-studies/*.ts`** — invented clients and figures. Same rule.
- **`content/stats.ts`** — invented aggregate figures.
- **`content/alternatives.ts`** — the cost figures are indicative Ottawa-market
  ranges, not quotes. Note the rule at the top of that file before editing it:
  every alternative needs a `verdict` capable of sending the reader elsewhere.
  If no entry could plausibly lose an engagement, it is a rigged comparison
  table and is worth less than no section at all.
- **`content/positioning.ts`** — the `cost` ranges on `symptoms` are
  illustrative of typical audit findings, not measured client averages. Keep
  them as ranges or replace them with your own.
- **`content/segments.ts`** — the `proof` figures on each segment are the same
  kind of illustrative range.
- **`app/privacy/page.tsx` / `app/terms/page.tsx`** — templates, not legal
  advice. Have them reviewed against your jurisdiction and actual practices.

**Both feature flags in `content/site.ts` are currently `true`**, so the
invented case studies and testimonials are live on the site. Either replace
that content with real, permissioned material or set the flags back to `false`
before the site is public. See *Hidden sections* below.

Team details in `content/team.ts` and contact details in `content/site.ts` are
carried over from the previous site and are real — check them anyway.

---

## ⚠️ Fonts

The brand calls for **Supreme LL** (Lineto) and **Helvetica Now** (Monotype).
Both are commercial licences and neither is in this repo. What ships instead:

- **Display —** [Supreme](https://www.fontshare.com/fonts/supreme) from
  Fontshare, self-hosted in `public/fonts/`. Free, and very close to Supreme LL.
- **Body —** Inter via `next/font`. A system Helvetica stack was rejected
  because it is only Helvetica on Apple hardware and is Arial everywhere else;
  one substitute that is wrong the same way for everyone is easier to design
  against.
- **Interface —** Work Sans via `next/font`, on `--font-ui`. Eyebrows,
  buttons, figures, nav, breadcrumbs, form labels and meta lines: anything the
  reader operates or reads as a label rather than as a sentence. Supreme is a
  display face and works against itself below ~18px, which is exactly where
  labels live; Inter is drawn to disappear, which is right for a paragraph and
  wrong for a control. To put Work Sans on body copy instead, repoint
  `--font-sans`.

To swap in the licensed files: drop the `.woff2` files into `public/fonts/` and
change the five `src` lines in the `@font-face` block at the top of
`app/globals.css`, plus `--font-sans` in the `@theme` block. Nothing else in
the codebase names a font file.

---

## Where the content lives

All swappable content is in `content/`. You should rarely need to touch a
component to change what the site says.

```
content/
  positioning.ts      THE SPINE — the named enemy, the coined term, the
                      problem symptoms, the audience, how it works, the
                      integration list, the data commitments
  alternatives.ts     the competitive alternatives, named — what each one is
                      genuinely better at and when to choose it over us
  site.ts             company details, navigation, feature flags, CTA labels
  services.ts         the three services, each with its process steps and
                      examples (drives /services and /services/[slug])
  segments.ts         the per-industry pages (drives /industries/[slug])
  blog.ts             posts as typed blocks (drives /blog and /blog/[slug])
  stats.ts            headline / aggregate figures
  team.ts             team members + the values section
  testimonials.ts     client quotes
  faqs.ts             three FAQ sets: general, process, contact
  case-studies/
    index.ts          the collection + helpers (edit this to add an entry)
    types.ts          the CaseStudy shape
    *.ts              one file per case study
```

### Adding a blog post

Add an entry to `posts` in [`content/blog.ts`](content/blog.ts). The body is an
array of typed blocks (`p`, `h2`, `ul`, `ol`, `quote`, `note`) rather than MDX —
that buys typechecking and one renderer instead of a second content pipeline.
Inline markup inside a block is limited to `**strong**` and `[text](/path)`.

Set `featured: true` on exactly one post to control which one leads the index
and appears on `/about`.

### Adding a service or an industry

Append to the arrays in `content/services.ts` or `content/segments.ts`. The
route, the nav and footer links, the cross-links on every other page and the
sitemap entry are all generated from those arrays.

For a service, the `process` array is what the timeline renders. Each step
carries an `icon` (a name from the `StepIcon` union — the glyph lookup lives in
`components/process/process-steps.tsx`, so this file stays free of React
imports) and a `panel` drawn from data: `flow`, `rows` or `bars`. Adding a
fourth panel shape means teaching `components/process/step-panel.tsx` about it.

The timeline alternates copy and visual either side of a spine that is dashed
ahead of the reader and solid behind them. It replaced a sticky two-column
version — steps on the left, one pinned visual on the right that swapped as
each step became live — which had a specific failure: the visual changed while
the reader was mid-paragraph, so what they were reading about and what was on
screen were often one step apart. Pairing each step with its own visual removes
the desync at the cost of vertical space.

### Hidden sections

`features` in [`content/site.ts`](content/site.ts) gates optional sections.
Both are currently **on**, and both are backed by invented content — see the
launch checklist above.

Setting `caseStudies` to `false` removes in one step: the nav and footer links,
the `/case-studies` index and detail pages (they 404), the "Read the
engagement" link under the home page quote, and the sitemap entries. Setting
`testimonials` to `false` removes the home page quote band and the quote grid
on the case studies index. Neither touches the content files.

### Adding a case study

1. Copy an existing file in `content/case-studies/`, e.g. `northgate-accounting.ts`.
2. Give it a unique `slug`, and an `industry` that **matches one of the names in
   `segments`** (`content/segments.ts`) so the cross-links line up.
3. Import it in `content/case-studies/index.ts` and add it to the `caseStudies`
   array. Position in the array is display order.

That's it. The detail page at `/case-studies/<slug>`, the related-studies block
and the `sitemap.xml` entry are all generated from that array.

---

## Design tokens

Everything visual is driven by the `@theme` block near the top of
[`app/globals.css`](app/globals.css) — colours, type faces, radii, motion
easing. Change a token there and the whole site follows.

- **One palette.** The site is light only. `#FAFAFA` page, `#181818` ink, and
  the three logo pinks. There is no dark mode and no token pairing left over
  from the previous build.

- **The two grounds are the structure.** White is the business working; black
  (`on-deep`) is the black hole. Sections are painted by which side of that
  argument they are on — the home page falls into black twice and comes back
  out both times. `on-deep` redefines the colour tokens inside the band, so a
  component written for the light ground lands correctly inside a dark one
  without knowing where it is.

- **The three pinks are assigned by contrast, not by preference.** Measured
  against both grounds:

  | | on `#FAFAFA` | on `#181818` |
  |---|---|---|
  | `--color-pink` `#F8206D` | 4.0:1 | 4.3:1 |
  | `--color-pink-2` `#FF6E9E` | 2.4:1 | 7.0:1 |
  | `--color-pink-3` `#B5115B` | 6.3:1 | 1.5:1 |

  So `--color-pink` is the H1/H2 and emphasis colour and is only ever used at
  display sizes, where 4.0:1 clears AA for large text. `--color-pink-2` is the
  H3/H4 colour **on the dark ground only** — at 2.4:1 it cannot carry type on
  white. `--color-pink-3` is a ground, the card shadow tint, and the pink that
  small type on white resolves to.

  That last substitution is the one deviation from the brand direction, and it
  is handled by the semantic alias `--color-pink-ink`, which is `#B5115B` on
  white and `#FF6E9E` inside `on-deep`. Components ask for the job, not the
  swatch — so if you want to change which pink does what, change it there once.

- **Type.** Three faces with three jobs: Supreme (`--font-display`) for
  headings, Inter (`--font-sans`) for sentences, Work Sans (`--font-ui`) for
  the interface layer. See the *Fonts* section above for why the third one
  earns its request. Tracking is attached to each `text-*` size in `@theme`
  rather than set per component, because the right value is a function of size.

- **Shape.** Square. Every `--radius-*` is `0px`, so elevation is carried by a
  hairline and a fill change. `rounded-full` does not resolve through those
  tokens, so pills and circular marks are unaffected.

- **Card elevation is pink, not grey.** `card` uses `#B5115B` at low alpha in
  two stops. A neutral shadow under a pink-accented card greys the whole
  palette.

The layout utilities — `container-page`, `container-wide`, `section-y`,
`measure`, `display-hero`, `display-lg`, `display-md`, `eyebrow`, `figure-num`,
`card`, `on-deep`, `reveal` — are all defined in the same file, below `@theme`.

### The scroll reveal

`components/reveal.tsx` plus the `.reveal` rules in `globals.css`. Two things
about it are deliberate and worth not undoing:

- The hidden state is scoped to `[data-js]`, set by an inline script in the
  document head. Without JavaScript the page renders as a plain document
  rather than as a blank screen — content that is invisible unless a script
  succeeds is not a progressive enhancement.
- Anything at or above the fold on mount is shown immediately without going
  through the observer, which covers above-the-fold content and hash landings
  (`/#how-it-works`), where everything above the landing point would otherwise
  never intersect and stay hidden.

---

## Structure

```
app/
  layout.tsx              fonts, metadata, Navbar/Footer, Vercel Analytics
  page.tsx                Home — hero, film, problem, audience, offer,
                          results, quote, how it works, systems, data, CTA
  services/               index + [slug] (three services)
  industries/             index + [slug] (five segments)
  blog/                   index + [slug]
  about/ contact/
  case-studies/           index + [slug] (feature-flagged)
  privacy/ terms/ not-found.tsx
  api/contact/route.ts    Resend handler (validation + honeypot)
  sitemap.ts robots.ts    generated from the route list + all four collections
  icon.tsx opengraph-image.tsx    generated, no binary assets

components/
  book-a-call.tsx         THE shared CTA — used everywhere, change once
  cal-embed.tsx           inline booking widget (Cal / Calendly / placeholder)
  contact-form.tsx        client validation, honeypot, success state
  container.tsx           Container + Section (rhythm; tone: light | deep)
  section-heading.tsx     SectionHeading + Eyebrow
  reveal.tsx              scroll reveal — see the note above
  home/                   the home page sections, one file each
  process/                process-steps.tsx (the alternating timeline)
                          step-panel.tsx    (flow / rows / bars visuals)
  blog/                   post-body.tsx, rich-text.tsx
  layout/                 navbar (fixed), footer, logo
  sections/               cta, page-header, faq, legal-page
  ui/                     button, input, textarea, label, accordion

lib/
  booking.ts              provider abstraction (Cal ↔ Calendly)
  schema.ts               all JSON-LD builders
  seo.ts                  pageMetadata() — every route's metadata comes from it
  contact-schema.ts       validation shared by client and server
  utils.ts                cn()

archive/
  flight/                 the previous black-hole home page, unrouted and
                          excluded from tsconfig. See archive/README.md.
```

### Swapping Cal.com for Calendly

Set `NEXT_PUBLIC_BOOKING_PROVIDER=calendly` and `NEXT_PUBLIC_CALENDLY_URL`.
`lib/booking.ts` and `components/cal-embed.tsx` handle both; no other file
knows which provider is in use.

---

## Accessibility & performance notes

- Semantic landmarks, a skip link, labelled form fields with `aria-invalid` /
  `aria-describedby`, and breadcrumb navigation on every page below Home.
- Focus ring is a 2px `--color-pink` outline, visible on every interactive element.
- All motion is suppressed under `prefers-reduced-motion`.
- `next/font` (self-hosted, no layout shift), `next/image` for team photos,
  static rendering for every page except the contact API route.

Re-check contrast if you change any pink assignment — the table under *Design
tokens* is the reason each one is where it is, and `--color-pink-2` in
particular fails on white at any size.

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
