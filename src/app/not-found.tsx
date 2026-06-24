import Link from "next/link";
import { Sparkles, Home, Phone, MessageCircle } from "lucide-react";
import { business } from "@/config/business";

export default function Custom404() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative text-center max-w-lg">
        {/* Animated cleaning emoji */}
        <div className="text-8xl mb-6 animate-bounce">🧹</div>

        {/* 404 Text */}
        <h1 className="text-7xl sm:text-8xl font-extrabold text-white/10 font-[family-name:var(--font-poppins)] mb-2 select-none">
          404
        </h1>

        {/* Message */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange to-gold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3 font-[family-name:var(--font-poppins)]">
            Looks Like This Page Needs Cleaning Too!
          </h2>
          <p className="text-white/60 leading-relaxed">
            The page you&apos;re looking for seems to have been moved, cleaned up,
            or never existed. Let&apos;s get you back to a spotless experience.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-orange to-gold text-white font-bold px-7 py-4 rounded-xl hover:shadow-xl hover:shadow-orange-200/20 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald hover:bg-emerald/90 text-white font-bold px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>

        <div className="mt-6">
          <a
            href={`tel:${business.phone}`}
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            Or call us: {business.phone}
          </a>
        </div>

        {/* Fun cleaning tips */}
        <div className="mt-10 text-white/30 text-xs">
          <p>While you&apos;re here — did you know?</p>
          <p className="mt-1">
            A deep clean can improve indoor air quality by up to 50%. Book yours today!
          </p>
        </div>
      </div>
    </main>
  );
}
