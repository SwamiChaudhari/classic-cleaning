"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Mail,
  Star,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { business } from "@/config/business";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/areas", label: "Areas" },
  { href: "/contact", label: "Contact" },
];

const PHONE_LINK = `tel:${business.phone}`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Emergency Banner */}
      <div className="bg-orange text-white text-sm py-2 px-4 text-center font-medium overflow-hidden">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="animate-pulse">⚡</span>
          <span>Same Day Service Available</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Open 8 AM – 11 PM, 7 Days</span>
          <span className="hidden sm:inline">|</span>
          <a
            href={PHONE_LINK}
            className="hover:underline font-semibold hidden sm:inline"
          >
            Call {business.phone}
          </a>
        </div>
      </div>

      {/* Top info bar */}
      <div className="hidden lg:block bg-navy text-white text-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href={PHONE_LINK}
              className="flex items-center gap-2 hover:text-teal transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{business.phone}</span>
            </a>
            <a
              href={`mailto:${business.email}`}
              className="flex items-center gap-2 hover:text-teal transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{business.email}</span>
            </a>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              <span className="text-gold font-semibold">{business.rating}</span>
              <span className="text-white/70">
                | {business.reviewCount}+ Reviews
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70">{business.address.city}, {business.address.state}</span>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-green transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "shadow-md border-b border-border"
            : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-teal to-blue rounded-xl flex items-center justify-center shadow-soft">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="text-xl lg:text-[1.35rem] font-bold text-navy tracking-tight font-[family-name:var(--font-poppins)]">
                  Classic
                </span>
                <span className="text-xl lg:text-[1.35rem] font-bold text-teal tracking-tight font-[family-name:var(--font-poppins)]">
                  {" "}Cleaning
                </span>
                <span className="hidden sm:block text-[10px] text-gray-400 -mt-1 tracking-widest uppercase font-medium">
                  SERVICES
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-navy font-medium transition-colors text-[15px] relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange to-gold group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={PHONE_LINK}
                className="flex items-center gap-2 text-navy font-semibold hover:text-blue transition-colors"
              >
                <Phone className="w-4 h-4 text-teal" />
                <span>{business.phone.slice(0, 8)}...</span>
              </a>
              <Link
                href="/#quote"
                className="bg-gradient-to-r from-orange to-gold hover:shadow-lg hover:shadow-orange-200 text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                Get Free Quote
              </Link>
            </div>

            {/* Mobile: phone + hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={PHONE_LINK}
                className="w-10 h-10 flex items-center justify-center bg-navy rounded-xl text-white hover:bg-navy-light transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-emerald text-white rounded-xl hover:bg-emerald/90 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-10 h-10 flex items-center justify-center bg-orange rounded-xl text-white hover:bg-orange/90 transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen slide-in menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-border shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal to-blue rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold text-navy">Classic Cleaning</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface transition-colors text-gray-500"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center py-3.5 px-4 text-gray-700 hover:bg-blue-light/50 hover:text-navy rounded-xl font-medium text-base transition-colors min-h-[48px]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="px-5 pb-8 pt-4 border-t border-border space-y-3 shrink-0">
                <Link
                  href="/#quote"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-orange to-gold text-white font-bold py-4 rounded-xl text-lg cta-pulse transition-all hover:shadow-lg"
                >
                  Get Free Quote
                </Link>
                <div className="flex gap-3">
                  <a
                    href={PHONE_LINK}
                    className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-semibold py-3 rounded-xl text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${business.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald text-white font-semibold py-3 rounded-xl text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
