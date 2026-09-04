"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { ImageUploader } from "@/components/ImageUploader";
import {
  CompressionSettings,
  type QualityPreset,
} from "@/components/CompressionSettings";
import { BeforeAfter } from "@/components/BeforeAfter";
import { FileList, type FileListItem } from "@/components/FileList";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { compressImageFile, type CompressionResult } from "@/lib/image-compression";
import { validateImageFile, getFriendlyErrorMessage } from "@/lib/file-validation";
import { downloadBlob, downloadFilesAsZip } from "@/lib/download";
import { calculateSavingsPercent, formatBytes, formatPercent } from "@/lib/format";
import { trackEvent, trackToolUsed } from "@/lib/analytics";
import { MAX_FILES, QUALITY_PRESETS } from "@/lib/constants";
import { createClientId } from "@/lib/id";
import type { OutputImageFormat } from "@/lib/image-utils";

export interface ImageCompressorProps {
  toolId?: string;
  heading?: string;
  defaultQuality?: number;
  defaultTargetBytes?: number | null;
  forcedOutputFormat?: OutputImageFormat;
  acceptHint?: string;
}

interface ManagedItem {
  id: string;
  file: File;
  previewUrl: string;
  status: FileListItem["status"];
  error?: string;
  result?: CompressionResult;
}

