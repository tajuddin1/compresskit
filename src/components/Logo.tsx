import Link from "next/link";

interface LogoProps {
  className?: string;
}

/**
 * Brand monogram: open “C” with double compress chevrons in the letter opening.
 * Drawn as a custom mark — not a UI/icon-set glyph.
 */
function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M34 12a16.5 16.5 0 1 0 0 24"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M27.5 17.5 21 24l6.5 6.5"
        stroke="currentColor"
        strokeWidth="4.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.5 20.5 30 24l4.5 3.5"
        stroke="currentColor"
        strokeWidth="4.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="CompressKit home"
    >
      <Monogram className="h-8 w-8 shrink-0 text-primary transition-opacity group-hover:opacity-85 sm:h-[34px] sm:w-[34px]" />
      <span className="font-logo text-[1.28rem] font-extrabold leading-none tracking-[-0.035em] sm:text-[1.38rem]">
        <span className="text-foreground">Compress</span>
        <span className="text-primary">Kit</span>
      </span>
    </Link>
  );
}
