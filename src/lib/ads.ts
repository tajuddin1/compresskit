export interface AdSlotConfig {
  id: string;
  label: string;
  format: "horizontal" | "rectangle" | "vertical";
  slotEnvKey: string;
  className?: string;
}

export const ADS_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_ADS_ENABLED === "true",
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "",
  slots: {
    banner: {
      id: "banner",
      label: "Advertisement",
      format: "horizontal" as const,
      slotEnvKey: "NEXT_PUBLIC_ADSENSE_SLOT_BANNER",
      className: "min-h-[90px]",
    },
    rectangle: {
      id: "rectangle",
      label: "Advertisement",
      format: "rectangle" as const,
      slotEnvKey: "NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE",
      className: "min-h-[250px]",
    },
    sidebar: {
      id: "sidebar",
      label: "Advertisement",
      format: "vertical" as const,
      slotEnvKey: "NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR",
      className: "min-h-[600px]",
    },
  },
};

export function getAdSlotId(slotEnvKey: string): string {
  const value = process.env[slotEnvKey];
  return value && value.trim().length > 0 ? value.trim() : "";
}

export function isAdsReady(): boolean {
  return Boolean(ADS_CONFIG.enabled && ADS_CONFIG.clientId);
}
