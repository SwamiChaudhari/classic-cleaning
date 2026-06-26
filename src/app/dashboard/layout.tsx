"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  MessageSquare,
  Star,
  FileText,
  Tag,
  HelpCircle,
  Briefcase,
  Search,
  BarChart3,
  LogOut,
  Bell,
  Menu,
  X,
  Sparkles,
  Users,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { business } from "@/config/business";

const navItems = [
  { name: 'Leads', icon: Users, href: '/dashboard/leads' },
  { name: 'Bookings', icon: Calendar, href: '/dashboard/bookings' },
  { name: 'Services', icon: Briefcase, href: '/dashboard/services' },
  { name: 'Gallery', icon: Image, href: '/dashboard/gallery' },
  { name: 'Media Library', icon: MessageSquare, href: '/dashboard/media' },
  { name: 'Reviews', icon: Star, href: '/dashboard/reviews' },
  { name: 'Blogs', icon: FileText, href: '/dashboard/blogs' },
  { name: 'Offers', icon: Tag, href: '/dashboard/offers' },
  { name: 'FAQs', icon: HelpCircle, href: '/dashboard/faqs' },
  { name: 'Team', icon: Users, href: '/dashboard/team' },
  { name: 'Pricing', icon: Tag, href: '/dashboard/pricing' },
  { name: 'Areas', icon: MapPin, href: '/dashboard/areas' },
  { name: 'SEO Settings', icon: Search, href: '/dashboard/seo' },
  { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { name: 'Settings', icon: Sparkles, href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0B1D3A] text-white transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <Link href="/dashboard" className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D9488]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-lg">{business.name}</span>
          </div>
          <button
            className="lg:hidden text-white/70 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            Main
          </p>
          <Link
            href="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              pathname === '/dashboard'
                ? 'bg-[#0D9488] text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            Dashboard
          </Link>

          <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            Content
          </p>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-[#0D9488] text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D9488] text-sm font-semibold">
              AC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin</p>
              <p className="text-xs text-white/50 truncate">{business.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-white/50 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1
              className="text-xl font-semibold text-gray-900 lg:text-2xl"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              {navItems.find((n) => n.href === pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#EA580C]" />
            </button>
            <button
              onClick={handleLogout}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D9488] text-sm font-semibold text-white cursor-pointer hover:bg-[#0a7a70] transition-colors"
              title="Logout"
            >
              AC
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
