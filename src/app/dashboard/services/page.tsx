'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  GripVertical,
  Eye,
  EyeOff,
  X,
  Home,
  Sparkles,
  Building2,
  CookingPot,
  Bath,
  Sofa,
  Store,
  PackageOpen,
  Save,
  AlertTriangle,
} from 'lucide-react';
import { services as defaultServices, formatPrice, Service } from '@/config/services';
import DashboardLayout from '../layout';

const iconMap: Record<string, React.ElementType> = {
  Home,
  Sparkles,
  Building2,
  CookingPot,
  Bath,
  Sofa,
  Store,
  PackageOpen,
};

interface ServiceFormData {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: 'residential' | 'commercial' | 'specialty';
  startingPrice: number;
  icon: string;
  image: string;
  features: string;
  popular: boolean;
}

const emptyForm: ServiceFormData = {
  id: '',
  title: '',
  slug: '',
  description: '',
  shortDescription: '',
  category: 'residential',
  startingPrice: 0,
  icon: 'Home',
  image: '',
  features: '',
  popular: false,
};

export default function ServicesManagement() {
  const [serviceList, setServiceList] = useState<Service[]>(defaultServices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load services from API on mount
  useEffect(() => {
    fetch('/api/config/services')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServiceList(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Persist services to API
  const persistServices = async (services: Service[]) => {
    setSaving(true);
    try {
      await fetch('/api/config/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(services),
      });
    } catch (e) {
      console.error('Failed to save services:', e);
    } finally {
      setSaving(false);
    }
  };

  const filteredServices =
    filterCategory === 'all'
      ? serviceList
      : serviceList.filter((s) => s.category === filterCategory);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      id: service.id,
      title: service.title,
      slug: service.slug,
      description: service.description,
      shortDescription: service.shortDescription,
      category: service.category,
      startingPrice: service.startingPrice,
      icon: service.icon,
      image: service.image,
      features: service.features.join(', '),
      popular: service.popular || false,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleSave = () => {
    const serviceData: Service = {
      id: formData.id || formData.slug.toLowerCase().replace(/\s+/g, '-'),
      title: formData.title,
      slug: formData.slug.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description,
      shortDescription: formData.shortDescription,
      category: formData.category,
      startingPrice: formData.startingPrice,
      icon: formData.icon,
      image: formData.image,
      features: formData.features
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
      popular: formData.popular,
    };

    let updated: Service[];
    if (editingId) {
      updated = serviceList.map((s) => (s.id === editingId ? serviceData : s));
    } else {
      updated = [...serviceList, serviceData];
    }
    setServiceList(updated);
    persistServices(updated);
    closeModal();
  };

  const handleDelete = (id: string) => {
    const updated = serviceList.filter((s) => s.id !== id);
    setServiceList(updated);
    persistServices(updated);
    setDeleteConfirm(null);
  };

  const toggleVisibility = (id: string) => {
    setServiceList((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, popular: !s.popular } : s
      )
    );
  };

  const getIconComponent = (iconName: string) => {
    return iconMap[iconName] || Home;
  };

  const categoryColors: Record<string, string> = {
    residential: 'bg-blue-100 text-blue-700',
    commercial: 'bg-purple-100 text-purple-700',
    specialty: 'bg-amber-100 text-amber-700',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#0B1D3A' }}>
              Services Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your cleaning services — add, edit, or remove offerings.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
            style={{ backgroundColor: '#0D9488' }}
          >
            <Plus className="h-4 w-4" />
            Add Service
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Services</p>
            <p className="mt-1 text-2xl font-bold" style={{ color: '#0B1D3A' }}>
              {serviceList.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Active</p>
            <p className="mt-1 text-2xl font-bold text-teal-600">
              {serviceList.filter((s) => s.popular).length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Residential</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">
              {serviceList.filter((s) => s.category === 'residential').length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Commercial</p>
            <p className="mt-1 text-2xl font-bold text-purple-600">
              {serviceList.filter((s) => s.category === 'commercial').length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filterCategory === 'all'
                ? 'text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            style={
              filterCategory === 'all' ? { backgroundColor: '#0B1D3A' } : {}
            }
          >
            All
          </button>
          <button
            onClick={() => setFilterCategory('residential')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filterCategory === 'residential'
                ? 'text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            style={
              filterCategory === 'residential'
                ? { backgroundColor: '#0B1D3A' }
                : {}
            }
          >
            Residential
          </button>
          <button
            onClick={() => setFilterCategory('commercial')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filterCategory === 'commercial'
                ? 'text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            style={
              filterCategory === 'commercial'
                ? { backgroundColor: '#0B1D3A' }
                : {}
            }
          >
            Commercial
          </button>
          <button
            onClick={() => setFilterCategory('specialty')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filterCategory === 'specialty'
                ? 'text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            style={
              filterCategory === 'specialty'
                ? { backgroundColor: '#0B1D3A' }
                : {}
            }
          >
            Specialty
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Service
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredServices.map((service) => {
                const Icon = getIconComponent(service.icon);
                return (
                  <tr
                    key={service.id}
                    className="transition-colors hover:bg-gray-50/50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{ backgroundColor: '#0D948815' }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: '#0D9488' }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {service.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {service.shortDescription.slice(0, 40)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          categoryColors[service.category]
                        }`}
                      >
                        {service.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold" style={{ color: '#0B1D3A' }}>
                        {formatPrice(service.startingPrice)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {service.popular ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                          <Star className="h-3 w-3 fill-current" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleVisibility(service.id)}
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                          title={
                            service.popular ? 'Mark as inactive' : 'Mark as active'
                          }
                        >
                          {service.popular ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => openEditModal(service)}
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-teal-50 hover:text-teal-600"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(service.id)}
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredServices.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-400">No services found.</p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {filteredServices.map((service) => {
            const Icon = getIconComponent(service.icon);
            return (
              <div
                key={service.id}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: '#0D948815' }}
                    >
                      <Icon className="h-5 w-5" style={{ color: '#0D9488' }} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {service.title}
                      </p>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                          categoryColors[service.category]
                        }`}
                      >
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <GripVertical className="h-4 w-4 text-gray-300" />
                  </div>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {service.shortDescription}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span
                    className="text-lg font-bold"
                    style={{ color: '#0B1D3A' }}
                  >
                    {formatPrice(service.startingPrice)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleVisibility(service.id)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100"
                    >
                      {service.popular ? (
                        <Eye className="h-4 w-4 text-teal-500" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => openEditModal(service)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-teal-50 hover:text-teal-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(service.id)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {service.popular && (
                  <div className="mt-2 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-amber-500" />
                    <span className="text-xs font-medium text-amber-600">
                      Popular Service
                    </span>
                  </div>
                )}
              </div>
            );
          })}
          {filteredServices.length === 0 && (
            <div className="rounded-xl bg-white py-12 text-center shadow-sm">
              <p className="text-gray-400">No services found.</p>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className="flex items-center justify-between border-b border-gray-100 px-6 py-4"
                style={{ backgroundColor: '#0B1D3A' }}
              >
                <h2 className="text-lg font-semibold text-white">
                  {editingId ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button
                  onClick={closeModal}
                  className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-4 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Title */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                          slug:
                            prev.slug === '' ||
                            prev.slug ===
                              prev.title.toLowerCase().replace(/\s+/g, '-')
                              ? e.target.value.toLowerCase().replace(/\s+/g, '-')
                              : prev.slug,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                      placeholder="e.g. Home Cleaning"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Slug *
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          slug: e.target.value
                            .toLowerCase()
                            .replace(/\s+/g, '-'),
                        }))
                      }
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                      placeholder="e.g. home-cleaning"
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Short Description *
                  </label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        shortDescription: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                    placeholder="Brief one-line description"
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                    placeholder="Detailed service description..."
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Category */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value as Service['category'],
                        }))
                      }
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="specialty">Specialty</option>
                    </select>
                  </div>

                  {/* Starting Price */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Starting Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.startingPrice}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          startingPrice: Number(e.target.value),
                        }))
                      }
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                      placeholder="e.g. 1499"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Icon */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Icon
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          icon: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                    >
                      <option value="Home">Home</option>
                      <option value="Sparkles">Sparkles</option>
                      <option value="Building2">Building2</option>
                      <option value="CookingPot">CookingPot</option>
                      <option value="Bath">Bath</option>
                      <option value="Sofa">Sofa</option>
                      <option value="Store">Store</option>
                      <option value="PackageOpen">PackageOpen</option>
                    </select>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          image: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Features (comma-separated)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        features: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                    placeholder="Feature 1, Feature 2, Feature 3..."
                  />
                </div>

                {/* Popular Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={formData.popular}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        popular: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label
                    htmlFor="popular"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mark as Popular (visible on homepage as featured)
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
                <button
                  onClick={closeModal}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
                  style={{ backgroundColor: '#0D9488' }}
                >
                  <Save className="h-4 w-4" />
                  {editingId ? 'Update Service' : 'Save Service'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {deleteConfirm && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          >
            <div
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3
                className="mt-4 text-lg font-semibold"
                style={{ color: '#0B1D3A' }}
              >
                Delete Service
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete this service? This action cannot
                be undone.
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
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
