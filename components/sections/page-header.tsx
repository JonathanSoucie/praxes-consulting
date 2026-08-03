import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/** Standard page masthead. Consistent across every top-level page. */
export function PageHeader({
  eyebrow,
  title,
  deck,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  deck?: React.ReactNode;
  /** Optional trailing content — CTAs, stat strip, etc. */
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-line bg-surface pt-16 pb-16 sm:pt-20 sm:pb-20">
      <Container>
        <Reveal className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            <span className="label-eyebrow text-muted">{eyebrow}</span>
          </div>

          <h1 className="mt-6 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.06]">
            {title}
          </h1>

          {deck ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {deck}
            </p>
          ) : null}

          {children}
        </Reveal>
      </Container>
    </div>
  );
}
