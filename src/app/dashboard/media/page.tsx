"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Plus, Trash2, Upload, X, Copy, ExternalLink } from "lucide-react";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: "image" | "video";
  size: string;
  uploaded: string;
}

const initialMedia: MediaItem[] = [
  { id: "1", name: "kitchen-after.jpg", url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", type: "image", size: "2.4 MB", uploaded: "Jun 20, 2026" },
  { id: "2", name: "bathroom-clean.jpg", url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80", type: "image", size: "1.8 MB", uploaded: "Jun 18, 2026" },
  { id: "3", name: "sofa-cleaning.jpg", url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", type: "image", size: "3.1 MB", uploaded: "Jun 15, 2026" },
  { id: "4", name: "office-clean.jpg", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", type: "image", size: "2.2 MB", uploaded: "Jun 12, 2026" },
  { id: "5", name: "team-photo.jpg", url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80", type: "image", size: "4.0 MB", uploaded: "Jun 10, 2026" },
  { id: "6", name: "deep-cleaning.jpg", url: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80", type: "image", size: "1.9 MB", uploaded: "Jun 8, 2026" },
];

export default function MediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      const newId = String(Date.now());
      setMedia([
        {
          id: newId,
          name: `new-upload-${newId.slice(-4)}.jpg`,
          url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
          type: "image",
          size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
          uploaded: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        },
        ...media,
      ]);
      setUploading(false);
    }, 1500);
  };

  const handleDelete = (id: string) => {
    setMedia(media.filter((m) => m.id !== id));
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-poppins)]">Media Library</h1>
            <p className="text-sm text-gray-500">Upload and manage images for your website</p>
          </div>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="flex items-center gap-2 bg-gradient-to-r from-orange to-gold text-white font-bold px-5 py-2.5 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload Media"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="text-2xl font-extrabold text-navy">{media.length}</div>
            <div className="text-xs text-gray-500">Total Files</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="text-2xl font-extrabold text-navy">
              {media.filter((m) => m.type === "image").length}
            </div>
            <div className="text-xs text-gray-500">Images</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="text-2xl font-extrabold text-navy">
              {media.reduce((acc, m) => acc + parseFloat(m.size), 0).toFixed(1)} MB
            </div>
            <div className="text-xs text-gray-500">Total Size</div>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          onClick={handleUpload}
          className="border-2 border-dashed border-border rounded-2xl p-8 mb-6 text-center cursor-pointer hover:border-blue/40 hover:bg-blue-light/10 transition-all"
        >
          <div className="w-14 h-14 bg-blue-light rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Image className="w-7 h-7 text-blue" />
          </div>
          <p className="font-semibold text-navy mb-1">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
        </div>

        {/* Media Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {media.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-xl border border-border overflow-hidden group hover:shadow-card-hover transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleCopy(item.url)}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-blue-light text-navy"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-blue-light text-navy"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-red-50 text-red-500"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="font-medium text-navy text-sm truncate">{item.name}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                  <span>{item.size}</span>
                  <span>{item.uploaded}</span>
                </div>
                {copied === item.url && (
                  <p className="text-xs text-emerald font-medium mt-1">✓ Copied!</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
