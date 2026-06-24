import { business } from "./business";

export interface BlogPost {
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
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Deep Cleaning Cost In Pune — Complete Guide 2026",
    slug: "deep-cleaning-cost-pune",
    excerpt:
      "Wondering how much deep cleaning costs in Pune? Here's a complete breakdown of pricing, what's included, and how to get the best value.",
    content: "Deep cleaning covers every corner of your home. In Pune's climate, dust and humidity cause stubborn grime in kitchens and bathrooms. This guide breaks down deep cleaning costs in Pune.\n\nAverage cost: 1 BHK starts at ₹1,999, 2 BHK at ₹2,999, 3 BHK+ at ₹3,999. Prices include kitchen deep clean, bathroom sanitization, floor scrubbing, window cleaning, and surface disinfection.\n\nFactors affecting cost: property size, bathrooms, grime level, and add-ons. At Classic Cleaning, we offer transparent pricing with no hidden charges.",
    category: "Guides",
    author: "Classic Cleaning Team",
    date: "June 20, 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80",
    tags: ["deep cleaning", "pricing", "pune", "cleaning tips"],
    featured: true,
  },
  {
    id: "2",
    title: "Kitchen Cleaning Tips — Keep Your Kitchen Spotless",
    slug: "kitchen-cleaning-tips",
    excerpt:
      "Practical kitchen cleaning tips from professional cleaners. How to maintain a clean kitchen daily and when to call the pros.",
    content: "Keeping your kitchen clean doesn't have to be a chore. With the right techniques, you can maintain a spotless kitchen every day.\n\nClean as you cook — wipe surfaces while waiting. Use vinegar and baking soda for tough stains. Don't forget appliances: microwave weekly, fridge doors monthly, chimney every 3-4 months.\n\nFor Pune homes, humidity causes mold in corners. Keep well-ventilated. A 10-minute daily wipe-down saves hours of deep cleaning.",
    category: "Tips",
    author: "Classic Cleaning Team",
    date: "June 15, 2026",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    tags: ["kitchen", "cleaning tips", "home maintenance"],
  },
  {
    id: "3",
    title: "Bathroom Cleaning Guide — Deep Clean Like A Pro",
    slug: "bathroom-cleaning-guide",
    excerpt:
      "Step-by-step bathroom cleaning guide. Remove stains, kill germs, and keep your bathroom sparkling clean.",
    content: "A clean bathroom is essential for hygiene. Here's a step-by-step guide to deep cleaning your bathroom.\n\nSpray surfaces with eco-friendly cleaner and let sit 5-10 minutes. Scrub tiles focusing on grout lines. Use vinegar solution for fixtures.\n\nToilet: use cleaner with bowl brush. Mirrors: microfiber cloth. Mop floor with disinfectant.\n\nOur professional bathroom cleaning handles everything in 1-2 hours.",
    category: "Guides",
    author: "Classic Cleaning Team",
    date: "June 10, 2026",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    tags: ["bathroom", "cleaning guide", "sanitization"],
  },
  {
    id: "4",
    title: "Sofa Cleaning Guide — Extend Your Sofa's Life",
    slug: "sofa-cleaning-guide",
    excerpt:
      "Your sofa collects dust, allergens, and stains. Learn how to maintain it and when professional cleaning is needed.",
    content: "Your sofa collects dust, allergens, and stains daily. Regular vacuuming helps, but professional cleaning goes deeper.\n\nFabric sofas absorb oils and pet hair. For families with children or pets, professional cleaning every 3-4 months is recommended.\n\nProfessional sofa cleaning uses hot water extraction and fabric-safe chemicals. Starts at ₹499 per seat. Pro tip: vacuum weekly and blot spills immediately.",
    category: "Guides",
    author: "Classic Cleaning Team",
    date: "June 5, 2026",
    readTime: "3 min",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    tags: ["sofa", "furniture", "cleaning guide"],
  },
  {
    id: "5",
    title: "Move-In Move-Out Cleaning Checklist",
    slug: "move-in-move-out-checklist",
    excerpt:
      "Complete checklist for move-in/move-out cleaning. Don't lose your security deposit — here's what landlords check.",
    content: "Moving is stressful enough without worrying about cleaning. Use this comprehensive checklist.\n\nKitchen: Clean inside cabinets, deep clean appliances, scrub tiles, clean chimney. Bathrooms: Scrub tiles, deep clean toilet, polish fixtures. Living Areas: Dust all surfaces, vacuum carpets, clean windows, wipe walls.\n\nDon't forget: light switches, door handles, window sills, balcony. Our move-in/move-out cleaning handles everything.",
    category: "Checklists",
    author: "Classic Cleaning Team",
    date: "May 28, 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    tags: ["moving", "checklist", "deep cleaning"],
  },
  {
    id: "6",
    title: "Office Cleaning Checklist For Pune Businesses",
    slug: "office-cleaning-checklist",
    excerpt:
      "A clean office boosts productivity. Here's what to include in your office cleaning routine and how often.",
    content: "A clean office boosts productivity and creates a professional impression.\n\nDaily: Empty trash, wipe desks, clean restrooms, vacuum, sanitize handles. Weekly: Deep clean restrooms, mop floors, dust partitions, clean windows. Monthly: Deep clean carpets, polish floors, clean vents.\n\nFor Pune businesses, dust accumulation is a major challenge. Our office cleaning contracts start at ₹2,999.",
    category: "Checklists",
    author: "Classic Cleaning Team",
    date: "May 20, 2026",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    tags: ["office", "commercial", "checklist"],
  },
];

export const blogCategories = [
  "All",
  "Guides",
  "Tips",
  "Checklists",
  "News",
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}

export function getFeaturedBlogs(): BlogPost[] {
  return blogPosts.filter((b) => b.featured);
}

export function getBlogsByCategory(category: string): BlogPost[] {
  if (category === "All") return blogPosts;
  return blogPosts.filter((b) => b.category === category);
}
