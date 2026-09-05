import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "CompressKit privacy policy explaining browser-side processing, analytics and advertising.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Privacy Policy
      </h1>
      <div className="prose-blog mt-8 space-y-5">
        <p>Last updated: September 5, 2026</p>
        <h2>Overview</h2>
        <p>
          CompressKit is designed so image compression, resizing and conversion
          happen in your browser. We do not require an account and we do not
          intentionally upload your images to our servers for processing.
        </p>
        <h2>Files you process</h2>
        <p>
          Images selected in the tools remain on your device during processing.
          Object URLs created in the browser are used for previews and downloads
          and should be revoked when you leave or reset the tool.
        </p>
        <h2>Analytics</h2>
        <p>
          If Google Analytics is enabled by the site operator, anonymous usage
          events such as tool usage and download actions may be collected to
          understand which features are helpful.
        </p>
        <h2>Advertising</h2>
        <p>
          The site may display advertisements through Google AdSense or similar
          partners. Ad partners may use cookies or similar technologies subject
          to their own policies.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:hello@getcompresskit.com">hello@getcompresskit.com</a>.
        </p>
      </div>
    </div>
  );
}
