import { ImageCompressor } from "@/components/ImageCompressor";
import { ToolPageShell } from "@/components/ToolPageShell";
import { jpgFaqs } from "@/data/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Compress JPG Images Online",
  description:
    "Compress JPG images online for free. Reduce JPEG file size in your browser with adjustable quality presets.",
  path: "/compress-jpg",
  keywords: ["compress jpg", "jpeg compressor", "reduce jpg size"],
});

export default function CompressJpgPage() {
  return (
    <ToolPageShell
      title="Compress JPG Images Online"
      description="Reduce JPG file size while keeping photos looking sharp. Free, private and ready in your browser."
      path="/compress-jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compress JPG" },
      ]}
      faqs={jpgFaqs}
      relatedLinks={[
        { href: "/compress-png", label: "Compress PNG" },
        { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
        { href: "/image-converter", label: "Convert JPG to WebP" },
      ]}
      tool={
        <ImageCompressor
          toolId="compress-jpg"
          forcedOutputFormat="image/jpeg"
          acceptHint="JPG • Up to 20MB"
        />
      }
    >
      <section>
        <h2>Compress JPG Images Online</h2>
        <p>
          JPG (or JPEG) is the most common format for photos. Compression lowers
          the amount of data stored in the file, which usually makes the image
          much smaller. CompressKit lets you control that tradeoff with simple
          presets.
        </p>
      </section>
      <section>
        <h2>Why Compress JPG Images?</h2>
        <ul>
          <li>Faster websites and product pages</li>
          <li>Smaller uploads for job portals and forms</li>
          <li>Easier sharing on messaging apps</li>
          <li>Lower storage usage for photo libraries</li>
        </ul>
      </section>
      <section>
        <h2>How to Compress a JPG</h2>
        <ol>
          <li>Upload your JPG.</li>
          <li>Select a compression level or target size.</li>
          <li>Compress and compare the preview.</li>
          <li>Download the optimized JPG.</li>
        </ol>
      </section>
    </ToolPageShell>
  );
}
