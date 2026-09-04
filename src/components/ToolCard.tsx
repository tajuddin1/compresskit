import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ToolItem } from "@/data/tools";

interface ToolCardProps {
  tool: ToolItem;
}

export function ToolCard({ tool }: ToolCardProps) {
  const isComingSoon = tool.status === "coming-soon";

  const content = (
    <div
      className={`group h-full rounded-2xl border border-border bg-white p-5 shadow-soft transition ${
        isComingSoon
          ? "opacity-80"
          : "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">{tool.name}</h3>
        {isComingSoon ? (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Coming Soon
          </span>
        ) : (
          <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-primary" />
        )}
      </div>
      <p className="text-sm leading-relaxed text-muted">{tool.description}</p>
    </div>
  );

  if (isComingSoon) {
    return (
      <div aria-disabled="true" className="cursor-default">
        {content}
      </div>
    );
  }

  return (
    <Link href={tool.href} className="block h-full">
      {content}
    </Link>
  );
}
