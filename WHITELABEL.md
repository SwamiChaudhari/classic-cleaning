# White-Label Cleaning Platform

This is a **world-class, reusable, white-label cleaning services platform** that can be duplicated and customized for any cleaning business in India or internationally within hours.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    White-Label Platform                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Config Layer (src/config/)                                   │
│  ├── business.ts    → Branding, contact, SEO                  │
│  ├── services.ts    → Services and pricing                    │
│  ├── areas.ts       → Service areas/locations                 │
│  ├── reviews.ts     → Customer reviews                        │
│  ├── pricing.ts     → Pricing packages                        │
│  ├── team.ts        → Team members                            │
│  ├── blog.ts        → Blog posts                              │
│  ├── faq.ts         → FAQs                                    │
│  ├── offers.ts      → Offers and promotions                   │
│  └── gallery.ts     → Gallery images/videos                   │
│                                                               │
│  Core Layer (src/lib/)                                        │
│  ├── whitelabel.ts      → Main exports                        │
│  ├── config-schema.ts   → Zod validation schema               │
│  ├── theme-system.ts    → Color schemes, CSS generation       │
│  ├── client-generator.ts → Config generation utilities        │
│  ├── i18n.ts            → Multi-language support              │
│  └── data-store.ts      → File-based CMS persistence          │
│                                                               │
│  Components Layer (src/components/)                           │
│  ├── Hero, Navbar, Footer, Services, Reviews...              │
│  ├── QuoteForm, LanguageSwitcher                              │
│  └── [All components read from config — zero hardcoded brand] │
│                                                               │
│  Dashboard Layer (src/app/dashboard/)                         │
│  ├── leads, services, gallery, reviews, blogs                 │
│  ├── offers, faqs, team, pricing, areas                      │
│  ├── seo, analytics, settings                                 │
│  └── [All modules persist to src/data/*.json]                 │
│                                                               │
│  API Layer (src/app/api/)                                     │
│  ├── /api/config/*  → CRUD for all config data               │
│  ├── /api/leads     → Lead capture and management             │
│  ├── /api/auth/*    → Authentication                         │
│  └── /api/analytics → Analytics events                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start — New Client Setup

### Option 1: Automated Script

```bash
node scripts/duplicate-client.js <client-name> \
  --scheme ocean \
  --domain https://client-name.vercel.app \
  --city "Mumbai" \
  --phone "9876543210" \
  --email "hello@client.in"
```

### Option 2: Manual Setup

1. Duplicate the project: `cp -r classic-cleaning my-client`
2. Edit `src/config/business.ts` with client details
3. Update `src/app/globals.css` with brand colors
4. Edit all other config files (services, areas, reviews, etc.)
5. Run `npm install && npm run build`
6. Deploy to Vercel

### Option 3: Programmatic

```typescript
import { generateClientConfig } from '@/lib/whitelabel';

const { config, errors } = generateClientConfig({
  name: 'My Client',
  city: 'Mumbai',
  phone: '9876543210',
  scheme: 'ocean',
});

if (config) {
  // Write config to file or use directly
  console.log(config);
}
```

## Color Schemes

| Scheme   | Primary   | Secondary | Accent    | Success   |
|----------|-----------|-----------|-----------|-----------|
| classic  | #0B1D3A   | #0D9488   | #EA580C   | #059669   |
| ocean    | #0C4A6E   | #0891B2   | #F59E0B   | #10B981   |
| forest   | #14532D   | #15803D   | #D97706   | #22C55E   |
| royal    | #312E81   | #7C3AED   | #EC4899   | #10B981   |
| sunset   | #7C2D12   | #DC2626   | #F97316   | #16A34A   |
| midnight | #1E1B4B   | #4F46E5   | #F43F5E   | #22D3EE   |

## Internationalization

Supported languages:
- English (en)
- Hindi (hi)
- Marathi (mr)

Add translations in `src/lib/i18n.ts`.

## Dashboard Modules

| Module       | API Route                  | Description                    |
|--------------|---------------------------|--------------------------------|
| Leads        | /api/leads                | View and manage inquiries      |
| Services     | /api/config/services      | CRUD for services              |
| Pricing      | /api/config/pricing       | CRUD for pricing packages      |
| Areas        | /api/config/areas         | CRUD for service areas         |
| Reviews      | /api/config/reviews       | CRUD for customer reviews      |
| Blogs        | /api/config/blogs         | CRUD for blog posts            |
| FAQs         | /api/config/faqs          | CRUD for FAQs                  |
| Offers       | /api/config/offers        | CRUD for offers                |
| Team         | /api/config/team          | CRUD for team members          |
| Settings     | /api/config/business      | Edit business configuration    |

## White-Label Checklist

When setting up a new client, update:

- [ ] `src/config/business.ts` — Name, contact, branding, SEO
- [ ] `src/config/services.ts` — Services and pricing
- [ ] `src/config/areas.ts` — Service areas
- [ ] `src/config/reviews.ts` — Customer reviews
- [ ] `src/config/pricing.ts` — Pricing packages
- [ ] `src/config/team.ts` — Team members
- [ ] `src/config/blog.ts` — Blog posts
- [ ] `src/config/faq.ts` — FAQs
- [ ] `src/config/offers.ts` — Offers
- [ ] `src/config/gallery.ts` — Gallery
- [ ] `src/app/globals.css` — Brand colors (CSS variables)
- [ ] `public/og-image.jpg` — Open Graph image
- [ ] `public/logo.svg` — Logo
- [ ] `public/favicon.ico` — Favicon
- [ ] `public/manifest.json` — PWA manifest

## Security

- Auth: Cookie-based (httpOnly, secure, sameSite=strict)
- Middleware: Server-side route protection
- Rate limiting: 5 attempts, 15min lockout
- No client-side passwords

## Performance

- Next.js 16 + Turbopack
- Tailwind v4 (CSS variables for theming)
- Framer Motion (GPU-optimized animations)
- next/image with remote patterns
- Lazy loading, code splitting
