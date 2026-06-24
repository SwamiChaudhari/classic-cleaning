"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { services, serviceCategories, formatPrice } from "@/config/services";
import { business } from "@/config/business";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
} from "lucide-react";
import Footer from "@/components/Footer";
import StickyBottomBar from "@/components/StickyBottomBar";
import Navbar from "@/components/Navbar";

const iconMap: Record<string, React.ElementType> = {
  Home: Sparkles,
  Sparkles: Sparkles,
  CookingPot: Sparkles,
  Bath: Sparkles,
  Sofa: Sparkles,
  Building2: Sparkles,
  Store: Sparkles,
  PackageOpen: Sparkles,
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-poppins)] mb-4"
          >
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Professional cleaning solutions for homes and businesses across Pune.
            Transparent pricing, guaranteed quality.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
                className="group bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  {service.popular && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-orange to-gold text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Popular
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-lg font-bold">{service.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <ul className="space-y-2 mb-5">
                    {service.features.slice(0, 4).map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-navy font-bold text-lg">
                      {formatPrice(service.startingPrice)}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-sm text-blue font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-orange font-semibold text-sm tracking-wider uppercase">
              Why Us
            </span>
            <h2 className="text-3xl font-extrabold text-navy mt-2 font-[family-name:var(--font-poppins)]">
              Classic Cleaning vs Others
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-card border border-border overflow-hidden"
          >
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
              <div
                key={i}
                className={`grid grid-cols-3 text-center text-sm ${
                  i % 2 === 0 ? "bg-surface/50" : ""
                }`}
              >
                <div className="p-4 text-gray-600">{feature as string}</div>
                <div className="p-4 flex justify-center">
                  {us ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald" />
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </div>
                <div className="p-4 flex justify-center">
                  {them ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald" />
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4 font-[family-name:var(--font-poppins)]">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-white/70 mb-8">
            Call us or WhatsApp — we&apos;ll recommend the perfect service for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald hover:bg-emerald/90 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href={`tel:${business.phone}`}
              className="bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {business.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <StickyBottomBar />
    </main>
  );
}
