'use client';

import { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  X,
  Save,
  AlertTriangle,
  Star,
} from 'lucide-react';
import { business } from "@/config/business";
import { blogPosts as defaultBlogs, BlogPost, blogCategories } from '@/config/blog';

interface BlogFormData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string;
  featured: boolean;
}

const emptyForm: BlogFormData = {
  id: '',
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Guides',
  author: `${business.name} Team`,
  date: new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }),
  readTime: '5 min',
  image: '',
  tags: '',
  featured: false,
};

const categoryColors: Record<string, string> = {
  Guides: 'bg-blue-100 text-blue-700',
  Tips: 'bg-green-100 text-green-700',
  Checklists: 'bg-amber-100 text-amber-700',
  News: 'bg-purple-100 text-purple-700',
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function BlogManagement() {
  const [blogList, setBlogList] = useState<BlogPost[]>(defaultBlogs);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load blogs from API on mount
  useEffect(() => {
    fetch('/api/config/blogs')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogList(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Persist blogs to API
  const persistBlogs = async (blogs: BlogPost[]) => {
    setSaving(true);
    try {
      await fetch('/api/config/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogs),
      });
    } catch (e) {
      console.error('Failed to save blogs:', e);
    } finally {
      setSaving(false);
    }
  };

  const filteredBlogs =
    filterCategory === 'All'
      ? blogList
      : blogList.filter((b) => b.category === filterCategory);

  const totalPosts = blogList.length;
  const publishedPosts = blogList.filter((b) => b.content).length;
  const draftPosts = totalPosts - publishedPosts;
  const totalViews = blogList.length * 342;

  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingId(blog.id);
    setFormData({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      author: blog.author,
      date: blog.date,
      readTime: blog.readTime,
      image: blog.image,
      tags: blog.tags.join(', '),
      featured: blog.featured || false,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleSave = () => {
    const slug = generateSlug(formData.title);
    const blogData: BlogPost = {
      id: formData.id || slug,
      title: formData.title,
      slug,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      author: formData.author,
      date: formData.date,
      readTime: formData.readTime,
      image: formData.image,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured: formData.featured,
    };

    let updated: BlogPost[];
    if (editingId) {
      updated = blogList.map((b) => (b.id === editingId ? blogData : b));
    } else {
      updated = [blogData, ...blogList];
    }
    setBlogList(updated);
    persistBlogs(updated);
    closeModal();
  };

  const handleDelete = (id: string) => {
    const updated = blogList.filter((b) => b.id !== id);
    setBlogList(updated);
    persistBlogs(updated);
    setDeleteConfirm(null);
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#0B1D3A' }}>
              Blog Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your blog posts — create, edit, or remove articles.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
            style={{ backgroundColor: '#0D9488' }}
          >
            <Plus className="h-4 w-4" />
            New Post
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Posts</p>
            <p className="mt-1 text-2xl font-bold" style={{ color: '#0B1D3A' }}>
              {totalPosts}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Published</p>
            <p className="mt-1 text-2xl font-bold text-teal-600">
              {publishedPosts}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Drafts</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">
              {draftPosts}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Views</p>
            <p className="mt-1 text-2xl font-bold" style={{ color: '#EA580C' }}>
              {totalViews.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filterCategory === cat
                  ? 'text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              style={
                filterCategory === cat ? { backgroundColor: '#0B1D3A' } : {}
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm lg:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Post
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Author
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Date
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
              {filteredBlogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="transition-colors hover:bg-gray-50/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: '#0D948815' }}
                      >
                        <FileText
                          className="h-5 w-5"
                          style={{ color: '#0D9488' }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-gray-900">
                          {blog.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {blog.readTime} read
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        categoryColors[blog.category] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{blog.author}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {blog.date}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {blog.featured ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        title="View Post"
                      >
                        <Eye className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => openEditModal(blog)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-teal-50 hover:text-teal-600"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(blog.id)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBlogs.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-2 text-gray-400">No blog posts found.</p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="rounded-xl bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: '#0D948815' }}
                  >
                    <FileText
                      className="h-5 w-5"
                      style={{ color: '#0D9488' }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900">
                      {blog.title}
                    </p>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        categoryColors[blog.category] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {blog.category}
                    </span>
                  </div>
                </div>
                {blog.featured && (
                  <Star className="h-4 w-4 shrink-0 fill-current text-amber-500" />
                )}
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                {blog.excerpt}
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{blog.author}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {blog.date}
                  </span>
                  <span>{blog.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <a
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100"
                    title="View"
                  >
                    <Eye className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => openEditModal(blog)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-teal-50 hover:text-teal-600"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(blog.id)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredBlogs.length === 0 && (
            <div className="rounded-xl bg-white py-12 text-center shadow-sm">
              <FileText className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-2 text-gray-400">No blog posts found.</p>
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
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-teal-400" />
                  <h2 className="text-lg font-semibold text-white">
                    {editingId ? 'Edit Blog Post' : 'Create New Post'}
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-4 p-6">
                {/* Title */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title..."
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Slug
                  </label>
                  <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
                    <span className="text-sm text-gray-400">/blog/</span>
                    <span className="text-sm text-gray-700">
                      {formData.slug || 'auto-generated-slug'}
                    </span>
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        excerpt: e.target.value,
                      }))
                    }
                    placeholder="Brief description of the post..."
                    rows={2}
                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    placeholder="Write your blog content here..."
                    rows={6}
                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                {/* Category & Author Row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      {blogCategories
                        .filter((c) => c !== 'All')
                        .map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Author
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          author: e.target.value,
                        }))
                      }
                      placeholder="Author name..."
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tags: e.target.value,
                      }))
                    }
                    placeholder="Comma-separated tags (e.g., cleaning, tips, home)"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Featured Image URL
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
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        featured: !prev.featured,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                      formData.featured ? 'bg-teal-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                        formData.featured ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                      style={{ marginTop: '2px' }}
                    />
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    Featured Post
                  </span>
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
                  {editingId ? 'Update Post' : 'Create Post'}
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
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle
                    className="h-5 w-5"
                    style={{ color: '#EA580C' }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Delete Post</h3>
                  <p className="text-sm text-gray-500">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Are you sure you want to permanently delete this blog post?
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
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                  style={{ backgroundColor: '#EA580C' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
