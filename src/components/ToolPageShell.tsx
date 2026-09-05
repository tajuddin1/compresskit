import type { ReactNode } from "react";
import Link from "next/link";
import type { FaqItem } from "@/data/faq";
import { FAQ } from "@/components/FAQ";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdBanner, AdRectangle } from "@/components/ads/AdComponents";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/seo";

interface ToolPageShellProps {
  title: string;
  description: string;
  path: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  tool: ReactNode;
  children: ReactNode;
  faqs: FaqItem[];
  relatedLinks?: Array<{ href: string; label: string }>;
}

export function ToolPageShell({
  title,
  description,
  path,
  breadcrumbs,
  tool,
  children,
  faqs,
  relatedLinks = [],
}: ToolPageShellProps) {
  return (
    <div className="pb-20">
      <JsonLd data={softwareApplicationJsonLd(title, description, path)} />
      <JsonLd
        data={breadcrumbJsonLd(
          breadcrumbs.map((item) => ({
            name: item.label,
            path: item.href ?? path,
          })),
        )}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      </div>

      <div className="mt-8">
        <AdBanner />
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_280px] sm:px-6">
        <div className="min-w-0">{tool}</div>
        <aside className="space-y-6">
          <AdRectangle />
          {relatedLinks.length > 0 ? (
            <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <h2 className="text-sm font-semibold text-foreground">
                Related tools
              </h2>
              <ul className="mt-3 space-y-2">
                {relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>

      <div className="mx-auto mt-16 max-w-7xl space-y-12 px-4 sm:px-6">
        <div className="prose-blog space-y-10">{children}</div>
        <FAQ items={faqs} />
      </div>
    </div>
  );
}
