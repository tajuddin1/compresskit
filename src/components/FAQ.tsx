interface FaqItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FaqItem[];
  title?: string;
  id?: string;
}

export function FAQ({ items, title = "Frequently Asked Questions", id }: FAQProps) {
  return (
    <section id={id} className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-muted">
          Quick answers about privacy, quality and how CompressKit works.
        </p>
      </div>

      <div className="divide-y divide-border rounded-2xl border border-border bg-white">
        {items.map((item) => (
          <details key={item.question} className="group px-5 py-4">
            <summary className="cursor-pointer list-none font-medium text-foreground marker:content-none">
              <div className="flex items-start justify-between gap-4">
                <span>{item.question}</span>
                <span className="mt-0.5 text-slate-400 transition group-open:rotate-45">
                  +
                </span>
              </div>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
