"use client";

import { motion } from "framer-motion";
import { packages, formatPrice } from "@/config/pricing";
import { business } from "@/config/business";
import { faqs } from "@/config/faq";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import QuoteForm from "@/components/QuoteForm";
import { Check, Star, Zap, Shield, Phone, MessageCircle, X } from "lucide-react";

export default function PricingPage() {
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
            Transparent <span className="gradient-text">Pricing</span>
            </motion.h1>
            {/* Urgency banner */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-orange/10 border border-orange/20 text-orange font-semibold text-sm px-4 py-2 rounded-full mt-3"
            >
              <span className="flex h-2 w-2"><span className="animate-ping absolute h-2 w-2 rounded-full bg-orange opacity-75"></span><span className="relative h-2 w-2 rounded-full bg-orange"></span></span>
              Limited slots available this month — Book before 2 PM for same-day service
            </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg"
          >
            No hidden charges, ever. What you see is what you pay.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl p-6 transition-all duration-300 ${
                  pkg.popular
                    ? "ring-2 ring-orange shadow-xl scale-[1.02]"
                    : pkg.badge === "Best Value"
                    ? "ring-2 ring-gold shadow-lg"
                    : "border border-border shadow-card"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange to-gold text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Most Popular
                  </div>
                )}
                {pkg.badge === "Best Value" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-yellow-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> Best Value
                  </div>
                )}
                <h3 className="font-bold text-navy mb-1">{pkg.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{pkg.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-navy">
                    {formatPrice(pkg.price)}
                  </span>
                  {pkg.originalPrice && (
                    <span className="ml-2 text-sm text-gray-400 line-through">
                      {formatPrice(pkg.originalPrice)}
                    </span>
                  )}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#quote"
                  className={`block text-center font-bold py-3 rounded-xl transition-all ${
                    pkg.popular
                      ? "bg-gradient-to-r from-orange to-gold text-white hover:shadow-lg"
                      : "bg-navy text-white hover:bg-navy-light"
                  }`}
                >
                  Get Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-orange font-semibold text-sm tracking-wider uppercase">Comparison</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2 font-[family-name:var(--font-poppins)]">
              Classic Cleaning vs Others
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
            <div className="grid grid-cols-3 text-center font-semibold text-sm border-b border-border">
              <div className="p-4 text-gray-500">Feature</div>
              <div className="p-4 bg-teal text-white">Classic Cleaning</div>
              <div className="p-4 text-gray-500">Others</div>
            </div>
            {[
              ["Background Verified Staff", true, false],
              ["Same Day Service", true, false],
              ["Eco-Friendly Products", true, false],
              ["Satisfaction Guarantee", true, false],
              ["Transparent Pricing", true, false],
              ["Flexible Scheduling", true, false],
            ].map(([feature, us, them], i) => (
              <div key={i} className={`grid grid-cols-3 text-center text-sm ${i % 2 === 0 ? "bg-surface/50" : ""}`}>
                <div className="p-4 text-gray-600">{feature as string}</div>
                <div className="p-4 flex justify-center">
                  {us ? <Check className="w-5 h-5 text-emerald" /> : <span className="text-gray-300">—</span>}
                </div>
                <div className="p-4 flex justify-center">
                  {them ? <Check className="w-5 h-5 text-emerald" /> : <span className="text-gray-300">—</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Not Included */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-poppins)] text-center mb-8">
            What&apos;s Not Included
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Window cleaning (exterior, high-rise)",
              "Carpet shampooing (for standard cleaning)",
              "Chimel cleaning (for standard cleaning)",
              "Pet stain removal",
              "Construction debris removal",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-surface rounded-xl p-4 border border-border">
                <X className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Available as add-ons at extra cost. Ask for pricing.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-poppins)] text-center mb-8">
            Pricing FAQs
          </h2>
          <div className="space-y-3">
            {faqs.slice(0, 5).map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl p-5 border border-border">
                <h3 className="font-semibold text-navy text-sm mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="quote" className="py-16 lg:py-24 bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-white font-[family-name:var(--font-poppins)] text-center mb-2">
            Get Your Custom Quote
          </h2>
          <p className="text-white/60 text-center mb-8">
            Response within 15 minutes
          </p>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
