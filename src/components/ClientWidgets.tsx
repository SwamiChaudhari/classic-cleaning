"use client";

import dynamic from "next/dynamic";

const WhatsAppWidget = dynamic(() => import("@/components/WhatsAppWidget"), {
  ssr: false,
});
const AIAssistant = dynamic(() => import("@/components/AIAssistant"), {
  ssr: false,
});

export default function ClientWidgets() {
  return (
    <>
      <WhatsAppWidget />
      <AIAssistant />
    </>
  );
}
