'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Users,
  Phone,
  Filter,
  Search,
  Download,
  Trash2,
  ChevronDown,
  Eye,
  MessageSquare,
} from 'lucide-react';
import DashboardLayout from '../layout';
import { business } from '@/config/business';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  propertyType?: string;
  area?: string;
  message?: string;
  source: 'quote_form' | 'contact_form' | 'whatsapp' | 'phone' | 'manual';
  status: 'new' | 'contacted' | 'converted' | 'lost';
  notes?: string;
  createdAt: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-blue-100 text-blue-700' },
  contacted: { label: 'Contacted', className: 'bg-yellow-100 text-yellow-700' },
  converted: { label: 'Converted', className: 'bg-emerald-100 text-emerald-700' },
  lost: { label: 'Lost', className: 'bg-red-100 text-red-700' },
};

const sourceConfig: Record<string, { label: string; className: string }> = {
  quote_form: { label: 'Quote Form', className: 'bg-purple-100 text-purple-700' },
  contact_form: { label: 'Contact Form', className: 'bg-indigo-100 text-indigo-700' },
  whatsapp: { label: 'WhatsApp', className: 'bg-green-100 text-green-700' },
  phone: { label: 'Phone', className: 'bg-orange-100 text-orange-700' },
  manual: { label: 'Manual', className: 'bg-gray-100 text-gray-700' },
};

