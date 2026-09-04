import { ImageConverterTool } from "@/components/ImageConverter";
import { ToolPageShell } from "@/components/ToolPageShell";
import { converterFaqs } from "@/data/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Image Converter Online",
  description:
    "Convert images between JPG, PNG and WebP online. Free multi-file image converter that works in your browser.",
  path: "/image-converter",
  keywords: [
    "image converter",
    "jpg to png",
    "png to jpg",
    "jpg to webp",
    "webp to jpg",
  ],
});

export default function ImageConverterPage() {
  return (
    <ToolPageShell
      title="Image Converter"
      description="Convert between JPG, PNG and WebP. Upload multiple files and download the results instantly."
      path="/image-converter"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Image Converter" },
      ]}
      faqs={converterFaqs}
      relatedLinks={[
        { href: "/compress-image", label: "Image Compressor" },
        { href: "/image-resizer", label: "Image Resizer" },
        { href: "/compress-webp", label: "Compress WebP" },
      ]}
      tool={<ImageConverterTool />}
    >
      <section>
        <h2>Convert Images Online</h2>
        <p>
          Different platforms prefer different formats. Use CompressKit to move
          between JPG, PNG and WebP without installing converters or sending
          files to a third-party upload service.
        </p>
      </section>
      <section>
        <h2>Supported Conversions</h2>
        <ul>
          <li>JPG → PNG</li>
          <li>PNG → JPG</li>
          <li>JPG → WebP</li>
          <li>PNG → WebP</li>
          <li>WebP → JPG</li>
          <li>WebP → PNG</li>
        </ul>
      </section>
    </ToolPageShell>
  );
}
