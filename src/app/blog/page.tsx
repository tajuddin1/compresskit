import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdBanner } from "@/components/ads/AdComponents";
import { getAllPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Guides on image compression, JPG optimization and choosing between JPG, PNG and WebP.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="pb-20">
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-muted">
          Practical guides for compressing and choosing image formats.
        </p>
      </div>

      <div className="mt-8">
        <AdBanner />
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-4 px-4 sm:px-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-border bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {post.date} · {post.readingTime}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {post.description}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-flex text-sm font-semibold text-primary"
            >
              Read article
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
