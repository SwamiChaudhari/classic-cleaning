"use client";

import { motion } from "framer-motion";
import { Building2, CheckCircle2 } from "lucide-react";

const commercialServices = [
  "Offices & Corporate Spaces",
  "Medical Clinics & Hospitals",
  "Retail Stores & Malls",
  "Restaurants & Cafes",
  "Warehouses & Factories",
  "Educational Institutions",
];

export default function Commercial() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="Professional office cleaning"
              className="w-full h-[350px] lg:h-[450px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <div className="glass rounded-lg px-4 py-2 text-white text-sm font-medium">
                🏢 Serving 50+ businesses in Pune
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-teal-light text-teal text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              Commercial Cleaning
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy font-[family-name:var(--font-poppins)] mb-4">
              Professional Cleaning for Businesses
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              From small offices to large commercial spaces — we keep your
              workplace clean, hygienic, and professional. Flexible scheduling
              available including after-hours and weekends.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {commercialServices.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="tel:07385169523"
                className="bg-gradient-to-r from-orange to-gold hover:shadow-lg text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-[1.03]"
              >
                Get Commercial Quote
              </a>
              <a
                href="https://wa.me/917385169523"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald hover:bg-emerald/90 text-white font-bold px-7 py-3.5 rounded-xl transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
