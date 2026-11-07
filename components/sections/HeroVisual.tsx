"use client";

import * as m from "motion/react-m";
import { useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Bot, Code2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const CHAT = [
  { from: "user", text: "What's our refund window for annual plans?" },
  { from: "ai", text: "30 days from purchase. Annual plans are refunded pro-rata after that.", cite: "Refund-Policy.pdf · p.3" },
] as const;

/** Floating UI mockup: AI chat, terminal code window, rising ranking chart. Parallax on mouse move. */
export default function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });

  const chatX = useTransform(sx, (v) => v * -14);
  const chatY = useTransform(sy, (v) => v * -10);
  const codeX = useTransform(sx, (v) => v * 20);
  const codeY = useTransform(sy, (v) => v * 14);
  const chartX = useTransform(sx, (v) => v * -26);
  const chartY = useTransform(sy, (v) => v * 18);

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
    <div className="relative mx-auto h-[420px] w-full max-w-xl sm:h-[460px]" aria-hidden="true">
      {/* Chat */}
      <m.div style={{ x: chatX, y: chatY }} className="absolute top-0 left-0 w-[88%] sm:w-[78%]">
        <m.div animate={float(0)} className="glass relative overflow-hidden p-4 shadow-2xl">
          {/* Turquoise scanning line */}
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
            <p className="border-border w-fit max-w-[92%] rounded-xl rounded-bl-sm border px-3 py-2">
              <span className={typed < CHAT[1].text.length ? "caret" : ""}>{CHAT[1].text.slice(0, typed)}</span>
              {typed >= CHAT[1].text.length && (
                <span className="text-brand mt-1.5 block font-mono text-[11px] font-medium">↳ {CHAT[1].cite}</span>
              )}
            </p>
          </div>
        </m.div>
      </m.div>

      {/* Terminal / Code window */}
      <m.div style={{ x: codeX, y: codeY }} className="absolute top-[34%] right-0 w-[82%] sm:w-[68%]">
        <m.div animate={float(1.2)} className="glass overflow-hidden shadow-2xl">
          <div className="border-border flex items-center gap-1.5 border-b px-3 py-2">
            <span className="bg-subtle size-2 rounded-full" />
            <span className="bg-subtle size-2 rounded-full" />
            <span className="bg-primary size-2 rounded-full" />
            <span className="text-muted-foreground ml-2 flex items-center gap-1 font-mono text-[10px]">
              <Code2 className="size-3" /> retrieve.ts
            </span>
          </div>
          <pre className="overflow-hidden p-3 font-mono text-[11px] leading-relaxed">
            <code>
              <span className="text-muted-foreground">const</span> hits = <span className="text-muted-foreground">await</span> vector.
              <span className="text-brand">search</span>(query, {"{"} k: 6 {"}"});{"\n"}
              <span className="text-muted-foreground">return</span> llm.<span className="text-brand">answer</span>(hits, {"{"} cite: <span className="text-brand">true</span> {"}"});
            </code>
          </pre>
        </m.div>
      </m.div>

      {/* Ranking chart */}
      <m.div style={{ x: chartX, y: chartY }} className="absolute bottom-0 left-[6%] w-[70%] sm:w-[56%]">
        <m.div animate={float(2.4)} className="glass p-4 shadow-2xl">
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
  );
}
