"use client";

import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Homeowner, Austin TX",
    source: "Google",
    rating: 5,
    quote:
      "Absolutely blown away by the attention to detail. They cleaned places I didn't even know existed. My kitchen has never looked this good!",
  },
  {
    id: 2,
    name: "James Rodriguez",
    role: "Business Owner, Denver CO",
    source: "Facebook",
    rating: 5,
    quote:
      "We use them for our office space every week. Professional, punctual, and our employees love coming to a clean workspace.",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Homeowner, Seattle WA",
    source: "Google",
    rating: 5,
    quote:
      "I've tried three other cleaning services before. This is the one that actually delivers on their promises. Five stars isn't enough.",
  },
  {
    id: 4,
    name: "Michael Thompson",
    role: "Property Manager, Miami FL",
    source: "Google",
    rating: 5,
    quote:
      "Managing 12 rental units is stressful enough. They handle turnovers flawlessly and my tenants always comment on how clean everything is.",
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Homeowner, Chicago IL",
    source: "Facebook",
    rating: 5,
    quote:
      "The team was friendly, thorough, and respectful of our home. They even organized my pantry without being asked. Above and beyond!",
  },
  {
    id: 6,
    name: "David Williams",
    role: "Homeowner, Atlanta GA",
    source: "Google",
    rating: 5,
    quote:
      "Booked a deep clean before hosting Thanksgiving. My mother-in-law said it was the cleanest house she'd ever seen. That says it all.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-green" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function SourceBadge({ source }: { source: string }) {
  const colors =
    source === "Google"
      ? "bg-blue-light text-blue"
      : "bg-blue-50 text-blue-700";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${colors}`}
    >
      {source === "Google" ? (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )}
      {source}
    </span>
  );
}

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Don't just take our word for it — hear from homeowners and businesses
            across the country.
          </p>

          {/* Overall Rating */}
          <div className="inline-flex items-center gap-3 bg-green-light rounded-2xl px-6 py-3">
            <span className="text-3xl font-bold text-green">4.9</span>
            <div>
              <StarRating rating={5} />
              <p className="text-sm text-gray-600 mt-0.5">
                Based on 100+ verified reviews
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: Swipeable Cards */}
        <div className="md:hidden">
          <div
            className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4 -mx-4 px-4 scrollbar-hide"
            onTouchStart={(e) => {
              const startX = e.touches[0].clientX;
              const handler = (ev: TouchEvent) => {
                const diff = ev.touches[0].clientX - startX;
                if (Math.abs(diff) > 60) {
                  if (diff < 0) next();
                  else prev();
                  document.removeEventListener("touchmove", handler);
                }
              };
              document.addEventListener("touchmove", handler, { once: true });
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="min-w-[85vw] snap-center flex-shrink-0"
              >
                <div className="rounded-2xl shadow-sm bg-surface border border-border p-6 h-full">
                  <SourceBadge source={t.source} />
                  <StarRating rating={t.rating} />
                  <p className="text-gray-700 mt-4 leading-relaxed text-[15px]">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-sm">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`View review ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === activeIndex
                    ? "bg-green w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: 3-Column Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl shadow-sm bg-surface border border-border p-6 hover:shadow-md transition-shadow"
            >
              <SourceBadge source={t.source} />
              <StarRating rating={t.rating} />
              <p className="text-gray-700 mt-4 leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-sm">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
