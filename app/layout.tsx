import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SpiderCursor from "@/components/SpiderCursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Honeybadger.AI | AI-Powered Marketing for Real Estate, Hospitality & E-Commerce",
  description: "Performance marketing, WhatsApp automation, and AI content production for businesses in Naroli, DNH, Vapi, Silvassa, and Daman.",
  keywords: [
    "performance marketing DNH",
    "WhatsApp automation Vapi",
    "real estate marketing Naroli",
    "marketing agency Silvassa",
    "Daman ads",
    "hospitality marketing Silvassa",
    "e-commerce marketing Vapi",
    "growth agency DNH",
  ],
  openGraph: {
    title: "Honeybadger.AI | AI-Powered Marketing for Real Estate, Hospitality & E-Commerce",
    description: "Performance marketing, WhatsApp automation, and AI content production for businesses in Naroli, DNH, Vapi, Silvassa, and Daman.",
    url: "https://honeybadger.ai",
    siteName: "Honeybadger.AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Honeybadger.AI Revenue Infrastructure",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Honeybadger.AI | AI-Powered Marketing for Real Estate, Hospitality & E-Commerce",
    description: "Performance marketing, WhatsApp automation, and AI content production for businesses in Naroli, DNH, Vapi, Silvassa, and Daman.",
    images: ["/og-image.png"],
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
          <SpiderCursor />
          {children}
          <FloatingWhatsApp />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
