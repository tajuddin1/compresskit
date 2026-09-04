import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact the CompressKit team for feedback, partnership or support questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-20 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Contact
      </h1>
      <div className="prose-blog mt-8 space-y-5">
        <p>
          Have feedback, a feature request or a partnership idea? We would like
          to hear from you.
        </p>
        <p>
          Email:{" "}
          <a href="mailto:hello@getcompresskit.com">hello@getcompresskit.com</a>
        </p>
        <p>
          For privacy questions, please mention “Privacy” in the subject line.
          For advertising or AdSense-related setup help on your own deployment,
          include your site URL.
        </p>
        <p className="text-sm text-muted">
          This contact address is a placeholder for your production inbox.
          Update it before launch.
        </p>
      </div>
    </div>
  );
}
