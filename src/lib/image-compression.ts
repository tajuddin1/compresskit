import {
  canvasToBlob,
  drawImageToCanvas,
  extensionForMime,
  loadImageBitmap,
  preferLossyFormat,
  replaceExtension,
  type OutputImageFormat,
} from "@/lib/image-utils";

export interface CompressionOptions {
  quality?: number;
  outputFormat?: OutputImageFormat;
  maxWidth?: number;
  maxHeight?: number;
  targetBytes?: number;
  /** Keep transparency for PNG/WebP when possible */
  preserveTransparency?: boolean;
}

export interface CompressionResult {
  blob: Blob;
  objectUrl: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  originalBytes: number;
  compressedBytes: number;
  mimeType: string;
  filename: string;
  qualityUsed: number;
  targetBytes?: number;
  revoke: () => void;
}

function scaleToFit(
  width: number,
  height: number,
  maxWidth?: number,
  maxHeight?: number,
): { width: number; height: number } {
  let nextWidth = width;
  let nextHeight = height;

  if (maxWidth && nextWidth > maxWidth) {
    const ratio = maxWidth / nextWidth;
    nextWidth = maxWidth;
    nextHeight = Math.round(nextHeight * ratio);
  }

  if (maxHeight && nextHeight > maxHeight) {
    const ratio = maxHeight / nextHeight;
    nextHeight = maxHeight;
    nextWidth = Math.round(nextWidth * ratio);
  }

  return {
    width: Math.max(1, Math.round(nextWidth)),
    height: Math.max(1, Math.round(nextHeight)),
  };
}

async function encodeAtQuality(
  source: CanvasImageSource,
  width: number,
  height: number,
  mimeType: OutputImageFormat,
  quality: number,
  fillWhite: boolean,
): Promise<Blob> {
  const canvas = drawImageToCanvas(source, width, height, { fillWhite });
  // PNG ignores quality; still call toBlob for consistent API
  const blob = await canvasToBlob(
    canvas,
    mimeType,
    mimeType === "image/png" ? undefined : quality,
  );
  return blob;
}

/**
 * Iteratively adjust quality (and optionally dimensions) to approach a target file size.
 * Exact sizes are not guaranteed because they depend on image content.
 */
async function compressToTargetSize(
  source: CanvasImageSource,
  width: number,
  height: number,
  mimeType: OutputImageFormat,
  targetBytes: number,
  fillWhite: boolean,
): Promise<{ blob: Blob; quality: number; width: number; height: number }> {
  let currentWidth = width;
  let currentHeight = height;
  let bestBlob: Blob | null = null;
  let bestQuality = 0.7;

  // Binary search quality for lossy formats
  if (mimeType !== "image/png") {
    let low = 0.1;
    let high = 0.95;

    for (let i = 0; i < 10; i += 1) {
      const mid = (low + high) / 2;
      const blob = await encodeAtQuality(
        source,
        currentWidth,
        currentHeight,
        mimeType,
        mid,
        fillWhite,
      );

      bestBlob = blob;
      bestQuality = mid;

      if (blob.size > targetBytes) {
        high = mid;
      } else {
        low = mid;
      }

      // Close enough (±8%)
      if (Math.abs(blob.size - targetBytes) / targetBytes < 0.08) {
        break;
      }
    }
  } else {
    bestBlob = await encodeAtQuality(
      source,
      currentWidth,
      currentHeight,
      mimeType,
      1,
      fillWhite,
    );
  }

  // If still too large, scale dimensions down gradually
  let attempts = 0;
  while (
    bestBlob &&
    bestBlob.size > targetBytes * 1.05 &&
    attempts < 8 &&
    (currentWidth > 320 || currentHeight > 320)
  ) {
    currentWidth = Math.max(160, Math.round(currentWidth * 0.85));
    currentHeight = Math.max(160, Math.round(currentHeight * 0.85));
    const quality = mimeType === "image/png" ? 1 : Math.max(0.15, bestQuality * 0.9);
    bestBlob = await encodeAtQuality(
      source,
      currentWidth,
      currentHeight,
      mimeType,
      quality,
      fillWhite,
    );
    bestQuality = quality;
    attempts += 1;
  }

  if (!bestBlob) {
    throw new Error("Compression failed. Please try again.");
  }

  return {
    blob: bestBlob,
    quality: bestQuality,
    width: currentWidth,
    height: currentHeight,
  };
}

export async function compressImageFile(
  file: File,
  options: CompressionOptions = {},
): Promise<CompressionResult> {
  const loaded = await loadImageBitmap(file);

  try {
    const quality = options.quality ?? 0.7;
    const outputFormat = preferLossyFormat(file.type, options.outputFormat);
    const fillWhite =
      outputFormat === "image/jpeg" ||
      (outputFormat === "image/webp" && options.preserveTransparency === false);

    const scaled = scaleToFit(
      loaded.width,
      loaded.height,
      options.maxWidth,
      options.maxHeight,
    );

    let blob: Blob;
    let qualityUsed = quality;
    let outWidth = scaled.width;
    let outHeight = scaled.height;

    if (options.targetBytes && options.targetBytes > 0) {
      const targeted = await compressToTargetSize(
        loaded.bitmap,
        scaled.width,
        scaled.height,
        outputFormat,
        options.targetBytes,
        fillWhite,
      );
      blob = targeted.blob;
      qualityUsed = targeted.quality;
      outWidth = targeted.width;
      outHeight = targeted.height;
    } else {
      blob = await encodeAtQuality(
        loaded.bitmap,
        scaled.width,
        scaled.height,
        outputFormat,
        quality,
        fillWhite,
      );
    }

    const objectUrl = URL.createObjectURL(blob);
    const filename = replaceExtension(
      file.name,
      extensionForMime(outputFormat),
    );

    return {
      blob,
      objectUrl,
      width: outWidth,
      height: outHeight,
      originalWidth: loaded.width,
      originalHeight: loaded.height,
      originalBytes: file.size,
      compressedBytes: blob.size,
      mimeType: outputFormat,
      filename,
      qualityUsed,
      targetBytes: options.targetBytes,
      revoke: () => URL.revokeObjectURL(objectUrl),
    };
  } finally {
    loaded.revoke();
  }
}

export async function compressImages(
  files: File[],
  options: CompressionOptions,
  onProgress?: (index: number, total: number) => void,
): Promise<CompressionResult[]> {
  const results: CompressionResult[] = [];

  for (let i = 0; i < files.length; i += 1) {
    onProgress?.(i, files.length);
    // Yield to the UI thread between files
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });
    results.push(await compressImageFile(files[i], options));
  }

  onProgress?.(files.length, files.length);
  return results;
}
