import { Hero } from "@/components/sections/Hero";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { Storytelling } from "@/components/sections/Storytelling";
import { RagSpotlight } from "@/components/sections/RagSpotlight";
import { Growth } from "@/components/sections/Growth";
import { TechStack } from "@/components/sections/TechStack";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionDivider } from "@/components/motion/SectionDivider";
import { HOME_FAQ } from "@/content/faq";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Honeybadger.AI | AI Development Company in India",
  description:
    "AI-powered websites, web apps, mobile apps, automation and RAG chatbots, plus AEO, GEO, SEO and app install campaigns. Based in Naroli, DNH; serving Gujarat, Vapi, Silvassa, Surat, Mumbai and worldwide.",
  path: "/",
  keywords: [
    "AI development company India",
    "RAG implementation company",
    "AI automation agency Gujarat",
    "web app development Vapi",
    "mobile app development company India",
    "app install campaign agency",
    "AEO GEO SEO agency India",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesBento />
      <SectionDivider />
      <Storytelling />
      <SectionDivider />
      <RagSpotlight />
      <SectionDivider />
      <Growth />
      <TechStack />
      <Process />
      <SectionDivider />
      <CaseStudies />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Faq items={HOME_FAQ} />
      <FinalCta />
    </>
  );
}
