export const SITE = {
  name: "Honeybadger.AI",
  url: "https://honeybadgerai.in",
  tagline: "We build AI-powered software. Then we make sure it gets found.",
  description:
    "Honeybadger.AI is an AI development company in India. We build websites, web apps, mobile apps, AI automation and RAG systems, then grow them through AEO, GEO, SEO and app install campaigns.",
  locale: "en-IN",
  googleVerification: "lkaCbgUsSCIDi2Kj0jvVovzGwCYILDIFovAQRAnpQJo",
  lastUpdated: "2026-11-07",
} as const;

export const CONTACT = {
  phoneDisplay: "+91 90231 00608",
  phoneE164: "+919023100608",
  whatsappBase: "https://wa.me/919023100608",
  address: {
    street: "Naroli",
    locality: "Dadra and Nagar Haveli",
    postalCode: "396230",
    country: "IN",
    display: "Naroli, Dadra and Nagar Haveli – 396 230",
  },
  // TODO: replace with the real inbox before launch
  email: "hello@honeybadgerai.in",
} as const;

export function waLink(message = "Hi Honeybadger.AI, I'd like to discuss a project.") {
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export const WA_LINK = waLink();

export const SERVING_AREAS = [
  "Gujarat",
  "Dadra and Nagar Haveli",
  "Vapi",
  "Silvassa",
  "Surat",
  "Mumbai",
  "Global (remote)",
] as const;

export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

// TODO: replace with real profile URLs
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/honeybadgerai" },
  { label: "X (Twitter)", href: "https://x.com/honeybadgerai" },
  { label: "Instagram", href: "https://www.instagram.com/honeybadgerai" },
] as const;
