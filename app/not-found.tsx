import Link from "next/link";

import { BookACall } from "@/components/book-a-call";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/container";
import { nav } from "@/content/site";

/**
 * 404.
 *
 * The page opens light like every other route, because the navbar is fixed
 * and transparent at the top of the document and carries light-ground colours
 * — a full-bleed dark 404 put the wordmark at #181818 on #181818 and lost it
 * entirely.
 *
 * The horizon sits below the fold instead, as a band. It is the one place on
 * the site where the metaphor gets used as a joke, and it is worth using once.
 */
export default function NotFound() {
  return (
    <>
      <header className="pt-40 pb-20 sm:pt-48 lg:pt-56">
        <Container>
          <p className="eyebrow text-pink-ink">Error 404</p>
          <h1 className="display-hero mt-8 max-w-[14ch]">
            This one went <span className="text-pink-em">in</span>.
          </h1>
          <p className="measure mt-10 text-xl text-ink-soft">
            The page you are looking for is not here. Nothing that crosses the
            horizon comes back — but the rest of the site is fine.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/">Back to the start</Link>
            </Button>
            <BookACall variant="outline" size="lg" />
          </div>
        </Container>
      </header>

      <Section tone="deep" size="sm" className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-[-10%] top-1/2 h-px -translate-y-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, #b5115b 20%, #f8206d 45%, #ff6e9e 50%, #f8206d 55%, #b5115b 80%, transparent)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-[-10%] top-1/2 h-48 -translate-y-1/2 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 55% 100% at 50% 50%, rgba(248,32,109,0.4), transparent 70%)",
          }}
        />

        <Container className="relative">
          <p className="eyebrow text-muted">Try one of these</p>
          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-display text-2xl text-ink-soft transition-colors hover:text-pink-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
