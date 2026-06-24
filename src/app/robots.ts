import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/dashboard/*", "/api/*"],
    },
    sitemap: "https://classic-cleaning.vercel.app/sitemap.xml",
    host: "https://classic-cleaning.vercel.app",
  };
}
