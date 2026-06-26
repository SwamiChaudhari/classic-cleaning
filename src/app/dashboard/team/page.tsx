'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, User, Briefcase, Star } from 'lucide-react';
import { team as defaultTeam, TeamMember } from '@/config/team';
import DashboardLayout from '../layout';

const emptyMember: TeamMember = {
  id: '',
  name: '',
  role: '',
  experience: '',
  avatar: '',
  bio: '',
  verified: true,
};

export default function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>(defaultTeam);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TeamMember>(emptyMember);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/config/team')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setMembers(data);
      })
      .catch(() => {});
  }, []);

  const persist = async (data: TeamMember[]) => {
    setSaving(true);
    try {
      await fetch('/api/config/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.error('Failed to save team:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = () => {
    let updated: TeamMember[];
    if (editingId) {
      updated = members.map((m) => (m.id === editingId ? form : m));
    } else {
      updated = [...members, { ...form, id: form.id || `member-${Date.now()}` }];
    }
    setMembers(updated);
    persist(updated);
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyMember);
  };

  const handleDelete = (id: string) => {
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    persist(updated);
  };

  const openEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setForm(member);
    setModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">Team Management</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your team members displayed on the About page.</p>
          </div>
          <button
            onClick={() => { setEditingId(null); setForm(emptyMember); setModalOpen(true); }}
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </button>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div key={member.id} className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10">
                    <User className="h-6 w-6 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(member)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-teal">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">{member.bio}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                  <Briefcase className="h-3 w-3" />
                  {member.experience}
                </span>
                {member.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                    <Star className="h-3 w-3 fill-current" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" onClick={() => setModalOpen(false)}>
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-navy">{editingId ? 'Edit Member' : 'Add Member'}</h2>
                <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                />
                <input
                  type="text"
                  placeholder="Role (e.g., Operations Manager)"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                />
                <input
                  type="text"
                  placeholder="Experience (e.g., 5+ years)"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                />
                <textarea
                  placeholder="Bio"
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal/30 focus:border-teal"
                />
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.verified}
                    onChange={(e) => setForm({ ...form, verified: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  Verified
                </label>
              </div>
              <div className="mt-5 flex gap-3">
                <button onClick={() => setModalOpen(false)} className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
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
