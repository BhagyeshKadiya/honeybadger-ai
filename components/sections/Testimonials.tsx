"use client";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/content/home";
import { Tilt3DCard } from "@/components/motion/Tilt3DCard";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const go = (d: number) => setI((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section aria-labelledby="testi-h" className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-5 sm:py-28">
      <SectionHeading id="testi-h" eyebrow="Testimonials" title="What clients say." align="center" />
      <div className="mt-8 sm:mt-10" role="region" aria-roledescription="carousel" aria-label="Testimonials">
        <Tilt3DCard className="min-h-[15rem] p-6 sm:p-12" intensity={6}>
          <Quote className="depth-z-20 text-brand mx-auto size-8 drop-shadow-[0_0_16px_rgba(29,242,226,0.35)]" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <m.figure
              key={i}
              initial={{ opacity: 0, rotateX: -12, y: 12 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: 12, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              aria-live="polite"
              className="depth-z-10"
            >
              <blockquote className="font-display mt-5 text-xl leading-snug sm:text-2xl">{t.quote}</blockquote>
              <figcaption className="text-muted-foreground mt-6 text-sm">
                <span className="text-foreground font-medium">{t.name}</span> · {t.role}
                {/* TODO: replace placeholder testimonials */}
              </figcaption>
            </m.figure>
          </AnimatePresence>
        </Tilt3DCard>
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
