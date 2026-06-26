"use client";

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
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { business } from "@/config/business";

const stats = [
  { label: 'Total Visitors', value: '2,847', change: '+12.5%', icon: Users, color: 'bg-teal-500', bgLight: 'bg-teal-50' },
  { label: 'Page Views', value: '8,392', change: '+8.2%', icon: Eye, color: 'bg-blue-500', bgLight: 'bg-blue-50' },
  { label: 'Conversions', value: '156', change: '+23.1%', icon: MousePointerClick, color: 'bg-emerald-500', bgLight: 'bg-emerald-50' },
  { label: 'Bounce Rate', value: '32%', change: '-4.3%', icon: TrendingUp, color: 'bg-orange-500', bgLight: 'bg-orange-50' },
];

const trafficData = [
  { day: 'Mon', visitors: 380 },
  { day: 'Tue', visitors: 520 },
  { day: 'Wed', visitors: 410 },
  { day: 'Thu', visitors: 690 },
  { day: 'Fri', visitors: 480 },
  { day: 'Sat', visitors: 310 },
  { day: 'Sun', visitors: 240 },
];

const popularPages = [
  { title: 'Home Page', views: 3420, percentage: 41 },
  { title: 'Services - Deep Cleaning', views: 1890, percentage: 23 },
  { title: 'Gallery', views: 1240, percentage: 15 },
  { title: 'Pricing', views: 980, percentage: 12 },
  { title: 'Contact Us', views: 760, percentage: 9 },
];

const recentActivity = [
  { action: 'New review added', detail: '5-star review by Rahul Sharma', time: '5 min ago', icon: Star, color: 'text-yellow-500' },
  { action: 'Blog post published', detail: 'Top 10 Cleaning Tips for Monsoon', time: '1 hour ago', icon: FileText, color: 'text-blue-500' },
  { action: 'Gallery updated', detail: '4 new images uploaded', time: '3 hours ago', icon: Image, color: 'text-purple-500' },
  { action: 'New FAQ added', detail: 'Question about eco-friendly products', time: '1 day ago', icon: HelpCircle, color: 'text-orange-500' },
];

const navItems = [
  { name: 'Services', icon: Briefcase, href: '/dashboard/services' },
  { name: 'Gallery', icon: Image, href: '/dashboard/gallery' },
  { name: 'Media Library', icon: MessageSquare, href: '/dashboard/media' },
  { name: 'Reviews', icon: Star, href: '/dashboard/reviews' },
  { name: 'Blogs', icon: FileText, href: '/dashboard/blogs' },
  { name: 'Offers', icon: Tag, href: '/dashboard/offers' },
  { name: 'FAQs', icon: HelpCircle, href: '/dashboard/faqs' },
  { name: 'SEO Settings', icon: Search, href: '/dashboard/seo' },
  { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
];

const quickActions = [
  { label: 'Services', icon: Briefcase, href: '/dashboard/services', color: 'from-blue-500 to-blue-600' },
  { label: 'Gallery', icon: Image, href: '/dashboard/gallery', color: 'from-purple-500 to-purple-600' },
  { label: 'Media', icon: MessageSquare, href: '/dashboard/media', color: 'from-pink-500 to-pink-600' },
  { label: 'Reviews', icon: Star, href: '/dashboard/reviews', color: 'from-yellow-500 to-yellow-600' },
  { label: 'Blogs', icon: FileText, href: '/dashboard/blogs', color: 'from-emerald-500 to-emerald-600' },
  { label: 'Offers', icon: Tag, href: '/dashboard/offers', color: 'from-orange-500 to-orange-600' },
  { label: 'FAQs', icon: HelpCircle, href: '/dashboard/faqs', color: 'from-teal-500 to-teal-600' },
  { label: 'SEO', icon: Search, href: '/dashboard/seo', color: 'from-indigo-500 to-indigo-600' },
];

export default function DashboardPage() {
  const maxVisitors = Math.max(...trafficData.map((d) => d.visitors));

  return (
    <div className="space-y-6">
        {/* Welcome banner */}
        <div className="rounded-xl bg-gradient-to-r from-[#0B1D3A] to-[#0D9488] p-6 text-white">
          <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Welcome back, Admin!
          </h2>
          <p className="mt-1 text-sm text-white/70">
            Here&apos;s what&apos;s happening with your {business.name} website today.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgLight}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <div className="mt-3">
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-orange-600'}`}>
                  {stat.change}
                </span>
                <span className="ml-1 text-sm text-gray-400">vs last week</span>
              </div>
            </div>
          ))}
        </div>

        {/* Traffic chart + Popular pages */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Weekly Traffic Overview
              </h3>
              <span className="text-xs text-gray-400">Last 7 days</span>
            </div>
            <div className="flex h-48 items-end gap-3">
              {trafficData.map((data) => (
                <div key={data.day} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#0D9488] to-[#14B8A6]"
                    style={{ height: `${(data.visitors / maxVisitors) * 100}%` }}
                    title={`${data.visitors} visitors`}
                  />
                  <span className="text-xs text-gray-500">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Popular Pages
            </h3>
            <div className="space-y-4">
              {popularPages.map((page) => (
                <div key={page.title}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{page.title}</span>
                    <span className="font-medium text-gray-900">{page.views.toLocaleString()}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-[#0D9488]" style={{ width: `${page.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity + Quick actions */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 font-semibold text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex flex-col items-center gap-2 rounded-lg border border-gray-100 p-3 text-center transition-all hover:border-transparent hover:shadow-md"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${action.color} text-white transition-transform group-hover:scale-110`}>
                    <action.icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* All sections quick links */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            All Management Sections
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2.5 text-sm text-gray-700 transition-all hover:border-[#0D9488] hover:bg-teal-50 hover:text-[#0D9488]"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.name}</span>
                <ChevronRight className="ml-auto h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
  );
}