export default function LeadsManagement() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Fetch leads from API on mount
  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (Array.isArray(data)) {
        setLeads(data);
      }
    } catch (e) {
      console.error('Failed to fetch leads:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Update lead status
  const updateStatus = async (id: string, status: Lead['status']) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status } : l))
        );
      }
    } catch (e) {
      console.error('Failed to update lead status:', e);
    }
  };

  // Delete lead
  const deleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/leads?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        setDeleteConfirm(null);
        if (expandedId === id) setExpandedId(null);
      }
    } catch (e) {
      console.error('Failed to delete lead:', e);
    }
  };

  // Export to CSV
  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Service', 'Area', 'Source', 'Status', 'Date', 'Message', 'Notes'];
    const rows = filteredLeads.map((l) => [
      l.name,
      l.phone,
      l.email || '',
      l.service || '',
      l.area || '',
      sourceConfig[l.source]?.label || l.source,
      statusConfig[l.status]?.label || l.status,
      new Date(l.createdAt).toLocaleDateString(),
      (l.message || '').replace(/,/g, ';'),
      (l.notes || '').replace(/,/g, ';'),
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      lead.name.toLowerCase().includes(query) ||
      lead.phone.includes(query) ||
      (lead.area && lead.area.toLowerCase().includes(query));
    return matchesStatus && matchesSearch;
  });

  // Stats
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    converted: leads.filter((l) => l.status === 'converted').length,
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatSource = (source: string) => {
    return source.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#0B1D3A' }}>
              Leads Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage customer inquiries from {business.name}.
            </p>
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                <Users className="h-4 w-4 text-gray-600" />
              </div>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            <p className="mt-2 text-2xl font-bold" style={{ color: '#0B1D3A' }}>
              {stats.total}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-sm text-gray-500">New</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-600">{stats.new}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50">
                <Phone className="h-4 w-4 text-yellow-600" />
              </div>
              <p className="text-sm text-gray-500">Contacted</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-yellow-600">
              {stats.contacted}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                <Users className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="text-sm text-gray-500">Converted</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {stats.converted}
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-700 outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center rounded-xl bg-white py-16 shadow-sm">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-teal-500" />
              <p className="mt-3 text-sm text-gray-500">Loading leads...</p>
            </div>
          </div>
        )}

        {/* Desktop Table */}
        {!loading && (
          <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Service
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Area
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Source
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads.map((lead) => (
                  <>
                    <tr
                      key={lead.id}
                      className="cursor-pointer transition-colors hover:bg-gray-50/50"
                      onClick={() =>
                        setExpandedId(expandedId === lead.id ? null : lead.id)
                      }
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{lead.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Phone className="h-3.5 w-3.5 text-gray-400" />
                          {lead.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {lead.service || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {lead.area || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            sourceConfig[lead.source]?.className || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {formatSource(lead.source)}
                        </span>
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(lead.id, e.target.value as Lead['status'])
                          }
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium outline-none cursor-pointer ${
                            statusConfig[lead.status]?.className || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="lost">Lost</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedId(expandedId === lead.id ? null : lead.id);
                            }}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm(lead.id);
                            }}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            title="Delete lead"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* Expanded Details */}
                    {expandedId === lead.id && (
                      <tr key={`${lead.id}-details`}>
                        <td colSpan={8} className="bg-gray-50/50 px-4 py-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {lead.email && (
                              <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Email
                                </p>
                                <p className="mt-1 text-sm text-gray-900">{lead.email}</p>
                              </div>
                            )}
                            {lead.message && (
                              <div className="sm:col-span-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Message
                                </p>
                                <p className="mt-1 text-sm text-gray-900">{lead.message}</p>
                              </div>
                            )}
                            {lead.notes && (
                              <div className="sm:col-span-3">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Notes
                                </p>
                                <p className="mt-1 text-sm text-gray-900">{lead.notes}</p>
                              </div>
                            )}
                            {lead.propertyType && (
                              <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Property Type
                                </p>
                                <p className="mt-1 text-sm text-gray-900">{lead.propertyType}</p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
            {filteredLeads.length === 0 && (
              <div className="py-12 text-center">
                <Users className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-2 text-sm text-gray-400">No leads found.</p>
                <p className="text-xs text-gray-400">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter.'
                    : 'Leads will appear here when customers submit inquiries.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mobile Cards */}
        {!loading && (
          <div className="space-y-4 lg:hidden">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{lead.name}</p>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                      <Phone className="h-3.5 w-3.5" />
                      {lead.phone}
                    </div>
                  </div>
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      statusConfig[lead.status]?.className || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {statusConfig[lead.status]?.label || lead.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {lead.service && (
                    <div>
                      <p className="text-xs text-gray-400">Service</p>
                      <p className="text-sm font-medium text-gray-700">{lead.service}</p>
                    </div>
                  )}
                  {lead.area && (
                    <div>
                      <p className="text-xs text-gray-400">Area</p>
                      <p className="text-sm font-medium text-gray-700">{lead.area}</p>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        sourceConfig[lead.source]?.className || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {formatSource(lead.source)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === lead.id ? null : lead.id)
                      }
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100"
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(lead.id)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === lead.id && (
                  <div className="mt-3 border-t border-gray-100 pt-3 space-y-2">
                    {lead.email && (
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-sm text-gray-700">{lead.email}</p>
                      </div>
                    )}
                    {lead.message && (
                      <div>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          Message
                        </p>
                        <p className="text-sm text-gray-700">{lead.message}</p>
                      </div>
                    )}
                    {lead.notes && (
                      <div>
                        <p className="text-xs text-gray-400">Notes</p>
                        <p className="text-sm text-gray-700">{lead.notes}</p>
                      </div>
                    )}
                    {lead.propertyType && (
                      <div>
                        <p className="text-xs text-gray-400">Property Type</p>
                        <p className="text-sm text-gray-700">{lead.propertyType}</p>
                      </div>
                    )}
                    {/* Status update on mobile */}
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Update Status</p>
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateStatus(lead.id, e.target.value as Lead['status'])
                        }
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredLeads.length === 0 && (
              <div className="rounded-xl bg-white py-12 text-center shadow-sm">
                <Users className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-2 text-sm text-gray-400">No leads found.</p>
                <p className="text-xs text-gray-400">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter.'
                    : 'Leads will appear here when customers submit inquiries.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Delete Lead
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete this lead? This action cannot be
                undone.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteLead(deleteConfirm)}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
