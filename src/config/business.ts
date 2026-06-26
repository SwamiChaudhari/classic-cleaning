export const business = {
  name: "Classic Cleaning",
  fullName: "Classic Cleaning Services",
  tagline: "Professional Cleaning Services In Pune You Can Trust",
  description:
    "Premium residential and commercial cleaning services in Pune. Background-verified staff, eco-friendly products, same-day service available.",

  // Domain
  domain: "https://classic-cleaning.vercel.app",

  // Branding
  logo: "/logo.svg",
  favicon: "/favicon.ico",

  // Brand Colors
  brand: {
    primary: "#0B1D3A",
    secondary: "#0D9488",
    accent: "#EA580C",
    success: "#059669",
  },

  // Fonts
  fonts: {
    heading: "Poppins",
    body: "Inter",
  },

  // Contact
  phone: "07385169523",
  whatsapp: "917385169523",
  email: "hello@classiccleaning.in",

  // Address
  address: {
    flat: "Flat No.09, Marne Building",
    area: "Left Bhusari Colony, Right Bhusari Colony",
    locality: "Kothrud",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411038",
    full: "Flat No.09, Marne Building, Left Bhusari Colony, Right Bhusari Colony, Kothrud, Pune – 411038",
  },

  // Google Maps
  googleMaps: {
    embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.203456!2d73.8076!3d18.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzI2LjYiTiA3M8KwNDgnMjcuNCJF!5e0!3m2!1sen!2sin!4v1700000000000",
    lat: 18.5074,
    lng: 73.8076,
    directions: "https://www.google.com/maps/dir/?api=1&destination=18.5074,73.8076",
  },

  // GST (for Indian clients)
  gst: "",

  // Hours
  hours: "Open Daily, 8 AM – 11 PM",
  emergencyAvailable: true,

  // Social
  social: {
    facebook: "https://facebook.com/classiccleaning",
    instagram: "https://instagram.com/classiccleaning",
    twitter: "https://twitter.com/classiccleaning",
    linkedin: "https://linkedin.com/company/classiccleaning",
    youtube: "https://youtube.com/@classiccleaning",
  },

  // Ratings
  rating: 4.8,
  reviewCount: 151,
  homesCleaned: 1500,
  yearsExperience: 5,

  // SEO
  seo: {
    title: "Classic Cleaning Services | Professional Cleaning In Pune",
    description:
      "Premium residential and commercial cleaning services in Pune. Background-verified staff, same-day service, 4.8★ rating. Get free quote now.",
    keywords: [
      "cleaning services pune",
      "house cleaning pune",
      "deep cleaning pune",
      "office cleaning pune",
      "commercial cleaning pune",
      "sofa cleaning pune",
      "kitchen cleaning pune",
      "bathroom cleaning pune",
      "move in move out cleaning pune",
      "best cleaning company pune",
      "professional cleaning pune",
      "home cleaning services kothrud",
    ],
    ogImage: "/og-image.jpg",
  },

  // Currency
  currency: "INR",
  currencySymbol: "₹",
};

export type Business = typeof business;
