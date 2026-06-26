"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import {
  getCurrentLanguage,
  setLanguage,
  getLanguageSwitcherItems,
  type Language,
} from "@/lib/i18n";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<Language>("en");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLang(getCurrentLanguage());
  }, []);

  const items = getLanguageSwitcherItems(lang);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setLang(code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/10"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase">{lang}</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[140px]">
            {items.map((item) => (
              <button
                key={item.code}
                onClick={() => handleSelect(item.code)}
                className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                  item.active ? "text-teal font-medium" : "text-gray-700"
                }`}
              >
                <span className="text-base">{item.nativeName}</span>
                <span className="text-xs text-gray-400">({item.name})</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
