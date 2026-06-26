import Script from "next/script";
import { business } from "@/config/business";
import { faqs } from "@/config/faq";
import { services } from "@/config/services";
import { reviews } from "@/config/reviews";
import { areas } from "@/config/areas";

export default function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.fullName,
    description: business.description,
    image: `${business.domain}/og-image.jpg`,
    telephone: `+91${business.phone}`,
    email: business.email,
    url: business.domain,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.flat}, ${business.address.area}`,
      addressLocality: business.address.locality,
      addressRegion: business.address.state,
      postalCode: business.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.5074",
      longitude: "73.8076",
    },
    openingHours: "Mo-Su 08:00-23:00",
    priceRange: "₹₹",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(business.rating),
      reviewCount: String(business.reviewCount),
      bestRating: "5",
    },
    sameAs: [
      business.social.facebook,
      business.social.instagram,
      business.social.twitter,
      business.social.linkedin,
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: business.domain },
      { "@type": "ListItem", position: 2, name: "Services", item: `${business.domain}/services` },
      { "@type": "ListItem", position: 3, name: "Pricing", item: `${business.domain}/pricing` },
      { "@type": "ListItem", position: 4, name: "Contact", item: `${business.domain}/contact` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const serviceSchemas = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "LocalBusiness", name: business.name },
    areaServed: areas.map((a) => a.name),
    offers: { "@type": "Offer", price: service.startingPrice, priceCurrency: "INR" },
    image: service.image,
  }));

  const reviewSchemas = reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Service", name: business.fullName },
    reviewRating: { "@type": "Rating", ratingValue: String(review.rating) },
    author: { "@type": "Person", name: review.name },
    reviewBody: review.text,
  }));

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {serviceSchemas.map((s, i) => (
        <Script
          key={`service-schema-${i}`}
          id={`service-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      {reviewSchemas.map((r, i) => (
        <Script
          key={`review-schema-${i}`}
          id={`review-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(r) }}
        />
      ))}
    </>
  );
}
