import Link from "next/link";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { BookACall } from "@/components/book-a-call";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <Container className="py-28 sm:py-36">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-px w-6 bg-accent" />
          <span className="figure-num label-eyebrow text-muted">
            Error 404
          </span>
        </div>

        <h1 className="mt-6 text-4xl leading-tight sm:text-5xl">
          That page isn&apos;t here.
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-muted">
          The link may be out of date, or the page may have moved. Everything
          the site has is one of the links below.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="solid">
            <Link href="/">Back to home</Link>
          </Button>
          <BookACall variant="outline" />
        </div>

        <nav aria-label="Site" className="mt-14 border-t border-line pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
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
  );
}
