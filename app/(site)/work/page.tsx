import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work: Case Studies",
  description: "Case studies from Honeybadger.AI across web, mobile, AI automation, RAG and search growth. Placeholders until client approvals are in.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Proof beats promises. Case studies are on the way."
        answer="We are packaging recent projects into case studies with the problem, the system and the measured result. Until clients approve publication, the cards below are clearly marked placeholders."
      >
        <Breadcrumbs items={[{ name: "Work", path: "/work" }]} />
      </PageHero>
      <CaseStudies />
      <FinalCta />
    </>
  );
}

