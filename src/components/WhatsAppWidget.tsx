"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/config/services";
import { business } from "@/config/business";
import { generateQuoteMessage } from "@/lib/utils";

const propertyTypes = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "Villa",
  "Office",
  "Shop",
  "Restaurant",
  "Warehouse",
  "Other",
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [area, setArea] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!service || !propertyType || !name) return;

    const message = generateQuoteMessage({
      service,
      propertyType,
      area: area || "Not specified",
      name,
    });

    const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Reset form
    setService("");
    setPropertyType("");
    setArea("");
    setName("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 lg:bottom-8 lg:right-8 w-14 h-14 bg-emerald rounded-full shadow-lg shadow-emerald/30 flex items-center justify-center text-white hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors group"
        aria-label="Get a quote via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Card Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed z-50 bottom-0 left-0 right-0 lg:bottom-8 lg:left-auto lg:right-8 lg:w-[400px] bg-white rounded-t-2xl lg:rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald to-teal p-5 text-white relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Get a Free Quote</h3>
                    <p className="text-white/80 text-sm">
                      via {business.fullName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Service Select */}
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    Service Required *
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} - from {business.currencySymbol}
                        {s.startingPrice.toLocaleString("en-IN")}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type Select */}
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    Property Type *
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all"
                  >
                    <option value="">Select property type</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area / Locality Input */}
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    Area / Locality
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g., Kothrud, Hinjewadi, Baner..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!service || !propertyType || !name}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald to-teal text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  Generate Quote & Send
                </button>

                <p className="text-center text-xs text-gray-400">
                  You&apos;ll be redirected to WhatsApp with your quote details
                  pre-filled.
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
