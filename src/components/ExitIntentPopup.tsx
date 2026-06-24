'use client';

import { useState, useEffect } from 'react';
import { X, Gift, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { business } from '@/config/business';
import Link from 'next/link';

const STORAGE_KEY = 'exitIntentShown';
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export default function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if popup was shown recently
    const shownAt = localStorage.getItem(STORAGE_KEY);
    if (shownAt) {
      const elapsed = Date.now() - parseInt(shownAt, 10);
      if (elapsed < SEVEN_DAYS) {
        return;
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowPopup(true);
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Store email for later use (could be sent to API)
    localStorage.setItem('exitIntentEmail', email);

    setIsLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      `Hi Classic Cleaning! I'd like to claim my 10% off my first cleaning service. My email is: ${email}`
    );
    const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)' }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-gray-100 transition-colors shadow-sm"
              aria-label="Close popup"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Gradient Header */}
            <div className="relative bg-gradient-to-r from-[#EA580C] to-[#F59E0B] px-6 pt-8 pb-12 text-center">
              {/* Decorative sparkles */}
              <Sparkles className="absolute top-4 left-6 w-5 h-5 text-yellow-200/60" />
              <Sparkles className="absolute top-6 right-8 w-4 h-4 text-yellow-200/50" />

              {/* Gift Icon */}
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4"
              >
                <Gift className="w-9 h-9 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold text-white leading-tight">
                Wait! Get 10% Off
                <br />
                Your First Cleaning
              </h2>
            </div>

            {/* Body Content */}
            <div className="px-6 pb-6 -mt-5">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-center text-gray-600 text-sm mb-4">
                        Book now and save on your first service
                      </p>

                      {/* Email Input */}
                      <div className="mb-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/40 focus:border-[#EA580C] transition-all placeholder:text-gray-400"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSubmit();
                          }}
                        />
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading || !email.includes('@')}
                        className="w-full py-3 px-4 bg-[#EA580C] hover:bg-[#EA580C]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg active:scale-[0.98]"
                      >
                        {isLoading ? (
                          <span className="inline-flex items-center gap-2">
                            <svg
                              className="animate-spin h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          'Claim My 10% Off'
                        )}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-2"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-[#059669]/10 rounded-full mb-3">
                        <Sparkles className="w-6 h-6 text-[#059669]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0B1D3A] mb-1">
                        You&apos;re All Set!
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        We&apos;ve reserved your 10% discount. Complete your booking via WhatsApp to claim it.
                      </p>
                      <button
                        onClick={handleWhatsAppRedirect}
                        className="w-full py-3 px-4 bg-[#059669] hover:bg-[#059669]/90 text-white font-semibold rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg active:scale-[0.98]"
                      >
                        Continue on WhatsApp
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-gray-700">4.8</span>
                    <span>Rating</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">1500+</span>
                    <span>Homes Cleaned</span>
                  </div>
                </div>
              </div>

              {/* No thanks link */}
              <button
                onClick={handleClose}
                className="block w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-3 transition-colors"
              >
                No thanks, I&apos;ll pay full price
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
