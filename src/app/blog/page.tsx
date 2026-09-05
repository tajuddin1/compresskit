import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdBanner } from "@/components/ads/AdComponents";
import { getAllPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blog — Image Compression Guides",
  description:
    "Practical guides on compressing images, choosing JPG PNG or WebP, website image sizes, email attachments and more.",
  path: "/blog",
  keywords: [
    "image compression guide",
    "compress jpg",
    "compress png",
    "website image size",
    "compress image for email",
  ],
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="pb-20">
      <div className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          />
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Blog
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Practical guides for compressing images, picking formats and keeping
            websites fast — without complicated software.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <AdBanner />
      </div>

      <div className="mx-auto mt-10 max-w-7xl space-y-8 px-4 sm:px-6">
        {featured ? (
          <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Featured guide
                </p>
                <h2 className="font-display mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="hover:text-primary"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {featured.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readingTime}</span>
                  {featured.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface px-2.5 py-1 font-medium text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="flex items-end bg-gradient-to-br from-primary-soft via-white to-surface p-6 sm:p-8">
                <div className="w-full rounded-xl border border-border bg-white/80 p-5 backdrop-blur">
                  <p className="text-sm font-semibold text-foreground">
                    Free tools to try next
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>
                      <Link href="/compress-image" className="text-primary hover:underline">
                        Image Compressor
                      </Link>
                    </li>
                    <li>
                      <Link href="/compress-jpg" className="text-primary hover:underline">
                        JPG Compressor
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/compress-image-to-100kb"
                        className="text-primary hover:underline"
                      >
                        Compress to 100KB
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(featured ? rest : posts).map((post) => (
            <article
              key={post.slug}
              className="flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
            >
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-zinc-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {post.description}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4 text-xs text-zinc-500">
                <span>
                  {post.date} · {post.readingTime}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold text-primary"
                >
                  Read
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
