'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Tag, Star } from 'lucide-react';
import { packages as defaultPackages, Package, formatPrice } from '@/config/pricing';
import DashboardLayout from '../layout';

const emptyPackage: Package = {
  id: '',
  name: '',
  description: '',
  price: 0,
  originalPrice: 0,
  features: [],
  category: 'regular',
};

export default function PricingManagement() {
  const [items, setItems] = useState<Package[]>(defaultPackages);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Package>(emptyPackage);
  const [featuresStr, setFeaturesStr] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/config/pricing')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setItems(data);
      })
      .catch(() => {});
  }, []);

  const persist = async (data: Package[]) => {
    setSaving(true);
    try {
      await fetch('/api/config/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.error('Failed to save pricing:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = () => {
    const pkg: Package = {
      ...form,
      id: form.id || form.name.toLowerCase().replace(/\s+/g, '-'),
      features: featuresStr.split('\n').map((f) => f.trim()).filter(Boolean),
    };
    let updated: Package[];
    if (editingId) {
      updated = items.map((p) => (p.id === editingId ? pkg : p));
    } else {
      updated = [...items, pkg];
    }
    setItems(updated);
    persist(updated);
    closeModal();
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((p) => p.id !== id);
    setItems(updated);
    persist(updated);
  };

  const openEdit = (pkg: Package) => {
    setEditingId(pkg.id);
    setForm(pkg);
    setFeaturesStr(pkg.features.join('\n'));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyPackage);
    setFeaturesStr('');
  };

  const categoryColors: Record<string, string> = {
    regular: 'bg-blue-100 text-blue-700',
    deep: 'bg-purple-100 text-purple-700',
    commercial: 'bg-amber-100 text-amber-700',
    move: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">Pricing Management</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your pricing packages and service rates.</p>
          </div>
          <button
            onClick={() => { setEditingId(null); setForm(emptyPackage); setFeaturesStr(''); setModalOpen(true); }}
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Add Package
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Packages</p>
            <p className="mt-1 text-2xl font-bold text-navy">{items.length}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Regular</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">{items.filter((p) => p.category === 'regular').length}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Deep</p>
            <p className="mt-1 text-2xl font-bold text-purple-600">{items.filter((p) => p.category === 'deep').length}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Commercial</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">{items.filter((p) => p.category === 'commercial').length}</p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((pkg) => (
            <div key={pkg.id} className={`rounded-xl bg-white p-5 shadow-sm border ${pkg.popular ? 'border-teal ring-1 ring-teal/20' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between">
                <div>
                  {pkg.badge && (
                    <span className="inline-block rounded-full bg-orange/10 px-2 py-0.5 text-xs font-semibold text-orange mb-2">
                      {pkg.badge}
                    </span>
                  )}
                  <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{pkg.description}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(pkg)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-teal">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(pkg.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-navy">{formatPrice(pkg.price)}</span>
                {pkg.originalPrice && (
                  <span className="ml-2 text-sm text-gray-400 line-through">{formatPrice(pkg.originalPrice)}</span>
                )}
              </div>
              <div className="mt-2">
                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${categoryColors[pkg.category] || 'bg-gray-100 text-gray-600'}`}>
                  {pkg.category}
                </span>
              </div>
              <ul className="mt-3 space-y-1">
                {pkg.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-teal">✓</span> {f}
                  </li>
                ))}
                {pkg.features.length > 4 && (
                  <li className="text-xs text-gray-400">+{pkg.features.length - 4} more</li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" onClick={closeModal}>
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-navy">{editingId ? 'Edit Package' : 'Add Package'}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Package Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Price</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Original Price</label>
                    <input
                      type="number"
                      value={form.originalPrice || ''}
                      onChange={(e) => setForm({ ...form, originalPrice: parseInt(e.target.value) || undefined })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Package['category'] })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                  >
                    <option value="regular">Regular</option>
                    <option value="deep">Deep</option>
                    <option value="commercial">Commercial</option>
                    <option value="move">Move-In/Out</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Badge (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., Most Popular, Best Value"
                    value={form.badge || ''}
                    onChange={(e) => setForm({ ...form, badge: e.target.value || undefined })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Features (one per line)</label>
                  <textarea
                    rows={5}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    value={featuresStr}
                    onChange={(e) => setFeaturesStr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.popular}
                    onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  Mark as Popular
                </label>
              </div>
              <div className="mt-5 flex gap-3">
                <button onClick={closeModal} className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={!form.name || saving} className="flex-1 rounded-lg bg-teal py-2.5 text-sm font-semibold text-white hover:bg-teal/90 disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Package'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
