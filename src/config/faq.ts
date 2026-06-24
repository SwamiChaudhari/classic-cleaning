import { business } from "./business";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How much does home cleaning cost in Pune?",
    answer: `Our home cleaning starts from ${business.currencySymbol}1,499 for a standard cleaning and ${business.currencySymbol}2,499 for deep cleaning. Pricing depends on the size of your home and the type of cleaning required. Get a free quote by calling us at ${business.phone}.`,
    category: "Pricing",
  },
  {
    id: "2",
    question: "Are your cleaning staff background verified?",
    answer:
      "Yes! All our cleaning professionals undergo thorough background verification including police checks, address verification, and reference checks. We only hire trusted, verified individuals.",
    category: "Safety",
  },
  {
    id: "3",
    question: "Do I need to be home during the cleaning?",
    answer:
      "No, you don't need to be home. Many of our customers provide access via key or lockbox and we clean while they're at work. We ensure your home is securely locked after cleaning.",
    category: "Process",
  },
  {
    id: "4",
    question: "What cleaning products do you use?",
    answer:
      "We use eco-friendly, non-toxic cleaning products that are safe for children, pets, and surfaces. Our chemicals are approved and do not cause any damage to your property.",
    category: "Products",
  },
  {
    id: "5",
    question: "How long does a typical cleaning session take?",
    answer:
      "A standard home cleaning takes 2-3 hours for a 1-2 BHK and 4-5 hours for a 3 BHK or larger. Deep cleaning may take 5-7 hours depending on the property size and condition.",
    category: "Process",
  },
  {
    id: "6",
    question: "Do you offer same-day cleaning service?",
    answer:
      "Yes! We offer same-day service for emergency cleaning needs. Call us before 10 AM and we can schedule a team the same day. Additional charges may apply for same-day service.",
    category: "Service",
  },
  {
    id: "7",
    question: "What areas in Pune do you serve?",
    answer:
      "We serve all major areas in Pune including Kothrud, Baner, Warje, Aundh, Bavdhan, Karve Nagar, Wakad, Pashan, Kharadi, Hinjewadi, and surrounding areas.",
    category: "Service Areas",
  },
  {
    id: "8",
    question: "Can I book cleaning for my office or commercial space?",
    answer:
      "Absolutely! We provide professional office cleaning, commercial space cleaning, retail store cleaning, and medical facility cleaning. We offer flexible scheduling including after-hours and weekend service.",
    category: "Commercial",
  },
  {
    id: "9",
    question: "What if I'm not satisfied with the cleaning?",
    answer:
      "We have a 100% satisfaction guarantee. If you're not happy with any aspect of our cleaning, we'll re-clean the affected area at no extra cost within 24 hours.",
    category: "Guarantee",
  },
  {
    id: "10",
    question: "How do I book Classic Cleaning services?",
    answer: `You can book us via:
• Call: ${business.phone}
• WhatsApp: Send your requirements to ${business.whatsapp}
• Website: Fill the quote form
• Walk-in: Visit us at ${business.address.full}

Booking takes less than 2 minutes!`,
    category: "Booking",
  },
  {
    id: "11",
    question: "Do you offer recurring cleaning plans?",
    answer:
      "Yes! We offer weekly, bi-weekly, and monthly cleaning plans at discounted rates. Regular customers get priority scheduling and up to 20% off on recurring bookings.",
    category: "Pricing",
  },
  {
    id: "12",
    question: "Is Classic Cleaning insured?",
    answer:
      "Yes, we are fully insured. We carry liability insurance to cover any accidental damage during cleaning. Your property is always protected when our team is working.",
    category: "Safety",
  },
  {
    id: "13",
    question: "Do you clean windows from inside or outside?",
    answer:
      "We clean windows from the inside as standard. For high-rise buildings, we can arrange specialized window cleaning with additional safety equipment at an extra cost.",
    category: "Service",
  },
  {
    id: "14",
    question: "What's included in deep cleaning?",
    answer:
      "Deep cleaning includes everything in standard cleaning plus: inside all appliances, baseboard scrubbing, window cleaning, carpet deep clean, detailed surface sanitization, corner and crevice cleaning, exhaust fan cleaning, and light fixture cleaning.",
    category: "Service Details",
  },
  {
    id: "15",
    question: "Do you bring your own cleaning equipment and supplies?",
    answer:
      "Yes, we bring everything including vacuum cleaners, mops, eco-friendly chemicals, microfiber cloths, and all necessary equipment. You don't need to provide anything.",
    category: "Process",
  },
];

export const faqCategories = [
  ...new Set(faqs.map((f) => f.category)),
];

export function getFAQsByCategory(category: string): FAQ[] {
  return faqs.filter((f) => f.category === category);
}
