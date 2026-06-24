import { business } from "./business";

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validTill: string;
  code: string;
  type: "percentage" | "flat" | "freebie";
  active: boolean;
  banner?: string;
}

export const offers: Offer[] = [
  {
    id: "summer-2026",
    title: "Summer Special",
    description: "Get 20% off on any deep cleaning service this summer!",
    discount: "20% OFF",
    validTill: "30 June 2026",
    code: "SUMMER20",
    type: "percentage",
    active: true,
    banner: "☀️ Summer Special — 20% OFF Deep Cleaning | Code: SUMMER20",
  },
  {
    id: "diwali-2026",
    title: "Diwali Cleaning Package",
    description:
      "Special Diwali deep cleaning + free sofa cleaning for bookings this month!",
    discount: "Free Sofa Cleaning",
    validTill: "15 November 2026",
    code: "DIWALI2026",
    type: "freebie",
    active: false,
    banner: "🪔 Diwali Special — Free Sofa Cleaning with Deep Cleaning!",
  },
  {
    id: "new-customer",
    title: "New Customer Discount",
    description: "First time booking with us? Get flat ₹500 off!",
    discount: "₹500 OFF",
    validTill: "Ongoing",
    code: "NEW500",
    type: "flat",
    active: true,
  },
  {
    id: "referral",
    title: "Refer & Earn",
    description: "Refer a friend and get ₹300 off your next cleaning!",
    discount: "₹300 OFF",
    validTill: "Ongoing",
    code: "REFER300",
    type: "flat",
    active: true,
  },
];

export function getActiveOffers(): Offer[] {
  return offers.filter((o) => o.active);
}

export function getBannerOffer(): Offer | undefined {
  return offers.find((o) => o.active && o.banner);
}
