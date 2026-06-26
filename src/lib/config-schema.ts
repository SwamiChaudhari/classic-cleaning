import { z } from "zod";

/**
 * White-Label Config Schema
 * 
 * This is the SINGLE SOURCE OF TRUTH for all client-specific configuration.
 * To create a new client, fill out this config and run the duplication script.
 * 
 * The schema validates all required fields and provides sensible defaults.
 */

const AddressSchema = z.object({
  flat: z.string().default(""),
  area: z.string().default(""),
  locality: z.string().default(""),
  city: z.string().default(""),
  state: z.string().default(""),
  pincode: z.string().default(""),
  full: z.string().default(""),
});

const BrandSchema = z.object({
  primary: z.string().default("#0B1D3A"),
  secondary: z.string().default("#0D9488"),
  accent: z.string().default("#EA580C"),
  success: z.string().default("#059669"),
});

const FontsSchema = z.object({
  heading: z.string().default("Poppins"),
  body: z.string().default("Inter"),
});

const SocialSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  youtube: z.string().optional(),
});

const SEOSchema = z.object({
  title: z.string().default(""),
  description: z.string().default(""),
  keywords: z.array(z.string()).default([]),
  ogImage: z.string().default("/og-image.jpg"),
});

const GoogleMapsSchema = z.object({
  embed: z.string().default(""),
  lat: z.number().default(0),
  lng: z.number().default(0),
  directions: z.string().default(""),
});

export const BusinessConfigSchema = z.object({
  name: z.string().min(1, "Business name is required").max(50),
  fullName: z.string().min(1, "Full business name is required").max(100),
  tagline: z.string().max(120).default(""),
  description: z.string().max(300).default(""),

  domain: z.string().default(""),
  logo: z.string().default("/logo.svg"),
  favicon: z.string().default("/favicon.ico"),

  brand: BrandSchema.optional().default({
    primary: "#0B1D3A",
    secondary: "#0D9488",
    accent: "#EA580C",
    success: "#059669",
  }),
  fonts: FontsSchema.optional().default({
    heading: "Poppins",
    body: "Inter",
  }),

  phone: z.string().min(10, "Valid phone number required"),
  whatsapp: z.string().min(10, "Valid WhatsApp number required"),
  email: z.string().email("Valid email required"),

  address: AddressSchema.default({
    flat: "", area: "", locality: "", city: "", state: "", pincode: "", full: "",
  }),
  googleMaps: GoogleMapsSchema.default({
    embed: "", lat: 0, lng: 0, directions: "",
  }),
  gst: z.string().default(""),

  hours: z.string().default("Open 24 Hours"),
  emergencyAvailable: z.boolean().default(true),

  social: SocialSchema.optional().default({}),

  rating: z.number().min(0).max(5).default(4.5),
  reviewCount: z.number().min(0).default(0),
  homesCleaned: z.number().min(0).default(0),
  yearsExperience: z.number().min(0).default(0),

  seo: SEOSchema.optional().default({
    title: "",
    description: "",
    keywords: [],
    ogImage: "/og-image.jpg",
  }),

  currency: z.string().default("INR"),
  currencySymbol: z.string().default("₹"),
});

export type BusinessConfig = z.infer<typeof BusinessConfigSchema>;

/**
 * Validates a business config object against the schema.
 * Returns { success: true, data } or { success: false, errors }
 */
export function validateBusinessConfig(config: unknown): {
  success: boolean;
  data?: BusinessConfig;
  errors?: string[];
} {
  const result = BusinessConfigSchema.safeParse(config);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.issues.map(
    (err: z.ZodIssue) => `${err.path.join(".")}: ${err.message}`
  );

  return { success: false, errors };
}

/**
 * Generates a default config with only the essential fields filled in.
 * Use this as a starting point for new clients.
 */
export function createDefaultConfig(overrides: Partial<BusinessConfig> = {}): BusinessConfig {
  return {
    name: "",
    fullName: "",
    tagline: "",
    description: "",
    domain: "",
    phone: "",
    whatsapp: "",
    email: "",
    ...overrides,
  } as BusinessConfig;
}
