"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 flex items-center gap-1">
        <Share2 className="w-4 h-4" />
        Share:
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center text-gray-400 hover:text-blue hover:bg-blue-light transition-colors"
        aria-label="Share on Twitter"
      >
        𝕏
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center text-gray-400 hover:text-blue hover:bg-blue-light transition-colors"
        aria-label="Share on Facebook"
      >
        f
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald hover:bg-emerald-light transition-colors"
        aria-label="Share on WhatsApp"
      >
        💬
      </a>
      <button
        onClick={handleCopy}
        className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center text-gray-400 hover:text-navy hover:bg-navy-50 transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-emerald" /> : <span className="text-xs">🔗</span>}
      </button>
    </div>
  );
}
