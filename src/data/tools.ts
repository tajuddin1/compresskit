export type ToolStatus = "available" | "coming-soon";

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  href: string;
  category: "image" | "pdf" | "developer" | "social";
  status: ToolStatus;
  keywords?: string[];
}

export const tools: ToolItem[] = [
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Reduce JPG, PNG and WebP file sizes in your browser.",
    href: "/compress-image",
    category: "image",
    status: "available",
  },
  {
    id: "jpg-compressor",
    name: "JPG Compressor",
    description: "Compress JPG images while keeping them looking sharp.",
    href: "/compress-jpg",
    category: "image",
    status: "available",
  },
  {
    id: "png-compressor",
    name: "PNG Compressor",
    description: "Shrink PNG files for faster uploads and websites.",
    href: "/compress-png",
    category: "image",
    status: "available",
  },
  {
    id: "webp-compressor",
    name: "WebP Compressor",
    description: "Optimize WebP images with adjustable quality settings.",
    href: "/compress-webp",
    category: "image",
    status: "available",
  },
  {
    id: "compress-100kb",
    name: "Compress to 100KB",
    description: "Target approximately 100KB for forms and uploads.",
    href: "/compress-image-to-100kb",
    category: "image",
    status: "available",
  },
  {
    id: "compress-200kb",
    name: "Compress to 200KB",
    description: "Target approximately 200KB without a complicated setup.",
    href: "/compress-image-to-200kb",
    category: "image",
    status: "available",
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images by pixels, percentage, or social presets.",
    href: "/image-resizer",
    category: "image",
    status: "available",
  },
  {
    id: "image-converter",
    name: "Image Converter",
    description: "Convert between JPG, PNG and WebP in a few clicks.",
    href: "/image-converter",
    category: "image",
    status: "available",
  },
  {
    id: "image-cropper",
    name: "Image Cropper",
    description: "Crop images to exact dimensions for any use case.",
    href: "/tools",
    category: "image",
    status: "coming-soon",
  },
  {
    id: "pdf-compressor",
    name: "PDF Compressor",
    description: "Reduce PDF file size while keeping documents readable.",
    href: "/tools",
    category: "pdf",
    status: "coming-soon",
  },
  {
    id: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF files into one document.",
    href: "/tools",
    category: "pdf",
    status: "coming-soon",
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    description: "Extract pages or split a PDF into smaller files.",
    href: "/tools",
    category: "pdf",
    status: "coming-soon",
  },
  {
    id: "jpg-to-pdf",
    name: "JPG to PDF",
    description: "Turn JPG images into a single PDF document.",
    href: "/tools",
    category: "pdf",
    status: "coming-soon",
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Convert PDF pages into JPG images.",
    href: "/tools",
    category: "pdf",
    status: "coming-soon",
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Pretty-print and format JSON for easier reading.",
    href: "/tools",
    category: "developer",
    status: "coming-soon",
  },
  {
    id: "json-validator",
    name: "JSON Validator",
    description: "Validate JSON and catch syntax errors quickly.",
    href: "/tools",
    category: "developer",
    status: "coming-soon",
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate UUIDs for apps, tests and databases.",
    href: "/tools",
    category: "developer",
    status: "coming-soon",
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings in your browser.",
    href: "/tools",
    category: "developer",
    status: "coming-soon",
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "Inspect JWT headers and payloads safely.",
    href: "/tools",
    category: "developer",
    status: "coming-soon",
  },
  {
    id: "instagram-resizer",
    name: "Instagram Image Resizer",
    description: "Resize images for Instagram posts, stories and reels.",
    href: "/image-resizer",
    category: "social",
    status: "available",
  },
  {
    id: "youtube-thumbnail",
    name: "YouTube Thumbnail Maker",
    description: "Create 1280×720 thumbnails ready for YouTube.",
    href: "/image-resizer",
    category: "social",
    status: "available",
  },
  {
    id: "facebook-resizer",
    name: "Facebook Image Resizer",
    description: "Prepare images for Facebook posts and covers.",
    href: "/image-resizer",
    category: "social",
    status: "available",
  },
  {
    id: "linkedin-resizer",
    name: "LinkedIn Image Resizer",
    description: "Resize images for LinkedIn posts and profiles.",
    href: "/image-resizer",
    category: "social",
    status: "available",
  },
];

export const categoryLabels: Record<ToolItem["category"], string> = {
  image: "Image Tools",
  pdf: "PDF Tools",
  developer: "Developer Tools",
  social: "Social Media Tools",
};

export function getAvailableTools(): ToolItem[] {
  return tools.filter((tool) => tool.status === "available");
}

export function getToolsByCategory(category: ToolItem["category"]): ToolItem[] {
  return tools.filter((tool) => tool.category === category);
}
