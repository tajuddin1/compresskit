import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: SITE_NAME,
    description: SITE_TAGLINE,
    path: "/",
    keywords: [
      "image compressor",
      "compress image",
      "compress jpg",
      "compress png",
      "image resizer",
      "image converter",
    ],
  }),
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://getcompresskit.vercel.app",
  ),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <AnalyticsScripts />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
