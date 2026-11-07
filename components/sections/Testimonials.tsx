"use client";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/content/home";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const go = (d: number) => setI((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section aria-labelledby="testi-h" className="mx-auto max-w-4xl px-5 py-24 text-center sm:py-32">
      <SectionHeading id="testi-h" eyebrow="Testimonials" title="What clients say." align="center" />
      <div className="glass relative mt-10 min-h-[15rem] p-8 sm:p-12" role="region" aria-roledescription="carousel" aria-label="Testimonials">
        <Quote className="text-brand mx-auto size-8" aria-hidden="true" />
        <AnimatePresence mode="wait">
          <m.figure
            key={i}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            aria-live="polite"
          >
            <blockquote className="font-display mt-5 text-xl leading-snug sm:text-2xl">{t.quote}</blockquote>
            <figcaption className="text-muted-foreground mt-6 text-sm">
              <span className="text-foreground font-medium">{t.name}</span> · {t.role}
              {/* TODO: replace placeholder testimonials */}
            </figcaption>
          </m.figure>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <Button variant="outline" size="icon-lg" aria-label="Previous testimonial" onClick={() => go(-1)}>
          <ChevronLeft aria-hidden="true" />
        </Button>
        <div className="flex gap-2" aria-hidden="true">
          {TESTIMONIALS.map((_, idx) => (
            <span key={idx} className={cn("h-1.5 rounded-full transition-all", idx === i ? "bg-honey-gradient w-6" : "bg-border w-1.5")} />
          ))}
        </div>
        <Button variant="outline" size="icon-lg" aria-label="Next testimonial" onClick={() => go(1)}>
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}

