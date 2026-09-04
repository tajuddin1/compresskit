import Link from "next/link";
import { Share2, Globe, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SOCIAL_LINKS } from "@/lib/constants";

const footerColumns = [
  {
    title: "Image Tools",
    links: [
      { href: "/compress-image", label: "Image Compressor" },
      { href: "/compress-jpg", label: "JPG Compressor" },
      { href: "/compress-png", label: "PNG Compressor" },
      { href: "/compress-webp", label: "WebP Compressor" },
      { href: "/image-resizer", label: "Image Resizer" },
      { href: "/image-converter", label: "Image Converter" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
      { href: "/faq#how-it-works", label: "How It Works" },
      { href: "/tools", label: "All Tools" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Compress, resize and convert your images in seconds. Fast, private
            and completely free.
          </p>
          <div className="flex items-center gap-2">
            <a
              href={SOCIAL_LINKS.twitter}
              aria-label="Twitter (placeholder)"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-slate-500 transition hover:text-foreground"
            >
              <Share2 className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.github}
              aria-label="GitHub (placeholder)"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-slate-500 transition hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              aria-label="Facebook (placeholder)"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-slate-500 transition hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-foreground">
              {column.title}
            </h2>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 CompressKit. All rights reserved.</p>
          <p>Simple image tools, right in your browser.</p>
        </div>
      </div>
    </footer>
  );
}
