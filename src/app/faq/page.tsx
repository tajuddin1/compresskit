import { FAQ } from "@/components/FAQ";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { siteFaqs } from "@/data/faq";
import { createPageMetadata, faqJsonLd } from "@/lib/seo";
import { Upload, Sparkles, Download } from "lucide-react";

export const metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Answers about CompressKit privacy, compression quality, supported formats and how the tools work.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="pb-20">
      <JsonLd data={faqJsonLd(siteFaqs)} />
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-muted">
          Everything you need to know about using CompressKit.
        </p>

        <section id="how-it-works" className="mt-12 space-y-6">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            How It Works
          </h2>
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

        <div className="mt-14">
          <FAQ items={siteFaqs} title="Common questions" />
        </div>
      </div>
    </div>
  );
}
