'use client';

import { useState, useEffect } from 'react';
import { Save, Globe, Phone, MapPin, Mail } from 'lucide-react';
import { business } from '@/config/business';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: business.name,
    fullName: business.fullName,
    tagline: business.tagline,
    description: business.description,
    phone: business.phone,
    whatsapp: business.whatsapp,
    email: business.email,
    domain: business.domain,
    hours: business.hours,
    city: business.address.city,
    state: business.address.state,
    pincode: business.address.pincode,
    rating: business.rating,
    reviewCount: business.reviewCount,
    homesCleaned: business.homesCleaned,
    yearsExperience: business.yearsExperience,
  });

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/config/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // silent fail
    } finally {
      setSaving(false);
    }
  };

  return (
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-navy">Business Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Update your business information. Changes are saved to the data store.
          </p>
        </div>

        {/* General Info */}
        <div className="rounded-xl bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Globe className="h-4 w-4 text-teal" />
            General Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
              <input
                type="text"
                value={form.domain}
                onChange={(e) => handleChange('domain', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-xl bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Phone className="h-4 w-4 text-teal" />
            Contact Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
              <input
                type="text"
                value={form.hours}
                onChange={(e) => handleChange('hours', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="rounded-xl bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-teal" />
            Location
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                value={form.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="rounded-xl bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Mail className="h-4 w-4 text-teal" />
            Social Proof
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <input
                type="number"
                step="0.1"
                value={form.rating}
                onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reviews</label>
              <input
                type="number"
                value={form.reviewCount}
                onChange={(e) => handleChange('reviewCount', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Homes Cleaned</label>
              <input
                type="number"
                value={form.homesCleaned}
                onChange={(e) => handleChange('homesCleaned', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years Experience</label>
              <input
                type="number"
                value={form.yearsExperience}
                onChange={(e) => handleChange('yearsExperience', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 font-medium">
              Settings saved successfully!
            </span>
          )}
        </div>
      </div>
  );
}
