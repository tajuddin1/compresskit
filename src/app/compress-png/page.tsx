import { ImageCompressor } from "@/components/ImageCompressor";
import { ToolPageShell } from "@/components/ToolPageShell";
import { pngFaqs } from "@/data/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Compress PNG Images Online",
  description:
    "Compress PNG images online for free. Shrink PNG files in your browser while preserving transparency when possible.",
  path: "/compress-png",
  keywords: ["compress png", "png compressor", "reduce png size"],
});

export default function CompressPngPage() {
  return (
    <ToolPageShell
      title="Compress PNG Images Online"
      description="Shrink PNG files for websites, UI graphics and uploads. Processing stays private in your browser."
      path="/compress-png"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compress PNG" },
      ]}
      faqs={pngFaqs}
      relatedLinks={[
        { href: "/compress-jpg", label: "Compress JPG" },
        { href: "/image-converter", label: "Convert PNG to JPG" },
        { href: "/image-converter", label: "Convert PNG to WebP" },
      ]}
      tool={
        <ImageCompressor
          toolId="compress-png"
          forcedOutputFormat="image/png"
          acceptHint="PNG • Up to 20MB"
        />
      }
    >
      <section>
        <h2>Compress PNG Images Online</h2>
        <p>
          PNG is excellent for graphics with sharp edges or transparency. The
          tradeoff is file size—PNG files can be large. CompressKit helps you
          reduce that size for faster uploads and cleaner project folders.
        </p>
      </section>
      <section>
        <h2>Why Compress PNG Images?</h2>
        <ul>
          <li>Faster landing pages and documentation sites</li>
          <li>Smaller design exports for handoff</li>
          <li>Easier attachment limits on email and tickets</li>
          <li>Better performance on mobile connections</li>
        </ul>
      </section>
      <section>
        <h2>How to Compress a PNG</h2>
        <ol>
          <li>Upload your PNG file.</li>
          <li>Choose compression settings.</li>
          <li>Compress and review the result.</li>
          <li>Download the smaller PNG, or convert to WebP/JPG if needed.</li>
        </ol>
      </section>
    </ToolPageShell>
  );
}
