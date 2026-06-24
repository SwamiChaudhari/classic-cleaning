"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { areas } from "@/config/areas";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ServiceAreas() {
  return (
    <section id="areas" className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-orange font-semibold text-sm tracking-wider uppercase mb-3">
            Service Areas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy font-[family-name:var(--font-poppins)]">
            Serving Across Pune
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            From Kothrud to Hinjewadi — we cover all major areas in Pune.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Area cards grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {areas.map((area) => (
              <motion.div
                key={area.id}
                variants={itemVariants}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              >
                <Link
                  href={`/areas/${area.slug}`}
                  className="block bg-white rounded-xl p-4 border border-border hover:border-blue/30 transition-all h-full"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-teal" />
                    <span className="font-bold text-navy text-sm">
                      {area.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {area.description.slice(0, 60)}...
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-teal font-medium">
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl border border-border p-6 shadow-card">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-light/50 to-teal-light/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Stylized map illustration */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal rounded-full blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue rounded-full blur-2xl" />
                  <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-orange rounded-full blur-2xl" />
                </div>
                <div className="relative text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal to-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">
                    10+ Areas Served
                  </h3>
                  <p className="text-gray-500 text-sm max-w-xs">
                    Covering all major residential and commercial areas across
                    Pune
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {areas.slice(0, 5).map((area) => (
                      <span
                        key={area.id}
                        className="bg-white/80 text-navy text-xs font-medium px-3 py-1.5 rounded-full border border-border"
                      >
                        {area.name}
                      </span>
                    ))}
                    <span className="bg-orange text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      +{areas.length - 5} more
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/areas"
                  className="inline-flex items-center gap-2 text-blue font-semibold hover:text-teal transition-colors"
                >
                  View All Areas
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
