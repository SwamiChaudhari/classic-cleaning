'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Plus, Edit2, Trash2, Eye, EyeOff, Calendar, Percent } from 'lucide-react';
import { offers as initialOffers, getActiveOffers } from '@/config/offers';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  type: 'percentage' | 'flat' | 'freebie';
  validTill: string;
  active: boolean;
  banner?: string;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const modalVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export default function OfferManagementPage() {
  const [offersList, setOffersList] = useState<Offer[]>(initialOffers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [deletingOfferId, setDeletingOfferId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount: '',
    code: '',
    type: 'percentage' as 'percentage' | 'flat' | 'freebie',
    validTill: '',
    active: true,
    banner: '',
  });

  const activeOffers = offersList.filter((o) => o.active);
  const today = new Date();
  const upcomingOffers = offersList.filter((o) => new Date(o.validTill) > today && o.active);
  const expiredOffers = offersList.filter((o) => new Date(o.validTill) < today);
  const totalSavings = offersList.reduce((acc, o) => {
    if (o.type === 'percentage') {
      const num = parseInt(o.discount.replace(/\D/g, ''), 10);
      return acc + (isNaN(num) ? 0 : num);
    }
    return acc;
  }, 0);

  const stats = [
    { label: 'Active Offers', value: activeOffers.length, color: '#0D9488', icon: Tag },
    { label: 'Upcoming', value: upcomingOffers.length, color: '#0B1D3A', icon: Calendar },
    { label: 'Expired', value: expiredOffers.length, color: '#EA580C', icon: Calendar },
    { label: 'Total Savings', value: `${totalSavings}%`, color: '#0D9488', icon: Percent },
  ];

  const openCreateModal = () => {
    setEditingOffer(null);
    setFormData({
      title: '',
      description: '',
      discount: '',
      code: '',
      type: 'percentage',
      validTill: '',
      active: true,
      banner: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      discount: offer.discount,
      code: offer.code,
      type: offer.type,
      validTill: offer.validTill,
      active: offer.active,
      banner: offer.banner || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingOffer) {
      setOffersList((prev) =>
        prev.map((o) =>
          o.id === editingOffer.id ? { ...o, ...formData } : o
        )
      );
    } else {
      const newOffer: Offer = {
        id: `offer-${Date.now()}`,
        ...formData,
      };
      setOffersList((prev) => [...prev, newOffer]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deletingOfferId) {
      setOffersList((prev) => prev.filter((o) => o.id !== deletingOfferId));
      setDeletingOfferId(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const toggleActive = (id: string) => {
    setOffersList((prev) =>
      prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o))
    );
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'bg-teal-100 text-teal-800';
      case 'flat':
        return 'bg-orange-100 text-orange-800';
      case 'freebie':
        return 'bg-navy-100 text-navy-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#0B1D3A' }}>
            Offer Management
          </h1>
          <p className="text-gray-500 mt-1">Manage discounts and promotional offers</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openCreateModal}
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold shadow-lg cursor-pointer"
          style={{ backgroundColor: '#0D9488' }}
        >
          <Plus size={20} />
          Create Offer
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: '#0B1D3A' }}>
              {stat.value}
            </p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {offersList.map((offer, idx) => (
            <motion.div
              key={offer.id}
              {...fadeIn}
              transition={{ delay: idx * 0.05 }}
              layout
              className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all ${
                offer.active ? 'border-gray-100' : 'border-gray-200 opacity-75'
              }`}
            >
              {/* Discount Badge */}
              <div
                className="relative h-32 flex items-center justify-center"
                style={{
                  background: offer.active
                    ? 'linear-gradient(135deg, #0D9488 0%, #0B1D3A 100%)'
                    : 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
                }}
              >
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {offer.discount}
                </span>
                {/* Type Badge */}
                <span
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getTypeBadgeColor(
                    offer.type
                  )}`}
                >
                  {offer.type}
                </span>
                {/* Active/Inactive Badge */}
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    offer.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {offer.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold mb-1" style={{ color: '#0B1D3A' }}>
                  {offer.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{offer.description}</p>

                {/* Code */}
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={14} className="text-gray-400" />
                  <code
                    className="text-sm font-mono px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: '#0B1D3A10', color: '#0B1D3A' }}
                  >
                    {offer.code}
                  </code>
                </div>

                {/* Valid Till */}
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-500">Valid till {formatDate(offer.validTill)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openEditModal(offer)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={16} className="text-gray-500" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setDeletingOfferId(offer.id);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </motion.button>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={() => toggleActive(offer.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                      offer.active ? 'bg-teal-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        offer.active ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {offersList.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Tag size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No offers yet</h3>
          <p className="text-gray-400 mb-6">Create your first promotional offer</p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold"
            style={{ backgroundColor: '#0D9488' }}
          >
            <Plus size={20} />
            Create Offer
          </button>
        </motion.div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              {...modalVariants}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold" style={{ color: '#0B1D3A' }}>
                  {editingOffer ? 'Edit Offer' : 'Create New Offer'}
                </h2>
              </div>

              <div className="p-6 space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g. Summer Special Discount"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Describe the offer..."
                  />
                </div>

                {/* Discount & Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount
                    </label>
                    <input
                      type="text"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g. 25% OFF"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as 'percentage' | 'flat' | 'freebie',
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="flat">Flat Amount</option>
                      <option value="freebie">Freebie</option>
                    </select>
                  </div>
                </div>

                {/* Code & Valid Till */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono"
                      placeholder="e.g. SUMMER25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid Till</label>
                    <input
                      type="text"
                      value={formData.validTill}
                      onChange={(e) => setFormData({ ...formData, validTill: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g. 30 June 2026 or Ongoing"
                    />
                  </div>
                </div>

                {/* Banner */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Banner (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.banner}
                    onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g. Limited time offer!"
                  />
                </div>

                {/* Active Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Active</span>
                  <button
                    onClick={() => setFormData({ ...formData, active: !formData.active })}
                    className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                      formData.active ? 'bg-teal-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        formData.active ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-xl text-white font-semibold shadow-md cursor-pointer"
                  style={{ backgroundColor: '#0D9488' }}
                >
                  {editingOffer ? 'Save Changes' : 'Create Offer'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {isDeleteDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            <motion.div
              {...modalVariants}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
            >
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-center mb-2" style={{ color: '#0B1D3A' }}>
                Delete Offer
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to delete this offer? This action cannot be undone.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-gray-600 font-medium border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 rounded-xl text-white font-semibold bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
