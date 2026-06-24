import Navbar from "@/components/Navbar";
import StickyBottomBar from "@/components/StickyBottomBar";
import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import BeforeAfter from "@/components/BeforeAfter";
import Reviews from "@/components/Reviews";
import HowItWorks from "@/components/HowItWorks";
import ServiceAreas from "@/components/ServiceAreas";
import Commercial from "@/components/Commercial";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustIndicators />
      <Services />
      <WhyChooseUs />
      <BeforeAfter />
      <Reviews />
      <HowItWorks />
      <ServiceAreas />
      <Commercial />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyBottomBar />
    </main>
  );
}
