export const galleryItems = [
  {
    id: "1",
    title: "Kitchen Deep Clean",
    category: "Kitchen",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    description: "Before & after kitchen deep cleaning",
  },
  {
    id: "2",
    title: "Bathroom Transformation",
    category: "Bathroom",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    description: "Complete bathroom sanitization",
  },
  {
    id: "3",
    title: "Sofa Deep Clean",
    category: "Sofa",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    description: "Professional sofa cleaning",
  },
  {
    id: "4",
    title: "Living Room Cleaning",
    category: "Living Room",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    description: "Complete living room cleaning",
  },
  {
    id: "5",
    title: "Office Space Cleaning",
    category: "Office",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    description: "Professional office cleaning",
  },
  {
    id: "6",
    title: "Deep Cleaning Process",
    category: "Process",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80",
    description: "Our team at work",
  },
  {
    id: "7",
    title: "Bedroom Deep Clean",
    category: "Bedroom",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    description: "Spotless bedroom cleaning",
  },
  {
    id: "8",
    title: "Commercial Cleaning",
    category: "Commercial",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    description: "Large commercial space cleaning",
  },
  {
    id: "9",
    title: "Team at Work",
    category: "Team",
    type: "video" as const,
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    description: "See our team in action",
  },
];

export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryItems.map((g) => g.category))),
];

export function getGalleryByCategory(category: string) {
  if (category === "All") return galleryItems;
  return galleryItems.filter((g) => g.category === category);
}
