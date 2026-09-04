"use client";

import { CheckCircle2, CircleAlert, Loader2, X } from "lucide-react";
import { formatBytes } from "@/lib/format";

export type FileItemStatus = "waiting" | "compressing" | "completed" | "failed";

export interface FileListItem {
  id: string;
  name: string;
  originalBytes: number;
  compressedBytes?: number;
  status: FileItemStatus;
  error?: string;
  previewUrl?: string;
}

interface FileListProps {
  items: FileListItem[];
  totalOriginal: number;
  totalCompressed: number;
  totalSavedPercent: number;
  activeId?: string | null;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const STATUS_LABEL: Record<FileItemStatus, string> = {
  waiting: "Waiting",
  compressing: "Working",
  completed: "Done",
  failed: "Failed",
};

function StatusIcon({ status }: { status: FileItemStatus }) {
  if (status === "completed") {
    return <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />;
  }
  if (status === "compressing") {
    return (
      <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-600" aria-hidden="true" />
    );
  }
  if (status === "failed") {
    return <CircleAlert className="h-3.5 w-3.5 text-danger" aria-hidden="true" />;
  }
  return <span className="h-2 w-2 rounded-full bg-slate-300" aria-hidden="true" />;
}

export function FileList({
  items,
  totalOriginal,
  totalCompressed,
  totalSavedPercent,
  activeId,
  onSelect,
  onRemove,
}: FileListProps) {
  if (items.length === 0) return null;

  const showTotals = items.some((item) => item.compressedBytes !== undefined);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-foreground">Your images</p>
          <p className="text-xs text-muted">
            {formatBytes(totalOriginal)}
            {showTotals
              ? ` → ${formatBytes(totalCompressed)} · saved ${totalSavedPercent.toFixed(1)}%`
              : " total"}
          </p>
        </div>
        <p className="text-xs text-muted">Tap a thumbnail to preview</p>
      </div>

      <ul className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {items.map((item, index) => {
          const isActive = activeId === item.id;

          return (
            <li key={`${item.id}-${index}`} className="relative shrink-0 pt-1 pr-1">
              <button
                type="button"
                onClick={() => onSelect?.(item.id)}
                className={`w-[112px] overflow-hidden rounded-xl border bg-white text-left transition ${
                  isActive
                    ? "border-primary shadow-sm ring-2 ring-primary/15"
                    : "border-border hover:border-primary/40"
                }`}
                aria-pressed={isActive}
                aria-label={`Select ${item.name}`}
              >
                <div className="relative aspect-square bg-slate-100">
                  {item.previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.previewUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted">
                      Image
                    </div>
                  )}
                  <span className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 rounded-md bg-white/95 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 shadow-sm">
                    <StatusIcon status={item.status} />
                    {STATUS_LABEL[item.status]}
                  </span>
                </div>
                <div className="space-y-0.5 px-2 py-2">
                  <p className="truncate text-xs font-medium text-foreground">
                    {item.name || `Image ${index + 1}`}
                  </p>
                  <p className="truncate text-[11px] text-muted">
                    {item.compressedBytes !== undefined
                      ? `${formatBytes(item.originalBytes)} → ${formatBytes(item.compressedBytes)}`
                      : formatBytes(item.originalBytes)}
                  </p>
                </div>
              </button>

              {onRemove ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemove(item.id);
                  }}
                  className="absolute top-0 right-0 inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-white text-slate-500 shadow-sm transition hover:border-red-200 hover:text-danger"
                  aria-label={`Remove ${item.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
