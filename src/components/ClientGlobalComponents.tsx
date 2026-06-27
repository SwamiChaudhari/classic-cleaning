"use client";

import dynamic from "next/dynamic";

// Lazy-load BottomActionBar only on client — not needed for initial paint SSR
const BottomActionBar = dynamic(() => import("./BottomActionBar"), {
  ssr: false,
});

export default function ClientGlobalComponents() {
  return <BottomActionBar />;
}
