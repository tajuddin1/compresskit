export interface FaqItem {
  question: string;
  answer: string;
}

export const homepageFaqs: FaqItem[] = [
  {
    question: "Is CompressKit free to use?",
    answer:
      "Yes. CompressKit is free to use with no account, no email signup and no upload limits beyond the per-file size limit.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. Image compression, resizing and conversion run directly in your browser. Your files stay on your device.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "CompressKit currently supports JPG, PNG and WebP. Additional formats may be added later based on browser support.",
  },
  {
    question: "Will compressing an image reduce quality?",
    answer:
      "Compression can reduce quality depending on the settings you choose. Balanced and High Quality presets keep most images looking sharp while still reducing file size.",
  },
  {
    question: "Can I compress multiple images at once?",
    answer:
      "Yes. Upload several images, compress them together and download them individually or as a ZIP file.",
  },
  {
    question: "Can I compress an image to 100KB or 200KB?",
    answer:
      "Yes. Use the target size tools or presets. Exact sizes are not always possible because results depend on the image content, but CompressKit aims to get close.",
  },
  {
    question: "Do I need to install software?",
    answer:
      "No. CompressKit runs in your browser on desktop and mobile. There is nothing to install.",
  },
  {
    question: "Does CompressKit work on phones?",
    answer:
      "Yes. The tools are designed to work well on iPhone, Android, tablets and desktop browsers.",
  },
  {
    question: "What is the maximum file size?",
    answer:
      "Each image can be up to 20MB. This keeps processing responsive in the browser while covering most everyday photos and graphics.",
  },
  {
    question: "How do I add more tools later?",
    answer:
      "CompressKit is built as a modular tools platform. New utilities can be added as separate pages while reusing the same layout, SEO and upload components.",
  },
];

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

export const siteFaqs: FaqItem[] = homepageFaqs;
