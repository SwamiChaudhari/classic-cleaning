'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const STORAGE_KEY = 'classic_cleaning_analytics';
const SCROLL_DEPTHS = [25, 50, 75, 100];

interface AnalyticsEvent {
  type: 'pageview' | 'scroll' | 'cta_click';
  path: string;
  timestamp: number;
  data?: Record<string, string | number>;
}

interface AnalyticsData {
  pageviews: Array<{ path: string; timestamp: number }>;
  scrollEvents: Array<{ path: string; depth: number; timestamp: number }>;
  ctaClicks: Array<{ path: string; ctaId: string; timestamp: number }>;
}

function getStoredData(): AnalyticsData {
  if (typeof window === 'undefined') {
    return { pageviews: [], scrollEvents: [], ctaClicks: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { pageviews: [], scrollEvents: [], ctaClicks: [] };
}

function setStoredData(data: AnalyticsData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function sendToEndpoint(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  const payload = JSON.stringify(event);
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics', payload);
  } else {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }
}

export function getAnalyticsData(): AnalyticsData {
  return getStoredData();
}

export default function AnalyticsTracker(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    const path = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    const timestamp = Date.now();

    const data = getStoredData();
    data.pageviews.push({ path, timestamp });
    setStoredData(data);

    sendToEndpoint({ type: 'pageview', path, timestamp });
  }, [pathname, searchParams]);

  // Track scroll depth
  useEffect(() => {
    const path = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    const triggeredDepths = new Set<number>();
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const checkScrollDepth = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      for (const depth of SCROLL_DEPTHS) {
        if (scrollPercent >= depth && !triggeredDepths.has(depth)) {
          triggeredDepths.add(depth);
          const timestamp = Date.now();
          const data = getStoredData();
          data.scrollEvents.push({ path, depth, timestamp });
          setStoredData(data);
          sendToEndpoint({ type: 'scroll', path, timestamp, data: { depth } });
        }
      }
    };

    const handleScroll = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(checkScrollDepth, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [pathname, searchParams]);

  // Track CTA button clicks
  useEffect(() => {
    const path = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const ctaButton = target.closest('[data-cta]') as HTMLElement | null;
      if (!ctaButton) return;

      const ctaId = ctaButton.getAttribute('data-cta') || 'unknown';
      const timestamp = Date.now();

      const data = getStoredData();
      data.ctaClicks.push({ path, ctaId, timestamp });
      setStoredData(data);

      sendToEndpoint({ type: 'cta_click', path, timestamp, data: { ctaId } });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [pathname, searchParams]);

  return null;
}
