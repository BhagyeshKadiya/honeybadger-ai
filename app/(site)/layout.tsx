import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { CursorGlow } from "@/components/motion/CursorGlow";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="bg-primary text-primary-foreground sr-only z-[100] rounded-md px-4 py-2 font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main id="main" className="relative flex-1">
        {children}
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}

