"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SCROLL_DEPTHS = [25, 50, 75, 100];

export default function AnalyticsTracker(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const triggeredDepths = useRef(new Set<number>());
  const docHeightRef = useRef(0);
  const ticking = false;

  // Get current path including search params
  const getPath = () =>
    pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

  // Cache docHeight — only recalculate on resize/scroll-end
  const refreshDocHeight = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0) docHeightRef.current = h;
  };

  // Debounced scroll handler using rAF for efficiency
  const handleScroll = () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const docHeight = docHeightRef.current;
      if (docHeight <= 0) return;
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      for (const depth of SCROLL_DEPTHS) {
        if (
          scrollPercent >= depth &&
          !triggeredDepths.current.has(depth)
        ) {
          triggeredDepths.current.add(depth);
          try {
            const payload = JSON.stringify({
              type: "scroll",
              path: getPath(),
              timestamp: Date.now(),
              data: { depth },
            });
            navigator.sendBeacon?.("/api/analytics", payload);
          } catch {}
        }
      }
    });
  };

  // Track page views on route change
  useEffect(() => {
    const path = getPath();
    const timestamp = Date.now();
    try {
      const payload = JSON.stringify({
        type: "pageview",
        path,
        timestamp,
      });
      navigator.sendBeacon?.("/api/analytics", payload);
    } catch {}
  }, [pathname, searchParams]);

  // Scroll depth tracking — passive listener, no debounce needed with rAF
  useEffect(() => {
    refreshDocHeight();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", refreshDocHeight, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", refreshDocHeight);
    };
  }, [pathname, searchParams]);

  // Track CTA button clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const ctaButton = (e.target as HTMLElement).closest(
        "[data-cta]"
      ) as HTMLElement | null;
      if (!ctaButton) return;

      const ctaId = ctaButton.getAttribute("data-cta") || "unknown";
      try {
        const payload = JSON.stringify({
          type: "cta_click",
          path: getPath(),
          timestamp: Date.now(),
          data: { ctaId },
        });
        navigator.sendBeacon?.("/api/analytics", payload);
      } catch {}
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, searchParams]);

  return null;
}
