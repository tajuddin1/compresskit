import { ADS_CONFIG, getAdSlotId, isAdsReady } from "@/lib/ads";

interface AdPlaceholderProps {
  label?: string;
  format?: "horizontal" | "rectangle" | "vertical";
  className?: string;
}

/** Only for local layout testing — not shown on production by default. */
export function AdPlaceholder({
  label = "Advertisement",
  format = "horizontal",
  className = "",
}: AdPlaceholderProps) {
  const minHeight =
    format === "horizontal"
      ? "min-h-[90px]"
      : format === "vertical"
        ? "min-h-[250px] lg:min-h-[600px]"
        : "min-h-[250px]";

  return (
    <div
      role="complementary"
      aria-label="Advertisement placeholder"
      className={`flex w-full items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50 text-xs font-medium uppercase tracking-[0.14em] text-zinc-400 ${minHeight} ${className}`}
    >
      {label}
    </div>
  );
}

interface AdSlotProps {
  slot: keyof typeof ADS_CONFIG.slots;
  className?: string;
}

function shouldShowPlaceholders(): boolean {
  return process.env.NEXT_PUBLIC_ADS_SHOW_PLACEHOLDERS === "true";
}

function AdSlot({ slot, className = "" }: AdSlotProps) {
  const config = ADS_CONFIG.slots[slot];
  const slotId = getAdSlotId(config.slotEnvKey);

  // Launch clean: hide empty ad boxes until AdSense is actually configured
  if (!isAdsReady() || !slotId) {
    if (!shouldShowPlaceholders()) return null;

    return (
      <AdPlaceholder
        label={config.label}
        format={config.format}
        className={`${config.className ?? ""} ${className}`}
      />
    );
  }

  return (
    <div className={`overflow-hidden ${className}`} aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADS_CONFIG.clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AdBanner({ className = "" }: { className?: string }) {
  if (!isAdsReady() && !shouldShowPlaceholders()) return null;

  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 ${className}`}>
      <AdSlot slot="banner" />
    </div>
  );
}

export function AdRectangle({ className = "" }: { className?: string }) {
  if (!isAdsReady() && !shouldShowPlaceholders()) return null;
  return <AdSlot slot="rectangle" className={className} />;
}

export function AdSidebar({ className = "" }: { className?: string }) {
  if (!isAdsReady() && !shouldShowPlaceholders()) return null;
  return <AdSlot slot="sidebar" className={`hidden xl:block ${className}`} />;
}
