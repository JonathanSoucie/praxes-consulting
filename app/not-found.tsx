import Link from "next/link";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookACall } from "@/components/book-a-call";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <div className="gradient-hero relative overflow-hidden">
      <div
        aria-hidden
        className="grid-rule-dark pointer-events-none absolute inset-x-0 top-0 h-[70%] mask-[linear-gradient(to_bottom,black,transparent)]"
      />

      <Container className="relative pt-40 pb-28 text-center sm:pt-44 sm:pb-32">
        <div className="mx-auto max-w-2xl">
          <Badge tone="onDark">Error 404</Badge>

          <h1 className="mt-7 text-4xl leading-tight text-white sm:text-5xl">
            That page isn&apos;t here.
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            The link may be out of date, or the page may have moved. Everything
            the site has is one of the links below.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookACall variant="onDark" size="lg" withArrow />
            <Button asChild variant="onDarkGhost" size="lg">
              <Link href="/">Back to home</Link>
            </Button>
          </div>

          <nav aria-label="Site" className="mt-14 border-t border-white/15 pt-8">
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
}
