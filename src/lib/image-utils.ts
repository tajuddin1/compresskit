export type OutputImageFormat = "image/jpeg" | "image/png" | "image/webp";

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface LoadedImage {
  bitmap: ImageBitmap;
  width: number;
  height: number;
  objectUrl: string;
  revoke: () => void;
}

export async function loadImageBitmap(file: File): Promise<LoadedImage> {
  const objectUrl = URL.createObjectURL(file);

  try {
    const bitmap = await createImageBitmap(file);
    return {
      bitmap,
      width: bitmap.width,
      height: bitmap.height,
      objectUrl,
      revoke: () => {
        bitmap.close();
        URL.revokeObjectURL(objectUrl);
      },
    };
  } catch {
    URL.revokeObjectURL(objectUrl);
    throw new Error(
      "That image appears to be corrupted or unreadable. Please try another file.",
    );
  }
}

export function createCanvas(
  width: number,
  height: number,
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) {
    throw new Error("Your browser could not create a drawing context.");
  }
  return { canvas, ctx };
}

export function drawImageToCanvas(
  source: CanvasImageSource,
  width: number,
  height: number,
  options?: { fillWhite?: boolean },
): HTMLCanvasElement {
  const { canvas, ctx } = createCanvas(width, height);

  if (options?.fillWhite) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: OutputImageFormat,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Compression failed. Please try again."));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });
}

export function extensionForMime(mime: string): string {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "img";
  }
}

export function replaceExtension(filename: string, extension: string): string {
  const base = filename.replace(/\.[^.]+$/, "") || "image";
  return `${base}.${extension}`;
}

export function mimeFromFormat(format: "jpg" | "png" | "webp"): OutputImageFormat {
  if (format === "jpg") return "image/jpeg";
  if (format === "png") return "image/png";
  return "image/webp";
}

export function preferLossyFormat(
  sourceMime: string,
  preferred?: OutputImageFormat,
): OutputImageFormat {
  if (preferred) return preferred;
  if (sourceMime === "image/png") return "image/png";
  if (sourceMime === "image/webp") return "image/webp";
  return "image/jpeg";
}

export async function readExifOrientation(file: File): Promise<number> {
  // createImageBitmap already respects EXIF orientation in modern browsers.
  // This helper exists for future explicit handling.
  void file;
  return 1;
}
