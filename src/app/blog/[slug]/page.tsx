import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdBanner } from "@/components/ads/AdComponents";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { articleJsonLd, createPageMetadata } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="pb-20">
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          datePublished: post.date,
          dateModified: post.updated,
        })}
      />

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-zinc-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          {post.date} · {post.readingTime}
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{post.description}</p>
      </div>

      <div className="mt-8">
        <AdBanner />
      </div>

      <div className="prose-blog mx-auto mt-10 max-w-7xl px-4 sm:px-6">
        <MDXRemote source={post.content} />
      </div>

      <div className="mx-auto mt-12 max-w-7xl space-y-8 px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface px-5 py-6">
          <p className="font-semibold text-foreground">Try it in your browser</p>
          <p className="mt-1 text-sm text-muted">
            Compress images privately — no signup required.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/compress-image"
              className="inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              Open Image Compressor
            </Link>
            <Link
              href="/faq"
              className="inline-flex rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold"
            >
              Read FAQ
            </Link>
          </div>
        </div>

        {related.length > 0 ? (
          <section>
            <h2 className="text-lg font-semibold">More guides</h2>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
