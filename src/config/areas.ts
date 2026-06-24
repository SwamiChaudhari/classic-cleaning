import { business } from "./business";

export interface Area {
  id: string;
  name: string;
  slug: string;
  description: string;
  landmarks: string[];
  pincode: string;
}

export const areas: Area[] = [
  {
    id: "kothrud",
    name: "Kothrud",
    slug: "kothrud",
    description:
      "Our headquarters! Serving Kothrud with same-day cleaning services. Popular among families and working professionals.",
    landmarks: ["Paud Road", "Karve Road", "Kothrud Stand"],
    pincode: "411038",
  },
  {
    id: "baner",
    name: "Baner",
    slug: "baner",
    description:
      "Premium residential cleaning in Baner. Serving IT professionals and families in the Baner-Pashan belt.",
    landmarks: ["Baner Road", "Sus Road", "Pashan-Sus Road"],
    pincode: "411045",
  },
  {
    id: "warje",
    name: "Warje",
    slug: "warje",
    description:
      "Comprehensive cleaning services in Warje and surrounding areas. Trusted by hundreds of families.",
    landmarks: ["Warje Road", "Malwadi Road", "Warje Chowk"],
    pincode: "411058",
  },
  {
    id: "aundh",
    name: "Aundh",
    slug: "aundh",
    description:
      "Professional cleaning for the Aundh area. Popular among defense families and medical professionals.",
    landmarks: ["Aundh Road", "Sangvi", "Aundh Camp"],
    pincode: "411027",
  },
  {
    id: "bavdhan",
    name: "Bavdhan",
    slug: "bavdhan",
    description:
      "Expert cleaning services in Bavdhan. Serving the growing residential community.",
    landmarks: ["Bavdhan Road", "Kothrud-Bavdhan Road", "Cosmos Bank Chowk"],
    pincode: "411021",
  },
  {
    id: "karve-nagar",
    name: "Karve Nagar",
    slug: "karve-nagar",
    description:
      "Reliable cleaning in Karve Nagar. Convenient for residents near Karve Road corridor.",
    landmarks: ["Karve Road", "Karve Nagar Chowk", "Erandwane"],
    pincode: "411052",
  },
  {
    id: "wakad",
    name: "Wakad",
    slug: "wakad",
    description:
      "Fast-growing area with many IT companies. We provide residential and office cleaning in Wakad.",
    landmarks: ["Wakad Road", "Hinjewadi Road", "Thergaon"],
    pincode: "411057",
  },
  {
    id: "pashan",
    name: "Pashan",
    slug: "pashan",
    description:
      "Quality cleaning services in Pashan. Close to IISER and University of Pune.",
    landmarks: ["Pashan Road", "Sus Road", "Pashan Lake"],
    pincode: "411021",
  },
  {
    id: "kharadi",
    name: "Kharadi",
    slug: "kharadi",
    description:
      "Serving the IT hub of Kharadi. We clean offices, apartments, and commercial spaces.",
    landmarks: ["Kharadi Road", "EON IT Park", "Wagholi Road"],
    pincode: "411014",
  },
  {
    id: "hinjewadi",
    name: "Hinjewadi",
    slug: "hinjewadi",
    description:
      "Major IT corridor. We provide office cleaning, apartment cleaning, and commercial services.",
    landmarks: ["Hinjewadi Phase 1", "Hinjewadi Phase 2", "Hinjewadi Phase 3", "Blue Ridge"],
    pincode: "411057",
  },
];

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
