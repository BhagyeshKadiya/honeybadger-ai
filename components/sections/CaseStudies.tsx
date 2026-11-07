"use client";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tilt3DCard } from "@/components/motion/Tilt3DCard";
import { CASES, type CaseCategory } from "@/content/home";
import { SectionHeading } from "./SectionHeading";

const FILTERS: ("All" | CaseCategory)[] = ["All", "Web", "App", "AI", "Growth"];

export function CaseStudies() {
  const [filter, setFilter] = useState<"All" | CaseCategory>("All");
  const items = CASES.filter((c) => filter === "All" || c.category === filter);

  return (
    <section id="work" aria-labelledby="work-h" className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-28">
      <SectionHeading
        id="work-h"
        eyebrow="Work"
        title="Selected work, coming soon."
        answer="We are documenting recent builds as case studies covering the problem, the system we built and the measured result. The cards below are placeholders until each client approves publication."
      />

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mt-8 sm:mt-10">
        <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0" aria-label="Filter case studies">
          {FILTERS.map((f) => (
            <TabsTrigger
              key={f}
              value={f}
              className="relative h-9 rounded-full px-4 text-sm data-active:bg-transparent data-active:text-ink data-active:shadow-none"
            >
              {filter === f && (
                <m.span
                  layoutId="case-tab"
                  className="bg-honey-gradient absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              )}
              <span className="relative">{f}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {items.map((c) => (
            <m.li
              key={c.title}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="h-full"
            >
              <Tilt3DCard className="h-full">
                <div className="preserve-3d flex h-full flex-col gap-4 p-5 sm:p-6">
                  <div className="depth-z-20 flex items-center justify-between">
                    <Badge variant="outline">{c.category}</Badge>
                    <span className="text-muted-foreground font-mono text-[10px] uppercase">Placeholder</span>
                  </div>
                  <h3 className="depth-z-10 font-display text-lg font-semibold">{c.title}</h3>
                  <p className="depth-z-10 text-muted-foreground text-sm">{c.summary}</p>
                  <ul className="depth-z-10 mt-auto flex flex-wrap gap-1.5 pt-2">
                    {c.tags.map((t) => (
                      <li key={t} className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 font-mono text-[11px]">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt3DCard>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}
