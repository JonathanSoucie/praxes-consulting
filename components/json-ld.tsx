import type { Json } from "@/lib/schema";

/**
 * Renders one <script type="application/ld+json"> per schema object.
 *
 * All input is author-controlled, but `<` is still escaped: an unescaped
 * "</script" anywhere in the content would close the tag early and drop the
 * remainder of the block into the document as markup.
 */
export function JsonLd({ schema }: { schema: Json | Json[] }) {
  const blocks = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
