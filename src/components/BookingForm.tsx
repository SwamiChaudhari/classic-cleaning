"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, User, Check, Loader2 } from "lucide-react";
import { services } from "@/config/services";
import { business } from "@/config/business";
import { getAvailableDates, getAvailableSlots, validateBooking } from "@/lib/booking";

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    propertyType: "",
    address: "",
    area: "",
    date: "",
    timeSlot: "",
    message: "",
  });

  const availableDates = getAvailableDates(14);
  const availableSlots = getAvailableSlots(form.date, []);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validation = validateBooking(form);
    if (!validation.valid) {
      alert(validation.errors.join("\n"));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setBookingId(data.booking.id);
        setSubmitted(true);
      }
    } catch {
      alert("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="w-20 h-20 bg-emerald rounded-full flex items-center justify-center mx-auto mb-5">
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </div>
        <h3 className="text-2xl font-bold text-navy mb-2">Booking Confirmed!</h3>
        <p className="text-gray-500 mb-4">Your booking ID: <strong className="font-mono">{bookingId}</strong></p>
        <p className="text-gray-500 mb-6">We'll confirm your booking within 15 minutes via phone.</p>
        <a
          href={`tel:${business.phone}`}
          className="inline-flex items-center gap-2 bg-navy text-white font-bold px-6 py-3.5 rounded-xl"
        >
          <Phone className="w-4 h-4" /> Call Us
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-navy">Book Online</h3>
        <p className="text-gray-500 mt-1 text-sm">Select your service, date, and time.</p>
      </div>

      {/* Step 1: Service */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Service</label>
            <select
              required
              value={form.service}
              onChange={(e) => update("service", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm"
            >
              <option value="">Choose a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select
              value={form.propertyType}
              onChange={(e) => update("propertyType", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm"
            >
              <option value="">Select property type</option>
              {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Office", "Commercial"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => setStep(2)}
            disabled={!form.service}
            className="w-full bg-teal text-white font-bold py-3.5 rounded-xl disabled:opacity-50"
          >
            Next: Select Date
          </button>
        </motion.div>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" /> Select Date
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availableDates.slice(0, 8).map((date) => {
                const d = new Date(date);
                const day = d.toLocaleDateString("en-IN", { day: "numeric" });
                const month = d.toLocaleDateString("en-IN", { month: "short" });
                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => update("date", date)}
                    className={`rounded-lg p-2 text-center text-sm border transition-colors ${
                      form.date === date ? "bg-teal text-white border-teal" : "border-gray-200 hover:border-teal"
                    }`}
                  >
                    <div className="font-bold">{day}</div>
                    <div className="text-xs">{month}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {form.date && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline w-4 h-4 mr-1" /> Select Time Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => update("timeSlot", slot.label)}
                    className={`rounded-lg p-2.5 text-sm border transition-colors ${
                      form.timeSlot === slot.label
                        ? "bg-teal text-white border-teal"
                        : slot.available
                        ? "border-gray-200 hover:border-teal"
                        : "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-200 py-3 rounded-xl font-medium text-gray-600">Back</button>
            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={!form.date || !form.timeSlot}
              className="flex-1 bg-teal text-white font-bold py-3 rounded-xl disabled:opacity-50"
            >
              Next: Your Details
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Contact Details */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => update("name", e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl text-sm" />
            <input type="tel" placeholder="Phone Number" required value={form.phone} onChange={(e) => update("phone", e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl text-sm" />
          </div>
          <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" />
          <input type="text" placeholder="Area / Locality" value={form.area} onChange={(e) => update("area", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" />
          <textarea placeholder="Complete Address" required rows={2} value={form.address} onChange={(e) => update("address", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none" />
          <textarea placeholder="Any special instructions..." rows={2} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none" />

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="flex-1 border border-gray-200 py-3 rounded-xl font-medium text-gray-600">Back</button>
            <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-orange to-gold text-white font-bold py-3 rounded-xl disabled:opacity-50">
              {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Confirm Booking"}
            </button>
          </div>
        </motion.div>
      )}
    </form>
  );
}
