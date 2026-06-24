"use client";

import Link from "next/link";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Globe,
  Video,
  ExternalLink,
} from "lucide-react";
import { business } from "@/config/business";

const serviceLinks = [
  { href: "/services/home-cleaning", label: "Home Cleaning" },
  { href: "/services/deep-cleaning", label: "Deep Cleaning" },
  { href: "/services/kitchen-cleaning", label: "Kitchen Cleaning" },
  { href: "/services/bathroom-cleaning", label: "Bathroom Cleaning" },
  { href: "/services/sofa-cleaning", label: "Sofa Cleaning" },
  { href: "/services/office-cleaning", label: "Office Cleaning" },
  { href: "/services/commercial-cleaning", label: "Commercial Cleaning" },
  { href: "/services/move-in-out", label: "Move-In / Move-Out" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const areaLinks = [
  { href: "/areas/kothrud", label: "Kothrud" },
  { href: "/areas/baner", label: "Baner" },
  { href: "/areas/warje", label: "Warje" },
  { href: "/areas/aundh", label: "Aundh" },
  { href: "/areas/hinjewadi", label: "Hinjewadi" },
  { href: "/areas/wakad", label: "Wakad" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-teal to-blue rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="text-xl font-bold text-white">
                  Classic Cleaning
                </span>
                <span className="block text-[10px] text-white/40 tracking-widest uppercase">
                  SERVICES
                </span>
              </div>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-sm">
              {business.description}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Globe, href: business.social.facebook, label: "Facebook" },
                { icon: Heart, href: business.social.instagram, label: "Instagram" },
                { icon: Globe, href: business.social.twitter, label: "Twitter" },
                { icon: ExternalLink, href: business.social.linkedin, label: "LinkedIn" },
                { icon: Video, href: business.social.youtube || "#", label: "YouTube" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 bg-white/10 hover:bg-teal rounded-lg flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-teal text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-teal text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <a
                  href={`tel:${business.phone}`}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {business.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <a
                  href={`mailto:${business.email}`}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <span className="text-sm text-white/80">
                  {business.address.full}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <span className="text-sm text-white/80">{business.hours}</span>
              </li>
            </ul>

            {/* Areas served quick links */}
            <div className="mt-6">
              <h5 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                Areas Served
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {areaLinks.map((area) => (
                  <Link
                    key={area.href}
                    href={area.href}
                    className="text-[11px] bg-white/10 hover:bg-teal/30 text-white/70 hover:text-white px-2 py-1 rounded transition-colors"
                  >
                    {area.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-white text-sm">
                Get Cleaning Tips & Offers
              </h4>
              <p className="text-white/50 text-xs">
                Subscribe to our newsletter. No spam, unsubscribe anytime.
              </p>
            </div>
            <form className="flex gap-2 w-full sm:w-auto">
              <input
                type="email" aria-label="Email address"
                placeholder="Your email address"
                className="flex-1 sm:w-56 px-4 py-2.5 bg-white/10 border border-white/10 rounded-lg text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-orange to-gold text-white font-semibold px-5 py-2.5 rounded-lg hover:shadow-lg transition-all flex items-center gap-1"
              >
                <span className="hidden sm:inline">Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} {business.fullName}. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/40">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
