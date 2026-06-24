'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Globe,
  FileText,
  Link,
  AlertCircle,
  CheckCircle2,
  Save,
} from 'lucide-react';
import { business } from '@/config/business';

type TabKey = 'general' | 'og' | 'schema' | 'sitemap';

const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'general', label: 'General', icon: <FileText className="w-4 h-4" /> },
  { key: 'og', label: 'Open Graph', icon: <Globe className="w-4 h-4" /> },
  { key: 'schema', label: 'Schema', icon: <Search className="w-4 h-4" /> },
  { key: 'sitemap', label: 'Sitemap', icon: <Link className="w-4 h-4" /> },
];

const seoScore = 85;

function CircularProgress({ score }: { score: number }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-28 h-28">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#0D9488"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[#0B1D3A]">{score}</span>
        <span className="text-xs text-gray-500">/100</span>
      </div>
    </div>
  );
}

export default function SeoSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [saved, setSaved] = useState(false);

  // General tab state
  const [metaTitle, setMetaTitle] = useState(
    'Classic Cleaning Services - Professional Cleaning Solutions'
  );
  const [metaDescription, setMetaDescription] = useState(
    'Classic Cleaning Services offers professional residential and commercial cleaning solutions. Trusted, reliable, and affordable cleaning services near you.'
  );
  const [metaKeywords, setMetaKeywords] = useState(
    'cleaning services, house cleaning, office cleaning, deep cleaning, move-in cleaning'
  );
  const [canonicalUrl, setCanonicalUrl] = useState('https://classiccleaning.com');
  const [robotsTxt, setRobotsTxt] = useState(
    'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://classiccleaning.com/sitemap.xml'
  );

  // Open Graph tab state
  const [ogTitle, setOgTitle] = useState(
    'Classic Cleaning Services - Professional Cleaning Solutions'
  );
  const [ogDescription, setOgDescription] = useState(
    'Classic Cleaning Services offers professional residential and commercial cleaning solutions.'
  );
  const [ogImageUrl, setOgImageUrl] = useState(
    'https://classiccleaning.com/images/og-image.jpg'
  );
  const [ogType, setOgType] = useState('website');

  // Schema tab state
  const [schemaType, setSchemaType] = useState('LocalBusiness');

  // Sitemap tab state
  const [autoGenerateSitemap, setAutoGenerateSitemap] = useState(true);
  const [lastGenerated, setLastGenerated] = useState('2026-06-20 14:32:00');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const metaTitleLen = metaTitle.length;
  const metaDescLen = metaDescription.length;

  const jsonLdPreview = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: business.name,
      description: metaDescription,
      url: canonicalUrl,
      telephone: business.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: business.address.city,
        addressRegion: business.address.state,
        addressCountry: 'US',
      },
    },
    null,
    2
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1D3A]">SEO Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your website search engine optimization settings
          </p>
        </div>
        <button
          onClick={handleSave}
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D9488] text-white rounded-lg font-medium hover:bg-[#0a7a70] transition-colors shadow-sm"
        >
          {saved ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* SEO Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <CircularProgress score={seoScore} />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[#0B1D3A] mb-1">
              SEO Health Score
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Your site is performing well but there are a few improvements you
              can make.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                <span className="text-gray-700">Meta title is optimized</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                <span className="text-gray-700">Meta description is set</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-[#EA580C]" />
                <span className="text-gray-700">
                  Add more structured data for better results
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                <span className="text-gray-700">Sitemap is generated</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-[#0D9488] text-[#0D9488]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  Meta Title
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  The title that appears in search engine results. Keep it under
                  60 characters.
                </p>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  maxLength={70}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-colors"
                />
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1 text-xs">
                    {metaTitleLen <= 60 ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-[#0D9488]" />
                        <span className="text-[#0D9488]">Optimal length</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 text-[#EA580C]" />
                        <span className="text-[#EA580C]">
                          Exceeds recommended 60 characters
                        </span>
                      </>
                    )}
                  </div>
                  <span
                    className={`text-xs font-mono ${
                      metaTitleLen <= 60
                        ? 'text-gray-400'
                        : 'text-[#EA580C] font-semibold'
                    }`}
                  >
                    {metaTitleLen}/60
                  </span>
                </div>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  Meta Description
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  A brief summary of the page content shown in search results.
                  Keep it under 160 characters.
                </p>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  maxLength={200}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-colors resize-none"
                />
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1 text-xs">
                    {metaDescLen <= 160 ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-[#0D9488]" />
                        <span className="text-[#0D9488]">Optimal length</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 text-[#EA580C]" />
                        <span className="text-[#EA580C]">
                          Exceeds recommended 160 characters
                        </span>
                      </>
                    )}
                  </div>
                  <span
                    className={`text-xs font-mono ${
                      metaDescLen <= 160
                        ? 'text-gray-400'
                        : 'text-[#EA580C] font-semibold'
                    }`}
                  >
                    {metaDescLen}/160
                  </span>
                </div>
              </div>

              {/* Meta Keywords */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  Meta Keywords
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Comma-separated keywords relevant to your business. (Note:
                  Google does not use meta keywords for ranking.)
                </p>
                <input
                  type="text"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-colors"
                />
              </div>

              {/* Canonical URL */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  Canonical URL
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  The preferred URL for this page to prevent duplicate content
                  issues.
                </p>
                <input
                  type="url"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-colors"
                />
              </div>

              {/* Robots.txt */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  Robots.txt
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Instructions for search engine crawlers about which pages to
                  index.
                </p>
                <textarea
                  value={robotsTxt}
                  onChange={(e) => setRobotsTxt(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-colors resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* Open Graph Tab */}
          {activeTab === 'og' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* OG Title */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  OG Title
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Title used when sharing on social media platforms.
                </p>
                <input
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-colors"
                />
              </div>

              {/* OG Description */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  OG Description
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Description used when sharing on social media platforms.
                </p>
                <textarea
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-colors resize-none"
                />
              </div>

              {/* OG Image URL */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  OG Image URL
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  URL of the image displayed when sharing. Recommended size:
                  1200x630px.
                </p>
                <input
                  type="url"
                  value={ogImageUrl}
                  onChange={(e) => setOgImageUrl(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-colors"
                />
              </div>

              {/* OG Type */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  OG Type
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  The type of content being shared.
                </p>
                <select
                  value={ogType}
                  onChange={(e) => setOgType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-colors bg-white"
                >
                  <option value="website">Website</option>
                  <option value="article">Article</option>
                  <option value="product">Product</option>
                  <option value="profile">Profile</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* Schema Tab */}
          {activeTab === 'schema' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Schema Type */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  Schema Type
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Select the structured data type that best describes your
                  business.
                </p>
                <select
                  value={schemaType}
                  onChange={(e) => setSchemaType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-colors bg-white"
                >
                  <option value="LocalBusiness">LocalBusiness</option>
                  <option value="Service">Service</option>
                  <option value="FAQPage">FAQPage</option>
                </select>
              </div>

              {/* JSON-LD Preview */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  JSON-LD Preview
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Preview of the structured data markup. This is auto-generated
                  based on your settings.
                </p>
                <pre className="w-full bg-gray-900 text-green-400 rounded-lg p-4 text-xs font-mono overflow-x-auto max-h-80 overflow-y-auto">
                  {jsonLdPreview}
                </pre>
              </div>
            </motion.div>
          )}

          {/* Sitemap Tab */}
          {activeTab === 'sitemap' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Auto-generate checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="auto-generate"
                  checked={autoGenerateSitemap}
                  onChange={(e) => setAutoGenerateSitemap(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#0D9488] border-gray-300 rounded focus:ring-[#0D9488]"
                />
                <div>
                  <label
                    htmlFor="auto-generate"
                    className="text-sm font-medium text-[#0B1D3A]"
                  >
                    Auto-generate Sitemap
                  </label>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Automatically update the sitemap when new pages are added or
                    existing content is modified.
                  </p>
                </div>
              </div>

              {/* Sitemap URL */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  Sitemap URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://classiccleaning.com/sitemap.xml"
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-600"
                  />
                  <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    Copy
                  </button>
                </div>
              </div>

              {/* Last Generated */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1">
                  Last Generated
                </label>
                <p className="text-sm text-gray-600 bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200">
                  {lastGenerated}
                </p>
              </div>

              {/* Regenerate Button */}
              <button
                onClick={() =>
                  setLastGenerated(new Date().toLocaleString())
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1D3A] text-white rounded-lg font-medium hover:bg-[#162a4f] transition-colors shadow-sm"
              >
                <Link className="w-4 h-4" />
                Regenerate Sitemap
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
