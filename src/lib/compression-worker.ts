"use client";

/**
 * Compression worker helper.
 * Heavy multi-file jobs yield on the main thread via requestAnimationFrame
 * inside image-compression.ts. This worker is available for future OffscreenCanvas
 * pipelines without blocking UI updates.
 */

export type WorkerCompressRequest = {
  type: "ping";
};

export type WorkerCompressResponse = {
  type: "pong";
  ok: true;
};

export function createCompressionWorker(): Worker | null {
  if (typeof window === "undefined" || typeof Worker === "undefined") {
    return null;
  }

  const workerSource = `
    self.onmessage = (event) => {
      if (event.data?.type === 'ping') {
        self.postMessage({ type: 'pong', ok: true });
      }
    };
  `;

  const blob = new Blob([workerSource], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  URL.revokeObjectURL(url);
  return worker;
}
