"use client";

import { motion } from "framer-motion";
import { Home, Star, Shield, Clock, Users, Award } from "lucide-react";
import { business } from "@/config/business";

const stats = [
  {
    number: "1,500+",
    label: "Homes Cleaned",
    icon: Home,
    color: "text-teal",
    bg: "bg-teal-light",
  },
  {
    number: "4.8★",
    label: "Customer Rating",
    icon: Star,
    color: "text-gold",
    bg: "bg-orange-light",
  },
  {
    number: "151+",
    label: "Google Reviews",
    icon: Award,
    color: "text-blue",
    bg: "bg-blue-light",
  },
  {
    number: "5+",
    label: "Years Experience",
    icon: Users,
    color: "text-emerald",
    bg: "bg-emerald-light",
  },
  {
    number: "15min",
    label: "Response Time",
    icon: Clock,
    color: "text-orange",
    bg: "bg-orange-light",
  },
  {
    number: "100%",
    label: "Satisfaction",
    icon: Shield,
    color: "text-teal",
    bg: "bg-teal-light",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TrustIndicators() {
  return (
    <section className="py-4 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex lg:grid lg:grid-cols-6 gap-3 overflow-x-auto no-scrollbar pb-1 snap-x snap-mandatory"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 shrink-0 snap-start min-w-[150px] lg:min-w-0 ${stat.bg}`}
            >
              <div className={`${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-extrabold text-navy leading-tight">
                  {stat.number}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
