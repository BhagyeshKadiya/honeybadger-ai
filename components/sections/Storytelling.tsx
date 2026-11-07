"use client";

import * as m from "motion/react-m";
import { AnimatePresence, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { Bot, Code2, Search } from "lucide-react";
import { STORY } from "@/content/home";
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

function VisualLayer({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const Icon = ICONS[i];
  const a = i / 3;
  const b = (i + 1) / 3;
  const start = Math.max(0, a - 0.02);
  const opacity = useTransform(progress, [start, a + 0.06, b - 0.08, b], [i === 0 ? 1 : 0, 1, 1, i === 2 ? 1 : 0]);
  const scale = useTransform(progress, [start, a + 0.08, b - 0.1, b], [i === 0 ? 1 : 0.85, 1, 1, i === 2 ? 1 : 0.9]);
  return (
    <m.div style={{ opacity, scale }} className="absolute inset-0 grid place-items-center">
      <div className="relative grid size-40 place-items-center sm:size-56">
        <div className="bg-brand-gradient absolute inset-0 rounded-[2rem] opacity-20 blur-2xl" />
        <div className="glass grid size-full place-items-center">
          <Icon className="text-brand size-16 sm:size-24" strokeWidth={1.25} aria-hidden="true" />
        </div>
      </div>
    </m.div>
  );
}

/**
 * Build → Automate → Get Found:
 * - On mobile (<768px): app-style interactive segmented step switcher with spring transitions
 * - On desktop (>=768px): sticky scroll-driven storytelling stage
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

      {/* MOBILE APP-STYLE INTERACTIVE STAGE SWITCHER (<768px) */}
      <div className="mx-auto mt-8 max-w-6xl px-4 pb-16 md:hidden">
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
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="glass mt-4 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-eyebrow">
                Step {currentMobile.step} · {currentMobile.verb}
              </span>
              <span className="border-border-strong bg-surface-2 text-brand grid size-11 place-items-center rounded-xl border shadow-[0_0_20px_rgba(29,242,226,0.2)]">
                <MobileIcon className="size-5" aria-hidden="true" />
              </span>
            </div>
            <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">{currentMobile.title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{currentMobile.body}</p>
            <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              {currentMobile.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <span className="bg-brand-gradient size-1.5 rounded-full" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </m.div>
        </AnimatePresence>
      </div>

      {/* DESKTOP STICKY SCROLL-DRIVEN CINEMA (>=768px) */}
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
              <div className="relative h-56 sm:h-[24rem]" aria-hidden="true">
                {STORY.map((_, i) => (
                  <VisualLayer key={i} i={i} progress={scrollYProgress} />
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
