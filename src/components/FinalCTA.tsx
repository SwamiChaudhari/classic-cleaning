"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import QuoteForm from "./QuoteForm";

export default function FinalCTA() {
  return (
    <section id="quote" className="py-16 lg:py-24 bg-gradient-to-br from-navy via-navy-light to-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-teal rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 -left-20 w-80 h-80 bg-orange rounded-full blur-[100px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="inline-block text-orange font-semibold text-sm tracking-wider uppercase mb-4">
              Get Started Today
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-poppins)] mb-5">
              Ready For a{" "}
              <span className="gradient-text">Cleaner Space?</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg">
              Join {business.homesCleaned.toLocaleString()}+ happy customers.
              Get your free quote in less than 60 seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald hover:bg-emerald/90 text-white font-bold px-7 py-4 rounded-xl text-lg transition-all hover:scale-[1.03] flex items-center justify-center gap-2 min-h-[56px]"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <a
                href={`tel:${business.phone}`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold px-7 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2 min-h-[56px]"
              >
                <Phone className="w-5 h-5" />
                {business.phone}
              </a>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald">✓</span> Free Quote
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald">✓</span> No Obligation
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald">✓</span> Response in 15 min
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal/20 to-blue/20 rounded-3xl blur-2xl" />
              <QuoteForm className="relative" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
