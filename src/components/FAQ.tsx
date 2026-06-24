"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How much does cleaning cost?",
    a: "Our cleaning services start from $99 for a basic cleaning. Deep cleaning starts from $199, and move-out cleaning from $249. The final price depends on the size of your property, its condition, and the type of service. We provide free, no-obligation quotes so you know exactly what to expect.",
  },
  {
    q: "Are your cleaners insured and background checked?",
    a: "Absolutely. All our team members undergo thorough background checks before joining our team. We also carry full liability insurance and are bonded, so your property is always protected.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "No, you don't need to be home. Many of our customers provide a key or access code and we clean while they're at work. We'll send you a notification when the team arrives and when they're done.",
  },
  {
    q: "What cleaning products do you use?",
    a: "We use eco-friendly, non-toxic cleaning products that are safe for children, pets, and the environment. If you have specific product preferences or allergies, just let us know and we'll accommodate.",
  },
  {
    q: "How long does a cleaning take?",
    a: "A typical residential cleaning takes 2-4 hours depending on the size of your home and the type of service. Deep cleaning may take 4-6 hours. We'll give you a time estimate when you book.",
  },
  {
    q: "What if I'm not satisfied with the cleaning?",
    a: "We offer a 100% satisfaction guarantee. If you're not happy with any aspect of our cleaning, let us know within 24 hours and we'll come back and re-clean the affected areas for free. No questions asked.",
  },
  {
    q: "Can I book a same-day cleaning?",
    a: "Yes! We offer same-day and next-day cleaning services based on availability. Call us at (800) 555-0199 for urgent bookings. We'll do our best to accommodate your schedule.",
  },
  {
    q: "Do you offer recurring cleaning plans?",
    a: "Yes! We offer weekly, bi-weekly, and monthly recurring cleaning plans. Recurring customers save up to 20% and get priority booking with the same trusted team every visit.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-light text-blue font-semibold text-sm px-4 py-2 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Got questions? We've got answers.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border border-border rounded-2xl overflow-hidden transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-surface transition-colors min-h-[56px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-navy pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-orange text-white"
                        : "bg-surface text-gray-400"
                    }`}
                  >
                    {isOpen ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M20 12H4"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
