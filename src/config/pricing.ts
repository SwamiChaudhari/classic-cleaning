import { business } from "./business";

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  popular?: boolean;
  badge?: string;
  category: "regular" | "deep" | "commercial" | "move";
}

export const packages: Package[] = [
  {
    id: "1-bhk-deep",
    name: "1 BHK Deep Cleaning",
    description: "Complete deep cleaning for 1 BHK apartments",
    price: 1999,
    originalPrice: 2499,
    features: [
      "Living Room Deep Clean",
      "Bedroom Cleaning",
      "Kitchen Deep Clean",
      "Bathroom Deep Clean",
      "Floor Scrubbing & Mopping",
      "Window Cleaning (Inside)",
      "Dusting & Vacuuming",
      "Trash Removal",
    ],
    category: "regular",
  },
  {
    id: "2-bhk-deep",
    name: "2 BHK Deep Cleaning",
    description: "Complete deep cleaning for 2 BHK apartments",
    price: 3499,
    originalPrice: 4499,
    popular: true,
    badge: "Most Popular",
    features: [
      "All Rooms Deep Clean",
      "Kitchen Deep Clean",
      "2 Bathrooms Deep Clean",
      "Floor Scrubbing & Mopping",
      "Window Cleaning (Inside)",
      "Dusting & Vacuuming",
      "Balcony Cleaning",
      "Trash Removal",
      "Surface Sanitization",
    ],
    category: "regular",
  },
  {
    id: "3-bhk-deep",
    name: "3 BHK Deep Cleaning",
    description: "Complete deep cleaning for 3 BHK apartments",
    price: 4499,
    originalPrice: 5499,
    features: [
      "All Rooms Deep Clean",
      "Kitchen Deep Clean",
      "2-3 Bathrooms Deep Clean",
      "Floor Scrubbing & Mopping",
      "Window Cleaning (Inside)",
      "Dusting & Vacuuming",
      "Balcony Cleaning",
      "Trash Removal",
      "Surface Sanitization",
      "Inside Cabinets",
    ],
    category: "regular",
  },
  {
    id: "sofa-cleaning",
    name: "Sofa Cleaning",
    description: "Professional sofa & upholstery cleaning",
    price: 499,
    originalPrice: 799,
    badge: "Best Value",
    features: [
      "Deep Fabric Cleaning",
      "Stain Removal",
      "Allergen Elimination",
      "Odor Removal",
      "Quick Drying",
      "Fabric Protection",
    ],
    category: "regular",
  },
  {
    id: "kitchen-cleaning",
    name: "Kitchen Deep Cleaning",
    description: "Complete kitchen deep cleaning including chimney",
    price: 1499,
    originalPrice: 1999,
    features: [
      "Chimney Deep Clean",
      "Appliance Cleaning",
      "Countertop Sanitization",
      "Tile & Grout Cleaning",
      "Grease & Oil Removal",
      "Cabinet Exterior",
      "Sink & Faucet Polishing",
    ],
    category: "regular",
  },
  {
    id: "bathroom-cleaning",
    name: "Bathroom Deep Cleaning",
    description: "Expert bathroom cleaning & sanitization",
    price: 999,
    originalPrice: 1299,
    features: [
      "Tile & Grout Scrubbing",
      "Toilet Deep Clean",
      "Fixture Polishing",
      "Mirror & Glass Cleaning",
      "Floor & Wall Sanitization",
      "Drain Cleaning",
    ],
    category: "regular",
  },
  {
    id: "move-in-out",
    name: "Move-In / Move-Out",
    description: "Complete property deep clean for moving",
    price: 3499,
    originalPrice: 4499,
    features: [
      "All Rooms Deep Clean",
      "Inside Cabinets & Drawers",
      "Appliance Cleaning",
      "Carpet Deep Clean",
      "Wall Spot Cleaning",
      "Window Cleaning",
      "Bathroom & Kitchen Deep Clean",
      "Balcony Cleaning",
    ],
    category: "move",
  },
  {
    id: "office-standard",
    name: "Office Standard Cleaning",
    description: "Professional office cleaning — up to 1000 sq ft",
    price: 2999,
    originalPrice: 3999,
    features: [
      "Workstation Cleaning",
      "Common Area Sanitization",
      "Washroom Deep Clean",
      "Pantry Cleaning",
      "Floor Mopping",
      "Trash Management",
    ],
    category: "commercial",
  },
];

export function formatPrice(amount: number): string {
  return `${business.currencySymbol}${amount.toLocaleString("en-IN")}`;
}

export function getPopularPackage(): Package | undefined {
  return packages.find((p) => p.popular);
}

export function getPackagesByCategory(category: string): Package[] {
  return packages.filter((p) => p.category === category);
}
