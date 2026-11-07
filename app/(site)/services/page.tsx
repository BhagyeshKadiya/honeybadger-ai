import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { ServiceIcon } from "@/components/ServiceIcon";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services: AI, Web, Mobile, RAG, AEO/GEO/SEO",
  description:
    "Seven services from Honeybadger.AI: websites, web apps, mobile apps, AI automation, RAG implementation, app download campaigns, and AEO, GEO and SEO.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Build it. Automate it. Get it found."
        answer="Honeybadger.AI offers seven services that cover the full product lifecycle, from development to AI automation to search and app store growth. Choose one, or combine them under a single team."
      >
        <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
      </PageHero>

      <section aria-label="All services" className="mx-auto max-w-6xl px-5 pb-24">
        <ul className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <SpotlightCard className="h-full">
                <Link href={`/services/${s.slug}`} className="group/card flex h-full flex-col gap-4 p-6">
                  <span className="border-border bg-muted text-brand grid size-11 place-items-center rounded-xl border">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <h2 className="font-display text-xl font-semibold">{s.title}</h2>
                  <p className="text-muted-foreground text-sm">{s.answer}</p>
                  <span className="text-brand mt-auto flex items-center gap-1 text-sm font-medium">
                    View service <ArrowUpRight className="size-4 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}

