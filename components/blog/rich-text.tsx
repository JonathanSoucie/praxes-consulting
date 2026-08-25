import * as React from "react";
import Link from "next/link";

/**
 * Inline markup inside a post block.
 *
 * Two forms, both deliberate limits: **strong** and [text](/path). Anything
 * more expressive belongs in a new block kind in content/blog.ts, where it is
 * typed, rather than in a growing regex nobody can safely change.
 *
 * The pattern matches both forms in one pass so the split stays ordered and a
 * link inside a bolded run does not need a second parse. Text is never
 * treated as HTML — the segments are returned as React children, so a stray
 * angle bracket in a post is a stray angle bracket and not an injection.
 */
const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

export function RichText({ text }: { text: string }) {
  const parts = text.split(INLINE).filter(Boolean);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }

        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          const external = href.startsWith("http");
          return external ? (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-pink-ink"
            >
              {label}
            </a>
          ) : (
            <Link key={i} href={href} className="link-underline text-pink-ink">
              {label}
            </Link>
          );
        }

        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}
