import { ImageCompressor } from "@/components/ImageCompressor";
import { ToolPageShell } from "@/components/ToolPageShell";
import { generalCompressFaqs } from "@/data/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Compress Image Online for Free",
  description:
    "Compress JPG, PNG and WebP images online without losing noticeable quality.",
  path: "/compress-image",
  keywords: ["compress image", "image compressor", "reduce image size"],
});

export default function CompressImagePage() {
  return (
    <ToolPageShell
      title="Compress Image Online for Free"
      description="Compress JPG, PNG and WebP images online without losing noticeable quality. Processing stays in your browser."
      path="/compress-image"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compress Image" },
      ]}
      faqs={generalCompressFaqs}
      relatedLinks={[
        { href: "/compress-jpg", label: "Compress JPG" },
        { href: "/compress-png", label: "Compress PNG" },
        { href: "/compress-webp", label: "Compress WebP" },
        { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
      ]}
      tool={<ImageCompressor toolId="compress-image" />}
    >
      <section>
        <h2>Compress Images Online</h2>
        <p>
          Large images slow down websites, fill up storage and make email
          attachments harder to send. CompressKit reduces file size directly in
          your browser so you can keep sharing and publishing without installing
          software.
        </p>
      </section>
      <section>
        <h2>Why Compress Images?</h2>
        <ul>
          <li>Faster page loads for blogs and stores</li>
          <li>Easier uploads to forms, portals and social apps</li>
          <li>Lower storage usage on phones and laptops</li>
          <li>Simpler sharing over email and messaging apps</li>
        </ul>
      </section>
      <section>
        <h2>How to Compress an Image</h2>
        <ol>
          <li>Upload one or more JPG, PNG or WebP files.</li>
          <li>Choose a preset, quality level or target size.</li>
          <li>Click Compress and review the before/after preview.</li>
          <li>Download the result or save everything as a ZIP.</li>
        </ol>
      </section>
    </ToolPageShell>
  );
}
