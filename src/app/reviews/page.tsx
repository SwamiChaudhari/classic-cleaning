"use client";

import { motion } from "framer-motion";
import { reviews, reviewStats } from "@/config/reviews";
import { business } from "@/config/business";
import Footer from "@/components/Footer";
import StickyBottomBar from "@/components/StickyBottomBar";
import Navbar from "@/components/Navbar";
import { Star, Quote, MapPin, CheckCircle2, ThumbsUp } from "lucide-react";

export default function ReviewsPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-poppins)] mb-4"
          >
            Customer <span className="gradient-text">Reviews</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg"
          >
            See what our customers across Pune are saying about us.
          </motion.p>
        </div>
      </section>

      {/* Rating Overview */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-5xl font-extrabold text-navy">{business.rating}</span>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{business.reviewCount}+ Google Reviews</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              {Object.entries(reviewStats.distribution)
                .reverse()
                .map(([stars, pct]) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-8">{stars}★</span>
                    <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-gold to-orange rounded-full"
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-10">{pct}%</span>
                  </div>
                ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl p-6 shadow-card border border-border hover:shadow-card-hover transition-all"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <div className="mb-3">
                  <Quote className="w-6 h-6 text-blue/20" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                {review.service && (
                  <span className="inline-block bg-teal-light text-teal text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider">
                    {review.service}
                  </span>
                )}
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal to-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-navy text-sm">
                        {review.name}
                      </span>
                      {review.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{review.location}</span>
                      <span>·</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4 font-[family-name:var(--font-poppins)]">
            Join Our Happy Customers
          </h2>
          <p className="text-white/70 mb-8">
            Book today and see why 1,500+ families trust Classic Cleaning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#quote"
              className="bg-gradient-to-r from-orange to-gold text-white font-bold px-8 py-4 rounded-xl"
            >
              Get Free Quote
            </a>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald text-white font-bold px-8 py-4 rounded-xl"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <StickyBottomBar />
    </main>
  );
}
