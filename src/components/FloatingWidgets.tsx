"use client";

import dynamic from "next/dynamic";

const ExitIntentPopup = dynamic(() => import("@/components/ExitIntentPopup"), {
  ssr: false,
});
const PWAInstallPrompt = dynamic(() => import("@/components/PWAInstallPrompt"), {
  ssr: false,
});

export default function FloatingWidgets() {
  return (
    <>
      <ExitIntentPopup />
      <PWAInstallPrompt />
    </>
  );
}
