export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  description: string;
  items: FaqItem[];
}

export const homepageFaqs: FaqItem[] = [
  {
    question: "Is CompressKit free to use?",
    answer:
      "Yes. CompressKit is completely free. There is no account, no email signup and no paid plan required to compress, resize or convert images.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. Compression, resizing and conversion run directly in your browser. Your files stay on your device and are not uploaded to CompressKit servers.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "JPG, PNG and WebP are fully supported. You can compress, resize and convert between these formats in the current version.",
  },
  {
    question: "Will compressing an image reduce quality?",
    answer:
      "It can, depending on your settings. High Quality and Balanced presets keep most images looking sharp while still reducing file size. Always preview before downloading.",
  },
  {
    question: "Can I compress multiple images at once?",
    answer:
      "Yes. Upload several images, compress them together, then download files one by one or as a ZIP.",
  },
  {
    question: "Can I compress an image to 100KB or 200KB?",
    answer:
      "Yes. Use the target-size tools or presets. Exact sizes are not always possible because results depend on image content, but CompressKit aims to get close and shows the real result.",
  },
  {
    question: "Do I need to install software?",
    answer:
      "No. Everything runs in your browser on desktop and mobile. There is nothing to install.",
  },
  {
    question: "Does CompressKit work on phones?",
    answer:
      "Yes. The tools work on iPhone, Android, tablets and desktop browsers with a mobile-friendly interface.",
  },
  {
    question: "What is the maximum file size?",
    answer:
      "Each image can be up to 20MB. That covers most everyday photos while keeping browser processing responsive.",
  },
  {
    question: "Is CompressKit safe for private photos?",
    answer:
      "Because processing happens on your device, private photos such as resumes, IDs or unpublished product shots never need to leave your browser for compression.",
  },
];

