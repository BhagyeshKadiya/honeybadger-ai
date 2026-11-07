"use client";

import Link from "next/link";
import { useState } from "react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/content/services";
import { Tilt3DCard } from "@/components/motion/Tilt3DCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ServiceIcon } from "@/components/ServiceIcon";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const SPAN = {
  normal: "col-span-1",
  wide: "col-span-2 lg:col-span-2",
  tall: "col-span-2 sm:col-span-1 lg:row-span-2",
  full: "col-span-2 md:col-span-2 lg:col-span-3",
} as const;

const MOBILE_FILTERS = [
  { id: "all", label: "All (7)" },
  { id: "build", label: "Build", slugs: ["websites", "web-apps", "mobile-apps"] },
  { id: "ai", label: "AI & RAG", slugs: ["ai-automation", "rag"] },
  { id: "growth", label: "Growth", slugs: ["aeo-geo-seo", "app-install-campaigns"] },
] as const;

export function ServicesBento() {
  const [cat, setCat] = useState<(typeof MOBILE_FILTERS)[number]["id"]>("all");

  const visibleServices = SERVICES.filter((s) => {
    if (cat === "all") return true;
    const found = MOBILE_FILTERS.find((f) => f.id === cat);
    return found && "slugs" in found ? (found.slugs as readonly string[]).includes(s.slug) : true;
  });

  return (
    <section id="services" aria-labelledby="services-h" className="relative mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-28">
      <SectionHeading
        id="services-h"
        eyebrow="Services"
        title="Seven capabilities. One accountable team."
        answer="Honeybadger.AI covers the full path from idea to discovery: we build the product, automate it with AI, and grow it through search and app stores. You work with one team instead of stitching together four vendors."
      />

      {/* Mobile App Category Filter Bar (<768px) */}
      <div className="glass mt-6 grid grid-cols-4 gap-1 p-1 md:hidden" role="tablist" aria-label="Filter services">
        {MOBILE_FILTERS.map((f) => {
          const active = cat === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCat(f.id)}
              className="relative rounded-xl py-2 text-center font-mono text-[11px] font-semibold transition-transform active:scale-95"
            >
              {active && (
                <m.span
                  layoutId="mobile-services-filter"
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="bg-brand-gradient absolute inset-0 rounded-xl shadow-[0_0_16px_rgba(29,242,226,0.35)]"
                />
              )}
              <span className={cn("relative z-10", active ? "text-ink font-bold" : "text-muted-foreground")}>
                {f.label}
              </span>
            </button>
          );
        })}
      </div>

      <Stagger
        key={cat}
        className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-12 sm:auto-rows-[minmax(200px,auto)] sm:gap-4 md:grid-cols-2 lg:grid-flow-dense lg:grid-cols-3"
        stagger={0.05}
      >
        {visibleServices.map((s) => {
          const idx = SERVICES.findIndex((item) => item.slug === s.slug);
          const spanClass = cat === "all" ? SPAN[s.span] : "col-span-2 sm:col-span-1";
          return (
            <StaggerItem key={s.slug} className={cn("h-full", spanClass)}>
              <Tilt3DCard className="h-full" intensity={s.span === "full" || s.span === "wide" ? 6 : 10}>
                <Link
                  href={`/services/${s.slug}`}
                  className="preserve-3d group/card flex h-full flex-col justify-between gap-3 p-3.5 focus-visible:outline-offset-[-3px] sm:min-h-[200px] sm:gap-8 sm:p-6"
                >
                  <div className="preserve-3d">
                    <div className="depth-z-20 flex items-center justify-between">
                      <span className="border-border-strong bg-surface-2 text-brand grid size-9 place-items-center rounded-xl border shadow-[0_10px_24px_rgba(29,242,226,0.22)] transition-transform duration-300 group-hover/card:scale-110 sm:size-11">
                        <ServiceIcon name={s.icon} className="size-4 sm:size-5" />
                      </span>
                      <span className="text-muted-foreground font-mono text-[11px] sm:text-xs">0{idx + 1}</span>
                    </div>
                    <h3 className="depth-z-10 font-display mt-3 text-sm font-semibold tracking-tight sm:mt-5 sm:text-xl">
                      <span className="sm:hidden">{s.span === "normal" && cat === "all" ? s.shortTitle : s.title}</span>
                      <span className="hidden sm:inline">{s.title}</span>
                    </h3>
                    <p
                      className={cn(
                        "depth-z-10 text-muted-foreground mt-1 max-w-md text-xs leading-relaxed sm:mt-2 sm:text-sm",
                        s.span === "normal" && cat === "all" && "line-clamp-3 sm:line-clamp-none",
                      )}
                    >
                      {s.valueProp}
                    </p>
                  </div>
                  <span className="depth-z-20 text-brand flex items-center gap-1 font-mono text-[11px] font-medium sm:text-sm">
                    <span>Explore</span>
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 sm:size-4"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Tilt3DCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
