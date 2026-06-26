/**
 * White-Label Cleaning Platform — Core Exports
 * 
 * This is the main entry point for the white-label system.
 * Import from '@/lib/whitelabel' to access all white-label utilities.
 * 
 * @example
 *   import { generateClientConfig, validateBusinessConfig } from '@/lib/whitelabel';
 *   const { config } = generateClientConfig({ name: 'My Client', city: 'Mumbai', phone: '9876543210' });
 */

// Config schema and validation
export {
  BusinessConfigSchema,
  validateBusinessConfig,
  createDefaultConfig,
  type BusinessConfig,
} from "./config-schema";

// Theme system
export {
  generateThemeCSS,
  generateTailwindTheme,
  applyColorScheme,
  colorSchemes,
  type ColorSchemeName,
} from "./theme-system";

// Client generator
export {
  generateClientConfig,
  generateSetupChecklist,
  generateClientReadme,
  type ClientSetupInput,
} from "./client-generator";

// Internationalization
export {
  t,
  getCurrentLanguage,
  setLanguage,
  getLanguageSwitcherItems,
  supportedLanguages,
  defaultLanguage,
  type Language,
  type LanguageConfig,
  type Translations,
} from "./i18n";

// Data store (for dashboard CMS)
export { readData, writeData } from "./data-store";
