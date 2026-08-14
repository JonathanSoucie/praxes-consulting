import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BookACall } from "@/components/book-a-call";
import { NeuralField } from "@/components/sections/neural-field";
import { nav } from "@/content/site";

/* Next emits the noindex directive for this route itself — repeating it here
   only produces a second, duplicate robots tag. Title only. */
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-surface">
      <NeuralField className="pointer-events-none absolute inset-0" />

      <Container className="relative pt-40 pb-28 text-center sm:pt-44 sm:pb-32">
        <div className="mx-auto max-w-2xl">
          <div className="flex justify-center">
            <Eyebrow>Error 404</Eyebrow>
          </div>

          <h1 className="mt-6 text-4xl leading-tight text-ink sm:text-5xl">
            That page isn&apos;t here.
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            The link may be out of date, or the page may have moved. Everything
            the site has is one of the links below.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookACall size="lg" withArrow />
            <Button asChild variant="outline" size="lg">
              <Link href="/">Back to home</Link>
            </Button>
          </div>

          <nav aria-label="Site" className="mt-14 border-t border-line pt-8">
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
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
