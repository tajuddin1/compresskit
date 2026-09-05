import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Terms of service for using CompressKit online tools.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Terms of Service
      </h1>
      <div className="prose-blog mt-8 space-y-5">
        <p>Last updated: September 5, 2026</p>
        <h2>Acceptance</h2>
        <p>
          By using CompressKit, you agree to these terms. If you do not agree,
          please do not use the site.
        </p>
        <h2>Service description</h2>
        <p>
          CompressKit provides free browser-based utilities for image
          compression, resizing and conversion. Features may change over time.
        </p>
        <h2>Your responsibilities</h2>
        <ul>
          <li>Only process files you have the right to use</li>
          <li>Do not attempt to disrupt the service</li>
          <li>Do not misuse the tools for unlawful content</li>
        </ul>
        <h2>Disclaimer</h2>
        <p>
          The tools are provided as-is. Compression results vary by image content
          and browser capabilities. We do not guarantee exact target file sizes
          or uninterrupted availability.
        </p>
        <h2>Contact</h2>
        <p>
          For questions about these terms, email{" "}
          <a href="mailto:hello@getcompresskit.com">hello@getcompresskit.com</a>.
        </p>
      </div>
    </div>
  );
}
