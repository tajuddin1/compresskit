import Link from "next/link";
import {
  Gauge,
  Lock,
  Sparkles,
  Upload,
  Download,
  WandSparkles,
  ImageIcon,
  FileImage,
} from "lucide-react";
import { ImageCompressor } from "@/components/ImageCompressor";
import { FAQ } from "@/components/FAQ";
import { ToolCard } from "@/components/ToolCard";
import { AdBanner } from "@/components/ads/AdComponents";
import { JsonLd } from "@/components/JsonLd";
import { homepageFaqs } from "@/data/faq";
import { tools } from "@/data/tools";
import { createPageMetadata, faqJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: `${SITE_NAME} — Free Online Image Compressor`,
  description:
    "Compress JPG, PNG and WebP images in your browser. Fast, private and free — no signup required.",
  path: "/",
});

const popularTools = tools.filter((tool) =>
  [
    "jpg-compressor",
    "png-compressor",
    "compress-100kb",
    "image-resizer",
    "image-converter",
  ].includes(tool.id),
);

const features = [
  {
    icon: Gauge,
    title: "Fast",
    description: "Compress images in seconds without waiting on uploads.",
  },
  {
    icon: Lock,
    title: "Private",
    description: "Images are processed in your browser and stay on your device.",
  },
  {
    icon: Sparkles,
    title: "Free",
    description: "No signup required. Use the tools whenever you need them.",
  },
  {
    icon: WandSparkles,
    title: "Easy",
    description: "A simple interface for students, creators and website owners.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Drop one image or several files into the compressor.",
  },
  {
    icon: FileImage,
    title: "Compress",
    description: "Choose a quality preset or target size, then compress.",
  },
  {
    icon: Download,
    title: "Download",
    description: "Save the smaller file instantly, or download all as a ZIP.",
  },
];

export default function HomePage() {
  return (
    <div className="pb-20">
      <JsonLd data={faqJsonLd(homepageFaqs)} />

      <section className="hero-wash relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold tracking-wide text-primary shadow-sm">
              100% Free • No Signup Required
            </span>
            <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Compress Images Without Losing Quality
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Reduce JPG, PNG and WebP file sizes in seconds. Fast, private and
              completely free.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#compressor"
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover sm:w-auto"
              >
                Compress an Image
              </a>
              <Link
                href="/tools"
                className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-primary/30 sm:w-auto"
              >
                Explore All Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <AdBanner />
      </div>

      <section id="compressor" className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
        <ImageCompressor />
      </section>

      <div className="mt-12">
        <AdBanner />
      </div>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Why CompressKit?
          </h2>
          <p className="mt-3 text-muted">
            Simple image compression, right in your browser. Built for everyday
            people who just need smaller files quickly.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Supported Formats
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          CompressKit works with the formats people use most for websites,
          social posts, resumes and online forms.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {["JPG", "PNG", "WebP"].map((format) => (
            <div
              key={format}
              className="flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 shadow-soft"
            >
              <ImageIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold">{format}</p>
                <p className="text-sm text-muted">Fully supported</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          AVIF support depends on the browser. We keep the MVP focused on
          reliable JPG, PNG and WebP processing.
        </p>
      </section>

      <section id="how-it-works" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          How It Works
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-white p-6 shadow-soft"
            >
              <div className="mb-4 flex items-center justify-between">
                <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-400">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Popular Tools
            </h2>
            <p className="mt-3 text-muted">
              Start with the most useful image utilities.
            </p>
          </div>
          <Link href="/tools" className="hidden text-sm font-semibold text-primary sm:inline">
            View all tools
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <div className="mt-16">
        <AdBanner />
      </div>

      <section className="mx-auto mt-16 max-w-3xl px-4 sm:px-6">
        <FAQ items={homepageFaqs} />
      </section>
    </div>
  );
}
