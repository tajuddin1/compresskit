"use client";

import { useEffect, useState } from "react";
import { Download, Loader2, Lock, Unlock } from "lucide-react";
import { ImageUploader } from "@/components/ImageUploader";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import {
  resizeImageFile,
  SOCIAL_PRESETS,
  type ResizeResult,
} from "@/lib/image-resizing";
import { validateImageFile, getFriendlyErrorMessage } from "@/lib/file-validation";
import { downloadBlob } from "@/lib/download";
import { formatBytes } from "@/lib/format";
import { trackEvent, trackToolUsed } from "@/lib/analytics";

export function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [percentage, setPercentage] = useState("100");
  const [lockAspect, setLockAspect] = useState(true);
  const [mode, setMode] = useState<"pixels" | "percentage" | "preset">("pixels");
  const [presetId, setPresetId] = useState<string>(SOCIAL_PRESETS[0].id);
  const [result, setResult] = useState<ResizeResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalDims, setOriginalDims] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    trackToolUsed("image-resizer");
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      result?.revoke();
    };
  }, [previewUrl, result]);

  async function handleFiles(files: File[]) {
    const next = files[0];
    if (!next) return;
    setError(null);
    result?.revoke();
    setResult(null);

    const validation = await validateImageFile(next);
    if (!validation.valid) {
      setError(validation.message ?? "Unsupported file.");
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(next);
    setFile(next);
    setPreviewUrl(url);
    trackEvent("upload_image", { tool_id: "image-resizer", file_size: next.size });

    const img = new Image();
    img.onload = () => {
      setOriginalDims({ w: img.width, h: img.height });
      setWidth(String(img.width));
      setHeight(String(img.height));
    };
    img.src = url;
  }

  async function handleResize() {
    if (!file || busy) return;
    setBusy(true);
    setError(null);

    try {
      let options;
      if (mode === "percentage") {
        options = {
          percentage: Number(percentage) || 100,
          lockAspectRatio: true,
        };
      } else if (mode === "preset") {
        const preset = SOCIAL_PRESETS.find((item) => item.id === presetId)!;
        options = {
          width: preset.width,
          height: preset.height,
          lockAspectRatio: false,
        };
      } else {
        options = {
          width: Number(width) || undefined,
          height: Number(height) || undefined,
          lockAspectRatio: lockAspect,
        };
      }

      result?.revoke();
      const next = await resizeImageFile(file, options);
      setResult(next);
      trackEvent("resize_completed", {
        tool_id: "image-resizer",
        width: next.width,
        height: next.height,
      });
    } catch (err) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PrivacyNotice />

      {!file ? (
        <ImageUploader onFilesSelected={handleFiles} multiple={false} />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-border bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl ?? undefined}
                alt="Original"
                className="aspect-[4/3] w-full object-contain"
              />
              <div className="border-t border-border px-4 py-3 text-sm">
                Original
                {originalDims
                  ? ` · ${originalDims.w}×${originalDims.h} · ${formatBytes(file.size)}`
                  : ""}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-slate-50">
              {result ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={result.objectUrl}
                    alt="Resized"
                    className="aspect-[4/3] w-full object-contain"
                  />
                  <div className="border-t border-border px-4 py-3 text-sm">
                    Resized · {result.width}×{result.height} ·{" "}
                    {formatBytes(result.outputBytes)}
                  </div>
                </>
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center px-6 text-center text-sm text-muted">
                  Choose size options and click Resize to preview the result.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-border bg-white p-5 shadow-soft">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["pixels", "Pixels"],
                  ["percentage", "Percentage"],
                  ["preset", "Social presets"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMode(id)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                    mode === id
                      ? "border-primary bg-primary text-white"
                      : "border-border text-slate-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {mode === "pixels" ? (
              <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
                <div>
                  <label htmlFor="resize-width" className="mb-1.5 block text-sm font-medium">
                    Width
                  </label>
                  <input
                    id="resize-width"
                    type="number"
                    min={1}
                    value={width}
                    onChange={(event) => {
                      const nextWidth = event.target.value;
                      setWidth(nextWidth);
                      if (lockAspect && originalDims) {
                        const w = Number(nextWidth);
                        if (w > 0) {
                          setHeight(
                            String(
                              Math.round((w / originalDims.w) * originalDims.h),
                            ),
                          );
                        }
                      }
                    }}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setLockAspect((value) => !value)}
                  className="mt-7 inline-flex h-10 w-10 items-center justify-center self-start rounded-lg border border-border"
                  aria-label={lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}
                >
                  {lockAspect ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                </button>
                <div>
                  <label htmlFor="resize-height" className="mb-1.5 block text-sm font-medium">
                    Height
                  </label>
                  <input
                    id="resize-height"
                    type="number"
                    min={1}
                    value={height}
                    onChange={(event) => {
                      const nextHeight = event.target.value;
                      setHeight(nextHeight);
                      if (lockAspect && originalDims) {
                        const h = Number(nextHeight);
                        if (h > 0) {
                          setWidth(
                            String(
                              Math.round((h / originalDims.h) * originalDims.w),
                            ),
                          );
                        }
                      }
                    }}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm"
                  />
                </div>
              </div>
            ) : null}

            {mode === "percentage" ? (
              <div>
                <label htmlFor="resize-percentage" className="mb-1.5 block text-sm font-medium">
                  Scale percentage
                </label>
                <input
                  id="resize-percentage"
                  type="number"
                  min={1}
                  max={400}
                  value={percentage}
                  onChange={(event) => setPercentage(event.target.value)}
                  className="w-40 rounded-lg border border-border px-3 py-2 text-sm"
                />
              </div>
            ) : null}

            {mode === "preset" ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {SOCIAL_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setPresetId(preset.id)}
                    className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
                      presetId === preset.id
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <span className="block font-medium">{preset.label}</span>
                    <span className="text-xs text-muted">
                      {preset.width}×{preset.height}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleResize}
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-60 sm:w-auto"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Resize
            </button>
            <button
              type="button"
              disabled={!result}
              onClick={() => {
                if (!result) return;
                downloadBlob(result.blob, result.filename);
                trackEvent("download_image", { tool_id: "image-resizer" });
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold disabled:opacity-60 sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
            <button
              type="button"
              onClick={() => {
                if (previewUrl) URL.revokeObjectURL(previewUrl);
                result?.revoke();
                setFile(null);
                setPreviewUrl(null);
                setResult(null);
                setOriginalDims(null);
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
