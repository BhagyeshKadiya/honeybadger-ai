"use client";

import * as m from "motion/react-m";
import { PROCESS } from "@/content/home";
import { Tilt3DCard } from "@/components/motion/Tilt3DCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { VIEWPORT } from "@/components/motion/Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-h" className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-28">
      <SectionHeading
        id="process-h"
        eyebrow="Process"
        title="Five steps from first call to compounding growth."
        answer="Every project follows the same five-step path: Discover, Design, Build, Automate, Grow. You get weekly demos and a clear next milestone at every stage."
      />

      <Stagger className="relative mt-10 grid gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-5" stagger={0.1}>
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
              <div className="preserve-3d relative flex items-start gap-4 p-4 lg:h-full lg:flex-col lg:p-5">
                <span className="depth-z-20 bg-surface-2 text-brand border-border-strong relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border font-mono text-xs font-semibold shadow-[0_8px_20px_rgba(29,242,226,0.25)]">
                  {p.step}
                </span>
                <div className="depth-z-10">
                  <h3 className="font-display text-base font-semibold sm:text-lg">{p.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            </Tilt3DCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
