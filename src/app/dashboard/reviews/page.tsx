'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, Edit2, Trash2, CheckCircle2, X, Eye } from 'lucide-react';
import { reviews } from '@/config/reviews';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  service: string;
  location: string;
  date: string;
  verified: boolean;
  visible: boolean;
}

const defaultReview: Omit<Review, 'id'> = {
  name: '',
  rating: 5,
  text: '',
  service: '',
  location: '',
  date: new Date().toISOString().split('T')[0],
  verified: false,
  visible: true,
};

export default function ReviewsManagement() {
  const [reviewList, setReviewList] = useState<Review[]>(reviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [formData, setFormData] = useState(defaultReview);

  const avgRating = reviewList.length > 0
    ? (reviewList.reduce((sum, r) => sum + r.rating, 0) / reviewList.length).toFixed(1)
    : '0.0';
  const totalReviews = reviewList.length;
  const fiveStarReviews = reviewList.filter((r) => r.rating === 5).length;
  const verifiedReviews = reviewList.filter((r) => r.verified).length;

  const openAddModal = () => {
    setEditingReview(null);
    setFormData(defaultReview);
    setIsModalOpen(true);
  };

  const openEditModal = (review: Review) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      rating: review.rating,
      text: review.text,
      service: review.service,
      location: review.location,
      date: review.date,
      verified: review.verified,
      visible: review.visible,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
    setFormData(defaultReview);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReview) {
      setReviewList((prev) =>
        prev.map((r) =>
          r.id === editingReview.id
            ? { ...r, ...formData }
            : r
        )
      );
    } else {
      const newReview: Review = {
        id: Math.max(0, ...reviewList.map((r) => r.id)) + 1,
        ...formData,
      };
      setReviewList((prev) => [newReview, ...prev]);
    }
    closeModal();
  };

  const confirmDelete = (id: number) => {
    setDeleteTargetId(id);
    setIsDeleteDialogOpen(true);
  };

  const executeDelete = () => {
    if (deleteTargetId !== null) {
      setReviewList((prev) => prev.filter((r) => r.id !== deleteTargetId));
    }
    setIsDeleteDialogOpen(false);
    setDeleteTargetId(null);
  };

  const toggleVisibility = (id: number) => {
    setReviewList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, visible: !r.visible } : r))
    );
  };

  const renderStars = (rating: number, size: string = 'w-4 h-4') => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating
                ? 'fill-orange-500 text-orange-500'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const StarSelector = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <Star
              className={`w-7 h-7 ${
                star <= value
                  ? 'fill-orange-500 text-orange-500'
                  : 'text-gray-300 hover:text-orange-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#0B1D3A' }}>
            Reviews Management
          </h1>
          <p className="text-gray-500 mt-1">Manage and moderate customer reviews</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium shadow-md transition-colors"
          style={{ backgroundColor: '#0D9488' }}
        >
          <Plus className="w-5 h-5" />
          Add Review
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Average Rating', value: avgRating, icon: '⭐' },
          { label: 'Total Reviews', value: totalReviews.toString(), icon: '📝' },
          { label: '5-Star Reviews', value: fiveStarReviews.toString(), icon: '🌟' },
          { label: 'Verified Reviews', value: verifiedReviews.toString(), icon: '✅' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: '#0B1D3A' }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Reviews - Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100" style={{ backgroundColor: '#0B1D3A' }}>
                <th className="text-left px-5 py-3.5 text-sm font-semibold text-white">Customer</th>
                <th className="text-left px-5 py-3.5 text-sm font-semibold text-white">Rating</th>
                <th className="text-left px-5 py-3.5 text-sm font-semibold text-white">Review</th>
                <th className="text-left px-5 py-3.5 text-sm font-semibold text-white">Service</th>
                <th className="text-left px-5 py-3.5 text-sm font-semibold text-white">Location</th>
                <th className="text-left px-5 py-3.5 text-sm font-semibold text-white">Date</th>
                <th className="text-left px-5 py-3.5 text-sm font-semibold text-white">Status</th>
                <th className="text-right px-5 py-3.5 text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {reviewList.map((review, idx) => (
                  <motion.tr
                    key={review.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      !review.visible ? 'opacity-60' : ''
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: '#0D9488' }}
                        >
                          {review.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">{review.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">{renderStars(review.rating)}</td>
                    <td className="px-5 py-4 text-sm text-gray-600 max-w-[200px] truncate">
                      {review.text}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{review.service}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{review.location}</td>
                    <td className="px-5 py-4 text-sm text-gray-500">{review.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                        {!review.visible && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            Hidden
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleVisibility(review.id)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title={review.visible ? 'Hide review' : 'Show review'}
                        >
                          <Eye className={`w-4 h-4 ${review.visible ? 'text-gray-500' : 'text-gray-300'}`} />
                        </button>
                        <button
                          onClick={() => openEditModal(review)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Edit review"
                        >
                          <Edit2 className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                          onClick={() => confirmDelete(review.id)}
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {reviewList.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No reviews yet</p>
            <p className="text-sm mt-1">Click &quot;Add Review&quot; to create your first review</p>
          </div>
        )}
      </div>

      {/* Reviews - Mobile Cards */}
      <div className="md:hidden space-y-4">
        <AnimatePresence>
          {reviewList.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 ${
                !review.visible ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: '#0D9488' }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{review.text}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                  {review.service}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                  {review.location}
                </span>
                {review.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => toggleVisibility(review.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  {review.visible ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => openEditModal(review)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(review.id)}
                  className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {reviewList.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl">
            <p className="text-lg">No reviews yet</p>
            <p className="text-sm mt-1">Click &quot;Add Review&quot; to create your first review</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold" style={{ color: '#0B1D3A' }}>
                  {editingReview ? 'Edit Review' : 'Add New Review'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Rating
                  </label>
                  <StarSelector
                    value={formData.rating}
                    onChange={(v) => setFormData({ ...formData, rating: v })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Review Text
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors resize-none"
                    placeholder="Write the review text..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Service
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      placeholder="Deep Cleaning"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="verified" className="text-sm font-medium text-gray-700">
                    Mark as verified review
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg text-white font-medium transition-colors"
                    style={{ backgroundColor: '#0D9488' }}
                  >
                    {editingReview ? 'Save Changes' : 'Add Review'}
                  </button>
                </div>
              </form>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#0B1D3A' }}>
                  Delete Review
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete this review? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsDeleteDialogOpen(false)}
                    className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeDelete}
                    className="flex-1 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
