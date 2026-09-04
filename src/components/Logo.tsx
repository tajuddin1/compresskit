import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-80 ${className}`}
      aria-label="CompressKit home"
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="4"
            y="3"
            width="12"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M9 9h6M9 12h4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M16 14.5c2.2 0 4 1.2 4 3.25S18.2 21 16 21s-4-1.2-4-3.25 1.8-3.25 4-3.25Z"
            fill="currentColor"
            opacity="0.95"
          />
          <path
            d="M16 16.2v2.2M14.9 17.8h2.2"
            stroke="var(--primary)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {showText ? (
        <span className="font-display text-lg font-semibold tracking-tight">
          CompressKit
        </span>
      ) : null}
    </Link>
  );
}
