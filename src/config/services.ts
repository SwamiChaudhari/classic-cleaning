import { business } from "./business";

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  startingPrice: number;
  popular?: boolean;
  features: string[];
  category: "residential" | "commercial" | "specialty";
  image: string;
}

export const services: Service[] = [
  {
    id: "home-cleaning",
    title: "Home Cleaning",
    slug: "home-cleaning",
    description:
      "Complete home cleaning service including dusting, vacuuming, mopping, kitchen cleaning, bathroom cleaning, and surface sanitizing. Our trained professionals use eco-friendly products and advanced equipment to ensure every corner of your home is spotless. Perfect for maintaining a clean and healthy home environment for your family. Same-day service available across all Pune areas.",
    shortDescription:
      "Complete home cleaning — dusting, vacuuming, mopping, kitchen & bathroom",
    icon: "Home",
    startingPrice: 1499,
    features: [
      "Dusting & Vacuuming All Rooms",
      "Kitchen Deep Clean",
      "Bathroom Sanitization",
      "Floor Mopping",
      "Surface Disinfection",
      "Trash Removal",
    ],
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
  },
  {
    id: "deep-cleaning",
    title: "Deep Cleaning",
    slug: "deep-cleaning",
    description:
      "Intensive deep cleaning that covers every corner of your home. Our team tackles inside appliances, baseboard scrubbing, window cleaning, carpet shampooing, and detailed sanitization of all surfaces. Ideal if you haven't had a professional clean in 3+ months, or before hosting guests. We use hospital-grade disinfectants safe for kids and pets.",
    shortDescription:
      "Intensive cleaning — inside appliances, baseboards, windows, carpets",
    icon: "Sparkles",
    startingPrice: 2499,
    popular: true,
    features: [
      "Inside Appliance Cleaning",
      "Baseboard Scrubbing",
      "Window Cleaning Inside",
      "Carpet Deep Clean",
      "Detailed Surface Sanitization",
      "Corner & Crevice Cleaning",
      "Exhaust Fan Cleaning",
      "Light Fixture Cleaning",
    ],
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80",
  },
  {
    id: "kitchen-cleaning",
    title: "Kitchen Cleaning",
    slug: "kitchen-cleaning",
    description:
      "Professional kitchen cleaning including chimney deep cleaning, appliance interior scrubbing, countertop sanitization, tile and grout cleaning, and stubborn grease removal. Our team uses food-safe disinfectants and specialized tools to make your kitchen hygienic and sparkling. Recommended monthly for home kitchens and weekly for commercial ones.",
    shortDescription:
      "Chimney, appliances, countertops, tile & grease removal",
    icon: "CookingPot",
    startingPrice: 1499,
    features: [
      "Chimney Deep Clean",
      "Refrigerator Cleaning",
      "Microwave & Oven Cleaning",
      "Countertop Sanitization",
      "Tile & Grout Cleaning",
      "Grease & Oil Removal",
      "Cabinet Exterior Cleaning",
      "Sink & Faucet Polishing",
    ],
    category: "specialty",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
  {
    id: "bathroom-cleaning",
    title: "Bathroom Cleaning",
    slug: "bathroom-cleaning",
    description:
      "Expert bathroom cleaning including tile scrubbing, fixture polishing, toilet deep clean, and complete sanitization. We remove stubborn stains, limescale buildup, soap scum, and kill 99.9% of germs using hospital-grade disinfectants. Your bathroom will look and smell fresh. Recommended weekly for commercial bathrooms and monthly for homes.",
    shortDescription:
      "Tile scrubbing, fixture polishing, toilet deep clean, sanitization",
    icon: "Bath",
    startingPrice: 999,
    features: [
      "Tile & Grout Scrubbing",
      "Toilet Deep Clean",
      "Fixture Polishing",
      "Mirror & Glass Cleaning",
      "Exhaust Fan Cleaning",
      "Floor & Wall Sanitization",
      "Soap Scum Removal",
      "Drain Cleaning",
    ],
    category: "specialty",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
  },
  {
    id: "sofa-cleaning",
    title: "Sofa Cleaning",
    slug: "sofa-cleaning",
    description:
      "Professional sofa and upholstery cleaning using advanced hot-water extraction and dry cleaning equipment. We remove deep-set stains, dust mites, pet allergens, and stubborn odors to extend the life of your furniture by years. Suitable for all fabric types including cotton, silk, leather, and microfiber. Recommended every 6 months to keep your furniture hygienic and looking new.",
    shortDescription:
      "Stain removal, allergen elimination, fabric-safe deep clean",
    icon: "Sofa",
    startingPrice: 499,
    features: [
      "Deep Fabric Cleaning",
      "Stain Removal",
      "Allergen Elimination",
      "Odor Removal",
      "Fabric Protection",
      "Quick Drying",
      "Leather Conditioning (if applicable)",
      "Cushion Fluffing",
    ],
    category: "specialty",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    id: "office-cleaning",
    title: "Office Cleaning",
    slug: "office-cleaning",
    description:
      "Professional office cleaning for businesses of all sizes across Pune. We cover individual workstations, meeting rooms, common area sanitization, washroom deep cleaning, and pantry maintenance. Flexible scheduling available including after-hours and weekends to minimize disruption. Essential for maintaining employee health and workplace professionalism.",
    shortDescription:
      "Workstations, common areas, washrooms, pantry — flexible scheduling",
    icon: "Building2",
    startingPrice: 2999,
    features: [
      "Workstation Cleaning",
      "Common Area Sanitization",
      "Washroom Deep Clean",
      "Pantry & Kitchen Cleaning",
      "Floor Mopping & Vacuuming",
      "Glass Partition Cleaning",
      "Keyboard & Equipment Dusting",
      "Trash Management",
    ],
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    id: "commercial-cleaning",
    title: "Commercial Cleaning",
    slug: "commercial-cleaning",
    description:
      "Comprehensive commercial cleaning for retail stores, restaurants, warehouses, medical clinics, and corporate buildings. Customized packages based on your business needs.",
    shortDescription:
      "Retail, restaurants, warehouses, clinics — customized packages",
    icon: "Store",
    startingPrice: 4999,
    features: [
      "Large Space Cleaning",
      "High-Traffic Area Maintenance",
      "Floor Polishing & Buffing",
      "Window Cleaning (Interior)",
      "Restroom Sanitization",
      "Break Room Cleaning",
      "Waste Management",
      "Flexible Scheduling",
    ],
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  },
  {
    id: "move-in-out",
    title: "Move-In / Move-Out Cleaning",
    slug: "move-in-out",
    description:
      "Thorough cleaning for moving in or out of a property. Includes deep cleaning of all rooms, inside cabinets, appliance cleaning, carpet cleaning, and wall spot cleaning.",
    shortDescription:
      "Complete property deep clean for moving — all rooms, appliances, carpets",
    icon: "PackageOpen",
    startingPrice: 3499,
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
    category: "specialty",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  },
];

export const serviceCategories = [
  { id: "residential", label: "Residential", icon: "Home" },
  { id: "commercial", label: "Commercial", icon: "Building2" },
  { id: "specialty", label: "Specialty", icon: "Sparkles" },
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter((s) => s.category === category);
}

export function formatPrice(amount: number): string {
  return `${business.currencySymbol}${amount.toLocaleString("en-IN")}`;
}
