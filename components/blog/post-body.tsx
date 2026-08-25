import { RichText } from "@/components/blog/rich-text";
import type { Block } from "@/content/blog";

/**
 * A post body.
 *
 * Set at a wider measure and a larger size than the marketing pages, because
 * this is the only place on the site anyone reads more than four consecutive
 * sentences. Headings inside a post are H2s in ink rather than in pink: the
 * pink emphasis rule is for the one or two words per page that carry the
 * brand, and a post with eight pink subheads spends that on structure.
 */
export function PostBody({ body }: { body: Block[] }) {
  return (
    <div className="measure-wide">
      {body.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-16 mb-6 font-display text-2xl first:mt-0 sm:text-3xl"
              >
                {block.text}
              </h2>
            );

          case "p":
            return (
              <p key={i} className="mt-6 text-lg leading-[1.7] first:mt-0">
                <RichText text={block.text} />
              </p>
            );

          case "ul":
            return (
              <ul key={i} className="mt-7 space-y-3.5">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-4 text-lg leading-[1.6]">
                    <span
                      aria-hidden
                      className="mt-3 size-1.5 shrink-0 rounded-full bg-pink-2"
                    />
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={i} className="mt-7 space-y-5">
                {block.items.map((item, n) => (
                  <li key={item} className="flex gap-5 text-lg leading-[1.6]">
                    <span className="figure-num shrink-0 pt-1 text-sm text-pink-ink">
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="my-14 border-l-2 border-pink pl-7 font-display text-2xl leading-tight sm:text-3xl"
              >
                {block.text}
              </blockquote>
            );

          case "note":
            return (
              <aside
                key={i}
                className="my-12 border border-line bg-white p-7 text-ink-soft"
              >
                <RichText text={block.text} />
              </aside>
            );
        }
      })}
    </div>
  );
}
