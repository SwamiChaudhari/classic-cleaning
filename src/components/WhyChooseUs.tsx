"use client";

import { ShieldCheck, Leaf, Users, Wrench, IndianRupee, Clock, Zap, Heart } from "lucide-react";
import Link from "next/link";
import { business } from "@/config/business";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Background Verified Staff",
    description:
      "Every team member undergoes thorough police verification and background checks.",
    color: "text-blue",
    bg: "bg-blue-light",
  },
  {
    icon: Leaf,
    title: "Safe Chemicals",
    description:
      "Eco-friendly, non-toxic products safe for children, pets, and surfaces.",
    color: "text-emerald",
    bg: "bg-emerald-light",
  },
  {
    icon: Users,
    title: "Trained Professionals",
    description:
      "Our team is professionally trained in advanced cleaning techniques.",
    color: "text-teal",
    bg: "bg-teal-light",
  },
  {
    icon: Wrench,
    title: "Premium Equipment",
    description:
      "We use professional-grade equipment for superior cleaning results.",
    color: "text-orange",
    bg: "bg-orange-light",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description:
      "Transparent pricing with no hidden charges. Best rates in Pune.",
    color: "text-gold",
    bg: "bg-orange-light",
  },
  {
    icon: Clock,
    title: "Same Day Service",
    description:
      "Need urgent cleaning? We offer same-day service across Pune.",
    color: "text-blue",
    bg: "bg-blue-light",
  },
  {
    icon: Zap,
    title: "Fast Response",
    description:
      "We respond to your booking request within 15 minutes.",
    color: "text-teal",
    bg: "bg-teal-light",
  },
  {
    icon: Heart,
    title: "100% Satisfaction Guarantee",
    description:
      "Not happy? We'll re-clean for free. Your satisfaction is our priority.",
    color: "text-orange",
    bg: "bg-orange-light",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-orange font-semibold text-sm tracking-wider uppercase mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy font-[family-name:var(--font-poppins)]">
            Pune&apos;s Most Trusted Cleaning Service
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            We don&apos;t just clean — we deliver peace of mind with every service.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 hover:-translate-y-1"
              >
                <div
                  className={`w-10 h-10 ${benefit.bg} rounded-xl flex items-center justify-center mb-3`}
                >
                  <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                </div>
                <h3 className="font-bold text-navy text-sm mb-1">
                  {benefit.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-navy via-navy-light to-teal/40 h-[400px] lg:h-[500px]">
              {/* Decorative CSS-only background replacing Unsplash image — saves ~300KB */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-teal rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-blue rounded-full blur-2xl" />
                <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-emerald rounded-full blur-2xl" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-dark rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-teal to-blue border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                        >
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        1,500+ Happy Customers
                      </p>
                      <p className="text-white/70 text-xs">
                        Trust {business.name} for their homes & offices
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badge — CSS-only animation, no JS cost */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange to-gold text-white rounded-2xl px-4 py-3 shadow-lg animate-bounce-slow">
              <div className="text-center">
                <div className="text-2xl font-extrabold">4.8★</div>
                <div className="text-[10px] font-medium opacity-90">
                  151+ Reviews
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="#quote"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-gold hover:shadow-xl hover:shadow-orange-200/30 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.03]"
          >
            Book Your Cleaning Now
          </Link>
        </div>
      </div>
    </section>
  );
}
