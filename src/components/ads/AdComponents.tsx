import { ADS_CONFIG, getAdSlotId, isAdsReady } from "@/lib/ads";

interface AdPlaceholderProps {
  label?: string;
  format?: "horizontal" | "rectangle" | "vertical";
  className?: string;
}

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
      className={`flex w-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-[0.14em] text-slate-400 ${minHeight} ${className}`}
    >
      {label}
    </div>
  );
}

interface AdSlotProps {
  slot: keyof typeof ADS_CONFIG.slots;
  className?: string;
}

function AdSlot({ slot, className = "" }: AdSlotProps) {
  const config = ADS_CONFIG.slots[slot];
  const slotId = getAdSlotId(config.slotEnvKey);

  if (!isAdsReady() || !slotId) {
    return (
      <AdPlaceholder
        label={config.label}
        format={config.format}
        className={`${config.className ?? ""} ${className}`}
      />
    );
  }

  // Live AdSense markup — activate by setting env vars and NEXT_PUBLIC_ADS_ENABLED=true
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
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>
      <AdSlot slot="banner" />
    </div>
  );
}

export function AdRectangle({ className = "" }: { className?: string }) {
  return <AdSlot slot="rectangle" className={className} />;
}

export function AdSidebar({ className = "" }: { className?: string }) {
  return <AdSlot slot="sidebar" className={`hidden xl:block ${className}`} />;
}
