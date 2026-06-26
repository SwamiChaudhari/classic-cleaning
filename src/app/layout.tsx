import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import JsonLdSchema from "@/components/JsonLdSchema";
import SkipLink from "@/components/SkipLink";
import ErrorBoundary from "@/components/ErrorBoundary";
import BottomActionBar from "@/components/BottomActionBar";
import { business } from "@/config/business";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: business.seo.title,
  description:
    "Premium residential and commercial cleaning services in Pune. Background-verified staff, same-day service, 4.8★ rating. Get free quote now.",
  keywords: [
    "cleaning services pune",
    "house cleaning pune",
    "deep cleaning pune",
    "office cleaning pune",
    "commercial cleaning pune",
    "sofa cleaning pune",
    "kitchen cleaning pune",
    "best cleaning company pune",
  ],
  openGraph: {
    title: business.seo.title,
    description:
      "Premium residential and commercial cleaning services in Pune. 4.8★ rating, 1500+ homes cleaned.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: business.seo.title,
    description:
      "Premium residential and commercial cleaning services in Pune. 4.8★ rating, 1500+ homes cleaned.",
  },
  alternates: {
    canonical: business.domain,
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: business.brand.primary,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#0B1D3A" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className="font-sans antialiased text-gray-900 bg-white overflow-x-hidden">
        <SkipLink />
        <ErrorBoundary>
          <JsonLdSchema />
          {children}
          <BottomActionBar />
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
