/**
 * Internationalization (i18n) Infrastructure
 * 
 * Supports multiple languages for the cleaning platform.
 * Each client can enable languages and provide translations.
 * 
 * Usage:
 *   import { t, getCurrentLanguage, setLanguage } from '@/lib/i18n';
 *   const text = t('hero.title');
 */

export type Language = "en" | "hi" | "mr";

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const supportedLanguages: LanguageConfig[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", dir: "ltr" },
];

export const defaultLanguage: Language = "en";

/**
 * Translation dictionary structure.
 * Keys are dot-notation paths like "hero.title"
 */
export type Translations = Record<string, string | Record<string, string>>;

/**
 * Default English translations (fallback).
 */
const enTranslations: Translations = {
  nav: {
    services: "Services",
    pricing: "Pricing",
    about: "About",
    gallery: "Gallery",
    areas: "Areas",
    contact: "Contact",
    getQuote: "Get Free Quote",
  },
  hero: {
    rating: "Rating",
    reviews: "Reviews",
    homes: "Homes",
    cta: "Get Your Free Estimate",
    ctaSecondary: "Call Now",
  },
  services: {
    title: "Our Services",
    subtitle: "Professional cleaning solutions for every need",
    startingFrom: "Starting from",
    bookNow: "Book Now",
  },
  pricing: {
    title: "Transparent Pricing",
    subtitle: "No hidden charges. What you see is what you pay.",
    mostPopular: "Most Popular",
    bookNow: "Book Now",
  },
  contact: {
    title: "Get In Touch",
    subtitle: "We'd love to hear from you. Book a service or ask a question.",
    name: "Your Name",
    phone: "Phone Number",
    email: "Email Address",
    service: "Service Needed",
    message: "Message",
    send: "Send Message",
    success: "Message Sent!",
    successDetail: "We'll get back to you within 30 minutes.",
  },
  common: {
    callNow: "Call Now",
    whatsapp: "WhatsApp",
    viewAll: "View All",
    learnMore: "Learn More",
    bookNow: "Book Now",
    freeQuote: "Free Quote",
  },
};

/**
 * Hindi translations.
 */
const hiTranslations: Translations = {
  nav: {
    services: "सेवाएं",
    pricing: "मूल्य",
    about: "हमारे बारे में",
    gallery: "गैलरी",
    areas: "क्षेत्र",
    contact: "संपर्क",
    getQuote: "मुफ्त कोट पाएं",
  },
  hero: {
    rating: "रेटिंग",
    reviews: "समीक्षाएं",
    homes: "घर",
    cta: "अपना मुफ्त अनुमान पाएं",
    ctaSecondary: "अभी कॉल करें",
  },
  services: {
    title: "हमारी सेवाएं",
    subtitle: "हर जरूरत के लिए पेशेवर सफाई समाधान",
    startingFrom: "शुरुआत",
    bookNow: "अभी बुक करें",
  },
  pricing: {
    title: "पारदर्शी मूल्य",
    subtitle: "कोई छुपा शुल्क नहीं। जो देखते हैं वही भुगतान करते हैं।",
    mostPopular: "सबसे लोकप्रिय",
    bookNow: "अभी बुक करें",
  },
  contact: {
    title: "संपर्क करें",
    subtitle: "हम आपसे सुनना पसंद करेंगे। सेवा बुक करें या सवाल पूछें।",
    name: "आपका नाम",
    phone: "फोन नंबर",
    email: "ईमेल पता",
    service: "कौन सी सेवा चाहिए",
    message: "संदेश",
    send: "संदेश भेजें",
    success: "संदेश भेजा गया!",
    successDetail: "हम 30 मिनट के भीतर आपसे संपर्क करेंगे।",
  },
  common: {
    callNow: "अभी कॉल करें",
    whatsapp: "व्हाट्सएप",
    viewAll: "सभी देखें",
    learnMore: "और जानें",
    bookNow: "अभी बुक करें",
    freeQuote: "मुफ्त कोट",
  },
};

/**
 * Marathi translations.
 */
const mrTranslations: Translations = {
  nav: {
    services: "सेवा",
    pricing: "किंमत",
    about: "आमच्याबद्दल",
    gallery: "अल्बम",
    areas: "भाग",
    contact: "संपर्क",
    getQuote: "मोफत कोट मिळवा",
  },
  hero: {
    rating: "रेटिंग",
    reviews: "पुनरावलोकने",
    homes: "घरे",
    cta: "तुमचा मोफत अंदाज मिळवा",
    ctaSecondary: "आता कॉल करा",
  },
  services: {
    title: "आमच्या सेवा",
    subtitle: "प्रत्येक गरजेसाठी व्यावसायिक स्वच्छता समाधान",
    startingFrom: "सुरुवात",
    bookNow: "आता बुक करा",
  },
  pricing: {
    title: "पारदर्शक किंमत",
    subtitle: "लपवलेला शुल्क नाही. जे पाहता ते भरता.",
    mostPopular: "सर्वात लोकप्रिय",
    bookNow: "आता बुक करा",
  },
  contact: {
    title: "संपर्क करा",
    subtitle: "आम्हाला तुमच्याकडून ऐकायला आवडेल. सेवा बुक करा किंवा प्रश्न विचारा.",
    name: "तुमचे नाव",
    phone: "फोन नंबर",
    email: "ईमेल पत्ता",
    service: "कोणती सेवा हवी",
    message: "संदेश",
    send: "संदेश पाठवा",
    success: "संदेश पाठवला!",
    successDetail: "आम्ही 30 मिनिटांत तुमच्याशी संपर्क करू.",
  },
  common: {
    callNow: "आता कॉल करा",
    whatsapp: "व्हॉट्सअॅप",
    viewAll: "सर्व पहा",
    learnMore: "अजून जाणून घ्या",
    bookNow: "आता बुक करा",
    freeQuote: "मोफत कोट",
  },
};

const translationsMap: Record<Language, Translations> = {
  en: enTranslations,
  hi: hiTranslations,
  mr: mrTranslations,
};

/**
 * Get nested value from translations object using dot notation.
 */
function getNestedValue(obj: Translations, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  
  return typeof current === "string" ? current : undefined;
}

/**
 * Translate a key for the given language.
 * Falls back to English if translation not found.
 * Falls back to the key itself if not found in English.
 */
export function t(key: string, lang: Language = defaultLanguage): string {
  const translations = translationsMap[lang] || translationsMap.en;
  
  // Try requested language first
  const value = getNestedValue(translations, key);
  if (value) return value;
  
  // Fall back to English
  const enValue = getNestedValue(translationsMap.en, key);
  if (enValue) return enValue;
  
  // Return key as-is
  return key;
}

/**
 * Get the current language from localStorage (client-side) or default.
 */
export function getCurrentLanguage(): Language {
  if (typeof window === "undefined") return defaultLanguage;
  const stored = localStorage.getItem("app_language") as Language;
  return stored && stored in translationsMap ? stored : defaultLanguage;
}

/**
 * Set the current language (client-side).
 */
export function setLanguage(lang: Language): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("app_language", lang);
    document.documentElement.lang = lang;
  }
}

/**
 * Generate a language switcher config for the current page.
 */
export function getLanguageSwitcherItems(currentLang: Language) {
  return supportedLanguages.map((lang) => ({
    ...lang,
    active: lang.code === currentLang,
  }));
}
