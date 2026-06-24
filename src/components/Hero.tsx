"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Star,
  Home,
  Sparkles,
  Clock,
  Shield,
  Award,
  CheckCircle2,
} from "lucide-react";
import { business } from "@/config/business";
import QuoteForm from "./QuoteForm";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy">
      {/* Animated background elements — staggered, GPU-friendly (opacity+transform only, reduced blur) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 0 }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-teal/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-10 right-10 w-52 h-52 bg-blue/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Trust badge pill */}
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 mb-6"
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
              </span>
              <span className="text-white/90 text-sm font-medium">
                ⭐ {business.rating} Rating | {business.reviewCount}+ Reviews | {business.homesCleaned.toLocaleString()}+ Homes
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUpVariants}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-5 font-[family-name:var(--font-poppins)]"
            >
              Professional{" "}
              <span className="gradient-text">Cleaning Services</span>{" "}
              In Pune You Can Trust
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUpVariants}
              className="text-base sm:text-lg text-white/70 mb-3 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Background-verified professionals. Eco-friendly products.
              Same-day service available. Serving 10+ areas across Pune.
            </motion.p>
            <motion.p
              custom={3}
              variants={fadeUpVariants}
              className="text-sm text-emerald font-semibold mb-6"
            >
              Starting from ₹499 — 1,500+ homes cleaned. Yours next.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
            >
              <Link
                href="#quote"
                className="bg-gradient-to-r from-orange to-gold hover:shadow-xl hover:shadow-orange-200/30 text-white font-bold px-7 py-4 rounded-xl text-lg transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 min-h-[56px]"
              >
                <Sparkles className="w-5 h-5" />
                Get Free Quote
              </Link>
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald hover:bg-emerald/90 text-white font-bold px-7 py-4 rounded-xl text-lg transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 min-h-[56px]"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href={`tel:${business.phone}`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold px-7 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2 min-h-[56px]"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              custom={4}
              variants={fadeUpVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {[
                { icon: Shield, text: "Fully Insured" },
                { icon: CheckCircle2, text: "Background Verified" },
                { icon: Clock, text: "Same Day Service" },
                { icon: Award, text: "4.8★ Rated" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10"
                >
                  <badge.icon className="w-3.5 h-3.5 text-emerald" />
                  <span className="text-white/90 text-xs sm:text-sm font-medium">
                    {badge.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Quote Form */}
          <motion.div
            custom={5}
            variants={fadeUpVariants}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal/20 to-blue/20 rounded-3xl blur-2xl" />
              <QuoteForm className="relative" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile quote form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="lg:hidden relative z-10 px-4 sm:px-6 pb-10"
      >
        <QuoteForm variant="compact" />
      </motion.div>
    </section>
  );
}
