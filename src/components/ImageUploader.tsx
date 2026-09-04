"use client";

import { useCallback, useId, useRef, useState } from "react";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
  hint?: string;
}

function toFileArray(fileList: FileList | File[] | null | undefined): File[] {
  if (!fileList) return [];
  return Array.from(fileList).filter((file) => file instanceof File);
}

export function ImageUploader({
  onFilesSelected,
  multiple = true,
  accept = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
  disabled = false,
  title = "Drop your image here",
  subtitle = "or click to browse",
  hint = "JPG, PNG, WebP • Up to 20MB",
}: ImageUploaderProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragDepth = useRef(0);

  const emitFiles = useCallback(
    (fileList: FileList | File[] | null | undefined) => {
      const files = toFileArray(fileList);
      if (files.length === 0) return;
      onFilesSelected(files);
    },
    [onFilesSelected],
  );

  return (
    <div
      onDragEnter={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (disabled) return;
        dragDepth.current += 1;
        setDragging(true);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!disabled) {
          event.dataTransfer.dropEffect = "copy";
          setDragging(true);
        }
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        event.stopPropagation();
        dragDepth.current = Math.max(0, dragDepth.current - 1);
        if (dragDepth.current === 0) setDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
        dragDepth.current = 0;
        setDragging(false);
        if (disabled) return;

        // Prefer DataTransferItemList when available — more reliable for multi-file drops
        const items = event.dataTransfer.items;
        if (items && items.length > 0) {
          const files: File[] = [];
          for (let i = 0; i < items.length; i += 1) {
            const item = items[i];
            if (item.kind === "file") {
              const file = item.getAsFile();
              if (file) files.push(file);
            }
          }
          if (files.length > 0) {
            emitFiles(files);
            return;
          }
        }

        emitFiles(event.dataTransfer.files);
      }}
      className={`relative rounded-2xl border-2 border-dashed transition ${
        dragging
          ? "border-primary bg-primary-soft/40"
          : "border-slate-200 bg-surface hover:border-primary/40 hover:bg-primary-soft/20"
      } ${disabled ? "pointer-events-none opacity-60" : ""}`}
    >
      <label
        htmlFor={inputId}
        className="flex cursor-pointer flex-col items-center justify-center px-6 py-14 text-center sm:py-20"
      >
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-border">
          <Upload className="h-6 w-6 text-primary" aria-hidden="true" />
        </span>
        <span className="text-lg font-semibold text-foreground sm:text-xl">
          {title}
        </span>
        <span className="mt-2 text-sm text-muted">{subtitle}</span>
        <span className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
          {hint}
        </span>
      </label>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => {
          emitFiles(event.target.files);
          // Allow selecting the same files again later
          event.target.value = "";
        }}
      />
    </div>
  );
}
