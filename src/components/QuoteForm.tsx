"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  Loader2,
} from "lucide-react";
import { services } from "@/config/services";
import { business } from "@/config/business";
import { generateQuoteMessage } from "@/lib/utils";

interface QuoteFormProps {
  variant?: "full" | "compact";
  className?: string;
}

const propertyTypes = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "Villa",
  "Office",
  "Commercial Space",
];

const TOTAL_STEPS = 3;

export default function QuoteForm({
  variant = "full",
  className = "",
}: QuoteFormProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    propertyType: "",
    area: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canProceed = () => {
    if (step === 1) return form.name.trim().length > 0 && form.phone.trim().length >= 10;
    if (step === 2) return form.service.length > 0;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleWhatsAppRedirect = () => {
    const selectedService = services.find((s) => s.id === form.service);
    const message = generateQuoteMessage({
      service: selectedService?.title || "General Cleaning",
      propertyType: form.propertyType,
      area: form.area,
      name: form.name,
    });
    const url = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selectedService = services.find((s) => s.id === form.service);
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          service: form.service,
          propertyType: form.propertyType,
          area: form.area,
          message: form.message,
          source: 'quote_form',
        }),
      });
    } catch (err) {
      console.error('Failed to submit lead:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  // Success state
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-white rounded-2xl shadow-xl p-8 text-center ${className}`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 bg-emerald rounded-full flex items-center justify-center mx-auto mb-5"
        >
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </motion.div>
        <h3 className="text-2xl font-bold text-navy mb-2">
          Quote Request Received!
        </h3>
        <p className="text-gray-500 mb-6">
          We&apos;ll contact you within 15 minutes with your free estimate.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${business.phone}`}
            className="inline-flex items-center justify-center gap-2 bg-navy text-white font-bold px-6 py-3.5 rounded-xl hover:bg-navy-light transition-all"
          >
            Call Us Now
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setForm({
                name: "",
                phone: "",
                service: "",
                propertyType: "",
                area: "",
                message: "",
              });
            }}
            className="inline-flex items-center justify-center gap-2 bg-surface border border-border text-navy font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-all"
          >
            Book Another
          </button>
        </div>
      </motion.div>
    );
  }

  const inputClasses =
    "w-full px-5 bg-surface border border-border rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all py-4 min-h-[52px]";

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-xl ${
        variant === "full" ? "p-6 sm:p-8" : "p-5"
      } ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-orange-light text-orange text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Free Quote
        </div>
        <h3
          className={`font-bold text-navy tracking-tight ${
            variant === "full" ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          Get Your Free Estimate
        </h3>
        <p className="text-gray-500 mt-1 text-sm">
          Takes less than 60 seconds. No obligation.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div key={i} className="flex-1 flex items-center gap-2">
            <div
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i < step
                  ? "bg-gradient-to-r from-orange to-gold"
                  : "bg-border"
              }`}
            />
          </div>
        ))}
        <span className="text-xs text-gray-400 font-medium ml-1 shrink-0">
          {step}/{TOTAL_STEPS}
        </span>
      </div>

      {/* Step 1: Name + Phone */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Your Full Name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClasses}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClasses}
          />
        </motion.div>
      )}

      {/* Step 2: Service + Property */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <select
            required
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className={`${inputClasses} ${
              !form.service ? "text-gray-400" : "text-gray-900"
            }`}
          >
            <option value="">Select Service Type</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} — {s.startingPrice ? `₹${s.startingPrice.toLocaleString("en-IN")}` : "Contact for price"}
              </option>
            ))}
          </select>
          <select
            value={form.propertyType}
            onChange={(e) => update("propertyType", e.target.value)}
            className={`${inputClasses} ${
              !form.propertyType ? "text-gray-400" : "text-gray-900"
            }`}
          >
            <option value="">Property Type</option>
            {propertyTypes.map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>
        </motion.div>
      )}

      {/* Step 3: Area + Message + Submit */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Area / Locality (e.g., Kothrud, Baner)"
            value={form.area}
            onChange={(e) => update("area", e.target.value)}
            className={inputClasses}
          />
          <textarea
            placeholder="Any special requirements... (Optional)"
            rows={3}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={`${inputClasses} resize-none`}
          />
          {/* Summary */}
          <div className="bg-surface rounded-xl p-4 border border-border">
            <p className="text-xs text-gray-500 mb-1 font-medium">Summary</p>
            <p className="text-sm text-gray-700 font-semibold">{form.name}</p>
            <p className="text-sm text-gray-500">{form.phone}</p>
            {form.service && (
              <p className="text-sm text-gray-500">
                {services.find((s) => s.id === form.service)?.title}
              </p>
            )}
            {form.propertyType && (
              <p className="text-sm text-gray-500">{form.propertyType}</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-4 rounded-xl font-bold text-gray-600 bg-surface border border-border hover:bg-gray-100 transition-colors min-h-[52px] flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-gradient-to-r from-orange to-gold hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all min-h-[52px] flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-orange to-gold hover:shadow-lg text-white font-bold py-4 rounded-xl text-lg transition-all min-h-[52px] flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Get My Free Quote
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      {/* WhatsApp alternative */}
      {step === TOTAL_STEPS && (
        <button
          type="button"
          onClick={handleWhatsAppRedirect}
          className="w-full mt-3 bg-emerald hover:bg-emerald/90 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <span className="text-lg">💬</span>
          Or send via WhatsApp
        </button>
      )}

      {/* Trust badge */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
        <Shield className="w-3.5 h-3.5" />
        <span>Your information is secure. No spam, ever.</span>
      </div>
    </form>
  );
}
