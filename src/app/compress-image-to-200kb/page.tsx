import { ImageCompressor } from "@/components/ImageCompressor";
import { ToolPageShell } from "@/components/ToolPageShell";
import { target200Faqs } from "@/data/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Compress Image to 200KB",
  description:
    "Compress an image to approximately 200KB online. Free browser-based target size compression.",
  path: "/compress-image-to-200kb",
  keywords: ["compress image to 200kb", "image to 200kb", "reduce image to 200kb"],
});

export default function CompressTo200KbPage() {
  return (
    <ToolPageShell
      title="Compress Image to 200KB"
      description="Target roughly 200KB for uploads, portfolios and web assets. Private browser-side processing."
      path="/compress-image-to-200kb"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compress to 200KB" },
      ]}
      faqs={target200Faqs}
      relatedLinks={[
        { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
        { href: "/compress-image", label: "Image Compressor" },
        { href: "/image-resizer", label: "Image Resizer" },
      ]}
      tool={
        <ImageCompressor
          toolId="compress-200kb"
          defaultTargetBytes={200 * 1024}
          defaultQuality={0.75}
        />
      }
    >
      <section>
        <h2>Compress an Image to Around 200KB</h2>
        <p>
          A 200KB target is a practical middle ground for many website images,
          application uploads and social assets. CompressKit iterates toward that
          size and reports the final result clearly.
        </p>
      </section>
      <section>
        <h2>Tips for Better Results</h2>
        <ul>
          <li>Start with a reasonably sized original photo</li>
          <li>Use JPG or WebP for photographic content</li>
          <li>Keep PNG when you need transparency</li>
        </ul>
      </section>
    </ToolPageShell>
  );
}
