"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold text-navy mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-500 mb-6">
          We&apos;re sorry, but something didn&apos;t work as expected. Please try again.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-gradient-to-r from-orange to-gold text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all"
          >
            Try Again
          </button>
          <a
            href="/"
            className="bg-navy text-white font-bold px-6 py-3 rounded-xl hover:bg-navy-light transition-all"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
