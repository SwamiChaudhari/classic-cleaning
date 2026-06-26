import { MetadataRoute } from 'next';
import { business } from '@/config/business';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/dashboard/*", "/api/*"],
    },
    sitemap: `${business.domain}/sitemap.xml`,
    host: business.domain,
  };
}
