"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Sparkles,
  CookingPot,
  Bath,
  Sofa,
  Building2,
  Store,
  PackageOpen,
  ArrowRight,
} from "lucide-react";
import { services, formatPrice } from "@/config/services";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Sparkles,
  CookingPot,
  Bath,
  Sofa,
  Building2,
  Store,
  PackageOpen,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-orange font-semibold text-sm tracking-wider uppercase mb-3">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy font-[family-name:var(--font-poppins)]">
            Cleaning Solutions for Every Need
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            From deep home cleaning to commercial spaces — we do it all with
            professional care and attention to detail.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
                className="group bg-white rounded-2xl border border-border p-6 transition-all duration-300 hover:border-blue/30 relative overflow-hidden"
              >
                {service.popular && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-orange to-gold text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    Popular
                  </div>
                )}
                <div className="w-12 h-12 bg-blue-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue/10 transition-colors">
                  <Icon className="w-6 h-6 text-blue" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {service.shortDescription}
                </p>
                <ul className="space-y-2 mb-5">
                  {service.features.slice(0, 3).map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 bg-teal rounded-full shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-navy font-bold">
                    {formatPrice(service.startingPrice)}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-blue font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
