"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function AdminButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/login"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-20 right-4 z-40 lg:bottom-24 lg:right-20 flex items-center gap-2 px-4 py-2.5 bg-[#0B1D3A] text-white text-xs font-semibold rounded-full shadow-lg hover:bg-[#0D9488] transition-all duration-300 hover:shadow-xl hover:scale-105"
      title="Admin Dashboard"
    >
      <Shield className="w-3.5 h-3.5" />
      {isHovered ? "Admin Login" : "Admin"}
    </Link>
  );
}
