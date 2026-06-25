"use client";

import { ClipboardList, CalendarCheck, Sparkles, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Request Quote",
    description:
      "Fill the quick form or WhatsApp us. Get a response within 15 minutes.",
    color: "text-blue",
    bg: "bg-blue-light",
    number: "01",
  },
  {
    icon: CalendarCheck,
    title: "Schedule Service",
    description:
      "Pick a convenient date & time. We work around your schedule.",
    color: "text-teal",
    bg: "bg-teal-light",
    number: "02",
  },
  {
    icon: Sparkles,
    title: "Professional Cleaning",
    description:
      "Our trained team arrives on time with premium equipment & eco-friendly products.",
    color: "text-orange",
    bg: "bg-orange-light",
    number: "03",
  },
  {
    icon: ShieldCheck,
    title: "Quality Check & Satisfaction",
    description:
      "We inspect every corner. Not happy? We re-clean for free.",
    color: "text-emerald",
    bg: "bg-emerald-light",
    number: "04",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-orange font-semibold text-sm tracking-wider uppercase mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy font-[family-name:var(--font-poppins)]">
            Simple 4-Step Process
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            From booking to sparkling clean — it&apos;s that easy.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue via-teal via-orange to-emerald opacity-20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                {/* Step number circle */}
                <div className="relative mx-auto mb-5">
                  <div
                    className={`w-14 h-14 ${step.bg} rounded-2xl flex items-center justify-center mx-auto shadow-card relative z-10`}
                  >
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-navy rounded-full flex items-center justify-center text-white text-[10px] font-bold z-20">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[250px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
