"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { faqs } from "@/config/faq";
import DashboardLayout from '../layout'

export default function FAQsManagement() {
  const [items, setItems] = useState(faqs);
  const [editId, setEditId] = useState<string | null>(null);
  const [editQ, setEditQ] = useState("");
  const [editA, setEditA] = useState("");
  const [editCat, setEditCat] = useState("");

  const handleAdd = () => {
    const newId = String(Date.now());
    setItems([
      ...items,
      { id: newId, question: "New Question?", answer: "Answer goes here.", category: "General" },
    ]);
  };

  const handleEdit = (id: string) => {
    const item = items.find((f) => f.id === id);
    if (item) {
      setEditId(id);
      setEditQ(item.question);
      setEditA(item.answer);
      setEditCat(item.category);
    }
  };

  const handleSave = () => {
    if (editId) {
      setItems(items.map((f) => (f.id === editId ? { ...f, question: editQ, answer: editA, category: editCat } : f)));
      setEditId(null);
    }
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((f) => f.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Manage FAQs</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-teal text-white font-bold px-4 py-2.5 rounded-xl hover:bg-teal/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      <div className="space-y-3">
        {items.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-xl border border-border p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold bg-blue-light text-blue px-2 py-0.5 rounded-full uppercase">
                    {faq.category}
                  </span>
                </div>
                <h3 className="font-semibold text-navy text-sm mb-1">{faq.question}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{faq.answer}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => handleEdit(faq.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-light text-gray-400 hover:text-blue"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditId(null)} />
          <div
            className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"
          >
            <h3 className="font-bold text-navy mb-4">Edit FAQ</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                <input
                  type="text"
                  value={editQ}
                  onChange={(e) => setEditQ(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <textarea
                  value={editA}
                  onChange={(e) => setEditA(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={editCat}
                  onChange={(e) => setEditCat(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditId(null)}
                className="flex-1 py-3 bg-surface border border-border rounded-xl font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal/90"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
}
