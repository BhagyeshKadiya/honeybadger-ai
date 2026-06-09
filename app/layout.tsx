import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SpiderCursor from "@/components/SpiderCursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import { LocalBusinessSchema } from "@/components/SchemaOrg";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://honeybadgerai.in'),
  title: {
    default: 'Honeybadger.AI | Performance Marketing Agency in Naroli, DNH & Vapi',
    template: '%s | Honeybadger.AI',
  },
  description: 'AI-powered performance marketing agency in Naroli, Dadra and Nagar Haveli. Meta & Google ads, WhatsApp automation via AiSensy, and AI content for real estate, hotels, and e-commerce brands across the Vapi–Silvassa–DNH corridor.',
  alternates: {
    canonical: 'https://honeybadgerai.in',
  },
  verification: {
    google: 'lkaCbgUsSCIDi2Kj0jvVovzGwCYILDIFovAQRAnpQJo',
  },
  openGraph: {
    url: 'https://honeybadgerai.in',
    siteName: 'Honeybadger.AI',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@honeybadgerai',
    creator: '@honeybadgerai',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans min-h-full flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LocalBusinessSchema />
          <SpiderCursor />
          {children}
          <FloatingWhatsApp />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
