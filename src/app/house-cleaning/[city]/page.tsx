import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import { business } from "@/config/business";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityName = city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `House Cleaning in ${cityName} | ${business.fullName}`,
    description: `Professional house cleaning in ${cityName}. Trusted by local families. Fully insured, background-checked staff. Get your free quote today.`,
  };
}

export default async function HouseCleaningCityPage({ params }: Props) {
  const { city } = await params;
  const cityName = city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="bg-gradient-to-br from-navy to-navy-light py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-4">
                <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
                <span className="text-white/90 text-sm">Serving {cityName}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">House Cleaning in {cityName}</h1>
              <p className="text-lg text-white/80 mb-6">Professional house cleaning services trusted by local families. Fully insured, background-checked professionals.</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className="bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg">✓ Fully Insured</span>
                <span className="bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg">✓ Background Checked</span>
                <span className="bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg">✓ From $99</span>
              </div>
            </div>
            <QuoteForm variant="compact" />
          </div>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-navy mb-6 text-center">What&apos;s Included</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {["Kitchen & Bathrooms Deep Clean", "Dusting & Vacuuming All Rooms", "Floor Mopping & Sweeping", "Trash Removal", "Surface Sanitizing", "Mirror & Glass Cleaning"].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-surface rounded-xl p-4 border border-border">
                <span className="w-6 h-6 bg-green-light text-green rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                <span className="font-medium text-gray-700 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-navy mb-6">Trusted by {cityName} Residents</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: "Sarah M.", text: "Best cleaning service in town! Professional and thorough." },
              { name: "Mike R.", text: "Reliable and affordable. Highly recommend." },
              { name: "Lisa K.", text: "My home has never looked better. Great team!" },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-border">
                <div className="flex gap-1 justify-center mb-2">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-2">&ldquo;{r.text}&rdquo;</p>
                <p className="font-semibold text-navy text-sm">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-4">Get Your Free Quote in {cityName}</h2>
          <p className="text-white/80 mb-6">Response in under 15 minutes. No obligation.</p>
          <QuoteForm variant="compact" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
