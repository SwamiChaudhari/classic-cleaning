import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ProClean Services | Professional Cleaning You Can Trust",
  description: "Professional residential and commercial cleaning services. Fully insured, background-checked staff, satisfaction guaranteed. Get your free quote in 60 seconds.",
  openGraph: {
    title: "ProClean Services | Professional Cleaning You Can Trust",
    description: "Professional residential and commercial cleaning services. Get your free quote in 60 seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-gray-900 bg-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
