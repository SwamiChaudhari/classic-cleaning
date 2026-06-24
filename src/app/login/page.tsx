"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate auth delay
    await new Promise((r) => setTimeout(r, 800));

    if (password === "classic2026") {
      // Set cookie and redirect
      document.cookie = "auth_token=classic-cleaning-admin-2026; path=/; max-age=86400; SameSite=Lax";
      router.push(redirect);
    } else {
      setError("Invalid password. Try 'classic2026'");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-teal to-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-poppins)]">
              Classic Cleaning
            </h1>
            <p className="text-sm text-gray-500 mt-1">Admin Dashboard Login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-11 pr-12 py-3.5 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange to-gold text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-3 bg-blue-light/50 rounded-xl">
            <p className="text-xs text-blue text-center">
              Demo password: <strong>classic2026</strong>
            </p>
          </div>

          <div className="mt-4 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-teal transition-colors">
              ← Back to Website
            </a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
