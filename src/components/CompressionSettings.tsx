"use client";

import { TARGET_SIZE_PRESETS } from "@/lib/constants";

export type QualityPreset = "maximum" | "balanced" | "high" | "custom";

interface CompressionSettingsProps {
  quality: number;
  preset: QualityPreset;
  targetBytes: number | null;
  customTargetKb: string;
  onQualityChange: (quality: number) => void;
  onPresetChange: (preset: QualityPreset) => void;
  onTargetChange: (bytes: number | null) => void;
  onCustomTargetChange: (value: string) => void;
  disabled?: boolean;
}

const PRESETS: Array<{
  id: QualityPreset;
  label: string;
  hint: string;
  quality: number;
}> = [
  { id: "maximum", label: "Maximum", hint: "Smallest file", quality: 0.45 },
  { id: "balanced", label: "Balanced", hint: "Best default", quality: 0.7 },
  { id: "high", label: "High quality", hint: "More detail", quality: 0.85 },
];

export function CompressionSettings({
  quality,
  preset,
  targetBytes,
  customTargetKb,
  onQualityChange,
  onPresetChange,
  onTargetChange,
  onCustomTargetChange,
  disabled = false,
}: CompressionSettingsProps) {
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label
            htmlFor="quality-slider"
            className="text-sm font-semibold text-foreground"
          >
            Quality
          </label>
          <span className="rounded-md bg-surface px-2 py-1 text-sm font-semibold tabular-nums text-slate-700">
            {Math.round(quality * 100)}
          </span>
        </div>
        <input
          id="quality-slider"
          type="range"
          min={0}
          max={100}
          value={Math.round(quality * 100)}
          disabled={disabled || targetBytes !== null}
          onChange={(event) => {
            const next = Number(event.target.value) / 100;
            onPresetChange("custom");
            onQualityChange(next);
          }}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-primary disabled:cursor-not-allowed disabled:opacity-50"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(quality * 100)}
        />
        <div className="mt-1.5 flex justify-between text-[11px] text-muted">
          <span>Smaller</span>
          <span>Better quality</span>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-foreground">Presets</p>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((item) => {
            const selected = preset === item.id && targetBytes === null;
            return (
              <button
                key={item.id}
                type="button"
                disabled={disabled}
                onClick={() => {
                  onTargetChange(null);
                  onPresetChange(item.id);
                  onQualityChange(item.quality);
                }}
                className={`rounded-xl border px-2 py-2.5 text-center transition ${
                  selected
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border bg-white text-slate-700 hover:border-primary/30"
                }`}
              >
                <span className="block text-xs font-semibold sm:text-sm">
                  {item.label}
                </span>
                <span
                  className={`mt-0.5 block text-[10px] ${
                    selected ? "text-primary/80" : "text-muted"
                  }`}
                >
                  {item.hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-foreground">Target size</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onTargetChange(null)}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
              targetBytes === null
                ? "border-primary bg-primary text-white"
                : "border-border bg-white text-slate-700 hover:border-primary/30"
            }`}
          >
            Off
          </button>
          {TARGET_SIZE_PRESETS.map((item) => (
            <button
              key={item.label}
              type="button"
              disabled={disabled}
              onClick={() => onTargetChange(item.bytes)}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                targetBytes === item.bytes
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-slate-700 hover:border-primary/30"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            disabled={disabled}
            onClick={() => onTargetChange(-1)}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
              targetBytes === -1
                ? "border-primary bg-primary text-white"
                : "border-border bg-white text-slate-700 hover:border-primary/30"
            }`}
          >
            Custom
          </button>
        </div>

        {targetBytes === -1 ? (
          <div className="mt-3 flex items-center gap-2">
            <label htmlFor="custom-target" className="sr-only">
              Custom target size in KB
            </label>
            <input
              id="custom-target"
              type="number"
              min={10}
              max={5000}
              value={customTargetKb}
              disabled={disabled}
              onChange={(event) => onCustomTargetChange(event.target.value)}
              className="w-28 rounded-lg border border-border px-3 py-2 text-sm"
              placeholder="120"
            />
            <span className="text-sm text-muted">KB</span>
          </div>
        ) : null}

        {targetBytes !== null ? (
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Exact sizes are not guaranteed. We aim close and show the real
            result.
          </p>
        ) : null}
      </div>
    </div>
  );
}
