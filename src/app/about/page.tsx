import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About CompressKit",
  description:
    "Learn about CompressKit — a free, private, browser-based image compression and utility platform.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-20 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        About CompressKit
      </h1>
      <div className="prose-blog mt-8 space-y-5">
        <p>
          CompressKit is a free online toolkit for compressing, resizing and
          converting images. The goal is simple: help people reduce file sizes
          quickly without creating accounts or uploading private files to a
          server.
        </p>
        <p>
          The first version focuses on image utilities. The architecture is ready
          for PDF tools, converters and developer utilities later—without turning
          the product into a cluttered dashboard.
        </p>
        <h2>What we care about</h2>
        <ul>
          <li>Privacy-first, browser-side processing</li>
          <li>Clear, calm interfaces for everyday users</li>
          <li>Useful SEO content instead of keyword stuffing</li>
          <li>A modular foundation for future tools</li>
        </ul>
        <p>
          CompressKit is built for students, bloggers, developers, designers,
          freelancers, ecommerce sellers and anyone who just needs a smaller
          image right now.
        </p>
      </div>
    </div>
  );
}
