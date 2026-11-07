"use client";

import Link from "next/link";
import * as m from "motion/react-m";
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
    <section id="services" aria-labelledby="services-h" className="relative mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-28">
      <SectionHeading
        id="services-h"
        eyebrow="Services"
        title="Seven capabilities. One accountable team."
        answer="Honeybadger.AI covers the full path from idea to discovery: we build the product, automate it with AI, and grow it through search and app stores. You work with one team instead of stitching together four vendors."
      />

      <Stagger className="mt-8 grid gap-3 sm:mt-12 sm:auto-rows-[minmax(200px,auto)] sm:gap-4 md:grid-cols-2 lg:grid-flow-dense lg:grid-cols-3" stagger={0.06}>
        {SERVICES.map((s, idx) => (
          <StaggerItem key={s.slug} className={cn("h-full", SPAN[s.span])}>
            <m.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="h-full"
            >
              <SpotlightCard className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="group/card flex h-full flex-col justify-between gap-4 p-4 focus-visible:outline-offset-[-3px] sm:min-h-[200px] sm:gap-8 sm:p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="border-border-strong bg-surface-2 text-brand grid size-10 place-items-center rounded-xl border shadow-[0_0_16px_rgba(29,242,226,0.18)] transition-transform duration-300 group-hover/card:scale-110 sm:size-11">
                        <ServiceIcon name={s.icon} className="size-5" />
                      </span>
                      <span className="text-muted-foreground font-mono text-xs">0{idx + 1}</span>
                    </div>
                    <h3 className="font-display mt-4 text-lg font-semibold tracking-tight sm:mt-5 sm:text-xl">
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground mt-1.5 max-w-md text-sm leading-relaxed sm:mt-2">
                      {s.valueProp}
                    </p>
                  </div>
                  <span className="text-brand flex items-center gap-1 font-mono text-xs font-medium sm:text-sm">
                    Explore service
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </SpotlightCard>
            </m.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
