'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Image, Upload, X, Eye, GripVertical } from 'lucide-react';
import { galleryItems } from '@/config/gallery';

type MediaType = 'image' | 'video';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  type: MediaType;
  src: string;
  description?: string;
}

const categories = ['All', 'Kitchen', 'Bathroom', 'Sofa', 'Living Room', 'Office', 'Commercial', 'Process', 'Team'];

const categoryColors: Record<string, string> = {
  Kitchen: 'bg-teal-500',
  Bathroom: 'bg-blue-500',
  Sofa: 'bg-orange-500',
  'Living Room': 'bg-navy-500',
  Office: 'bg-purple-500',
  Commercial: 'bg-red-500',
  Process: 'bg-yellow-500',
  Team: 'bg-green-500',
};

export default function GalleryManagement() {
  const [items, setItems] = useState<GalleryItem[]>(galleryItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'Kitchen',
    type: 'image' as MediaType,
    src: '',
    description: '',
  });
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    description: '',
    src: '',
  });

  // Filtered items
  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  // Stats
  const totalImages = items.filter((i) => i.type === 'image').length;
  const totalVideos = items.filter((i) => i.type === 'video').length;
  const totalCategories = [...new Set(items.map((i) => i.category))].length;

  // Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setUploadForm({ ...uploadForm, src: url, title: file.name });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setUploadForm({ ...uploadForm, src: url, title: file.name });
    }
  };

  const handleUploadSubmit = () => {
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      ...uploadForm,
    };
    setItems([...items, newItem]);
    setShowUploadModal(false);
    setUploadForm({ title: '', category: 'Kitchen', type: 'image', src: '', description: '' });
    setPreviewUrl('');
  };

  const handleEdit = (item: GalleryItem) => {
    setActiveItem(item);
    setEditForm({
      title: item.title,
      category: item.category,
      description: item.description || '',
      src: item.src,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    if (!activeItem) return;
    setItems(
      items.map((item) =>
        item.id === activeItem.id
          ? { ...item, ...editForm, description: editForm.description }
          : item
      )
    );
    setShowEditModal(false);
    setActiveItem(null);
  };

  const handleDelete = (item: GalleryItem) => {
    setActiveItem(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (!activeItem) return;
    setItems(items.filter((item) => item.id !== activeItem.id));
    setShowDeleteModal(false);
    setActiveItem(null);
  };

  const handleView = (item: GalleryItem) => {
    setActiveItem(item);
    setShowViewModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#0B1D3A' }}>
            Gallery Management
          </h1>
          <p className="text-gray-500 mt-1">Manage your media library and showcase your work</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowUploadModal(true)}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold shadow-lg transition-all hover:shadow-xl"
          style={{ backgroundColor: '#0D9488' }}
        >
          <Plus size={20} />
          Upload Media
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}>
              <Image size={24} style={{ color: '#0D9488' }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Images</p>
              <p className="text-2xl font-bold" style={{ color: '#0B1D3A' }}>{totalImages}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(234, 88, 12, 0.1)' }}>
              <GripVertical size={24} style={{ color: '#EA580C' }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Videos</p>
              <p className="text-2xl font-bold" style={{ color: '#0B1D3A' }}>{totalVideos}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(11, 29, 58, 0.1)' }}>
              <Eye size={24} style={{ color: '#0B1D3A' }} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Categories</p>
              <p className="text-2xl font-bold" style={{ color: '#0B1D3A' }}>{totalCategories}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
            style={selectedCategory === cat ? { backgroundColor: '#0D9488' } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-200 overflow-hidden">
              <div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
              >
                {item.type === 'image' ? (
                  <Image size={48} className="text-gray-400" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <GripVertical size={24} className="text-gray-500" />
                  </div>
                )}
              </div>

              {/* Type Icon Badge */}
              <div className="absolute top-2 left-2 bg-black/60 text-white rounded-full px-2 py-1 text-xs flex items-center gap-1">
                {item.type === 'image' ? <Image size={12} /> : <GripVertical size={12} />}
                <span className="capitalize">{item.type}</span>
              </div>

              {/* Category Badge */}
              <div
                className={`absolute top-2 right-2 text-white rounded-full px-3 py-1 text-xs font-medium ${
                  categoryColors[item.category] || 'bg-gray-500'
                }`}
              >
                {item.category}
              </div>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
              >
                <button
                  onClick={() => handleView(item)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  title="View"
                >
                  <Eye size={18} className="text-gray-700" />
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} style={{ color: '#0D9488' }} />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} style={{ color: '#EA580C' }} />
                </button>
              </motion.div>
            </div>

            {/* Item Info */}
            <div className="p-4">
              <h3 className="font-semibold text-sm truncate" style={{ color: '#0B1D3A' }}>
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{item.category}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <Image size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No media found in this category</p>
          <p className="text-gray-400 text-sm mt-1">Upload some content to get started</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold" style={{ color: '#0B1D3A' }}>Upload Media</h2>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setPreviewUrl('');
                  setUploadForm({ title: '', category: 'Kitchen', type: 'image', src: '', description: '' });
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Drag & Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('gallery-file-input')?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <input
                  id="gallery-file-input"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <Upload size={40} className="mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600 font-medium">
                  Drag & drop your file here, or <span style={{ color: '#0D9488' }}>browse</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">Supports images and videos</p>
              </div>

              {/* Preview */}
              {previewUrl && (
                <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                  {uploadForm.type === 'image' ? (
                    <div className="flex items-center justify-center">
                      <Image size={48} className="text-gray-400" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <GripVertical size={32} className="text-gray-500" />
                    </div>
                  )}
                  <span className="absolute bottom-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded">
                    Preview
                  </span>
                </div>
              )}

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="Enter media title"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
                >
                  {categories.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Type Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setUploadForm({ ...uploadForm, type: 'image' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      uploadForm.type === 'image'
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Image size={16} />
                    Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadForm({ ...uploadForm, type: 'video' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      uploadForm.type === 'video'
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <GripVertical size={16} />
                    Video
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setPreviewUrl('');
                }}
                className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadSubmit}
                disabled={!uploadForm.title || !uploadForm.src}
                className="flex-1 py-2.5 rounded-lg text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                style={{ backgroundColor: '#0D9488' }}
              >
                Upload
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold" style={{ color: '#0B1D3A' }}>Edit Media</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setActiveItem(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="Enter media title"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
                >
                  {categories.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Enter description"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm resize-none"
                />
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Media URL</label>
                <input
                  type="url"
                  value={editForm.src}
                  onChange={(e) => setEditForm({ ...editForm, src: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setActiveItem(null);
                }}
                className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="flex-1 py-2.5 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: '#0D9488' }}
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
          >
            <div className="p-6 text-center">
              <div
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(234, 88, 12, 0.1)' }}
              >
                <Trash2 size={28} style={{ color: '#EA580C' }} />
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: '#0B1D3A' }}>
                Delete Media
              </h2>
              <p className="text-gray-500 text-sm">
                Are you sure you want to delete <strong>{activeItem.title}</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setActiveItem(null);
                }}
                className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: '#EA580C' }}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold" style={{ color: '#0B1D3A' }}>{activeItem.title}</h2>
                <p className="text-xs text-gray-400">{activeItem.category} &middot; {activeItem.type}</p>
              </div>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setActiveItem(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              {activeItem.type === 'image' ? (
                <Image size={64} className="text-gray-400" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                  <GripVertical size={40} className="text-gray-500" />
                </div>
              )}
            </div>

            {activeItem.description && (
              <div className="p-4">
                <p className="text-sm text-gray-600">{activeItem.description}</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
