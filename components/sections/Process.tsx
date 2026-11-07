"use client";

import * as m from "motion/react-m";
import { PROCESS } from "@/content/home";
import { Tilt3DCard } from "@/components/motion/Tilt3DCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { VIEWPORT } from "@/components/motion/Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-h" className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-28">
      <SectionHeading
        id="process-h"
        eyebrow="Process"
        title="Five steps from first call to compounding growth."
        answer="Every project follows the same five-step path: Discover, Design, Build, Automate, Grow. You get weekly demos and a clear next milestone at every stage."
      />

      <Stagger className="relative mt-8 grid gap-2.5 sm:mt-14 sm:gap-5 lg:grid-cols-5" stagger={0.1}>
        {/* Animated vertical connector line on mobile/tablet */}
        <m.div
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-brand-gradient absolute top-6 bottom-6 left-8.5 w-px origin-top opacity-45 lg:hidden"
        />
        {/* Animated horizontal line on desktop */}
        <m.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-brand-gradient absolute top-7 right-[10%] left-[10%] hidden h-px origin-left opacity-40 lg:block"
        />
        {PROCESS.map((p) => (
          <StaggerItem key={p.step} className="h-full">
            <Tilt3DCard className="h-full" intensity={10}>
              <div className="preserve-3d relative flex items-start gap-3.5 p-3.5 sm:gap-4 sm:p-4 lg:h-full lg:flex-col lg:p-5">
                <span className="depth-z-20 bg-surface-2 text-brand border-border-strong relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border font-mono text-xs font-semibold shadow-[0_8px_20px_rgba(29,242,226,0.25)]">
                  {p.step}
                </span>
                <div className="depth-z-10">
                  <h3 className="font-display text-base font-semibold sm:text-lg">{p.title}</h3>
                  <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed sm:mt-1 sm:text-sm">{p.body}</p>
                </div>
              </div>
            </Tilt3DCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
