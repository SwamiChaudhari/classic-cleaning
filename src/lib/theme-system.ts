import { BusinessConfig } from "./config-schema";

/**
 * Generates CSS custom properties from business brand colors.
 * This allows per-client theming without changing CSS files.
 */
export function generateThemeCSS(config: BusinessConfig): string {
  return `:root {
  --brand-primary: ${config.brand.primary};
  --brand-secondary: ${config.brand.secondary};
  --brand-accent: ${config.brand.accent};
  --brand-success: ${config.brand.success};
  --font-heading: '${config.fonts.heading}', 'Inter', system-ui, sans-serif;
  --font-body: '${config.fonts.body}', system-ui, -apple-system, sans-serif;
}`;
}

/**
 * Generates a Tailwind v4 @theme block from business config.
 * This can be injected into globals.css for per-client theming.
 */
export function generateTailwindTheme(config: BusinessConfig): string {
  return `@theme {
  --color-navy: var(--brand-primary);
  --color-navy-light: color-mix(in srgb, var(--brand-primary) 80%, white);
  --color-navy-50: color-mix(in srgb, var(--brand-primary) 10%, white);
  --color-teal: var(--brand-secondary);
  --color-teal-light: color-mix(in srgb, var(--brand-secondary) 10%, white);
  --color-blue: #2563EB;
  --color-blue-light: #EFF6FF;
  --color-blue-50: #F0F7FF;
  --color-emerald: var(--brand-success);
  --color-emerald-light: color-mix(in srgb, var(--brand-success) 10%, white);
  --color-orange: var(--brand-accent);
  --color-orange-light: color-mix(in srgb, var(--brand-accent) 10%, white);
  --color-surface: #FAFBFC;
  --color-border: #E5E7EB;
  --color-gold: #D97706;
  --font-sans: var(--font-body);
  --font-display: var(--font-heading);
}`;
}

/**
 * Predefined color schemes for quick client setup.
 */
export const colorSchemes = {
  classic: {
    primary: "#0B1D3A",
    secondary: "#0D9488",
    accent: "#EA580C",
    success: "#059669",
  },
  ocean: {
    primary: "#0C4A6E",
    secondary: "#0891B2",
    accent: "#F59E0B",
    success: "#10B981",
  },
  forest: {
    primary: "#14532D",
    secondary: "#15803D",
    accent: "#D97706",
    success: "#22C55E",
  },
  royal: {
    primary: "#312E81",
    secondary: "#7C3AED",
    accent: "#EC4899",
    success: "#10B981",
  },
  sunset: {
    primary: "#7C2D12",
    secondary: "#DC2626",
    accent: "#F97316",
    success: "#16A34A",
  },
  midnight: {
    primary: "#1E1B4B",
    secondary: "#4F46E5",
    accent: "#F43F5E",
    success: "#22D3EE",
  },
} as const;

export type ColorSchemeName = keyof typeof colorSchemes;

/**
 * Applies a named color scheme to a business config.
 */
export function applyColorScheme(
  config: BusinessConfig,
  scheme: ColorSchemeName
): BusinessConfig {
  return {
    ...config,
    brand: colorSchemes[scheme],
  };
}
