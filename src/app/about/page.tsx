"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { business } from "@/config/business";
import { companyInfo, team } from "@/config/team";
import {
  ShieldCheck,
  Award,
  Heart,
  Leaf,
  Users,
  Target,
  Eye,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Footer from "@/components/Footer";
import StickyBottomBar from "@/components/StickyBottomBar";
import Navbar from "@/components/Navbar";

const valueIcons = [ShieldCheck, Award, Heart, Leaf];

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-5"
          >
            <span className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
            <span className="text-white/90 text-sm">About Us</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-poppins)] mb-4"
          >
            The Story Behind{" "}
            <span className="gradient-text">{business.name}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Founded in {companyInfo.founded} in {business.address.locality}, Pune —
            on a mission to make professional cleaning accessible to every home
            and business.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {companyInfo.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-2xl font-extrabold text-navy">{stat.value}</div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-orange font-semibold text-sm tracking-wider uppercase">Our Story</span>
              <h2 className="text-3xl font-extrabold text-navy mt-2 mb-4 font-[family-name:var(--font-poppins)]">
                From a Simple Idea to Pune&apos;s Trusted Cleaning Brand
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Classic Cleaning Services was founded in {companyInfo.founded} with a
                simple observation: families and businesses in Pune deserved
                access to professional, reliable, and affordable cleaning
                services — without the hassle of finding trustworthy local help.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Starting from a small team in {business.address.locality}, we&apos;ve
                grown to serve {companyInfo.stats[3].value} areas across Pune, clean over{" "}
                {companyInfo.stats[0].value} homes, and earn {companyInfo.stats[1].value} five-star
                reviews from happy customers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we&apos;re proud to be one of Pune&apos;s most trusted cleaning
                brands — known for quality, transparency, and customer satisfaction.
                But our mission remains the same as day one: deliver a cleaner,
                healthier space for every customer.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                  alt="Classic Cleaning team"
                  className="w-full h-[400px] object-cover"
                loading="lazy" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-navy text-sm">Verified Service</div>
                    <div className="text-xs text-gray-500">Background checked staff</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 text-white"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-poppins)]">Our Mission</h3>
              <p className="text-white/70 leading-relaxed">{companyInfo.mission}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-teal/10 to-blue/10 rounded-2xl p-8 border border-teal/20"
            >
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3 font-[family-name:var(--font-poppins)]">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">{companyInfo.vision}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-orange font-semibold text-sm tracking-wider uppercase">Our Values</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2 font-[family-name:var(--font-poppins)]">
              What We Stand For
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {companyInfo.values.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-6 shadow-card border border-border"
                >
                  <div className="w-10 h-10 bg-blue-light rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-blue" />
                  </div>
                  <h3 className="font-bold text-navy text-sm mb-1">{value.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-orange font-semibold text-sm tracking-wider uppercase">Our Team</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2 font-[family-name:var(--font-poppins)]">
              Meet the People Behind Classic Cleaning
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4 shadow-card">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  loading="lazy" />
                </div>
                <h3 className="font-bold text-navy">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
                <p className="text-xs text-teal font-medium mt-1">{member.experience}</p>
                {member.verified && (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <ShieldCheck className="w-3 h-3 text-emerald" />
                    <span className="text-xs text-emerald font-medium">Verified</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4 font-[family-name:var(--font-poppins)]">
            Ready to Experience the Difference?
          </h2>
          <p className="text-white/70 mb-8">
            Join thousands of happy customers across Pune.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-orange to-gold text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all"
            >
              Contact Us
            </Link>
            <a
              href={`tel:${business.phone}`}
              className="bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all"
            >
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <StickyBottomBar />
    </main>
  );
}
