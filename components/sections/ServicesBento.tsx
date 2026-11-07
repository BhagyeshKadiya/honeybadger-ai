import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/content/services";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ServiceIcon } from "@/components/ServiceIcon";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const SPAN = {
  normal: "",
  wide: "lg:col-span-2",
  tall: "lg:row-span-2",
  full: "md:col-span-2 lg:col-span-3",
} as const;

export function ServicesBento() {
  return (
    <section id="services" aria-labelledby="services-h" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        id="services-h"
        eyebrow="Services"
        title="Seven capabilities. One accountable team."
        answer="Honeybadger.AI covers the full path from idea to discovery: we build the product, automate it with AI, and grow it through search and app stores. You work with one team instead of stitching together four vendors."
      />

      <Stagger className="mt-12 grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense" stagger={0.06}>
        {SERVICES.map((s) => (
          <StaggerItem key={s.slug} className={cn("h-full", SPAN[s.span])}>
            <SpotlightCard className="h-full">
              <Link
                href={`/services/${s.slug}`}
                className="group/card flex h-full min-h-[200px] flex-col justify-between gap-8 p-6 focus-visible:outline-offset-[-3px]"
              >
                <div>
                  <span className="border-border bg-muted text-brand grid size-11 place-items-center rounded-xl border">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <h3 className="font-display mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="text-muted-foreground mt-2 max-w-md text-sm">{s.valueProp}</p>
                </div>
                <span className="text-brand flex items-center gap-1 text-sm font-medium">
                  Learn more
                  <ArrowUpRight
                    className="size-4 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-visible/card:translate-x-0 group-focus-visible/card:translate-y-0 group-focus-visible/card:opacity-100"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

