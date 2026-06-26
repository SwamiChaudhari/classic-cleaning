/**
 * Analytics Integration Module
 * 
 * Supports multiple analytics providers:
 * - Google Analytics 4 (GA4)
 * - Plausible Analytics (privacy-friendly, self-hostable)
 * - Vercel Analytics (built-in with Vercel deployments)
 * - Custom internal analytics (file-based)
 * 
 * Usage:
 *   // In layout.tsx or app.tsx
 *   import { AnalyticsProvider } from '@/lib/analytics';
 *   <AnalyticsProvider provider="ga4" measurementId="G-XXXXXXX">
 *     {children}
 *   </AnalyticsProvider>
 * 
 *   // Track events
 *   import { trackEvent } from '@/lib/analytics';
 *   trackEvent('lead_capture', { source: 'quote_form', service: 'deep-cleaning' });
 */

export type AnalyticsProvider = "ga4" | "plausible" | "vercel" | "internal" | "none";

export interface AnalyticsConfig {
  provider: AnalyticsProvider;
  measurementId?: string; // GA4: G-XXXXXXX
  plausibleDomain?: string; // Plausible: your-domain.com
  enabled: boolean;
}

/**
 * Default analytics config — reads from environment variables.
 */
export function getAnalyticsConfig(): AnalyticsConfig {
  return {
    provider: (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER as AnalyticsProvider) || "internal",
    measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "",
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
    enabled: process.env.NODE_ENV === "production",
  };
}

/**
 * Track a custom event. Works with all providers.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;

  const config = getAnalyticsConfig();
  if (!config.enabled) return;

  switch (config.provider) {
    case "ga4":
      trackGA4Event(eventName, params);
      break;
    case "plausible":
      trackPlausibleEvent(eventName, params);
      break;
    case "vercel":
      trackVercelEvent(eventName, params);
      break;
    case "internal":
      trackInternalEvent(eventName, params);
      break;
  }
}

/**
 * Track conversion events (form submissions, bookings, etc.)
 */
export function trackConversion(
  type: "lead" | "booking" | "call" | "whatsapp",
  value?: number,
  currency?: string
): void {
  trackEvent("conversion", {
    conversion_type: type,
    value: value || 0,
    currency: currency || "INR",
  });
}

/**
 * Track page engagement (scroll depth, time on page)
 */
export function trackEngagement(
  type: "scroll" | "time" | "click",
  data: Record<string, string | number>
): void {
  trackEvent(`engagement_${type}`, data);
}

// --- Provider-specific implementations ---

function trackGA4Event(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && (window as unknown as { gtag?: unknown }).gtag) {
    const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
    gtag("event", eventName, params);
  }
}

function trackPlausibleEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && (window as unknown as { plausible?: unknown }).plausible) {
    const plausible = (window as unknown as { plausible: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void }).plausible;
    plausible(eventName, { props: params });
  }
}

function trackVercelEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && (window as unknown as { va?: unknown }).va) {
    const va = (window as unknown as { va: (type: string, data: { name: string; data?: Record<string, string | number | boolean> }) => void }).va;
    va("event", { name: eventName, data: params });
  }
}

function trackInternalEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  try {
    const payload = JSON.stringify({
      type: "custom_event",
      event: eventName,
      params: params || {},
      path: window.location.pathname,
      timestamp: Date.now(),
      sessionId: getSessionId(),
    });
    navigator.sendBeacon?.("/api/analytics", payload);
  } catch {
    // silent fail
  }
}

/**
 * Get or create a session ID for analytics.
 */
function getSessionId(): string {
  if (typeof window === "undefined") return "server";

  let sessionId = sessionStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
}

/**
 * Generate the analytics script tags for the selected provider.
 * Use this in the <head> of your layout.
 */
export function getAnalyticsScript(config: AnalyticsConfig): string {
  switch (config.provider) {
    case "ga4":
      return `
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${config.measurementId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${config.measurementId}');
</script>`.trim();

    case "plausible":
      return `
<!-- Plausible Analytics -->
<script defer data-domain="${config.plausibleDomain}" src="https://plausible.io/js/script.js"></script>`.trim();

    case "vercel":
      return `
<!-- Vercel Analytics -->
<script>
  window.va = window.va || function () { (window.vq = window.vq || []).push(arguments); };
</script>
<script src="/_vercel/insights/script.js" defer></script>`.trim();

    default:
      return "";
  }
}
