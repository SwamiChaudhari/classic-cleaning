"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Upload, X, Eye, Image as ImageIcon } from "lucide-react";
import { galleryItems } from "@/config/gallery";

type MediaType = "image" | "video";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  type: MediaType;
  src: string;
  thumbnail?: string;
  description?: string;
}

const categories = ["All", "Kitchen", "Bathroom", "Sofa", "Living Room", "Office", "Commercial", "Process", "Team"];

export default function GalleryManagement() {
  const [items, setItems] = useState<GalleryItem[]>(galleryItems);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const [uploadForm, setUploadForm] = useState({
    title: "",
    category: "Kitchen",
    type: "image" as MediaType,
    src: "",
    description: "",
  });

  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    description: "",
    src: "",
  });

  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const totalImages = items.filter((i) => i.type === "image").length;
  const totalVideos = items.filter((i) => i.type === "video").length;
  const totalCategories = [...new Set(items.map((i) => i.category))].length;

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setUploadForm({ ...uploadForm, src: url, title: file.name.replace(/\.[^/.]+$/, "") });
    }
  };

  const handleUploadSubmit = () => {
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      ...uploadForm,
      thumbnail: uploadForm.src,
    };
    setItems([...items, newItem]);
    setShowUploadModal(false);
    setUploadForm({ title: "", category: "Kitchen", type: "image", src: "", description: "" });
  };

  const handleEdit = (item: GalleryItem) => {
    setActiveItem(item);
    setEditForm({ title: item.title, category: item.category, description: item.description || "", src: item.src });
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    if (!activeItem) return;
    setItems(items.map((item) => item.id === activeItem.id ? { ...item, ...editForm } : item));
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0B1D3A]">Gallery Management</h2>
            <p className="text-gray-500 mt-1">Manage your media library and showcase your work</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: "#0D9488" }}
          >
            <Plus size={20} />
            Upload Media
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-teal-50">
                <ImageIcon size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Images</p>
                <p className="text-2xl font-bold text-[#0B1D3A]">{totalImages}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-orange-50">
                <ImageIcon size={24} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Videos</p>
                <p className="text-2xl font-bold text-[#0B1D3A]">{totalVideos}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-50">
                <Eye size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Categories</p>
                <p className="text-2xl font-bold text-[#0B1D3A]">{totalCategories}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
              style={selectedCategory === cat ? { backgroundColor: "#0D9488" } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={item.thumbnail || item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Type Badge */}
                <div className="absolute top-2 left-2 bg-black/60 text-white rounded-full px-2 py-1 text-xs flex items-center gap-1">
                  {item.type === "image" ? <ImageIcon size={12} /> : <ImageIcon size={12} />}
                  <span className="capitalize">{item.type}</span>
                </div>
                {/* Category Badge */}
                <div className="absolute top-2 right-2 bg-[#0D9488] text-white rounded-full px-3 py-1 text-xs font-medium">
                  {item.category}
                </div>
                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity"
                  style={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                >
                  <button onClick={() => handleView(item)} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors" title="View">
                    <Eye size={18} className="text-gray-700" />
                  </button>
                  <button onClick={() => handleEdit(item)} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors" title="Edit">
                    <Edit2 size={18} className="text-teal-600" />
                  </button>
                  <button onClick={() => handleDelete(item)} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors" title="Delete">
                    <Trash2 size={18} className="text-orange-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm truncate text-[#0B1D3A]">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{item.category}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No media found in this category</p>
            <p className="text-gray-400 text-sm mt-1">Upload some content to get started</p>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#0B1D3A]">Upload Media</h2>
                <button onClick={() => { setShowUploadModal(false); setUploadForm({ title: "", category: "Kitchen", type: "image", src: "", description: "" }); }} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div
                  onClick={() => document.getElementById("gallery-file-input")?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#0D9488] hover:bg-teal-50/30 transition-all"
                >
                  <input id="gallery-file-input" type="file" accept="image/*,video/*" onChange={handleFileInput} className="hidden" />
                  <Upload size={40} className="mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">Supports images and videos</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" value={uploadForm.title} onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })} placeholder="Enter media title" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={uploadForm.category} onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm bg-white">
                    {categories.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setUploadForm({ ...uploadForm, type: "image" })} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${uploadForm.type === "image" ? "border-[#0D9488] bg-teal-50 text-teal-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}>
                      <ImageIcon size={16} /> Image
                    </button>
                    <button type="button" onClick={() => setUploadForm({ ...uploadForm, type: "video" })} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${uploadForm.type === "video" ? "border-[#0D9488] bg-teal-50 text-teal-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}>
                      Video
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 p-6 border-t border-gray-100">
                <button onClick={() => setShowUploadModal(false)} className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleUploadSubmit} disabled={!uploadForm.title || !uploadForm.src} className="flex-1 py-2.5 rounded-lg text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all" style={{ backgroundColor: "#0D9488" }}>Upload</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#0B1D3A]">Edit Media</h2>
                <button onClick={() => { setShowEditModal(false); setActiveItem(null); }} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm bg-white">
                    {categories.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm resize-none" />
                </div>
              </div>
              <div className="flex gap-3 p-6 border-t border-gray-100">
                <button onClick={() => { setShowEditModal(false); setActiveItem(null); }} className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-600 font-medium text-sm hover:bg-gray-50">Cancel</button>
                <button onClick={handleEditSubmit} className="flex-1 py-2.5 rounded-lg text-white font-semibold text-sm" style={{ backgroundColor: "#0D9488" }}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1D3A] mb-2">Delete Media?</h3>
                <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => { setShowDeleteModal(false); setActiveItem(null); }} className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-600 font-medium text-sm hover:bg-gray-50">Cancel</button>
                  <button onClick={handleDeleteConfirm} className="flex-1 py-2.5 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700">Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setShowViewModal(false)}>
            <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowViewModal(false)} className="absolute top-4 right-4 text-white/70 hover:text-white">
                <X size={24} />
              </button>
              <img src={activeItem.src} alt={activeItem.title} className="w-full rounded-xl shadow-2xl" />
              <div className="mt-4 text-center">
                <h3 className="text-white font-bold text-lg">{activeItem.title}</h3>
                {activeItem.description && <p className="text-white/60 text-sm mt-1">{activeItem.description}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
