"use client";

import Link from "next/link";
import QuoteForm from "./QuoteForm";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-green rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Trust badge pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Trusted by 500+ Happy Customers</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Professional{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-green">
                Cleaning Services
              </span>{" "}
              You Can Trust
            </h1>

            <p className="text-base sm:text-lg text-white/75 mb-6 max-w-lg mx-auto lg:mx-0">
              Background-checked professionals. Fully insured. Satisfaction guaranteed.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <Link
                href="#quote"
                className="bg-orange hover:bg-orange/90 text-white font-bold px-6 py-4 rounded-xl text-lg transition-all hover:shadow-xl hover:scale-[1.03] flex items-center justify-center gap-2 min-h-[52px]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Get Free Quote
              </Link>
              <a
                href="tel:+1-800-555-0199"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-bold px-6 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2 min-h-[52px]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call Now
              </a>
            </div>

            {/* Trust badges row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="text-green text-sm">✓</span>
                <span className="text-white/90 text-sm">Fully Insured</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="text-green text-sm">✓</span>
                <span className="text-white/90 text-sm">Background Checked</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="text-green text-sm">✓</span>
                <span className="text-white/90 text-sm">100% Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Right: Quote Form (desktop only) */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue/20 to-green/20 rounded-3xl blur-2xl" />
              <QuoteForm className="relative" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile quote form */}
      <div className="lg:hidden relative z-10 px-4 sm:px-6 pb-10">
        <QuoteForm variant="compact" />
      </div>
    </section>
  );
}
