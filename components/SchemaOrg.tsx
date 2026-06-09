'use client';

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://honeybadgerai.in/#business",
    "name": "Honeybadger.AI",
    "alternateName": "Honeybadger.AI",
    "description": "AI-powered performance marketing agency specialising in real estate, hospitality, and e-commerce for businesses in Naroli, Dadra and Nagar Haveli, Vapi, Silvassa, and Daman.",
    "url": "https://honeybadgerai.in",
    "telephone": "+919023100608",
    "email": "hello@honeybadger.ai",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Naroli",
      "addressLocality": "Naroli",
      "addressRegion": "Dadra and Nagar Haveli",
      "postalCode": "396230",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 20.3833,
      "longitude": 73.0167
    },
    "areaServed": [
      "Naroli", "Dadra and Nagar Haveli", "Silvassa", "Vapi", "Daman", "Surat"
    ],
    "serviceType": [
      "Performance Marketing",
      "WhatsApp Automation",
      "AI Content Production",
      "Meta Ads",
      "Google Ads",
      "Real Estate Marketing",
      "Hospitality Marketing",
      "E-Commerce Marketing"
    ],
    "priceRange": "₹₹",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.instagram.com/honeybadgerai",
      "https://www.linkedin.com/company/honeybadgerai"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919023100608",
      "contactType": "sales",
      "contactOption": "TollFree",
      "availableLanguage": ["English", "Hindi", "Gujarati"],
      "areaServed": "IN"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
