import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";

/**
 * Self-hosted Google fonts via next/font with `display: "swap"`.
 * - Montserrat (500, 600, 700): display & headings, closest match to the HONEYBADGER.AI wordmark
 * - Inter (400, 500): body & UI copy
 * - JetBrains Mono (400, 500): code, counters, tech-stack tags, RAG labels & terminal UI
 */
export const fontDisplay = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;

