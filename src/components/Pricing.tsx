"use client";

import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";
import { packages, formatPrice } from "@/config/pricing";
import { business } from "@/config/business";

const comparisonData = [
  { label: "Transparent Pricing", classic: true, others: false },
  { label: "No Hidden Charges", classic: true, others: false },
  { label: "Trained & Verified Staff", classic: true, others: "partial" },
  { label: "Eco-Friendly Products", classic: true, others: false },
  { label: "Same-Day Service Available", classic: true, others: "partial" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block bg-teal/10 text-teal font-semibold text-sm tracking-wider uppercase px-4 py-2 rounded-full mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mb-3">
            Simple, Honest Pricing
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            No hidden charges, ever. Get an exact quote for your specific needs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 ${
                pkg.popular
                  ? "ring-2 ring-orange shadow-xl shadow-orange/10 z-10 lg:scale-[1.03]"
                  : pkg.badge === "Best Value"
                  ? "border-2 border-gold/40 shadow-lg shadow-gold/10"
                  : "border border-gray-200 shadow-sm hover:shadow-lg"
              }`}
            >
              {/* Badges */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange to-orange/85 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                  <Zap className="w-3 h-3 inline mr-1 -mt-0.5" />
                  Most Popular
                </div>
              )}

              {pkg.badge === "Best Value" && !pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                  <Star className="w-3 h-3 inline mr-1 -mt-0.5" />
                  Best Value
                </div>
              )}

              {/* Plan Name & Description */}
              <h3 className="text-lg font-bold text-navy mb-1">{pkg.name}</h3>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                {pkg.description}
              </p>

              {/* Pricing */}
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-navy">
                  {formatPrice(pkg.price)}
                </span>
                {pkg.originalPrice && (
                  <span className="ml-2 text-gray-400 line-through text-sm">
                    {formatPrice(pkg.originalPrice)}
                  </span>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 mb-7">
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-gray-600"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald/10 text-emerald flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="#quote"
                className={`block w-full text-center font-bold py-3.5 rounded-xl transition-all min-h-[48px] ${
                  pkg.popular
                    ? "bg-gradient-to-r from-orange to-orange/90 hover:from-orange hover:to-orange/80 text-white shadow-lg shadow-orange/20 hover:shadow-xl hover:shadow-orange/30"
                    : pkg.badge === "Best Value"
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white shadow-md"
                    : "bg-navy hover:bg-navy/90 text-white"
                }`}
              >
                Get Quote
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="mt-16 lg:mt-20 bg-gray-50 rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy mb-2">
              Why Choose {business.name}?
            </h3>
            <p className="text-gray-500 text-sm">
              See how we compare to the competition
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Comparison Header */}
            <div className="grid grid-cols-3 gap-4 mb-4 px-1">
              <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Feature
              </div>
              <div className="text-xs sm:text-sm font-bold text-navy text-center">
                {business.name}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-500 text-center">
                Others
              </div>
            </div>

            {/* Comparison Rows */}
            {comparisonData.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 gap-4 items-center py-3 px-1 ${
                  i < comparisonData.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <span className="text-sm text-gray-700 font-medium">
                  {item.label}
                </span>
                <div className="flex justify-center">
                  <span className="w-6 h-6 rounded-full bg-emerald text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                </div>
                <div className="flex justify-center">
                  {item.others === true ? (
                    <span className="w-6 h-6 rounded-full bg-emerald text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                  ) : item.others === "partial" ? (
                    <span className="w-6 h-6 rounded-full bg-yellow-400 text-white flex items-center justify-center text-xs font-bold">
                      ~
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center">
                      <span className="text-xs font-bold">−</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          All prices are starting from. Final price depends on property size and
          condition.{" "}
          <Link
            href="#quote"
            className="text-orange font-semibold hover:underline"
          >
            Get your exact quote
          </Link>{" "}
          in 60 seconds.
        </p>
      </div>
    </section>
  );
}