export const faqCategories: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting started",
    description: "How CompressKit works and what you need to begin.",
    items: [
      {
        question: "How do I compress an image online?",
        answer:
          "Open the Image Compressor, drop or select your file, choose a quality preset or target size, click Compress, then download the result.",
      },
      {
        question: "Do I need an account?",
        answer:
          "No. CompressKit does not require signup, login or email verification.",
      },
      {
        question: "Does CompressKit work offline after the page loads?",
        answer:
          "Once the page is loaded, image processing happens locally in your browser. An internet connection is only needed to open the website.",
      },
      {
        question: "Can I use CompressKit on mobile?",
        answer:
          "Yes. Upload from your phone gallery, compress, and download. The interface is optimized for touch screens.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & security",
    description: "Where your files go and how processing works.",
    items: [
      {
        question: "Are my images uploaded to a server?",
        answer:
          "No. Files are processed in your browser with the Canvas API. CompressKit does not upload your images for compression.",
      },
      {
        question: "Do you store my images?",
        answer:
          "No. There is no image database in the MVP. Previews use temporary browser object URLs that are cleaned up when you reset or leave the tool.",
      },
      {
        question: "Is it safe for documents and resume photos?",
        answer:
          "Yes for local processing. Since files stay on your device during compression, it is a practical option for sensitive everyday images.",
      },
    ],
  },
  {
    id: "quality",
    title: "Quality & file size",
    description: "Presets, target sizes and what to expect.",
    items: [
      {
        question: "Which compression preset should I use?",
        answer:
          "Start with Balanced for most photos. Use High Quality for portfolios and product shots. Use Maximum Compression when a form needs a very small file.",
      },
      {
        question: "Why isn’t my file exactly 100KB?",
        answer:
          "Image content decides how small a file can get. Detailed photos often need more data. CompressKit shows both the target and the actual result.",
      },
      {
        question: "Should I resize before compressing?",
        answer:
          "Often yes. If an image will display at 1200px wide, exporting at 4000px only increases size. Resize first, then compress for better results.",
      },
      {
        question: "Does PNG compression keep transparency?",
        answer:
          "Yes when you keep PNG as the output format. Converting PNG to JPG removes transparency and fills it with white.",
      },
    ],
  },
  {
    id: "formats",
    title: "Formats & limits",
    description: "Supported types and upload limits.",
    items: [
      {
        question: "Which formats can I compress?",
        answer: "JPG, PNG and WebP are supported for compression, resizing and conversion.",
      },
      {
        question: "What is the maximum upload size?",
        answer:
          "Up to 20MB per image. This keeps processing smooth in the browser for typical photos and graphics.",
      },
      {
        question: "Can I convert JPG to WebP or PNG to JPG?",
        answer:
          "Yes. The Image Converter supports JPG ↔ PNG ↔ WebP in both directions, including multiple files.",
      },
      {
        question: "Is AVIF supported?",
        answer:
          "Not in the current MVP. We focused on reliable JPG, PNG and WebP support across modern browsers first.",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools & downloads",
    description: "Batch processing, ZIP downloads and related utilities.",
    items: [
      {
        question: "Can I download all compressed images as a ZIP?",
        answer:
          "Yes. After batch compression, use Download All as ZIP to save everything at once.",
      },
      {
        question: "What other tools are available?",
        answer:
          "Besides compression, CompressKit includes Image Resizer, Image Converter and target-size tools for 100KB and 200KB.",
      },
      {
        question: "Will PDF tools be added?",
        answer:
          "PDF tools are planned and listed as Coming Soon on the Tools page. Image tools are the focus of the first version.",
      },
    ],
  },
];

export const siteFaqs: FaqItem[] = faqCategories.flatMap(
  (category) => category.items,
);

export const jpgFaqs: FaqItem[] = [
  {
    question: "How do I compress a JPG?",
    answer:
      "Upload your JPG, choose a quality preset or custom slider value, click Compress, then download the smaller file.",
  },
  {
    question: "Does compressing a JPG reduce quality?",
    answer:
      "JPG compression is lossy, so higher compression can soften details. Start with Balanced or High Quality and only lower quality if you need a smaller file.",
  },
  {
    question: "Is this JPG compressor free?",
    answer: "Yes. You can compress JPG images online for free without creating an account.",
  },
  {
    question: "Are my images uploaded?",
    answer:
      "No. Processing happens in your browser, so your JPG files are not uploaded to CompressKit servers.",
  },
];

export const pngFaqs: FaqItem[] = [
  {
    question: "How do I compress a PNG?",
    answer:
      "Upload your PNG, choose your preferred settings and compress. For the smallest files, converting to WebP or JPG may help when transparency is not required.",
  },
  {
    question: "Does PNG compression keep transparency?",
    answer:
      "Yes. When you keep PNG as the output format, CompressKit preserves transparency whenever the browser encoding supports it.",
  },
  {
    question: "Is PNG compression free?",
    answer: "Yes. Compress PNG images online at no cost and without signup.",
  },
  {
    question: "Why is my PNG still large?",
    answer:
      "PNG is often larger than JPG for photos. For photographic images, JPG or WebP usually produce smaller files.",
  },
];

export const webpFaqs: FaqItem[] = [
  {
    question: "How do I compress a WebP image?",
    answer:
      "Upload your WebP file, adjust quality, compress and download the optimized result.",
  },
  {
    question: "Is WebP better than JPG?",
    answer:
      "WebP often achieves smaller file sizes than JPG at similar visual quality, especially for web use. Compatibility is excellent in modern browsers.",
  },
  {
    question: "Is this WebP compressor free?",
    answer: "Yes. Compress WebP images free in your browser.",
  },
  {
    question: "Are WebP files uploaded to a server?",
    answer: "No. Compression is performed locally in your browser.",
  },
];

export const generalCompressFaqs: FaqItem[] = [
  {
    question: "How do I compress an image online?",
    answer:
      "Drop your image into CompressKit, choose a quality preset or target size, press Compress and download the result.",
  },
  {
    question: "Is online image compression safe?",
    answer:
      "With CompressKit, yes—files are processed on your device and are not uploaded to our servers.",
  },
  {
    question: "Can I compress images without losing quality?",
    answer:
      "You can often reduce size with little visible change by using High Quality or Balanced settings. Completely lossless size reduction depends on the format and image.",
  },
  {
    question: "What formats can I compress?",
    answer: "JPG, PNG and WebP are supported in the current version.",
  },
];

export const target100Faqs: FaqItem[] = [
  {
    question: "Can I compress an image to exactly 100KB?",
    answer:
      "CompressKit aims for approximately 100KB. Exact sizes are not always possible because compression depends on image detail and format.",
  },
  {
    question: "Why is my result a little over 100KB?",
    answer:
      "Some images cannot shrink further without becoming unusable. CompressKit shows both the target and the actual result so you know what you got.",
  },
  {
    question: "Is the 100KB tool free?",
    answer: "Yes. No signup is required.",
  },
];

export const target200Faqs: FaqItem[] = [
  {
    question: "Can I compress an image to 200KB?",
    answer:
      "Yes. The tool iteratively adjusts quality and, if needed, dimensions to approach 200KB.",
  },
  {
    question: "Will quality stay good at 200KB?",
    answer:
      "For many photos and graphics, 200KB is a practical size with acceptable quality. Results vary by image.",
  },
  {
    question: "Is this tool private?",
    answer: "Yes. Processing stays in your browser.",
  },
];

export const resizerFaqs: FaqItem[] = [
  {
    question: "How do I resize an image?",
    answer:
      "Upload an image, enter width and height or choose a preset, then download the resized file.",
  },
  {
    question: "Can I keep the aspect ratio?",
    answer:
      "Yes. Lock aspect ratio is enabled by default so your image does not stretch.",
  },
  {
    question: "Are social media presets included?",
    answer:
      "Yes. Presets include Instagram, Facebook, YouTube, LinkedIn, Twitter/X and TikTok sizes.",
  },
];

export const converterFaqs: FaqItem[] = [
  {
    question: "Which conversions are supported?",
    answer:
      "You can convert between JPG, PNG and WebP in either direction.",
  },
  {
    question: "Will converting PNG to JPG remove transparency?",
    answer:
      "Yes. JPG does not support transparency, so transparent areas are filled with white.",
  },
  {
    question: "Can I convert multiple images?",
    answer: "Yes. Upload several files and convert them in one session.",
  },
];
