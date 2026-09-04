import { ImageCompressor } from "@/components/ImageCompressor";
import { ToolPageShell } from "@/components/ToolPageShell";
import { webpFaqs } from "@/data/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Compress WebP Images Online",
  description:
    "Compress WebP images online for free. Optimize WebP file size with browser-based quality controls.",
  path: "/compress-webp",
  keywords: ["compress webp", "webp compressor", "reduce webp size"],
});

export default function CompressWebpPage() {
  return (
    <ToolPageShell
      title="Compress WebP Images Online"
      description="Optimize WebP images with adjustable quality settings. Free, fast and private."
      path="/compress-webp"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compress WebP" },
      ]}
      faqs={webpFaqs}
      relatedLinks={[
        { href: "/compress-image", label: "Image Compressor" },
        { href: "/image-converter", label: "Convert WebP to JPG" },
        { href: "/image-resizer", label: "Image Resizer" },
      ]}
      tool={
        <ImageCompressor
          toolId="compress-webp"
          forcedOutputFormat="image/webp"
          acceptHint="WebP • Up to 20MB"
        />
      }
    >
      <section>
        <h2>Compress WebP Images Online</h2>
        <p>
          WebP is a modern format designed for the web. It often produces smaller
          files than JPG or PNG at similar visual quality. CompressKit makes it
          easy to tune WebP output without installing desktop software.
        </p>
      </section>
      <section>
        <h2>Why Compress WebP Images?</h2>
        <ul>
          <li>Leaner assets for modern websites</li>
          <li>Faster delivery on CDNs and static hosts</li>
          <li>Flexible quality controls for photos and graphics</li>
          <li>Convenient browser-based workflow</li>
        </ul>
      </section>
      <section>
        <h2>How to Compress a WebP File</h2>
        <ol>
          <li>Upload your WebP image.</li>
          <li>Pick a quality preset or target size.</li>
          <li>Compress and compare the preview.</li>
          <li>Download the optimized file.</li>
        </ol>
      </section>
    </ToolPageShell>
  );
}
