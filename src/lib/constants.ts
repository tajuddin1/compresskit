export const SITE_NAME = "CompressKit";
export const SITE_TAGLINE =
  "Compress, resize and convert your images in seconds.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://getcompresskit.com";

export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20MB
export const MAX_FILES = 30;

export const SUPPORTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type SupportedImageMimeType =
  (typeof SUPPORTED_IMAGE_MIME_TYPES)[number];

export const QUALITY_PRESETS = {
  maximum: 0.45,
  balanced: 0.7,
  high: 0.85,
} as const;

export const TARGET_SIZE_PRESETS = [
  { label: "50 KB", bytes: 50 * 1024 },
  { label: "100 KB", bytes: 100 * 1024 },
  { label: "200 KB", bytes: 200 * 1024 },
  { label: "500 KB", bytes: 500 * 1024 },
] as const;

export const SOCIAL_LINKS = {
  twitter: "#",
  github: "#",
  facebook: "#",
} as const;
