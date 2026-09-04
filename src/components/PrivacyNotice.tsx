import { Lock } from "lucide-react";

export function PrivacyNotice() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-primary/15 bg-primary-soft/50 px-4 py-3 text-sm text-slate-700">
      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      <p>
        Your images are processed directly in your browser. Your files are not
        uploaded to our servers.
      </p>
    </div>
  );
}
