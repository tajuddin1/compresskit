import Link from "next/link";
import { FAQ, FaqCta } from "@/components/FAQ";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { faqCategories, siteFaqs } from "@/data/faq";
import { createPageMetadata, faqJsonLd } from "@/lib/seo";
import { Upload, Sparkles, Download } from "lucide-react";

export const metadata = createPageMetadata({
  title: "FAQ — CompressKit Help & Answers",
  description:
    "Answers about CompressKit privacy, compression quality, supported formats, target sizes and how the free image tools work.",
  path: "/faq",
  keywords: [
    "image compressor faq",
    "compress image privacy",
    "compress image to 100kb",
    "browser image compression",
  ],
});

export default function FaqPage() {
  return (
    <div className="pb-20">
      <JsonLd data={faqJsonLd(siteFaqs)} />
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Clear answers about privacy, quality, formats and how CompressKit
          helps you shrink images in your browser.
        </p>

        <nav
          aria-label="FAQ sections"
          className="mt-8 flex flex-wrap gap-2"
        >
          {faqCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-primary/30 hover:text-primary"
            >
              {category.title}
            </a>
          ))}
        </nav>

        <section id="how-it-works" className="mt-12 space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              How It Works
            </h2>
            <p className="mt-2 text-muted">
              Three simple steps — no install, no account.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Upload,
                title: "1. Upload",
                text: "Choose images from your device. Nothing is sent to our servers.",
              },
              {
                icon: Sparkles,
                title: "2. Process",
                text: "Compress, resize or convert using your browser’s canvas engine.",
              },
              {
                icon: Download,
                title: "3. Download",
                text: "Save the result immediately, one file at a time or as a ZIP.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-border bg-white p-5 shadow-soft"
              >
                <step.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-14 space-y-12">
          {faqCategories.map((category) => (
            <FAQ
              key={category.id}
              id={category.id}
              title={category.title}
              description={category.description}
              items={category.items}
            />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold">Related tools</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              { href: "/compress-image", label: "Image Compressor" },
              { href: "/compress-jpg", label: "JPG Compressor" },
              { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
              { href: "/image-resizer", label: "Image Resizer" },
              { href: "/image-converter", label: "Image Converter" },
              { href: "/blog", label: "Compression guides" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <FaqCta />
        </div>
      </div>
    </div>
  );
}
