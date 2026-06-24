'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  ChevronRight,
  Bell,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { name: 'Hero Editor', icon: Home, href: '/dashboard/hero' },
  { name: 'Services Management', icon: Briefcase, href: '/dashboard/services' },
  { name: 'Gallery Management', icon: Image, href: '/dashboard/gallery' },
  { name: 'Video Management', icon: MessageSquare, href: '/dashboard/videos' },
  { name: 'Reviews Management', icon: Star, href: '/dashboard/reviews' },
  { name: 'Blog Management', icon: FileText, href: '/dashboard/blog' },
  { name: 'Offer Management', icon: Tag, href: '/dashboard/offers' },
  { name: 'FAQ Management', icon: HelpCircle, href: '/dashboard/faq' },
  { name: 'Case Study Management', icon: LayoutDashboard, href: '/dashboard/cases' },
  { name: 'Pricing Management', icon: DollarSign, href: '/dashboard/pricing' },
  { name: 'SEO Settings', icon: Search, href: '/dashboard/seo' },
  { name: 'Analytics Dashboard', icon: BarChart3, href: '/dashboard/analytics' },
  { name: 'Activity Logs', icon: Activity, href: '/dashboard/activity' },
  { name: 'Image Upload System', icon: Image, href: '/dashboard/uploads' },
];

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
  { action: 'Hero section edited', detail: 'Subtitle updated', time: '5 hours ago', icon: Home, color: 'text-teal-500' },
  { action: 'New FAQ added', detail: 'Question about eco-friendly products', time: '1 day ago', icon: HelpCircle, color: 'text-orange-500' },
];

const quickActions = [
  { label: 'Hero Editor', icon: Home, href: '/dashboard/hero', color: 'from-teal-500 to-teal-600' },
  { label: 'Services', icon: Briefcase, href: '/dashboard/services', color: 'from-blue-500 to-blue-600' },
  { label: 'Gallery', icon: Image, href: '/dashboard/gallery', color: 'from-purple-500 to-purple-600' },
  { label: 'Reviews', icon: Star, href: '/dashboard/reviews', color: 'from-yellow-500 to-yellow-600' },
  { label: 'Blog Posts', icon: FileText, href: '/dashboard/blog', color: 'from-emerald-500 to-emerald-600' },
  { label: 'Offers', icon: Tag, href: '/dashboard/offers', color: 'from-orange-500 to-orange-600' },
  { label: 'Case Studies', icon: LayoutDashboard, href: '/dashboard/cases', color: 'from-indigo-500 to-indigo-600' },
  { label: 'Pricing', icon: DollarSign, href: '/dashboard/pricing', color: 'from-cyan-500 to-cyan-600' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');

  const maxVisitors = Math.max(...trafficData.map((d) => d.visitors));

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
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D9488]">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-lg">Classic Cleaning</span>
          </div>
          <button
            className="lg:hidden text-white/70 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            Main
          </p>
          <button
            onClick={() => setActiveNav('Dashboard')}
            className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              activeNav === 'Dashboard'
                ? 'bg-[#0D9488] text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            Dashboard
          </button>

          <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            Content
          </p>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => {
                setActiveNav(item.name);
                setSidebarOpen(false);
              }}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeNav === item.name
                  ? 'bg-[#0D9488] text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.name}
            </Link>
          ))}

          <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            Settings
          </p>
          <Link
            href="/dashboard/settings"
            className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Settings className="h-4.5 w-4.5" />
            Settings
          </Link>
        </nav>

        {/* User section */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D9488] text-sm font-semibold">
              AC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin</p>
              <p className="text-xs text-white/50 truncate">admin@classiccleaning.in</p>
            </div>
            <button className="text-white/50 hover:text-white transition-colors">
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
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#EA580C]" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D9488] text-sm font-semibold text-white cursor-pointer">
              AC
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-7xl space-y-6"
          >
            {/* Welcome banner */}
            <motion.div
              variants={itemVariants}
              className="rounded-xl bg-gradient-to-r from-[#0B1D3A] to-[#0D9488] p-6 text-white"
            >
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                Welcome back, Admin!
              </h2>
              <p className="mt-1 text-sm text-white/70">
                Here&apos;s what&apos;s happening with your Classic Cleaning website today.
              </p>
            </motion.div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="mt-1 text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgLight}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color.replace('bg-', 'text-')}`} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <span
                      className={`text-sm font-medium ${
                        stat.change.startsWith('+')
                          ? 'text-emerald-600'
                          : 'text-orange-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="ml-1 text-sm text-gray-400">vs last week</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Traffic chart + Popular pages */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Traffic chart */}
              <motion.div
                variants={itemVariants}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3
                    className="font-semibold text-gray-900"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    Weekly Traffic Overview
                  </h3>
                  <span className="text-xs text-gray-400">Last 7 days</span>
                </div>
                <div className="flex h-48 items-end gap-3">
                  {trafficData.map((data) => (
                    <div key={data.day} className="flex flex-1 flex-col items-center gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.visitors / maxVisitors) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.1 * trafficData.indexOf(data) }}
                        className="w-full rounded-t-md bg-gradient-to-t from-[#0D9488] to-[#14B8A6]"
                        title={`${data.visitors} visitors`}
                      />
                      <span className="text-xs text-gray-500">{data.day}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Popular pages */}
              <motion.div
                variants={itemVariants}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h3
                  className="mb-4 font-semibold text-gray-900"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
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
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${page.percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full rounded-full bg-[#0D9488]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent activity + Quick actions */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Recent activity */}
              <motion.div
                variants={itemVariants}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2"
              >
                <h3
                  className="mb-4 font-semibold text-gray-900"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 ${item.color}`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{item.action}</p>
                        <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick actions */}
              <motion.div
                variants={itemVariants}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h3
                  className="mb-4 font-semibold text-gray-900"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="group flex flex-col items-center gap-2 rounded-lg border border-gray-100 p-3 text-center transition-all hover:border-transparent hover:shadow-md"
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${action.color} text-white transition-transform group-hover:scale-110`}
                      >
                        <action.icon className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* All sections quick links */}
            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <h3
                className="mb-4 font-semibold text-gray-900"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                All Management Sections
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
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
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
