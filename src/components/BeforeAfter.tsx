"use client";

import { useEffect, useRef, useState } from "react";
import { formatBytes } from "@/lib/format";

interface BeforeAfterProps {
  originalUrl: string;
  compressedUrl: string;
  originalSize: number;
  compressedSize: number;
  originalAlt?: string;
  compressedAlt?: string;
}

export function BeforeAfter({
  originalUrl,
  compressedUrl,
  originalSize,
  compressedSize,
  originalAlt = "Original image",
  compressedAlt = "Compressed image",
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  useEffect(() => {
    const onMove = (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = ((clientX - rect.left) / rect.width) * 100;
      setPosition(Math.min(100, Math.max(0, next)));
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      onMove(event.clientX);
    };

    const handlePointerUp = () => {
      dragging.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <figure className="overflow-hidden rounded-xl border border-border bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={originalUrl}
            alt={originalAlt}
            className="aspect-[4/3] w-full object-contain"
          />
          <figcaption className="flex items-center justify-between gap-2 border-t border-border bg-white px-3 py-2.5 text-sm">
            <span className="font-medium text-foreground">Original</span>
            <span className="font-semibold tabular-nums text-slate-700">
              {formatBytes(originalSize)}
            </span>
          </figcaption>
        </figure>

        <figure className="overflow-hidden rounded-xl border border-border bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={compressedUrl}
            alt={compressedAlt}
            className="aspect-[4/3] w-full object-contain"
          />
          <figcaption className="flex items-center justify-between gap-2 border-t border-border bg-white px-3 py-2.5 text-sm">
            <span className="font-medium text-foreground">Compressed</span>
            <span className="font-semibold tabular-nums text-success">
              {formatBytes(compressedSize)}
            </span>
          </figcaption>
        </figure>
      </div>

      <div
        ref={containerRef}
        className="relative hidden aspect-[16/10] overflow-hidden rounded-xl border border-border bg-slate-50 lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={originalUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={compressedUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-white shadow"
          style={{ left: `${position}%` }}
        >
          <button
            type="button"
            aria-label="Drag comparison slider"
            className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold text-slate-700 shadow-md"
            onPointerDown={(event) => {
              event.preventDefault();
              dragging.current = true;
            }}
          >
            ↔
          </button>
        </div>
        <div className="pointer-events-none absolute top-3 left-3 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white">
          Compressed
        </div>
        <div className="pointer-events-none absolute top-3 right-3 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white">
          Original
        </div>
      </div>
    </div>
  );
}