export function ImageCompressor({
  toolId = "image-compressor",
  heading,
  defaultQuality = QUALITY_PRESETS.balanced,
  defaultTargetBytes = null,
  forcedOutputFormat,
  acceptHint = "JPG, PNG, WebP • Up to 20MB",
}: ImageCompressorProps) {
  const [items, setItems] = useState<ManagedItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [quality, setQuality] = useState(defaultQuality);
  const [preset, setPreset] = useState<QualityPreset>("balanced");
  const [targetBytes, setTargetBytes] = useState<number | null>(defaultTargetBytes);
  const [customTargetKb, setCustomTargetKb] = useState("120");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const itemsRef = useRef<ManagedItem[]>([]);

  useEffect(() => {
    trackToolUsed(toolId);
  }, [toolId]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
        item.result?.revoke();
      });
    };
  }, []);

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) ?? items[0] ?? null,
    [items, activeId],
  );

  const listItems: FileListItem[] = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: item.file.name,
        originalBytes: item.file.size,
        compressedBytes: item.result?.compressedBytes,
        status: item.status,
        error: item.error,
        previewUrl: item.previewUrl,
      })),
    [items],
  );

  const totals = useMemo(() => {
    const totalOriginal = items.reduce((sum, item) => sum + item.file.size, 0);
    const totalCompressed = items.reduce(
      (sum, item) => sum + (item.result?.compressedBytes ?? 0),
      0,
    );
    const completed = items.filter((item) => item.result);
    const originalForCompleted = completed.reduce(
      (sum, item) => sum + item.file.size,
      0,
    );
    return {
      totalOriginal,
      totalCompressed,
      totalSavedPercent: calculateSavingsPercent(
        originalForCompleted,
        totalCompressed,
      ),
      completedCount: completed.length,
    };
  }, [items]);

  const resolvedTargetBytes = useMemo(() => {
    if (targetBytes === null) return undefined;
    if (targetBytes === -1) {
      const kb = Number(customTargetKb);
      if (!Number.isFinite(kb) || kb <= 0) return undefined;
      return Math.round(kb * 1024);
    }
    return targetBytes;
  }, [targetBytes, customTargetKb]);

  async function handleFilesSelected(files: File[]) {
    setError(null);
    setMessage(null);

    const incoming = Array.from(files).filter((file) => file instanceof File);
    if (incoming.length === 0) return;

    const remaining = MAX_FILES - itemsRef.current.length;
    if (remaining <= 0) {
      setError(`You can upload up to ${MAX_FILES} images at a time.`);
      return;
    }

    const selected = incoming.slice(0, remaining);
    if (incoming.length > remaining) {
      setError(
        `Only ${remaining} more image${remaining === 1 ? "" : "s"} can be added (max ${MAX_FILES}).`,
      );
    }

    const validations = await Promise.all(
      selected.map(async (file) => ({
        file,
        validation: await validateImageFile(file),
      })),
    );

    const nextItems: ManagedItem[] = [];
    const rejectedMessages: string[] = [];

    for (const { file, validation } of validations) {
      if (!validation.valid) {
        rejectedMessages.push(
          validation.message ?? `${file.name} is not supported.`,
        );
        continue;
      }

      trackEvent("upload_image", {
        file_type: validation.mimeType,
        file_size: file.size,
        tool_id: toolId,
      });

      nextItems.push({
        id: createClientId("img"),
        file,
        previewUrl: URL.createObjectURL(file),
        status: "waiting",
      });
    }

    if (nextItems.length === 0) {
      setError(
        rejectedMessages[0] ??
          "That file doesn't appear to be a supported image. Please upload JPG, PNG or WebP.",
      );
      return;
    }

    if (rejectedMessages.length > 0 && nextItems.length > 0) {
      setError(
        `${nextItems.length} image${nextItems.length === 1 ? "" : "s"} added. ${rejectedMessages.length} file${rejectedMessages.length === 1 ? "" : "s"} skipped.`,
      );
    }

    setItems((prev) => [...prev, ...nextItems]);
    setActiveId((prev) => prev ?? nextItems[0]?.id ?? null);
  }

  async function handleCompress() {
    if (items.length === 0 || busy) return;

    setBusy(true);
    setError(null);
    setMessage("Compressing your image...");
    trackEvent("compression_started", {
      count: items.length,
      tool_id: toolId,
    });

    const updated = [...items];

    for (let i = 0; i < updated.length; i += 1) {
      const current = updated[i];
      updated[i] = { ...current, status: "compressing", error: undefined };
      setItems([...updated]);

      try {
        current.result?.revoke();
        const result = await compressImageFile(current.file, {
          quality,
          targetBytes: resolvedTargetBytes,
          outputFormat: forcedOutputFormat,
          preserveTransparency: true,
        });

        updated[i] = {
          ...current,
          status: "completed",
          result,
          error: undefined,
        };
        setItems([...updated]);
        trackEvent("compression_completed", {
          original_bytes: result.originalBytes,
          compressed_bytes: result.compressedBytes,
          tool_id: toolId,
        });
      } catch (err) {
        updated[i] = {
          ...current,
          status: "failed",
          error: getFriendlyErrorMessage(err),
        };
        setItems([...updated]);
      }
    }

    setBusy(false);
    const successCount = updated.filter((item) => item.status === "completed").length;
    if (successCount > 0) {
      setMessage("Compression complete!");
    } else {
      setError("Something went wrong.");
      setMessage(null);
    }
  }

  async function handleDownloadActive() {
    if (!activeItem?.result) return;
    await downloadBlob(activeItem.result.blob, activeItem.result.filename);
    trackEvent("download_image", { tool_id: toolId, mode: "single" });
  }

  async function handleDownloadAll() {
    const ready = items.filter((item) => item.result);
    if (ready.length === 0) return;

    if (ready.length === 1 && ready[0].result) {
      await downloadBlob(ready[0].result.blob, ready[0].result.filename);
    } else {
      await downloadFilesAsZip(
        ready.map((item) => ({
          blob: item.result!.blob,
          filename: item.result!.filename,
        })),
      );
    }

    trackEvent("download_image", {
      tool_id: toolId,
      mode: "all",
      count: ready.length,
    });
  }

  function handleReset() {
    itemsRef.current.forEach((item) => {
      URL.revokeObjectURL(item.previewUrl);
      item.result?.revoke();
    });
    setItems([]);
    setActiveId(null);
    setMessage(null);
    setError(null);
    setQuality(defaultQuality);
    setPreset(defaultTargetBytes ? "custom" : "balanced");
    setTargetBytes(defaultTargetBytes);
  }

  function handleRemove(id: string) {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        target.result?.revoke();
      }
      const next = prev.filter((item) => item.id !== id);
      setActiveId((current) => {
        if (current !== id) return current;
        return next[0]?.id ?? null;
      });
      return next;
    });
  }

  const savings = activeItem?.result
    ? calculateSavingsPercent(
        activeItem.result.originalBytes,
        activeItem.result.compressedBytes,
      )
    : 0;

  return (
    <div className="space-y-5">
      {heading ? (
        <h2 className="text-xl font-semibold text-foreground">{heading}</h2>
      ) : null}

      <PrivacyNotice />

      {items.length === 0 ? (
        <ImageUploader
          onFilesSelected={handleFilesSelected}
          multiple
          hint={acceptHint}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Ready to compress
              </p>
              <p className="text-xs text-muted">
                {items.length} file{items.length === 1 ? "" : "s"} · adjust
                quality, then compress
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-primary/30 hover:bg-white">
                Add more
                <input
                  type="file"
                  className="sr-only"
                  accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                  multiple
                  onChange={(event) => {
                    void handleFilesSelected(
                      event.target.files ? Array.from(event.target.files) : [],
                    );
                    event.target.value = "";
                  }}
                />
              </label>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-primary/30 hover:bg-white"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
            <div className="border-b border-border p-4 sm:p-5 lg:border-r lg:border-b-0">
              {activeItem ? (
                <div className="space-y-4">
                  {activeItem.result ? (
                    <BeforeAfter
                      originalUrl={activeItem.previewUrl}
                      compressedUrl={activeItem.result.objectUrl}
                      originalSize={activeItem.file.size}
                      compressedSize={activeItem.result.compressedBytes}
                    />
                  ) : (
                    <div className="overflow-hidden rounded-xl border border-border bg-slate-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeItem.previewUrl}
                        alt={`Preview of ${activeItem.file.name}`}
                        className="mx-auto max-h-[360px] w-full object-contain"
                      />
                      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-white px-4 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {activeItem.file.name}
                          </p>
                          <p className="text-xs text-muted">
                            {formatBytes(activeItem.file.size)} · Original
                            preview
                          </p>
                        </div>
                        <span className="rounded-md bg-surface px-2 py-1 text-xs font-medium text-slate-600">
                          Not compressed yet
                        </span>
                      </div>
                    </div>
                  )}

                  {activeItem.result ? (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <StatCard
                        label="Original"
                        value={formatBytes(activeItem.result.originalBytes)}
                      />
                      <StatCard
                        label="Compressed"
                        value={formatBytes(activeItem.result.compressedBytes)}
                        emphasize
                      />
                      <StatCard
                        label="Saved"
                        value={formatPercent(savings)}
                        emphasize
                      />
                      <StatCard
                        label="Dimensions"
                        value={`${activeItem.result.width}×${activeItem.result.height}`}
                      />
                      <StatCard
                        label="Type"
                        value={activeItem.result.mimeType.replace("image/", "").toUpperCase()}
                      />
                      <StatCard
                        label="Quality"
                        value={`${Math.round(activeItem.result.qualityUsed * 100)}`}
                      />
                      {activeItem.result.targetBytes ? (
                        <>
                          <StatCard
                            label="Target"
                            value={formatBytes(activeItem.result.targetBytes)}
                          />
                          <StatCard
                            label="Result"
                            value={formatBytes(activeItem.result.compressedBytes)}
                          />
                        </>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col bg-surface/60 p-4 sm:p-5">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Compression settings
              </h3>
              <CompressionSettings
                quality={quality}
                preset={preset}
                targetBytes={targetBytes}
                customTargetKb={customTargetKb}
                onQualityChange={setQuality}
                onPresetChange={setPreset}
                onTargetChange={setTargetBytes}
                onCustomTargetChange={setCustomTargetKb}
                disabled={busy}
              />

              <div className="mt-auto space-y-3 pt-6">
                <button
                  type="button"
                  onClick={handleCompress}
                  disabled={busy || items.length === 0}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {busy
                    ? "Compressing..."
                    : items.length > 1
                      ? `Compress ${items.length} images`
                      : "Compress image"}
                </button>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleDownloadActive}
                    disabled={!activeItem?.result || busy}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadAll}
                    disabled={totals.completedCount === 0 || busy}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" />
                    {totals.completedCount > 1 ? "Download ZIP" : "Download all"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {items.length > 0 ? (
            <div className="border-t border-border bg-white p-4 sm:p-5">
              <FileList
                items={listItems}
                totalOriginal={totals.totalOriginal}
                totalCompressed={totals.totalCompressed}
                totalSavedPercent={totals.totalSavedPercent}
                activeId={activeItem?.id}
                onSelect={setActiveId}
                onRemove={handleRemove}
              />
            </div>
          ) : null}
        </div>
      )}

      {message ? (
        <p
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          role="status"
        >
          {message}
        </p>
      ) : null}
      {error ? (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function StatCard({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-white px-3 py-2.5">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p
        className={`mt-1 truncate text-sm font-semibold ${
          emphasize ? "text-success" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
