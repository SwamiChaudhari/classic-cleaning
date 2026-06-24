"use client";

import { motion } from "framer-motion";
import { areas } from "@/config/areas";
import { business } from "@/config/business";
import Footer from "@/components/Footer";
import StickyBottomBar from "@/components/StickyBottomBar";
import Navbar from "@/components/Navbar";
import { MapPin, Phone, MessageCircle, CheckCircle2, Navigation } from "lucide-react";

export default function AreasPage() {
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
            Serving All of <span className="gradient-text">Pune</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg mb-6"
          >
            From Kothrud to Hinjewadi — we cover all major areas.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "10+ Areas", icon: MapPin },
              { label: "1,500+ Homes", icon: CheckCircle2 },
              { label: "5+ Years", icon: Navigation },
              { label: "4.8★ Rating", icon: CheckCircle2 },
            ].map((stat, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                <stat.icon className="w-3.5 h-3.5 text-emerald" />
                {stat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.map((area, i) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, borderColor: "#2563EB" }}
                className="bg-white rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-light rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy">{area.name}</h3>
                    <span className="text-xs text-gray-400">Pincode: {area.pincode}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {area.landmarks.map((lm) => (
                    <span
                      key={lm}
                      className="bg-surface text-gray-600 text-[10px] px-2 py-0.5 rounded-full border border-border"
                    >
                      {lm}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <a
                    href={`https://wa.me/${business.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald text-white text-center text-sm font-semibold py-2.5 rounded-lg hover:bg-emerald/90 transition-colors"
                  >
                    Get Quote
                  </a>
                  <a
                    href={`tel:${business.phone}`}
                    className="flex-1 bg-navy text-white text-center text-sm font-semibold py-2.5 rounded-lg hover:bg-navy-light transition-colors"
                  >
                    Call
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-border p-6 shadow-card">
            <div className="aspect-[16/9] bg-gradient-to-br from-blue-light/30 to-teal-light/30 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue rounded-full blur-2xl" />
              </div>
              <div className="relative text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal to-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">10+ Areas Covered</h3>
                <p className="text-gray-500 text-sm max-w-sm">
                  Covering all major residential and commercial areas across Pune
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {areas.slice(0, 6).map((area) => (
                    <span
                      key={area.id}
                      className="bg-white text-navy text-xs font-medium px-3 py-1.5 rounded-full border border-border shadow-sm"
                    >
                      {area.name}
                    </span>
                  ))}
                  <span className="bg-orange text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    +{areas.length - 6} more
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Not Sure CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-navy to-navy-light rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-extrabold text-white mb-3 font-[family-name:var(--font-poppins)]">
              Not Sure If We Cover Your Area?
            </h2>
            <p className="text-white/70 mb-6">
              Call us or WhatsApp — we probably do! We&apos;re expanding coverage
              across Pune every month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${business.phone}`}
                className="bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {business.phone}
              </a>
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald/90 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Promise */}
      <section className="py-16 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-poppins)] text-center mb-10">
            Our Service Promise
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Same-Day Service", desc: "Book before 10 AM, get service today", icon: "⚡" },
              { title: "Quality Guaranteed", desc: "Not happy? We re-clean for free", icon: "✅" },
              { title: "Verified Staff", desc: "Background checked & trained professionals", icon: "🛡️" },
              { title: "Eco-Friendly", desc: "Safe chemicals for family & pets", icon: "🌿" },
            ].map((promise, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border text-center shadow-card"
              >
                <div className="text-3xl mb-3">{promise.icon}</div>
                <h3 className="font-bold text-navy mb-1">{promise.title}</h3>
                <p className="text-sm text-gray-500">{promise.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <StickyBottomBar />
    </main>
  );
}
