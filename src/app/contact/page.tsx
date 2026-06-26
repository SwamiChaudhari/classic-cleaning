"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { business } from "@/config/business";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Check,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          message: form.message,
          source: 'contact_form',
        }),
      });
    } catch (err) {
      console.error('Failed to submit:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-poppins)] mb-4"
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg"
          >
            We&apos;d love to hear from you. Book a service or ask a question — we respond within 15 minutes.
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-poppins)] mb-6">
                Send Us a Message
              </h2>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface rounded-2xl p-8 text-center border border-border"
                >
                  <div className="w-16 h-16 bg-emerald rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 mb-4">
                    We&apos;ll get back to you within 30 minutes during business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-blue font-semibold hover:underline text-sm"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                      className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Service Needed
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent text-gray-500"
                  >
                    <option value="">Select a service</option>
                    <option value="home-cleaning">Home Cleaning</option>
                    <option value="deep-cleaning">Deep Cleaning</option>
                    <option value="kitchen-cleaning">Kitchen Cleaning</option>
                    <option value="bathroom-cleaning">Bathroom Cleaning</option>
                    <option value="sofa-cleaning">Sofa Cleaning</option>
                    <option value="office-cleaning">Office Cleaning</option>
                    <option value="commercial-cleaning">Commercial Cleaning</option>
                    <option value="moveout">Move-In / Move-Out</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your cleaning needs..."
                    className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange to-gold text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-poppins)] mb-6">
                Contact Information
              </h2>

              {/* Quick Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${business.phone}`}
                  className="bg-blue-light/50 rounded-2xl p-5 border border-blue/10 hover:shadow-card transition-all group"
                >
                  <div className="w-10 h-10 bg-blue rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-navy text-sm mb-1">Call Us</h3>
                  <p className="text-blue font-semibold text-sm">{business.phone}</p>
                  <p className="text-xs text-gray-500 mt-1">Available 8 AM – 11 PM</p>
                </a>
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-light/50 rounded-2xl p-5 border border-emerald/10 hover:shadow-card transition-all group"
                >
                  <div className="w-10 h-10 bg-emerald rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-navy text-sm mb-1">WhatsApp</h3>
                  <p className="text-emerald font-semibold text-sm">+91 {business.whatsapp}</p>
                  <p className="text-xs text-gray-500 mt-1">Instant response</p>
                </a>
              </div>

              {/* Address & Hours */}
              <div className="bg-surface rounded-2xl p-6 border border-border space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm mb-1">Office Address</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {business.address.flat}<br />
                      {business.address.area}<br />
                      {business.address.locality}, {business.address.city} – {business.address.pincode}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm mb-1">Working Hours</h3>
                    <p className="text-sm text-gray-600">{business.hours}</p>
                    <p className="text-xs text-emerald font-medium mt-1">
                      ⚡ Emergency service available 24/7
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm mb-1">Email</h3>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-sm text-blue hover:underline"
                    >
                      {business.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-light/30 to-teal-light/30 rounded-2xl border border-border overflow-hidden">
                <div className="aspect-[16/9] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal to-blue rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-navy mb-1">Located in Kothrud, Pune</h3>
                    <p className="text-sm text-gray-500">
                      Serving all areas across Pune
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
