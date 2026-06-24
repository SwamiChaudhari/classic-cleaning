"use client";

import { useState } from "react";

interface QuoteFormProps {
  variant?: "full" | "compact";
  className?: string;
}

const SERVICES = [
  { value: "", label: "Select Service Type" },
  { value: "residential", label: "Residential Cleaning" },
  { value: "deep", label: "Deep Cleaning" },
  { value: "moveout", label: "Move-In / Move-Out" },
  { value: "airbnb", label: "Airbnb / Vacation Rental" },
  { value: "office", label: "Office Cleaning" },
  { value: "commercial", label: "Commercial Cleaning" },
  { value: "construction", label: "Post-Construction" },
  { value: "recurring", label: "Recurring Plan" },
];

const TOTAL_STEPS = 3;

export default function QuoteForm({ variant = "full", className = "" }: QuoteFormProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canProceed = () => {
    if (step === 1) return form.name.trim().length > 0 && form.phone.trim().length > 0;
    if (step === 2) return form.service.length > 0;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Success state
  if (submitted) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-8 text-center ${className}`}>
        <div className="w-20 h-20 bg-green rounded-full flex items-center justify-center mx-auto mb-5 animate-fade-up">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-navy mb-2 animate-fade-up">Quote Request Received!</h3>
        <p className="text-gray-500 mb-6 animate-fade-up">
          We'll contact you within 15 minutes with your free estimate.
        </p>
        <a
          href="tel:+1-800-555-0199"
          className="inline-flex items-center gap-2 bg-orange text-white font-bold px-8 py-3.5 rounded-xl hover:bg-orange/90 transition-all animate-fade-up"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 01.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          Call Us Now
        </a>
      </div>
    );
  }

  const inputClasses =
    "w-full px-5 bg-surface border border-border rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all py-4 min-h-[52px]";

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-lg ${variant === "full" ? "p-6 sm:p-8" : "p-5"} ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
          Get Your Free Quote
        </h3>
        <p className="text-gray-500 mt-1 text-sm">Takes less than 60 seconds</p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div key={i} className="flex-1 flex items-center gap-2">
            <div
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i < step ? "bg-orange" : "bg-border"
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
        <div className="space-y-4">
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
        </div>
      )}

      {/* Step 2: Service + Email */}
      {step === 2 && (
        <div className="space-y-4">
          <select
            required
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className={`${inputClasses} ${!form.service ? "text-gray-400" : "text-gray-900"}`}
          >
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Email Address (Optional)"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClasses}
          />
        </div>
      )}

      {/* Step 3: Message + Submit */}
      {step === 3 && (
        <div className="space-y-4">
          <textarea
            placeholder="Tell us about your cleaning needs... (Optional)"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={`${inputClasses} resize-none`}
          />
          <div className="bg-surface rounded-xl p-4 border border-border">
            <p className="text-xs text-gray-500 mb-1">Summary</p>
            <p className="text-sm text-gray-700 font-medium">{form.name}</p>
            <p className="text-sm text-gray-500">{form.phone}</p>
            {form.email && <p className="text-sm text-gray-500">{form.email}</p>}
            <p className="text-sm text-gray-500 mt-1">
              {SERVICES.find((s) => s.value === form.service)?.label}
            </p>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-4 rounded-xl font-bold text-gray-600 bg-surface border border-border hover:bg-gray-100 transition-colors min-h-[52px]"
          >
            Back
          </button>
        )}
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-orange hover:bg-orange/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all min-h-[52px]"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-orange hover:bg-orange/90 text-white font-bold py-4 rounded-xl text-lg transition-all hover:shadow-lg active:scale-[0.98] min-h-[52px]"
          >
            Get My Free Quote →
          </button>
        )}
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        🔒 Your information is secure. No spam, ever.
      </p>
    </form>
  );
}
