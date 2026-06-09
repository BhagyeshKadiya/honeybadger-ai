export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://honeybadgerai.in/#org",
    "name": "Honeybadger Digital",
    "alternateName": "Honeybadger.AI",
    "description": "AI-powered performance marketing agency in Naroli, Dadra and Nagar Haveli — Meta ads, WhatsApp automation, and AI content for real estate, hospitality, and e-commerce brands in the Vapi–Silvassa–DNH corridor.",
    "url": "https://honeybadgerai.in",
    "telephone": "+919023100608",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Naroli",
      "addressLocality": "Naroli",
      "addressRegion": "Dadra and Nagar Haveli and Daman and Diu",
      "postalCode": "396230",
      "addressCountry": "IN"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": "20.3833", "longitude": "73.0167" },
    "areaServed": ["Naroli","Silvassa","Vapi","Daman","Surat","Dadra and Nagar Haveli"],
    "priceRange": "₹₹",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00", "closes": "19:00"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919023100608",
      "contactType": "sales",
      "availableLanguage": ["English","Hindi","Gujarati"]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
