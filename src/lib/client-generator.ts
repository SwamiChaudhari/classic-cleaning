/**
 * White-Label Config Generator
 * 
 * This module provides utilities to programmatically generate
 * and validate client configurations for the cleaning platform.
 * 
 * Usage:
 *   import { generateClientConfig } from '@/lib/client-generator';
 *   const config = generateClientConfig({
 *     name: 'Unique Clean Services',
 *     city: 'Nashik',
 *     phone: '096234 44499',
 *     scheme: 'ocean',
 *   });
 */

import { BusinessConfig, validateBusinessConfig } from "./config-schema";
import { colorSchemes, type ColorSchemeName } from "./theme-system";

export interface ClientSetupInput {
  name: string;
  city: string;
  phone: string;
  email?: string;
  scheme?: ColorSchemeName;
  domain?: string;
  state?: string;
  pincode?: string;
  tagline?: string;
  description?: string;
}

/**
 * Generates a complete business config from minimal input.
 * Fills in sensible defaults for all other fields.
 */
export function generateClientConfig(input: ClientSetupInput): {
  success: boolean;
  config?: BusinessConfig;
  errors?: string[];
} {
  const {
    name,
    city,
    phone,
    email = "",
    scheme = "classic",
    domain = "",
    state = "Maharashtra",
    pincode = "",
    tagline = `Professional Cleaning Services In ${city} You Can Trust`,
    description = `Premium residential and commercial cleaning services in ${city}. Background-verified staff, eco-friendly products, same-day service available.`,
  } = input;

  const colors = colorSchemes[scheme];
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const cleanPhone = phone.replace(/\s+/g, "");
  const whatsapp = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone.replace(/^0/, "")}`;

  const config: BusinessConfig = {
    name,
    fullName: `${name} Services`,
    tagline,
    description,
    domain: domain || `https://${slug}.vercel.app`,
    logo: "/logo.svg",
    favicon: "/favicon.ico",
    brand: colors,
    fonts: { heading: "Poppins", body: "Inter" },
    phone,
    whatsapp,
    email: email || `hello@${slug}.in`,
    address: {
      flat: "",
      area: "",
      locality: "",
      city,
      state,
      pincode,
      full: `${city}, ${state} ${pincode}`.trim(),
    },
    googleMaps: { embed: "", lat: 0, lng: 0, directions: "" },
    gst: "",
    hours: "Open 24 Hours",
    emergencyAvailable: true,
    social: {},
    rating: 4.5,
    reviewCount: 0,
    homesCleaned: 0,
    yearsExperience: 0,
    seo: {
      title: `${name} Services | Professional Cleaning In ${city}`,
      description,
      keywords: [
        `cleaning services ${city.toLowerCase()}`,
        `house cleaning ${city.toLowerCase()}`,
        `deep cleaning ${city.toLowerCase()}`,
        `office cleaning ${city.toLowerCase()}`,
        `best cleaning company ${city.toLowerCase()}`,
      ],
      ogImage: "/og-image.jpg",
    },
    currency: "INR",
    currencySymbol: "₹",
  };

  // Validate
  const validation = validateBusinessConfig(config);
  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  return { success: true, config };
}

/**
 * Generates a summary of what needs to be configured for a new client.
 */
export function generateSetupChecklist(): string[] {
  return [
    "Business name and contact details",
    "Brand colors (or choose a preset scheme)",
    "Service areas (localities/neighborhoods)",
    "Services offered and pricing",
    "Customer reviews and testimonials",
    "Google Maps embed for location",
    "Social media links",
    "GST number (for Indian clients)",
    "Domain and deployment target",
    "Logo and favicon images",
  ];
}

/**
 * Generates a README for a new client project.
 */
export function generateClientReadme(clientName: string, city: string): string {
  return `# ${clientName} Services

Professional cleaning services website for ${city}.

## Quick Start

\`\`\`bash
npm install
npm run dev     # Development
npm run build   # Production build
npm start       # Production server
\`\`\`

## Configuration

All business configuration is in \`src/config/business.ts\`.

### Key Files

- \`src/config/business.ts\` — Business name, contact, branding
- \`src/config/services.ts\` — Services and pricing
- \`src/config/areas.ts\` — Service areas
- \`src/config/reviews.ts\` — Customer reviews
- \`src/config/pricing.ts\` — Pricing packages
- \`src/config/team.ts\` — Team members
- \`src/config/blog.ts\` — Blog posts
- \`src/config/faq.ts\` — FAQs
- \`src/config/offers.ts\` — Offers and promotions

## Dashboard

Access the admin dashboard at \`/login\` (default password: admin123).

From the dashboard you can manage:
- Services, Pricing, Areas
- Reviews, FAQs, Offers
- Blog posts, Team members
- SEO settings, Business info
- Leads and inquiries

## Deployment

Deploy to Vercel:
\`\`\`bash
vercel
\`\`\`

## Customization

### Colors
Edit brand colors in \`src/config/business.ts\` under the \`brand\` field.
Or use CSS variables in \`src/app/globals.css\`.

### Languages
Supported languages: English, Hindi, Marathi.
Edit translations in \`src/lib/i18n.ts\`.
`;
}
