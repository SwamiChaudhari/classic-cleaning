import { services, getServiceBySlug, formatPrice } from "@/config/services";
import { business } from "@/config/business";
import { faqs } from "@/config/faq";
import Footer from "@/components/Footer";
import StickyBottomBar from "@/components/StickyBottomBar";
import Navbar from "@/components/Navbar";
import QuoteForm from "@/components/QuoteForm";
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  Clock,
  Shield,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} in Pune | ${business.name}`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedServices = services
    .filter((s) => s.id !== service.id)
    .slice(0, 3);
  const serviceFaqs = faqs.slice(0, 5);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4"
              >
                ← All Services
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-poppins)] mb-4">
                {service.title}
              </h1>
              <p className="text-white/70 text-lg mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Starting from {formatPrice(service.startingPrice)}
                </span>
                <span className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 2-5 hours
                </span>
                <span className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> 100% Satisfaction
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#quote"
                  className="bg-gradient-to-r from-orange to-gold text-white font-bold px-7 py-4 rounded-xl text-lg transition-all hover:scale-[1.03] flex items-center justify-center gap-2"
                >
                  Get Free Quote
                </a>
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald hover:bg-emerald/90 text-white font-bold px-7 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${business.phone}`}
                  className="bg-white/10 border border-white/20 text-white font-bold px-7 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call
                </a>
              </div>
            </div>
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[300px] lg:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            <div>
              <h2 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-poppins)] mb-4">
                What&apos;s Included
              </h2>
              <p className="text-gray-500">
                Everything you need for a spotless {service.title.toLowerCase()}.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
              {service.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-surface rounded-xl p-4 border border-border"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald shrink-0" />
                  <span className="font-medium text-gray-700 text-sm">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-poppins)] text-center mb-10">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Book", desc: "Call, WhatsApp, or fill the form" },
              { step: "2", title: "Schedule", desc: "Pick a convenient date & time" },
              { step: "3", title: "We Clean", desc: "Our team arrives with equipment" },
              { step: "4", title: "Enjoy", desc: "Relax in your spotless space" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-teal to-blue rounded-2xl flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-navy mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-poppins)] text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {serviceFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-surface rounded-xl p-5 border border-border"
              >
                <h3 className="font-semibold text-navy text-sm mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-poppins)] text-center mb-8">
            Other Services
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {relatedServices.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="bg-white rounded-2xl p-5 border border-border hover:shadow-card transition-all group"
              >
                <h3 className="font-bold text-navy mb-1 group-hover:text-blue transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {s.shortDescription}
                </p>
                <span className="text-blue font-semibold text-sm flex items-center gap-1">
                  View <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="quote" className="py-16 lg:py-24 bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-white font-[family-name:var(--font-poppins)] text-center mb-2">
            Get Your Free Quote
          </h2>
          <p className="text-white/60 text-center mb-8">
            Response within 15 minutes
          </p>
          <QuoteForm />
        </div>
      </section>

      <Footer />
      <StickyBottomBar />
    </main>
  );
}
