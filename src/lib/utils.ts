import { business } from "@/config/business";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function generateWhatsAppLink(
  phone: string,
  message: string
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function generateQuoteMessage(data: {
  service: string;
  propertyType: string;
  area: string;
  name: string;
}): string {
  return `Hi ${business.name}! 👋

I'd like to get a quote for:
🏠 Service: ${data.service}
🏢 Property: ${data.propertyType}
📐 Area: ${data.area}
👤 Name: ${data.name}

Please share your best price. Thank you!`;
}
