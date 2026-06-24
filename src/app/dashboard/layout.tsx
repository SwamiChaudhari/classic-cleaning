'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Home,
  Image,
  MessageSquare,
  Star,
  FileText,
  Tag,
  HelpCircle,
  Briefcase,
  DollarSign,
  Search,
  BarChart3,
  Activity,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Hero Editor', href: '/dashboard/hero', icon: Home },
  { label: 'Services', href: '/dashboard/services', icon: Settings },
  { label: 'Gallery', href: '/dashboard/gallery', icon: Image },
  { label: 'Videos', href: '/dashboard/videos', icon: MessageSquare },
  { label: 'Reviews', href: '/dashboard/reviews', icon: Star },
  { label: 'Blogs', href: '/dashboard/blogs', icon: FileText },
  { label: 'Offers', href: '/dashboard/offers', icon: Tag },
  { label: 'FAQs', href: '/dashboard/faqs', icon: HelpCircle },
  { label: 'Case Studies', href: '/dashboard/cases', icon: Briefcase },
  { label: 'Pricing', href: '/dashboard/pricing', icon: DollarSign },
  { label: 'SEO Settings', href: '/dashboard/seo', icon: Search },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Activity Logs', href: '/dashboard/activity', icon: Activity },
  { label: 'Media Library', href: '/dashboard/media', icon: Image },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleMobile = () => setMobileOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarOpen ? 256 : 64,
          x: mobileOpen ? 0 : -256,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-y-0 left-0 z-50 flex flex-col lg:relative lg:translate-x-0"
        style={{ backgroundColor: '#0B1D3A' }}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 overflow-hidden"
              >
                <Sparkles className="h-7 w-7 shrink-0 text-teal-400" />
                <span className="whitespace-nowrap text-lg font-bold text-white">
                  Classic Cleaning
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          {!sidebarOpen && (
            <Sparkles className="mx-auto h-7 w-7 text-teal-400" />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group relative mb-1 flex items-center gap-3 rounded-r-lg px-3 py-2.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-gray-900'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {/* Active left border */}
                {isActive && (
                  <motion.div
                    layoutId="active-border"
                    className="absolute left-0 top-0 h-full w-1 rounded-r"
                    style={{ backgroundColor: '#0D9488' }}
                  />
                )}
                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    isActive ? 'text-teal-600' : 'text-gray-400 group-hover:text-white'
                  }`}
                />
                <AnimatePresence mode="wait">
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap text-sm font-medium overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle (desktop) */}
        <div className="hidden border-t border-white/10 p-3 lg:block">
          <button
            onClick={toggleSidebar}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            {sidebarOpen ? (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span className="text-sm">Collapse</span>
              </>
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Logout */}
        <div className="border-t border-white/10 p-3">
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm overflow-hidden"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm">
          {/* Mobile hamburger */}
          <button
            onClick={toggleMobile}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop collapse toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:inline-flex"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-teal-500" />
              <span className="text-sm text-gray-600">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-6 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: '#EA580C' }}
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Website
            </Link>
            <span className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Classic Cleaning. All rights reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
