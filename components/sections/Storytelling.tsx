"use client";

import * as m from "motion/react-m";
import { AnimatePresence, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { Bot, Code2, Search } from "lucide-react";
import { STORY } from "@/content/home";
import { Tilt3DCard } from "@/components/motion/Tilt3DCard";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const ICONS = [Code2, Bot, Search];

function Stage({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const s = STORY[i];
  const a = i / 3;
  const b = (i + 1) / 3;
  const start = Math.max(0, a - 0.02);
  const opacity = useTransform(progress, [start, a + 0.06, b - 0.08, b], [i === 0 ? 1 : 0, 1, 1, i === 2 ? 1 : 0]);
  const y = useTransform(progress, [start, a + 0.06, b - 0.08, b], [i === 0 ? 0 : 30, 0, 0, i === 2 ? 0 : -30]);
  return (
    <m.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <p className="text-eyebrow">
        Step {s.step} · {s.verb}
      </p>
      <h3 className="text-h2 mt-3">{s.title}</h3>
      <p className="text-lead text-muted-foreground mt-4 max-w-lg">{s.body}</p>
      <ul className="mt-6 space-y-2 text-sm">
        {s.points.map((p) => (
          <li key={p} className="flex items-center gap-2.5">
            <span className="bg-brand-gradient size-1.5 rounded-full" /> {p}
          </li>
        ))}
      </ul>
    </m.div>
  );
}

function VisualLayer3D({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const Icon = ICONS[i];
  const s = STORY[i];
  const a = i / 3;
  const b = (i + 1) / 3;
  const start = Math.max(0, a - 0.02);
  const opacity = useTransform(progress, [start, a + 0.06, b - 0.08, b], [i === 0 ? 1 : 0, 1, 1, i === 2 ? 1 : 0]);
  const scale = useTransform(progress, [start, a + 0.08, b - 0.1, b], [i === 0 ? 1 : 0.84, 1, 1, i === 2 ? 1 : 0.88]);
  const rotateY = useTransform(progress, [start, a + 0.08, b - 0.08, b], [i === 0 ? -12 : -38, 12, -12, i === 2 ? 12 : 38]);
  const rotateX = useTransform(progress, [start, a + 0.15, b], [14, -8, 14]);

  return (
    <m.div
      style={{ opacity, scale, perspective: "1100px" }}
      className="absolute inset-0 grid place-items-center"
    >
      <m.div
        style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
        className="relative grid size-56 place-items-center sm:size-64"
      >
        {/* Back 3D depth plane (Z = -36px) */}
        <div
          className="border-primary/25 bg-surface/60 absolute inset-3 rounded-[2rem] border backdrop-blur-sm"
          style={{ transform: "translateZ(-36px)" }}
        />
        {/* Ambient 3D core glow */}
        <div
          className="bg-brand-gradient absolute inset-0 rounded-[2rem] opacity-25 blur-2xl"
          style={{ transform: "translateZ(-18px)" }}
        />
        {/* Main 3D glass prism face (Z = 0) */}
        <div
          className="glass relative grid size-full place-items-center shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_36px_rgba(29,242,226,0.22)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Floating 3D step pill (Z = +44px) */}
          <span
            className="border-border-strong bg-surface-2 text-brand absolute -top-3.5 left-6 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider shadow-lg"
            style={{ transform: "translateZ(44px)" }}
          >
            {s.step} · {s.verb}
          </span>
          {/* Floating 3D centerpiece icon (Z = +52px) */}
          <div
            className="grid size-24 place-items-center rounded-2xl border border-primary/30 bg-black/60 shadow-[0_18px_40px_rgba(29,242,226,0.28)]"
            style={{ transform: "translateZ(52px)" }}
          >
            <Icon className="text-brand size-12 sm:size-14" strokeWidth={1.35} aria-hidden="true" />
          </div>
          {/* Floating 3D bottom status bar (Z = +32px) */}
          <div
            className="border-border bg-surface-2/90 text-muted-foreground absolute -bottom-3.5 right-6 flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px]"
            style={{ transform: "translateZ(32px)" }}
          >
            <span className="animate-turquoise-pulse bg-primary size-1.5 rounded-full" /> 3D STAGE ACTIVE
          </div>
        </div>
      </m.div>
    </m.div>
  );
}

/**
 * Build → Automate → Get Found:
 * - On mobile (<768px): app-style interactive segmented step switcher with 3D perspective flip + Tilt3DCard
 * - On desktop (>=768px): sticky scroll-driven 3D stage
 */
export function Storytelling() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const [mobileStep, setMobileStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(2, Math.floor(v * 3))));
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const currentMobile = STORY[mobileStep];
  const MobileIcon = ICONS[mobileStep];

  return (
    <section aria-labelledby="story-h" className="relative">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-5 sm:pt-28">
        <SectionHeading
          id="story-h"
          eyebrow="How we work"
          title="Build. Automate. Get found."
          answer="Most agencies stop at launch. We carry the product through three stages: building it, putting AI to work inside it, and making sure customers can find it."
        />
      </div>

      {/* MOBILE APP-STYLE INTERACTIVE 3D STAGE SWITCHER (<768px) */}
      <div className="mx-auto mt-8 max-w-6xl px-4 pb-16 md:hidden" style={{ perspective: "1000px" }}>
        <div className="glass grid grid-cols-3 gap-1 p-1.5" role="tablist" aria-label="Stages">
          {STORY.map((s, idx) => {
            const isSel = mobileStep === idx;
            return (
              <button
                key={s.step}
                type="button"
                role="tab"
                aria-selected={isSel}
                onClick={() => setMobileStep(idx)}
                className="relative rounded-xl py-2.5 text-center font-mono text-xs font-semibold transition-transform active:scale-95"
              >
                {isSel && (
                  <m.span
                    layoutId="mobile-story-tab"
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="bg-brand-gradient absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(29,242,226,0.35)]"
                  />
                )}
                <span className={cn("relative z-10", isSel ? "text-ink font-bold" : "text-muted-foreground")}>
                  {s.step} · {s.verb}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <m.div
            key={currentMobile.step}
            initial={{ opacity: 0, rotateY: -14, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, rotateY: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 14, y: -12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="mt-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Tilt3DCard className="p-5">
              <div className="depth-z-20 flex items-center justify-between">
                <span className="text-eyebrow">
                  Step {currentMobile.step} · {currentMobile.verb}
                </span>
                <span className="border-border-strong bg-surface-2 text-brand grid size-11 place-items-center rounded-xl border shadow-[0_0_20px_rgba(29,242,226,0.2)]">
                  <MobileIcon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <h3 className="depth-z-10 font-display mt-3 text-2xl font-semibold tracking-tight">{currentMobile.title}</h3>
              <p className="depth-z-10 text-muted-foreground mt-2 text-sm leading-relaxed">{currentMobile.body}</p>
              <ul className="depth-z-10 mt-4 space-y-2 border-t border-border pt-4 text-sm">
                {currentMobile.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5">
                    <span className="bg-brand-gradient size-1.5 rounded-full" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Tilt3DCard>
          </m.div>
        </AnimatePresence>
      </div>

      {/* DESKTOP STICKY SCROLL-DRIVEN 3D CINEMA (>=768px) */}
      {reduce ? (
        <div className="mx-auto mt-12 hidden max-w-6xl gap-6 px-5 pb-24 md:grid md:grid-cols-3">
          {STORY.map((s) => (
            <div key={s.step} className="glass p-6">
              <p className="text-eyebrow">
                Step {s.step} · {s.verb}
              </p>
              <h3 className="font-display mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{s.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <div ref={ref} className="relative hidden h-[300vh] md:block">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 md:grid-cols-2">
              <div className="relative h-[26rem] sm:h-[28rem]">
                {STORY.map((_, i) => (
                  <Stage key={i} i={i} progress={scrollYProgress} />
                ))}
              </div>
              <div className="relative h-64 sm:h-[26rem]" aria-hidden="true">
                {STORY.map((_, i) => (
                  <VisualLayer3D key={i} i={i} progress={scrollYProgress} />
                ))}
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-3">
                  {STORY.map((s, i) => (
                    <span key={s.step} className={cn("font-mono text-xs transition-colors", i === active ? "text-brand" : "text-muted-foreground")}>
                      {s.step}
                    </span>
                  ))}
                  <span className="bg-border relative ml-1 h-px flex-1 overflow-hidden">
                    <m.span className="bg-brand-gradient absolute inset-y-0 left-0 w-full origin-left" style={{ width: bar }} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
