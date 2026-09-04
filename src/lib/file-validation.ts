import {
  MAX_FILE_SIZE_BYTES,
  SUPPORTED_IMAGE_MIME_TYPES,
  type SupportedImageMimeType,
} from "@/lib/constants";

export type FileValidationError =
  | "unsupported"
  | "too_large"
  | "empty"
  | "corrupted";

export interface FileValidationResult {
  valid: boolean;
  error?: FileValidationError;
  message?: string;
  mimeType?: SupportedImageMimeType;
}

const MIME_BY_SIGNATURE: Record<string, SupportedImageMimeType> = {
  ffd8ff: "image/jpeg",
  "89504e47": "image/png",
  "52494646": "image/webp", // RIFF....WEBP verified separately
};

function bytesToHex(bytes: Uint8Array, length: number): string {
  return Array.from(bytes.slice(0, length))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function detectImageMimeType(
  file: File,
): Promise<SupportedImageMimeType | null> {
  const buffer = await file.slice(0, 12).arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const hex4 = bytesToHex(bytes, 4);
  const hex3 = bytesToHex(bytes, 3);

  if (hex3 === "ffd8ff") return "image/jpeg";
  if (hex4 === "89504e47") return "image/png";

  // WebP: RIFF....WEBP
  if (hex4 === "52494646") {
    const riffType = String.fromCharCode(...bytes.slice(8, 12));
    if (riffType === "WEBP") return "image/webp";
  }

  // Fall back to browser-reported MIME if it matches supported types
  if (
    SUPPORTED_IMAGE_MIME_TYPES.includes(
      file.type as SupportedImageMimeType,
    )
  ) {
    return file.type as SupportedImageMimeType;
  }

  void MIME_BY_SIGNATURE;
  return null;
}

export async function validateImageFile(
  file: File,
): Promise<FileValidationResult> {
  if (!file || file.size === 0) {
    return {
      valid: false,
      error: "empty",
      message: "That file appears to be empty. Please choose another image.",
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: "too_large",
      message:
        "That file is larger than 20MB. Please upload a smaller image.",
    };
  }

  const mimeType = await detectImageMimeType(file);
  if (!mimeType) {
    return {
      valid: false,
      error: "unsupported",
      message:
        "That file doesn't appear to be a supported image. Please upload JPG, PNG or WebP.",
    };
  }

  return { valid: true, mimeType };
}

export function getFriendlyErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    const known = [
      "unsupported",
      "too large",
      "corrupted",
      "canvas",
      "decode",
    ];
    const lower = error.message.toLowerCase();
    if (known.some((k) => lower.includes(k))) {
      return error.message;
    }
  }

  return "Something went wrong while processing your image. Please try again.";
}
