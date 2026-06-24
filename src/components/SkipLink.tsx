"use client";

import { useEffect } from "react";

export default function SkipLink() {
  useEffect(() => {
    // Focus skip link on Tab press
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Tab" && document.activeElement === document.body) {
        const skipLink = document.getElementById("skip-to-content");
        skipLink?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <a
      href="#main-content"
      id="skip-to-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-orange focus:text-white focus:px-6 focus:py-3 focus:rounded-xl focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 font-semibold text-sm transition-all"
    >
      Skip to main content
    </a>
  );
}
