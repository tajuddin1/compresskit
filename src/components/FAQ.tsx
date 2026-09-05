"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import type { FaqItem } from "@/data/faq";

interface FAQProps {
  items: FaqItem[];
  title?: string;
  description?: string;
  id?: string;
  showHeading?: boolean;
}

export function FAQ({
  items,
  title = "Frequently Asked Questions",
  description = "Quick answers about privacy, quality and how CompressKit works.",
  id,
  showHeading = true,
}: FAQProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id={id} className="space-y-6">
      {showHeading ? (
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          {description ? <p className="mt-2 text-muted">{description}</p> : null}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <div
              key={item.question}
              className={index < items.length - 1 ? "border-b border-border" : ""}
            >
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface/70"
                >
                  <span className="pr-2 text-[15px] font-medium leading-snug text-foreground sm:text-base">
                    {item.question}
                  </span>
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition duration-200 ${
                      isOpen
                        ? "border-primary/25 bg-primary-soft text-primary"
                        : "border-border bg-white text-zinc-500"
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" strokeWidth={2.25} />
                    ) : (
                      <Plus className="h-4 w-4" strokeWidth={2.25} />
                    )}
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="faq-panel grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p
                    className={`px-5 pb-4 text-sm leading-relaxed text-muted transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function FaqCta() {
  return (
    <div className="rounded-2xl border border-border bg-surface px-6 py-8 text-center">
      <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
        Ready to compress an image?
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
        Free, private and fast — no signup required.
      </p>
      <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/compress-image"
          className="inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          Open Image Compressor
        </Link>
        <Link
          href="/tools"
          className="inline-flex rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/30"
        >
          Browse all tools
        </Link>
      </div>
    </div>
  );
}
