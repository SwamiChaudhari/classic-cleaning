"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/config/services";
import { blogPosts } from "@/config/blog";
import { faqs } from "@/config/faq";
import { areas } from "@/config/areas";

interface SearchResult {
  type: "service" | "blog" | "faq" | "area" | "page";
  title: string;
  subtitle: string;
  href: string;
}

const pages = [
  { type: "page" as const, title: "Home", subtitle: "Homepage", href: "/" },
  { type: "page" as const, title: "Services", subtitle: "All services", href: "/services" },
  { type: "page" as const, title: "Pricing", subtitle: "Transparent pricing", href: "/pricing" },
  { type: "page" as const, title: "About Us", subtitle: "Our story", href: "/about" },
  { type: "page" as const, title: "Gallery", subtitle: "Our work", href: "/gallery" },
  { type: "page" as const, title: "Reviews", subtitle: "Customer reviews", href: "/reviews" },
  { type: "page" as const, title: "Blog", subtitle: "Cleaning tips", href: "/blog" },
  { type: "page" as const, title: "Service Areas", subtitle: "Areas we serve", href: "/areas" },
  { type: "page" as const, title: "Contact", subtitle: "Get in touch", href: "/contact" },
];

export default function SearchSystem() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search services
    services.forEach((s) => {
      if (s.title.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q)) {
        searchResults.push({
          type: "service",
          title: s.title,
          subtitle: `Starting from ₹${s.startingPrice.toLocaleString("en-IN")}`,
          href: `/services/${s.slug}`,
        });
      }
    });

    // Search blog posts
    blogPosts.forEach((b) => {
      if (b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)) {
        searchResults.push({
          type: "blog",
          title: b.title,
          subtitle: `${b.category} · ${b.readTime} read`,
          href: `/blog/${b.slug}`,
        });
      }
    });

    // Search FAQs
    faqs.forEach((f) => {
      if (f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)) {
        searchResults.push({
          type: "faq",
          title: f.question,
          subtitle: f.category,
          href: "#faq",
        });
      }
    });

    // Search areas
    areas.forEach((a) => {
      if (a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)) {
        searchResults.push({
          type: "area",
          title: a.name,
          subtitle: `Pune · ${a.pincode}`,
          href: `/areas/${a.slug}`,
        });
      }
    });

    // Search pages
    pages.forEach((p) => {
      if (p.title.toLowerCase().includes(q)) {
        searchResults.push({
          type: "page",
          title: p.title,
          subtitle: p.subtitle,
          href: p.href,
        });
      }
    });

    setResults(searchResults.slice(0, 8));
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    router.push(result.href);
    setOpen(false);
    setQuery("");
  };

  const typeLabels: Record<string, string> = {
    service: "Service",
    blog: "Blog",
    faq: "FAQ",
    area: "Area",
    page: "Page",
  };

  const typeColors: Record<string, string> = {
    service: "bg-blue-light text-blue",
    blog: "bg-orange-light text-orange",
    faq: "bg-teal-light text-teal",
    area: "bg-emerald-light text-emerald",
    page: "bg-gray-100 text-gray-600",
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-xl text-sm text-gray-400 hover:border-blue/30 hover:text-gray-600 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white border border-border rounded text-[10px] font-medium text-gray-400">
          ⌘K
        </kbd>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4"
          >
            <div
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Sparkles className="w-5 h-5 text-teal shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services, areas, blog posts..."
                  className="flex-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface text-gray-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.trim() && results.length === 0 && (
                  <div className="p-8 text-center text-gray-400 text-sm">
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                )}

                {results.length > 0 && (
                  <div className="p-2">
                    {results.map((result, i) => (
                      <button
                        key={`${result.type}-${i}`}
                        onClick={() => handleSelect(result)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface transition-colors text-left group"
                      >
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${typeColors[result.type]}`}
                        >
                          {typeLabels[result.type]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-navy text-sm truncate">
                            {result.title}
                          </div>
                          <div className="text-xs text-gray-400 truncate">
                            {result.subtitle}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue shrink-0 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                )}

                {!query.trim() && (
                  <div className="p-4">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">
                      Quick Links
                    </p>
                    <div className="space-y-1">
                      {pages.slice(0, 5).map((page) => (
                        <button
                          key={page.href}
                          onClick={() => handleSelect(page)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface transition-colors text-left"
                        >
                          <span className="font-medium text-navy text-sm">{page.title}</span>
                          <span className="text-xs text-gray-400">— {page.subtitle}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-border flex items-center justify-between text-xs text-gray-400">
                <span>⌘K to open</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
