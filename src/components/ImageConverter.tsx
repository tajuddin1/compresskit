"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { ImageUploader } from "@/components/ImageUploader";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import {
  convertImageFile,
  type ConversionFormat,
  type ConversionResult,
} from "@/lib/image-conversion";
import { validateImageFile, getFriendlyErrorMessage } from "@/lib/file-validation";
import { downloadBlob, downloadFilesAsZip } from "@/lib/download";
import { formatBytes } from "@/lib/format";
import { trackEvent, trackToolUsed } from "@/lib/analytics";
import { createClientId } from "@/lib/id";

const CONVERSIONS: Array<{
  id: string;
  label: string;
  output: ConversionFormat;
}> = [
  { id: "jpg-png", label: "JPG → PNG", output: "png" },
  { id: "png-jpg", label: "PNG → JPG", output: "jpg" },
  { id: "jpg-webp", label: "JPG → WebP", output: "webp" },
  { id: "png-webp", label: "PNG → WebP", output: "webp" },
  { id: "webp-jpg", label: "WebP → JPG", output: "jpg" },
  { id: "webp-png", label: "WebP → PNG", output: "png" },
];

interface ManagedFile {
  id: string;
  file: File;
  previewUrl: string;
  result?: ConversionResult;
  error?: string;
  status: "waiting" | "converting" | "completed" | "failed";
}

export function ImageConverterTool() {
  const [items, setItems] = useState<ManagedFile[]>([]);
  const [conversionId, setConversionId] = useState(CONVERSIONS[0].id);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(
    () => CONVERSIONS.find((item) => item.id === conversionId)!,
    [conversionId],
  );

  useEffect(() => {
    trackToolUsed("image-converter");
  }, []);

  useEffect(() => {
    return () => {
      items.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
        item.result?.revoke();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleFiles(files: File[]) {
    setError(null);
    const incoming = Array.from(files).filter((file) => file instanceof File);
    if (incoming.length === 0) return;

    const validations = await Promise.all(
      incoming.map(async (file) => ({
        file,
        validation: await validateImageFile(file),
      })),
    );

    const next: ManagedFile[] = [];
    for (const { file, validation } of validations) {
      if (!validation.valid) {
        setError(validation.message ?? "Unsupported file.");
        continue;
      }
      trackEvent("upload_image", {
        tool_id: "image-converter",
        file_size: file.size,
      });
      next.push({
        id: createClientId("convert"),
        file,
        previewUrl: URL.createObjectURL(file),
        status: "waiting",
      });
    }

    if (next.length) setItems((prev) => [...prev, ...next]);
  }

  async function handleConvert() {
    if (!items.length || busy) return;
    setBusy(true);
    setError(null);

    const updated = [...items];
    for (let i = 0; i < updated.length; i += 1) {
      updated[i] = { ...updated[i], status: "converting", error: undefined };
      setItems([...updated]);

      try {
        updated[i].result?.revoke();
        const result = await convertImageFile(updated[i].file, {
          outputFormat: selected.output,
          quality: 0.92,
        });
        updated[i] = {
          ...updated[i],
          result,
          status: "completed",
        };
        setItems([...updated]);
        trackEvent("conversion_completed", {
          tool_id: "image-converter",
          output: selected.output,
        });
      } catch (err) {
        updated[i] = {
          ...updated[i],
          status: "failed",
          error: getFriendlyErrorMessage(err),
        };
        setItems([...updated]);
      }
    }

    setBusy(false);
  }

  const completed = items.filter((item) => item.result);

  return (
    <div className="space-y-6">
      <PrivacyNotice />

      {items.length === 0 ? (
        <ImageUploader onFilesSelected={handleFiles} />
      ) : (
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              Conversion type
            </p>
            <div className="flex flex-wrap gap-2">
              {CONVERSIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setConversionId(item.id)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                    conversionId === item.id
                      ? "border-primary bg-primary text-white"
                      : "border-border text-slate-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.file.name}</p>
                  <p className="text-xs text-muted">
                    {formatBytes(item.file.size)}
                    {item.result
                      ? ` → ${formatBytes(item.result.outputBytes)} (${item.result.mimeType})`
                      : ""}
                    {item.error ? ` · ${item.error}` : ""}
                  </p>
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {item.status}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleConvert}
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-60 sm:w-auto"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Convert
            </button>
            <button
              type="button"
              disabled={completed.length === 0}
              onClick={async () => {
                if (completed.length === 1 && completed[0].result) {
                  await downloadBlob(
                    completed[0].result.blob,
                    completed[0].result.filename,
                  );
                } else {
                  await downloadFilesAsZip(
                    completed.map((item) => ({
                      blob: item.result!.blob,
                      filename: item.result!.filename,
                    })),
                    "compresskit-converted.zip",
                  );
                }
                trackEvent("download_image", {
                  tool_id: "image-converter",
                  count: completed.length,
                });
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold disabled:opacity-60 sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Download {completed.length > 1 ? "All as ZIP" : ""}
            </button>
            <label className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold sm:w-auto">
              Add images
              <input
                type="file"
                className="sr-only"
                multiple
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                onChange={(event) => {
                  handleFiles(
                    event.target.files ? Array.from(event.target.files) : [],
                  );
                  event.target.value = "";
                }}
              />
            </label>
            <button
              type="button"
              onClick={() => {
                items.forEach((item) => {
                  URL.revokeObjectURL(item.previewUrl);
                  item.result?.revoke();
                });
                setItems([]);
              }}
              className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold sm:w-auto"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
