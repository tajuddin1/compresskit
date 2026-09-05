"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ensures each App Router navigation starts at the top of the page.
 * Hash links (e.g. /faq#privacy) keep their intended section jump.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Allow in-page anchors to work normally
    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
