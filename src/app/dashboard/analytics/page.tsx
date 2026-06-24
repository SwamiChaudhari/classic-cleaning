'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  Users,
  Clock,
  ArrowUpRight,
} from 'lucide-react';

const trafficData = [
  { day: 'Mon', visitors: 380 },
  { day: 'Tue', visitors: 420 },
  { day: 'Wed', visitors: 350 },
  { day: 'Thu', visitors: 490 },
  { day: 'Fri', visitors: 520 },
  { day: 'Sat', visitors: 310 },
  { day: 'Sun', visitors: 377 },
];

const trafficSources = [
  { name: 'Direct', percentage: 45, color: '#0B1D3A' },
  { name: 'Google', percentage: 28, color: '#0D9488' },
  { name: 'Social', percentage: 15, color: '#EA580C' },
  { name: 'Referral', percentage: 12, color: '#059669' },
];

const popularPages = [
  { page: '/services/deep-cleaning', views: 2340, bounceRate: '28%', avgTime: '3m 12s' },
  { page: '/services/regular-cleaning', views: 1890, bounceRate: '35%', avgTime: '2m 45s' },
  { page: '/quote', views: 1560, bounceRate: '18%', avgTime: '4m 08s' },
  { page: '/about', views: 980, bounceRate: '42%', avgTime: '1m 55s' },
  { page: '/contact', views: 720, bounceRate: '38%', avgTime: '2m 20s' },
];

const recentConversions = [
  { service: 'Deep Cleaning', source: 'Google', time: '2 hours ago' },
  { service: 'Office Cleaning', source: 'Direct', time: '4 hours ago' },
  { service: 'Carpet Cleaning', source: 'Social', time: '6 hours ago' },
  { service: 'Window Cleaning', source: 'Referral', time: '8 hours ago' },
  { service: 'Regular Cleaning', source: 'Google', time: '12 hours ago' },
];

const maxVisitors = Math.max(...trafficData.map((d) => d.visitors));

export default function AnalyticsPage() {
  const [dateFilter, setDateFilter] = useState<'7d' | '30d' | '90d'>('7d');

  const stats = [
    {
      title: 'Total Visitors',
      value: '2,847',
      change: '+12.5%',
      positive: true,
      icon: Users,
    },
    {
      title: 'Page Views',
      value: '8,392',
      change: '+8.2%',
      positive: true,
      icon: Eye,
    },
    {
      title: 'Avg. Session',
      value: '2m 34s',
      change: '+15.3%',
      positive: true,
      icon: Clock,
    },
    {
      title: 'Bounce Rate',
      value: '32%',
      change: '-4.3%',
      positive: true,
      icon: MousePointerClick,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0B1D3A' }}>
            Analytics
          </h1>
          <p className="text-gray-500 mt-1">Track your website performance and traffic.</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          {(['7d', '30d', '90d'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setDateFilter(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                dateFilter === period
                  ? 'text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              style={
                dateFilter === period
                  ? { backgroundColor: '#0D9488' }
                  : {}
              }
            >
              {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#0D948815' }}
              >
                <stat.icon size={20} style={{ color: '#0D9488' }} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
                  stat.positive ? 'bg-emerald-50' : 'bg-red-50'
                }`}
                style={
                  stat.positive ? { color: '#059669' } : { color: '#DC2626' }
                }
              >
                {stat.positive ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
            <p className="text-2xl font-bold" style={{ color: '#0B1D3A' }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Traffic Overview + Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Traffic Overview Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold" style={{ color: '#0B1D3A' }}>
                Traffic Overview
              </h2>
              <p className="text-sm text-gray-500">Daily visitors over the selected period</p>
            </div>
            <BarChart3 size={20} style={{ color: '#0D9488' }} />
          </div>
          <div className="flex items-end justify-between gap-3 h-52">
            {trafficData.map((item, index) => (
              <div key={item.day} className="flex flex-col items-center flex-1 gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.visitors / maxVisitors) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6, ease: 'easeOut' }}
                  className="w-full rounded-t-md min-h-[8px]"
                  style={{
                    backgroundColor: index === 3 ? '#0D9488' : '#0D948840',
                  }}
                />
                <span className="text-xs text-gray-500 font-medium">{item.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold mb-1" style={{ color: '#0B1D3A' }}>
            Traffic Sources
          </h2>
          <p className="text-sm text-gray-500 mb-6">Where your visitors come from</p>
          <div className="space-y-5">
            {trafficSources.map((source) => (
              <div key={source.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{source.name}</span>
                  <span className="text-sm font-semibold" style={{ color: '#0B1D3A' }}>
                    {source.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${source.percentage}%` }}
                    transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Popular Pages + Recent Conversions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Pages Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold mb-1" style={{ color: '#0B1D3A' }}>
            Popular Pages
          </h2>
          <p className="text-sm text-gray-500 mb-6">Top performing pages by views</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                    Page
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                    Views
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                    Bounce
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                    Avg. Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {popularPages.map((page, index) => (
                  <motion.tr
                    key={page.page}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="py-3 text-sm font-medium text-gray-700">
                      {page.page}
                    </td>
                    <td className="py-3 text-sm text-right font-semibold" style={{ color: '#0B1D3A' }}>
                      {page.views.toLocaleString()}
                    </td>
                    <td className="py-3 text-sm text-right text-gray-600">
                      {page.bounceRate}
                    </td>
                    <td className="py-3 text-sm text-right text-gray-600">
                      {page.avgTime}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recent Conversions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold" style={{ color: '#0B1D3A' }}>
                Recent Conversions
              </h2>
              <p className="text-sm text-gray-500">Latest quote requests</p>
            </div>
            <ArrowUpRight size={18} style={{ color: '#0D9488' }} />
          </div>
          <div className="space-y-4">
            {recentConversions.map((conversion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.08 }}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#05966915' }}
                  >
                    <MousePointerClick size={16} style={{ color: '#059669' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#0B1D3A' }}>
                      {conversion.service}
                    </p>
                    <p className="text-xs text-gray-500">via {conversion.source}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{conversion.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
