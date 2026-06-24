import { business } from "./business";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  avatar: string;
  bio: string;
  verified: boolean;
}

export const team: TeamMember[] = [
  {
    id: "founder",
    name: "Classic Cleaning Team",
    role: "Founder & CEO",
    experience: "5+ years",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio: "Started Classic Cleaning with a vision to bring professional, trustworthy cleaning services to every home in Pune.",
    verified: true,
  },
  {
    id: "operations",
    name: "Operations Manager",
    role: "Operations Head",
    experience: "4+ years",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Ensures every cleaning job meets our quality standards. Manages scheduling and team coordination.",
    verified: true,
  },
  {
    id: "quality",
    name: "Quality Assurance",
    role: "QA Lead",
    experience: "3+ years",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "Conducts quality checks and ensures customer satisfaction after every service.",
    verified: true,
  },
  {
    id: "lead-cleaner",
    name: "Lead Cleaner",
    role: "Senior Cleaning Professional",
    experience: "6+ years",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Trains new team members and handles complex cleaning projects. Expert in deep cleaning.",
    verified: true,
  },
];

export const companyInfo = {
  founded: "2021",
  mission:
    "To provide every home and business in Pune with professional, reliable, and affordable cleaning services that exceed expectations.",
  vision:
    "To become Pune's most trusted cleaning brand known for quality, transparency, and customer satisfaction.",
  values: [
    {
      title: "Trust & Transparency",
      description:
        "No hidden charges. What you see is what you pay. All staff background verified.",
      icon: "Shield",
    },
    {
      title: "Quality First",
      description:
        "We never cut corners. Every cleaning job goes through quality checks.",
      icon: "Award",
    },
    {
      title: "Customer Satisfaction",
      description:
        "Not happy? We re-clean for free. Your satisfaction is our priority.",
      icon: "Heart",
    },
    {
      title: "Eco-Friendly",
      description:
        "Safe chemicals, sustainable practices, minimal environmental impact.",
      icon: "Leaf",
    },
  ],
  stats: [
    { label: "Homes Cleaned", value: "1,500+" },
    { label: "Happy Customers", value: "151+" },
    { label: "Years Experience", value: "5+" },
    { label: "Areas Served", value: "10+" },
    { label: "Same-Day Service", value: "Available" },
    { label: "Customer Rating", value: "4.8★" },
  ],
};
