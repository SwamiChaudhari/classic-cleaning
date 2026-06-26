'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, MapPin } from 'lucide-react';
import { areas as defaultAreas, Area } from '@/config/areas';
import DashboardLayout from '../layout';

const emptyArea: Area = {
  id: '',
  name: '',
  slug: '',
  description: '',
  landmarks: [],
  pincode: '',
};

export default function AreasManagement() {
  const [areas, setAreas] = useState<Area[]>(defaultAreas);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Area>(emptyArea);
  const [landmarksStr, setLandmarksStr] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/config/areas')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setAreas(data);
      })
      .catch(() => {});
  }, []);

  const persist = async (data: Area[]) => {
    setSaving(true);
    try {
      await fetch('/api/config/areas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.error('Failed to save areas:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = () => {
    const area: Area = {
      ...form,
      id: form.id || form.slug.toLowerCase().replace(/\s+/g, '-'),
      slug: form.slug.toLowerCase().replace(/\s+/g, '-'),
      landmarks: landmarksStr.split(',').map((l) => l.trim()).filter(Boolean),
    };
    let updated: Area[];
    if (editingId) {
      updated = areas.map((a) => (a.id === editingId ? area : a));
    } else {
      updated = [...areas, area];
    }
    setAreas(updated);
    persist(updated);
    closeModal();
  };

  const handleDelete = (id: string) => {
    const updated = areas.filter((a) => a.id !== id);
    setAreas(updated);
    persist(updated);
  };

  const openEdit = (area: Area) => {
    setEditingId(area.id);
    setForm(area);
    setLandmarksStr(area.landmarks.join(', '));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyArea);
    setLandmarksStr('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">Service Areas</h1>
            <p className="mt-1 text-sm text-gray-500">Manage the areas you serve. These appear on the Areas page and in SEO.</p>
          </div>
          <button
            onClick={() => { setEditingId(null); setForm(emptyArea); setLandmarksStr(''); setModalOpen(true); }}
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Add Area
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Areas</p>
            <p className="mt-1 text-2xl font-bold text-navy">{areas.length}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Cities Covered</p>
            <p className="mt-1 text-2xl font-bold text-teal-600">1</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Pincodes</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">{new Set(areas.map((a) => a.pincode)).size}</p>
          </div>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <div key={area.id} className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                    <MapPin className="h-5 w-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{area.name}</h3>
                    <p className="text-xs text-gray-400">{area.pincode}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(area)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-teal">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(area.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">{area.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {area.landmarks.map((l, i) => (
                  <span key={i} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" onClick={closeModal}>
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-navy">{editingId ? 'Edit Area' : 'Add Area'}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Area Name (e.g., Kothrud)"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                />
                <input
                  type="text"
                  placeholder="Slug (e.g., kothrud)"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                />
                <textarea
                  placeholder="Description"
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                />
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Landmarks (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Landmark 1, Landmark 2, Landmark 3"
                    value={landmarksStr}
                    onChange={(e) => setLandmarksStr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                  />
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button onClick={closeModal} className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={!form.name || saving} className="flex-1 rounded-lg bg-teal py-2.5 text-sm font-semibold text-white hover:bg-teal/90 disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
