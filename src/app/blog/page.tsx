"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { blogPosts, blogCategories, getBlogsByCategory } from "@/config/blog";
import { business } from "@/config/business";
import Footer from "@/components/Footer";
import StickyBottomBar from "@/components/StickyBottomBar";
import Navbar from "@/components/Navbar";
import { Calendar, Clock, ArrowRight, User, Mail } from "lucide-react";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = getBlogsByCategory(activeCategory);
  const featured = blogPosts.find((b) => b.featured);

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
            Cleaning Tips & <span className="gradient-text">Guides</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg"
          >
            Expert advice for a cleaner, healthier home.
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Featured Post */}
          {featured && (
            <div className="mb-12">
              <div className="grid lg:grid-cols-2 gap-8 bg-gradient-to-br from-navy-50 to-teal-light/30 rounded-2xl overflow-hidden border border-border">
                <div className="aspect-video lg:aspect-auto">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  loading="lazy" />
                </div>
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <span className="inline-block bg-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-full w-fit mb-3">
                    Featured
                  </span>
                  <h2 className="text-2xl font-extrabold text-navy mb-3 font-[family-name:var(--font-poppins)]">
                    {featured.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {featured.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white text-gray-600 text-xs px-2.5 py-1 rounded-full border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-2 text-blue font-semibold hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-navy text-white"
                    : "bg-surface text-gray-600 hover:bg-blue-light/50 border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy" />
                </div>
                <div className="p-5">
                  <span className="inline-block bg-teal-light text-teal text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-navy text-sm mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{post.readTime} read</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-navy to-navy-light">
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          <Mail className="w-10 h-10 text-teal mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-white mb-2 font-[family-name:var(--font-poppins)]">
            Get Cleaning Tips in Your Inbox
          </h2>
          <p className="text-white/80 mb-6">
            Subscribe to our newsletter. No spam, unsubscribe anytime.
          </p>
          <form className="flex gap-2">
            <input
              type="email" aria-label="Email address"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-orange to-gold text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
      <StickyBottomBar />
    </main>
  );
}
