import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { Cta } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/reveal";
import { formatPostDate, getFeaturedPost, postsByDate } from "@/content/blog";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Arguments about automation, measurement and why most of these projects fail — written by the people doing the builds, not by a content team.";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description,
  path: "/blog",
});

export default function BlogPage() {
  const featured = getFeaturedPost();
  const rest = postsByDate.filter((post) => post.slug !== featured.slug);

  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "CollectionPage",
            name: "Blog",
            description,
            path: "/blog",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Writing"
        title="Arguments, not"
        accent="announcements."
        standfirst="Positions that cost something to hold — including the ones that argue against our own upsell. If a post could have been published by any firm in this category, it does not go up."
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
      />

      <Section size="sm">
        <Container>
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block border-t border-line pt-12 lg:pt-16"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                <span className="eyebrow text-pink-ink">{featured.tag}</span>
                <span aria-hidden>·</span>
                <time dateTime={featured.date}>
                  {formatPostDate(featured.date)}
                </time>
                <span aria-hidden>·</span>
                <span>{featured.readingTime} min read</span>
              </div>

              <h2 className="display-lg mt-8 max-w-[18ch] transition-colors group-hover:text-pink-ink">
                {featured.title}
              </h2>

              <p className="measure-wide mt-8 text-xl leading-[1.5] text-ink-soft">
                {featured.standfirst}
              </p>

              <p className="mt-8 flex items-center gap-2 text-pink-ink">
                Read the post
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </p>
            </Link>
          </Reveal>

          <div className="mt-20 lg:mt-28">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <article className="border-t border-line last:border-b">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-5 py-10 lg:grid-cols-[14rem_1fr] lg:gap-16 lg:py-14"
                  >
                    <div className="text-sm text-muted">
                      <p className="eyebrow text-pink-ink">{post.tag}</p>
                      <p className="mt-3">
                        <time dateTime={post.date}>
                          {formatPostDate(post.date)}
                        </time>
                        {" · "}
                        {post.readingTime} min
                      </p>
                    </div>
                    <div>
                      <h2 className="display-md transition-colors group-hover:text-pink-ink">
                        {post.title}
                      </h2>
                      <p className="measure-wide mt-4 text-lg text-ink-soft">
                        {post.standfirst}
                      </p>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Cta
        eyebrow="Or skip the reading"
        title="Get your own number instead."
        body="Fifteen minutes on how your operation runs, and a straight answer on whether there is a case worth measuring."
      />
    </>
  );
}
