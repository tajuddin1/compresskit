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

      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
        <p className="text-sm text-muted">
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

      <div className="prose-blog mx-auto mt-10 max-w-3xl px-4 sm:px-6">
        <MDXRemote source={post.content} />
      </div>

      <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
        <Link href="/compress-image" className="font-semibold text-primary">
          Try the image compressor →
        </Link>
      </div>
    </article>
  );
}
