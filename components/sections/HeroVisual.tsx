"use client";

import * as m from "motion/react-m";
import { AnimatePresence, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Bot, Code2, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { HoloBadger3D } from "@/components/three/HoloBadger3D";
import { cn } from "@/lib/utils";

const CHAT = [
  { from: "user", text: "What's our refund window for annual plans?" },
  { from: "ai", text: "30 days from purchase. Annual plans are refunded pro-rata after that.", cite: "Refund-Policy.pdf · p.3" },
] as const;

const MOBILE_TABS = [
  { id: 0, label: "RAG Copilot", icon: Bot },
  { id: 1, label: "Vector Code", icon: Code2 },
  { id: 2, label: "Organic Growth", icon: TrendingUp },
] as const;

/**
 * 3D Interactive Hero Scene:
 * - Mobile (<640px): App-style 3D Holographic Stage + interactive segmented 3D HUD switcher (zero vertical clutter!)
 * - Desktop (>=640px): Full 3D multi-plane floating HUD (`translateZ(52px)`, `translateZ(76px)`, `translateZ(36px)`)
 */
export default function HeroVisual() {
  const reduce = useReducedMotion();
  const [mobileTab, setMobileTab] = useState<0 | 1 | 2>(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });

  // Whole-scene 3D tilt
  const sceneRotateY = useTransform(sx, (v) => v * 18);
  const sceneRotateX = useTransform(sy, (v) => v * -14);

  // Parallax offsets per layer
  const chatX = useTransform(sx, (v) => v * -18);
  const chatY = useTransform(sy, (v) => v * -12);
  const codeX = useTransform(sx, (v) => v * 24);
  const codeY = useTransform(sy, (v) => v * 16);
  const chartX = useTransform(sx, (v) => v * -28);
  const chartY = useTransform(sy, (v) => v * 20);

  const [typed, setTyped] = useState(reduce ? CHAT[1].text.length : 0);
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= CHAT[1].text.length) clearInterval(t);
    }, 32);
    return () => clearInterval(t);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    const move = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, mx, my]);

  const float = (delay: number) =>
    reduce ? {} : { y: [0, -8, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const, delay } };

  return (
    <div
      className="relative mx-auto w-full max-w-xl sm:h-[500px]"
      style={{ perspective: "1200px" }}
      aria-hidden="true"
    >
      {/* =====================================================================
          MOBILE NATIVE-APP 3D STAGE + INTERACTIVE HUD DECK (<640px)
         ===================================================================== */}
      <div className="sm:hidden">
        <div className="glass relative overflow-hidden rounded-3xl border border-border-strong p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_28px_rgba(29,242,226,0.16)]">
          {/* Top app telemetry bar */}
          <div className="mb-1 flex items-center justify-between px-1">
            <span className="text-brand flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider">
              <span className="animate-turquoise-pulse bg-primary size-1.5 rounded-full" />
              3D Neural Core
            </span>
            <span className="text-muted-foreground flex items-center gap-1 font-mono text-[10px]">
              <Sparkles className="text-brand size-3" /> Touch &amp; drag 3D
            </span>
          </div>

          {/* Interactive 3D Badger Hologram */}
          <div className="relative h-[200px] w-full">
            <HoloBadger3D />
          </div>

          {/* App Segmented Tab Bar */}
          <div className="bg-surface-2/90 mt-1 grid grid-cols-3 gap-1 rounded-2xl border border-border p-1">
            {MOBILE_TABS.map((t) => {
              const Icon = t.icon;
              const active = mobileTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setMobileTab(t.id)}
                  className="relative flex items-center justify-center gap-1.5 rounded-xl py-2 font-mono text-[11px] font-medium transition-transform active:scale-95"
                >
                  {active && (
                    <m.span
                      layoutId="hero-mobile-hud-pill"
                      transition={{ type: "spring", stiffness: 280, damping: 24 }}
                      className="bg-brand-gradient absolute inset-0 rounded-xl shadow-[0_0_16px_rgba(29,242,226,0.35)]"
                    />
                  )}
                  <Icon className={cn("relative z-10 size-3.5", active ? "text-ink" : "text-brand")} />
                  <span className={cn("relative z-10", active ? "text-ink font-semibold" : "text-muted-foreground")}>
                    {t.label.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active 3D HUD Card with 3D perspective transition */}
          <div className="mt-2.5 min-h-[138px]" style={{ perspective: "900px" }}>
            <AnimatePresence mode="wait">
              {mobileTab === 0 && (
                <m.div
                  key="m-chat"
                  initial={{ opacity: 0, rotateX: -12, y: 8 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: 12, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="bg-surface-2/70 rounded-2xl border border-border p-3"
                >
                  <div className="mb-2 flex items-center justify-between text-xs font-medium">
                    <span className="font-display flex items-center gap-1.5">
                      <Bot className="text-brand size-3.5" /> Knowledge copilot
                    </span>
                    <span className="text-brand font-mono text-[10px]">grounded · cited</span>
                  </div>
                  <div className="space-y-1.5 text-xs leading-snug">
                    <p className="bg-background/80 ml-auto w-fit max-w-[88%] rounded-xl rounded-br-sm border border-border px-2.5 py-1.5">
                      {CHAT[0].text}
                    </p>
                    <p className="border-border-strong bg-black/70 w-fit max-w-[94%] rounded-xl rounded-bl-sm border px-2.5 py-1.5">
                      <span className={typed < CHAT[1].text.length ? "caret" : ""}>{CHAT[1].text.slice(0, typed)}</span>
                      {typed >= CHAT[1].text.length && (
                        <span className="text-brand mt-1 block font-mono text-[10px] font-medium">↳ {CHAT[1].cite}</span>
                      )}
                    </p>
                  </div>
                </m.div>
              )}

              {mobileTab === 1 && (
                <m.div
                  key="m-code"
                  initial={{ opacity: 0, rotateX: -12, y: 8 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: 12, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="bg-surface-2/70 rounded-2xl border border-border p-3"
                >
                  <div className="border-border mb-2 flex items-center gap-1.5 border-b pb-2">
                    <span className="bg-subtle size-2 rounded-full" />
                    <span className="bg-subtle size-2 rounded-full" />
                    <span className="bg-primary size-2 rounded-full" />
                    <span className="text-muted-foreground ml-1.5 flex items-center gap-1 font-mono text-[10px]">
                      <Code2 className="text-brand size-3" /> retrieve.ts
                    </span>
                  </div>
                  <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed">
                    <code>
                      <span className="text-muted-foreground">const</span> hits = <span className="text-muted-foreground">await</span> vector.
                      <span className="text-brand">search</span>(query, {"{"} k: 6 {"}"});{"\n"}
                      <span className="text-muted-foreground">return</span> llm.<span className="text-brand">answer</span>(hits, {"{"} cite: <span className="text-brand">true</span> {"}"});
                    </code>
                  </pre>
                </m.div>
              )}

              {mobileTab === 2 && (
                <m.div
                  key="m-chart"
                  initial={{ opacity: 0, rotateX: -12, y: 8 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: 12, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="bg-surface-2/70 rounded-2xl border border-border p-3"
                >
                  <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
                    <span className="font-display flex items-center gap-1.5">
                      <TrendingUp className="text-brand size-3.5" /> AEO · GEO · SEO trajectory
                    </span>
                    <span className="text-brand font-mono text-[10px]">illustrative</span>
                  </div>
                  <svg viewBox="0 0 200 70" className="h-16 w-full" fill="none">
                    <defs>
                      <linearGradient id="hv-m-line" x1="0" x2="1">
                        <stop offset="0" stopColor="#1DF2E2" />
                        <stop offset="1" stopColor="#0FB8AA" />
                      </linearGradient>
                      <linearGradient id="hv-m-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#1DF2E2" stopOpacity="0.3" />
                        <stop offset="1" stopColor="#1DF2E2" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 62 L30 56 L60 58 L90 42 L120 38 L150 22 L200 6 L200 70 L0 70Z" fill="url(#hv-m-fill)" />
                    <path
                      d="M0 62 L30 56 L60 58 L90 42 L120 38 L150 22 L200 6"
                      stroke="url(#hv-m-line)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* =====================================================================
          DESKTOP 3D MULTI-PLANE FLOATING SCENE (>=640px)
         ===================================================================== */}
      <m.div
        style={
          reduce
            ? undefined
            : {
                rotateX: sceneRotateX,
                rotateY: sceneRotateY,
                transformStyle: "preserve-3d",
              }
        }
        className="relative hidden h-full w-full sm:block"
      >
        {/* 3D HOLOGRAPHIC BADGER CORE */}
        <div
          className="pointer-events-auto absolute inset-0 m-auto h-[380px] w-[380px] rounded-full border border-primary/20"
          style={{ transform: "translateZ(10px)" }}
        >
          <HoloBadger3D />
          <div className="pointer-events-none absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-primary/30 bg-black/75 px-2.5 py-1 font-mono text-[10px] tracking-wider text-brand uppercase backdrop-blur-md">
            <Sparkles className="size-3" /> 3D Neural Core · Interactive
          </div>
        </div>

        <div className="block" style={{ transformStyle: "preserve-3d" }}>
          {/* Layer 1 (Z = +52px): RAG Copilot HUD Card */}
          <m.div
            style={{ x: chatX, y: chatY, transform: "translateZ(52px)" }}
            className="absolute top-0 left-0 w-[74%]"
          >
            <m.div
              animate={float(0)}
              className="glass relative overflow-hidden p-4 shadow-[0_24px_50px_rgba(0,0,0,0.85),0_0_24px_rgba(29,242,226,0.16)]"
            >
              <div className="animate-scan-line pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="mb-3 flex items-center gap-2 text-xs font-medium">
                <span className="text-brand border-border-strong grid size-6 place-items-center rounded-md border bg-surface-2">
                  <Bot className="size-3.5" />
                </span>
                <span className="font-display">Knowledge copilot</span>
                <span className="text-muted-foreground ml-auto flex items-center gap-1.5 font-mono text-[10px]">
                  <span className="animate-turquoise-pulse bg-primary size-1.5 rounded-full" /> grounded
                </span>
              </div>
              <div className="space-y-2 text-[13px] leading-snug">
                <p className="bg-surface-2 ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm px-3 py-2">{CHAT[0].text}</p>
                <p className="border-border w-fit max-w-[92%] rounded-xl rounded-bl-sm border bg-black/60 px-3 py-2">
                  <span className={typed < CHAT[1].text.length ? "caret" : ""}>{CHAT[1].text.slice(0, typed)}</span>
                  {typed >= CHAT[1].text.length && (
                    <span className="text-brand mt-1.5 block font-mono text-[11px] font-medium">↳ {CHAT[1].cite}</span>
                  )}
                </p>
              </div>
            </m.div>
          </m.div>

          {/* Layer 2 (Z = +76px): Code Terminal Window */}
          <m.div
            style={{ x: codeX, y: codeY, transform: "translateZ(76px)" }}
            className="absolute top-[38%] right-0 w-[66%]"
          >
            <m.div
              animate={float(1.2)}
              className="glass overflow-hidden shadow-[0_28px_60px_rgba(0,0,0,0.9),0_0_28px_rgba(29,242,226,0.2)]"
            >
              <div className="border-border flex items-center gap-1.5 border-b px-3 py-2">
                <span className="bg-subtle size-2 rounded-full" />
                <span className="bg-subtle size-2 rounded-full" />
                <span className="bg-primary size-2 rounded-full" />
                <span className="text-muted-foreground ml-2 flex items-center gap-1 font-mono text-[10px]">
                  <Code2 className="size-3" /> retrieve.ts
                </span>
              </div>
              <pre className="overflow-x-auto p-3 font-mono text-[11px] leading-relaxed">
                <code>
                  <span className="text-muted-foreground">const</span> hits = <span className="text-muted-foreground">await</span> vector.
                  <span className="text-brand">search</span>(query, {"{"} k: 6 {"}"});{"\n"}
                  <span className="text-muted-foreground">return</span> llm.<span className="text-brand">answer</span>(hits, {"{"} cite: <span className="text-brand">true</span> {"}"});
                </code>
              </pre>
            </m.div>
          </m.div>

          {/* Layer 3 (Z = +36px): Growth Telemetry HUD */}
          <m.div
            style={{ x: chartX, y: chartY, transform: "translateZ(36px)" }}
            className="absolute bottom-0 left-[4%] w-[56%]"
          >
            <m.div
              animate={float(2.4)}
              className="glass p-4 shadow-[0_22px_48px_rgba(0,0,0,0.85),0_0_20px_rgba(29,242,226,0.15)]"
            >
              <div className="mb-2 flex items-center justify-between text-xs font-medium">
                <span className="font-display flex items-center gap-1.5">
                  <TrendingUp className="text-brand size-3.5" /> Organic visits
                </span>
                <span className="text-brand font-mono text-[10px]">illustrative</span>
              </div>
              <svg viewBox="0 0 200 70" className="h-16 w-full" fill="none">
                <defs>
                  <linearGradient id="hv-line" x1="0" x2="1">
                    <stop offset="0" stopColor="#1DF2E2" />
                    <stop offset="1" stopColor="#0FB8AA" />
                  </linearGradient>
                  <linearGradient id="hv-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#1DF2E2" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#1DF2E2" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 62 L30 56 L60 58 L90 42 L120 38 L150 22 L200 6 L200 70 L0 70Z" fill="url(#hv-fill)" />
                <m.path
                  d="M0 62 L30 56 L60 58 L90 42 L120 38 L150 22 L200 6"
                  stroke="url(#hv-line)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
                />
              </svg>
            </m.div>
          </m.div>
        </div>
      </m.div>
    </div>
  );
}
