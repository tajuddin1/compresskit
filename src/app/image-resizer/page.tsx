import { ImageResizerTool } from "@/components/ImageResizer";
import { ToolPageShell } from "@/components/ToolPageShell";
import { resizerFaqs } from "@/data/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Image Resizer Online",
  description:
    "Resize images by width, height, percentage or social media presets. Free browser-based image resizer.",
  path: "/image-resizer",
  keywords: [
    "image resizer",
    "resize image online",
    "instagram image size",
    "youtube thumbnail size",
  ],
});

export default function ImageResizerPage() {
  return (
    <ToolPageShell
      title="Image Resizer"
      description="Resize images by pixels, percentage or social presets like Instagram, YouTube and LinkedIn."
      path="/image-resizer"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Image Resizer" },
      ]}
      faqs={resizerFaqs}
      relatedLinks={[
        { href: "/compress-image", label: "Image Compressor" },
        { href: "/image-converter", label: "Image Converter" },
        { href: "/tools", label: "All Tools" },
      ]}
      tool={<ImageResizerTool />}
    >
      <section>
        <h2>Resize Images Online</h2>
        <p>
          Whether you need a profile photo, a YouTube thumbnail or a product
          image for your store, CompressKit helps you resize quickly without
          uploading files to a remote server.
        </p>
      </section>
      <section>
        <h2>Social Media Presets</h2>
        <p>
          Built-in presets cover common Instagram, Facebook, YouTube, LinkedIn,
          Twitter/X and TikTok dimensions so you spend less time looking up size
          charts.
        </p>
      </section>
    </ToolPageShell>
  );
}
