"use client";

import Link from "next/link";

import { Phone, MessageCircle, Sparkles } from "lucide-react";
import { business } from "@/config/business";

export default function StickyBottomBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.08)] pb-safe"
    >
      <div className="flex items-center gap-2 p-3">
        {/* Call Now */}
        <a
          href={`tel:${business.phone}`}
          className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-bold py-3.5 rounded-xl text-sm active:scale-95 transition-transform min-h-[48px]"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${business.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-emerald text-white font-bold py-3.5 rounded-xl text-sm active:scale-95 transition-transform min-h-[48px]"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>

        {/* Get Free Quote — larger, pulsing */}
        <Link
          href="#quote"
          className="flex-[2] flex items-center justify-center gap-2 bg-gradient-to-r from-orange to-gold text-white font-bold py-3.5 rounded-xl text-sm min-h-[48px]"
        >
          <Sparkles className="w-4 h-4" />
          Get Free Quote
        </Link>
      </div>
    </div>
  );
}
