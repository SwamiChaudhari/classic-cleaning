"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getCookie("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
    setLoading(false);
  }, [router]);

  return { isAuthenticated, loading };
}
