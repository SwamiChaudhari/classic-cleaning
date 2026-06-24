"use client";

import Link from "next/link";

const PHONE = "+1-800-555-0199";
const PHONE_LINK = "tel:+1-800-555-0199";

export default function StickyBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.08)] pb-safe">
      <div className="flex items-center gap-2 p-3">
        {/* Call Now */}
        <a
          href={PHONE_LINK}
          className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-bold py-3.5 rounded-xl text-sm active:scale-95 transition-transform min-h-[48px]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          Call Now
        </a>

        {/* Get Free Quote — larger, pulsing */}
        <Link
          href="#quote"
          className="flex-[2] flex items-center justify-center gap-2 bg-orange text-white font-bold py-3.5 rounded-xl text-sm cta-pulse active:scale-95 transition-transform min-h-[48px]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Get Free Quote
        </Link>

        {/* Book Service */}
        <Link
          href="#quote"
          className="flex-1 flex items-center justify-center gap-2 bg-green text-white font-bold py-3.5 rounded-xl text-sm active:scale-95 transition-transform min-h-[48px]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Book
        </Link>
      </div>
    </div>
  );
}
