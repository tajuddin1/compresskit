import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function downloadBlob(blob: Blob, filename: string): Promise<void> {
  saveAs(blob, filename);
}

export async function downloadFilesAsZip(
  files: Array<{ blob: Blob; filename: string }>,
  zipName = "compresskit-images.zip",
): Promise<void> {
  const zip = new JSZip();

  files.forEach((file, index) => {
    const safeName = file.filename || `image-${index + 1}`;
    zip.file(safeName, file.blob);
  });

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, zipName);
}
