export const business = {
  name: "Classic Cleaning",
  fullName: "Classic Cleaning Services",
  tagline: "Professional Cleaning Services In Pune You Can Trust",
  description:
    "Premium residential and commercial cleaning services in Pune. Background-verified staff, eco-friendly products, same-day service available.",

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
