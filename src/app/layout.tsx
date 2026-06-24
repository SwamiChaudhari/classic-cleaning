import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import AIAssistant from "@/components/AIAssistant";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import StickyBottomBar from "@/components/StickyBottomBar";

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
      </head>
      <body className="font-sans antialiased text-gray-900 bg-white overflow-x-hidden">
        {children}
        <WhatsAppWidget />
        <AIAssistant />
        <ExitIntentPopup />
        <StickyBottomBar />
      </body>
    </html>
  );
}
