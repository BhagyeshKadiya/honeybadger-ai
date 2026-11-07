import { CONTACT, SERVING_AREAS, SITE, SOCIAL_LINKS } from "./constants";
import { absoluteUrl } from "./seo";
import type { Service } from "@/content/services";
import type { FaqItem } from "@/content/faq";

const ORG_ID = `${SITE.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/og-image.png"),
    description: SITE.description,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    sameAs: SOCIAL_LINKS.map((s) => s.href),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phoneE164,
      contactType: "sales",
      areaServed: ["IN", "Worldwide"],
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.name,
    url: SITE.url,
    image: absoluteUrl("/og-image.png"),
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    priceRange: "$$",
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: "Naroli",
      addressRegion: CONTACT.address.locality,
      postalCode: CONTACT.address.postalCode,
      addressCountry: CONTACT.address.country,
    },
    areaServed: SERVING_AREAS.map((name) => ({ "@type": "Place", name })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: SITE.locale,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/blog?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.answer,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: SERVING_AREAS.map((name) => ({ "@type": "Place", name })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

