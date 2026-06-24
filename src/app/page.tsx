import Navbar from "@/components/Navbar";
import StickyBottomBar from "@/components/StickyBottomBar";
import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import dynamic from "next/dynamic";

// Lazy load below-fold sections (initial JS reduced by ~60%)
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), {
  ssr: true,
});
const BeforeAfter = dynamic(() => import("@/components/BeforeAfter"), {
  ssr: true,
});
const Reviews = dynamic(() => import("@/components/Reviews"), {
  ssr: true,
});
const Pricing = dynamic(() => import("@/components/Pricing"), {
  ssr: true,
});
const ServiceAreas = dynamic(() => import("@/components/ServiceAreas"), {
  ssr: true,
});
const Commercial = dynamic(() => import("@/components/Commercial"), {
  ssr: true,
});
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const FinalCTA = dynamic(() => import("@/components/FinalCTA"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustIndicators />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <BeforeAfter />
      <Reviews />
      <Pricing />
      <ServiceAreas />
      <Commercial />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyBottomBar />
    </main>
  );
}
