import { ImageCompressor } from "@/components/ImageCompressor";
import { ToolPageShell } from "@/components/ToolPageShell";
import { target100Faqs } from "@/data/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Compress Image to 100KB",
  description:
    "Compress an image to approximately 100KB online. Ideal for forms, portals and upload limits.",
  path: "/compress-image-to-100kb",
  keywords: ["compress image to 100kb", "image to 100kb", "reduce image to 100kb"],
});

export default function CompressTo100KbPage() {
  return (
    <ToolPageShell
      title="Compress Image to 100KB"
      description="Aim for about 100KB with an iterative compression strategy. Exact sizes depend on image content."
      path="/compress-image-to-100kb"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compress to 100KB" },
      ]}
      faqs={target100Faqs}
      relatedLinks={[
        { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
        { href: "/compress-jpg", label: "Compress JPG" },
        { href: "/compress-image", label: "Image Compressor" },
      ]}
      tool={
        <ImageCompressor
          toolId="compress-100kb"
          defaultTargetBytes={100 * 1024}
          defaultQuality={0.7}
        />
      }
    >
      <section>
        <h2>Compress an Image to Around 100KB</h2>
        <p>
          Many forms and portals ask for profile photos or documents under
          100KB. CompressKit adjusts quality and, when needed, dimensions to get
          close to that limit while keeping the image usable.
        </p>
      </section>
      <section>
        <h2>What to Expect</h2>
        <p>
          You will see both the target and the actual result. If an image cannot
          reach exactly 100KB without becoming too soft, CompressKit shows the
          best practical outcome.
        </p>
      </section>
    </ToolPageShell>
  );
}
