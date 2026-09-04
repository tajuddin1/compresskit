import {
  canvasToBlob,
  drawImageToCanvas,
  extensionForMime,
  loadImageBitmap,
  preferLossyFormat,
  replaceExtension,
  type OutputImageFormat,
} from "@/lib/image-utils";

export interface ResizeOptions {
  width?: number;
  height?: number;
  lockAspectRatio?: boolean;
  percentage?: number;
  outputFormat?: OutputImageFormat;
  quality?: number;
}

export interface ResizeResult {
  blob: Blob;
  objectUrl: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  originalBytes: number;
  outputBytes: number;
  mimeType: string;
  filename: string;
  revoke: () => void;
}

export const SOCIAL_PRESETS = [
  {
    id: "instagram-square",
    label: "Instagram Square",
    width: 1080,
    height: 1080,
    platform: "Instagram",
  },
  {
    id: "instagram-portrait",
    label: "Instagram Portrait",
    width: 1080,
    height: 1350,
    platform: "Instagram",
  },
  {
    id: "instagram-story",
    label: "Instagram Story",
    width: 1080,
    height: 1920,
    platform: "Instagram",
  },
  {
    id: "facebook-post",
    label: "Facebook Post",
    width: 1200,
    height: 630,
    platform: "Facebook",
  },
  {
    id: "youtube-thumbnail",
    label: "YouTube Thumbnail",
    width: 1280,
    height: 720,
    platform: "YouTube",
  },
  {
    id: "linkedin-post",
    label: "LinkedIn Post",
    width: 1200,
    height: 627,
    platform: "LinkedIn",
  },
  {
    id: "twitter-post",
    label: "Twitter/X Post",
    width: 1600,
    height: 900,
    platform: "Twitter/X",
  },
  {
    id: "tiktok-video",
    label: "TikTok Cover",
    width: 1080,
    height: 1920,
    platform: "TikTok",
  },
] as const;

function computeDimensions(
  originalWidth: number,
  originalHeight: number,
  options: ResizeOptions,
): { width: number; height: number } {
  if (options.percentage && options.percentage > 0) {
    const ratio = options.percentage / 100;
    return {
      width: Math.max(1, Math.round(originalWidth * ratio)),
      height: Math.max(1, Math.round(originalHeight * ratio)),
    };
  }

  const lock = options.lockAspectRatio !== false;
  const width = options.width;
  const height = options.height;

  if (width && height && !lock) {
    return { width: Math.max(1, Math.round(width)), height: Math.max(1, Math.round(height)) };
  }

  if (width && !height) {
    const ratio = width / originalWidth;
    return {
      width: Math.max(1, Math.round(width)),
      height: Math.max(1, Math.round(originalHeight * ratio)),
    };
  }

  if (height && !width) {
    const ratio = height / originalHeight;
    return {
      width: Math.max(1, Math.round(originalWidth * ratio)),
      height: Math.max(1, Math.round(height)),
    };
  }

  if (width && height && lock) {
    const ratio = Math.min(width / originalWidth, height / originalHeight);
    return {
      width: Math.max(1, Math.round(originalWidth * ratio)),
      height: Math.max(1, Math.round(originalHeight * ratio)),
    };
  }

  return { width: originalWidth, height: originalHeight };
}

export async function resizeImageFile(
  file: File,
  options: ResizeOptions,
): Promise<ResizeResult> {
  const loaded = await loadImageBitmap(file);

  try {
    const dims = computeDimensions(loaded.width, loaded.height, options);
    const mimeType = preferLossyFormat(file.type, options.outputFormat);
    const fillWhite = mimeType === "image/jpeg";
    const canvas = drawImageToCanvas(loaded.bitmap, dims.width, dims.height, {
      fillWhite,
    });

    const blob = await canvasToBlob(
      canvas,
      mimeType,
      mimeType === "image/png" ? undefined : (options.quality ?? 0.92),
    );
    const objectUrl = URL.createObjectURL(blob);

    return {
      blob,
      objectUrl,
      width: dims.width,
      height: dims.height,
      originalWidth: loaded.width,
      originalHeight: loaded.height,
      originalBytes: file.size,
      outputBytes: blob.size,
      mimeType,
      filename: replaceExtension(file.name, extensionForMime(mimeType)),
      revoke: () => URL.revokeObjectURL(objectUrl),
    };
  } finally {
    loaded.revoke();
  }
}
