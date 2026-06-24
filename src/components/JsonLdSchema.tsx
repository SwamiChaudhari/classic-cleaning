import Script from "next/script";
import { business } from "@/config/business";

export default function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.fullName,
    description: business.description,
    image: "https://classiccleaning.in/og-image.jpg",
    telephone: `+91${business.phone}`,
    email: business.email,
    url: "https://classiccleaning.in",
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://classiccleaning.in" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://classiccleaning.in/services" },
      { "@type": "ListItem", position: 3, name: "Pricing", item: "https://classiccleaning.in/pricing" },
      { "@type": "ListItem", position: 4, name: "Contact", item: "https://classiccleaning.in/contact" },
    ],
  };

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
    </>
  );
}
