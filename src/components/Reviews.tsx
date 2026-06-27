"use client";

import { Star, Quote, MapPin, CheckCircle2 } from "lucide-react";
import { reviews } from "@/config/reviews";
import { business } from "@/config/business";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-gold fill-gold" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-border p-6 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Quote */}
      <div className="mt-4 flex-1">
        <Quote className="w-6 h-6 text-teal/30 mb-2 -scale-x-100" />
        <p className="text-gray-600 leading-relaxed text-[15px]">
          {review.text}
        </p>
      </div>

      {/* Service Tag */}
      {review.service && (
        <div className="mt-4">
          <span className="inline-block bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full">
            {review.service}
          </span>
        </div>
      )}

      {/* Customer Info */}
      <div className="mt-5 pt-5 border-t border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-sm shrink-0">
          {review.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-navy text-sm truncate">
              {review.name}
            </p>
            {review.verified && (
              <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{review.location}</span>
            <span className="mx-1">·</span>
            <span className="shrink-0">{review.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  // Single render — CSS handles infinite scroll animation, no JS rAF loop
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Google Logo Placeholder */}
          <div className="inline-flex items-center gap-2 mb-4">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-semibold text-gray-600">Google Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy font-[family-name:var(--font-poppins)]">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from homeowners and
            businesses across Pune who trust {business.name}.
          </p>

          {/* Overall Rating */}
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-3 mt-6 shadow-card border border-border">
            <span className="text-3xl font-bold text-navy">
              {business.rating}
            </span>
            <div>
              <StarRating rating={Math.round(business.rating)} />
              <p className="text-sm text-gray-500 mt-0.5">
                Based on {business.reviewCount}+ verified reviews
              </p>
            </div>
          </div>
        </div>

        {/* CSS-only infinite scroll carousel — no JS rAF loop, no duplicated DOM */}
        <div className="overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="flex gap-5 animate-scroll-left">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="min-w-[300px] sm:min-w-[350px] lg:min-w-[380px] flex-shrink-0"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
