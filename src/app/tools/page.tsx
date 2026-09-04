import { ToolCard } from "@/components/ToolCard";
import { AdBanner } from "@/components/ads/AdComponents";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { categoryLabels, tools, type ToolItem } from "@/data/tools";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "All Tools",
  description:
    "Browse CompressKit image tools and upcoming PDF, developer and social media utilities.",
  path: "/tools",
});

const categories: ToolItem["category"][] = [
  "image",
  "pdf",
  "developer",
  "social",
];

export default function ToolsPage() {
  return (
    <div className="pb-20">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Tools" }]}
        />
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Tools
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          A growing directory of free browser-based utilities. Image tools are
          available now. PDF and developer tools are marked Coming Soon.
        </p>
      </div>

      <div className="mt-8">
        <AdBanner />
      </div>

      <div className="mx-auto mt-12 max-w-6xl space-y-14 px-4 sm:px-6">
        {categories.map((category) => {
          const items = tools.filter((tool) => tool.category === category);
          return (
            <section key={category}>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                {categoryLabels[category]}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
