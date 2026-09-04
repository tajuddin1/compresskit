import {
  canvasToBlob,
  drawImageToCanvas,
  extensionForMime,
  loadImageBitmap,
  mimeFromFormat,
  replaceExtension,
} from "@/lib/image-utils";

export type ConversionFormat = "jpg" | "png" | "webp";

export interface ConversionOptions {
  quality?: number;
  outputFormat: ConversionFormat;
}

export interface ConversionResult {
  blob: Blob;
  objectUrl: string;
  width: number;
  height: number;
  originalBytes: number;
  outputBytes: number;
  mimeType: string;
  filename: string;
  revoke: () => void;
}

export async function convertImageFile(
  file: File,
  options: ConversionOptions,
): Promise<ConversionResult> {
  const loaded = await loadImageBitmap(file);

  try {
    const mimeType = mimeFromFormat(options.outputFormat);
    const fillWhite = mimeType === "image/jpeg";
    const canvas = drawImageToCanvas(loaded.bitmap, loaded.width, loaded.height, {
      fillWhite,
    });

    const quality =
      mimeType === "image/png" ? undefined : (options.quality ?? 0.92);
    const blob = await canvasToBlob(canvas, mimeType, quality);
    const objectUrl = URL.createObjectURL(blob);

    return {
      blob,
      objectUrl,
      width: loaded.width,
      height: loaded.height,
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
