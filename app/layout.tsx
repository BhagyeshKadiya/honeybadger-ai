import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/constants";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Honeybadger.AI | AI Development Company in India",
    template: "%s | Honeybadger.AI",
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: SITE.url, languages: { "en-IN": SITE.url } },
  verification: { google: SITE.googleVerification },
  icons: {
    icon: [
      { url: "/brand/mark.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: ["/brand/mark.svg"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", site: "@honeybadgerai", creator: "@honeybadgerai" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#F7FBFB" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
        <ThemeProvider
          attribute={["class", "data-theme"]}
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionProvider>
            {children}
            <Toaster position="top-center" />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
