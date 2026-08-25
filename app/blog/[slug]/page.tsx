import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { Cta } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { PostBody } from "@/components/blog/post-body";
import {
  formatPostDate,
  getPost,
  posts,
  postsByDate,
} from "@/content/blog";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.standfirst,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

/** Rough, but honest enough for the wordCount field in the markup. */
function wordCount(post: NonNullable<ReturnType<typeof getPost>>) {
  return post.body.reduce((sum, block) => {
    const text =
      "text" in block ? block.text : "items" in block ? block.items.join(" ") : "";
    return sum + text.split(/\s+/).filter(Boolean).length;
  }, 0);
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = postsByDate.findIndex((p) => p.slug === post.slug);
  const next = postsByDate[index + 1] ?? postsByDate[0];

  return (
    <>
      <JsonLd
        schema={[
          blogPostingSchema({
            headline: post.title,
            description: post.standfirst,
            path: `/blog/${post.slug}`,
            datePublished: post.date,
            author: post.author,
            authorRole: post.authorRole,
            wordCount: wordCount(post),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="pt-36 pb-14 sm:pt-44 lg:pt-52">
          <Container>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
              />
              All writing
            </Link>

            <p className="eyebrow mt-12 text-pink-ink">{post.tag}</p>

            <h1 className="display-lg mt-6 max-w-[20ch]">{post.title}</h1>

            <p className="measure-wide mt-10 text-xl leading-[1.5] text-ink-soft sm:text-2xl">
              {post.standfirst}
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-8 text-sm">
              <span className="font-display text-base text-ink">
                {post.author}
              </span>
              <span className="text-muted">{post.authorRole}</span>
              <span aria-hidden className="text-line-strong">
                ·
              </span>
              <time dateTime={post.date} className="text-muted">
                {formatPostDate(post.date)}
              </time>
              <span aria-hidden className="text-line-strong">
                ·
              </span>
              <span className="text-muted">{post.readingTime} min read</span>
            </div>
          </Container>
        </header>

        <Section size="sm" className="pt-0">
          <Container>
            <PostBody body={post.body} />
          </Container>
        </Section>
      </article>

      <Section size="sm">
        <Container>
          <Link
            href={`/blog/${next.slug}`}
            className="group block border-t border-line pt-12"
          >
            <p className="eyebrow text-muted">Read next</p>
            <h2 className="display-md mt-6 max-w-[20ch] transition-colors group-hover:text-pink-ink">
              {next.title}
            </h2>
            <p className="mt-6 inline-flex items-center gap-2 text-pink-ink">
              {next.tag}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </p>
          </Link>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
