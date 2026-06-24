import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import AIAssistant from "@/components/AIAssistant";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import StickyBottomBar from "@/components/StickyBottomBar";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import AnalyticsTracker from "@/components/AnalyticsTracker";

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
  title: "Classic Cleaning Services | Professional Cleaning In Pune",
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
    title: "Classic Cleaning Services | Professional Cleaning In Pune",
    description:
      "Premium residential and commercial cleaning services in Pune. 4.8★ rating, 1500+ homes cleaned.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Classic Cleaning Services | Professional Cleaning In Pune",
    description:
      "Premium residential and commercial cleaning services in Pune. 4.8★ rating, 1500+ homes cleaned.",
  },
  alternates: {
    canonical: "https://classiccleaning.in",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0B1D3A",
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
        <meta name="theme-color" content="#0B1D3A" />
      </head>
      <body className="font-sans antialiased text-gray-900 bg-white overflow-x-hidden">
        {children}
        <WhatsAppWidget />
        <AIAssistant />
        <ExitIntentPopup />
        <PWAInstallPrompt />
        <StickyBottomBar />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
      </body>
    </html>
  );
}
