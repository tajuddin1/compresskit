type AnalyticsEvent =
  | "upload_image"
  | "compression_started"
  | "compression_completed"
  | "download_image"
  | "tool_used"
  | "conversion_completed"
  | "resize_completed";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return id && id.trim().length > 0 ? id.trim() : undefined;
}

export function trackEvent(event: AnalyticsEvent, params?: EventParams): void {
  if (typeof window === "undefined") return;

  const payload = {
    ...params,
    event_category: "engagement",
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    // Helpful during local development without sending data
    console.info("[analytics]", event, payload);
  }
}

export function trackToolUsed(toolId: string): void {
  trackEvent("tool_used", { tool_id: toolId });
}
