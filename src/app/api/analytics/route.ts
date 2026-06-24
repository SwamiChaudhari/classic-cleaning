import { NextRequest, NextResponse } from "next/server";

// In-memory storage (simple array for demo — would be DB in production)
interface AnalyticsEvent {
  type: "page_view" | "scroll" | "click";
  page: string;
  timestamp: number;
  sessionId: string;
  source?: string;
  isConversion?: boolean;
}

const analyticsData: AnalyticsEvent[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, page, sessionId, source, isConversion } = body;

    if (!type || !page || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields: type, page, sessionId" },
        { status: 400 }
      );
    }

    if (!["page_view", "scroll", "click"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid event type. Must be: page_view, scroll, or click" },
        { status: 400 }
      );
    }

    const event: AnalyticsEvent = {
      type,
      page,
      timestamp: Date.now(),
      sessionId,
      source: source || "direct",
      isConversion: isConversion || false,
    };

    analyticsData.push(event);

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function GET() {
  // Calculate total visitors (unique sessions)
  const uniqueSessions = new Set(analyticsData.map((e) => e.sessionId));
  const totalVisitors = uniqueSessions.size;

  // Calculate total page views
  const pageViews = analyticsData.filter((e) => e.type === "page_view").length;

  // Calculate average session time
  const sessionTimes: Record<string, { first: number; last: number }> = {};
  for (const event of analyticsData) {
    if (!sessionTimes[event.sessionId]) {
      sessionTimes[event.sessionId] = { first: event.timestamp, last: event.timestamp };
    } else {
      sessionTimes[event.sessionId].last = Math.max(
        sessionTimes[event.sessionId].last,
        event.timestamp
      );
      sessionTimes[event.sessionId].first = Math.min(
        sessionTimes[event.sessionId].first,
        event.timestamp
      );
    }
  }

  let avgSessionTime = "0s";
  const sessionIds = Object.keys(sessionTimes);
  if (sessionIds.length > 0) {
    const totalTime = sessionIds.reduce((sum, id) => {
      return sum + (sessionTimes[id].last - sessionTimes[id].first);
    }, 0);
    const avgMs = totalTime / sessionIds.length;
    const avgSeconds = Math.round(avgMs / 1000);
    const minutes = Math.floor(avgSeconds / 60);
    const seconds = avgSeconds % 60;
    avgSessionTime =
      minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  }

  // Calculate bounce rate (sessions with only one page view)
  const sessionPageViews: Record<string, number> = {};
  for (const event of analyticsData) {
    if (event.type === "page_view") {
      sessionPageViews[event.sessionId] = (sessionPageViews[event.sessionId] || 0) + 1;
    }
  }
  const bouncedSessions = Object.values(sessionPageViews).filter((count) => count === 1).length;
  const totalSessionsWithPageViews = Object.keys(sessionPageViews).length;
  const bounceRate =
    totalSessionsWithPageViews > 0
      ? `${Math.round((bouncedSessions / totalSessionsWithPageViews) * 100)}%`
      : "0%";

  // Calculate top pages
  const pageViewCounts: Record<string, number> = {};
  for (const event of analyticsData) {
    if (event.type === "page_view") {
      pageViewCounts[event.page] = (pageViewCounts[event.page] || 0) + 1;
    }
  }
  const topPages = Object.entries(pageViewCounts)
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // Calculate traffic sources
  const sourceCounts: Record<string, number> = {};
  for (const event of analyticsData) {
    const source = event.source || "direct";
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
  }
  const totalEvents = analyticsData.length;
  const trafficSources = Object.entries(sourceCounts)
    .map(([source, count]) => ({
      source,
      percentage: totalEvents > 0 ? Math.round((count / totalEvents) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage);

  // Calculate conversions
  const conversions = analyticsData.filter((e) => e.isConversion).length;

  return NextResponse.json({
    totalVisitors,
    pageViews,
    avgSessionTime,
    bounceRate,
    topPages,
    trafficSources,
    conversions,
  });
}
