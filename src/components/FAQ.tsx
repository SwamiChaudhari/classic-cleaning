"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faqs, faqCategories } from "@/config/faq";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-orange font-semibold text-sm tracking-wider uppercase mb-3">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy font-[family-name:var(--font-poppins)]">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-3">
            Got questions? We&apos;ve got answers.
          </p>
        </motion.div>

        {/* Category filter — horizontally scrollable on mobile */}
        <div className="flex flex-nowrap sm:flex-wrap justify-center gap-2 mb-8 overflow-x-auto no-scrollbar px-2 sm:px-0">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-label={`Filter by ${cat}`}
              aria-pressed={activeCategory === cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-navy text-white"
                  : "bg-white text-gray-600 hover:bg-blue-light/50 border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-border overflow-hidden shadow-card"
            >
              <button
                onClick={() =>
                  setOpenId(openId === faq.id ? null : faq.id)
                }
                aria-expanded={openId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-navy pr-4">
                  {faq.question}
                </span>
                {openId === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-teal shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              <div
                id={`faq-answer-${faq.id}`}
                role="region"
                aria-labelledby={`faq-question-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-border pt-4">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
