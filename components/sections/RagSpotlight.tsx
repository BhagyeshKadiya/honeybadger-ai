"use client";

import * as m from "motion/react-m";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Bot, Database, FileText, Layers, Sparkles, User, type LucideIcon } from "lucide-react";
import { RAG_DEMO, RAG_PIPELINE } from "@/content/home";
import { CtaLink } from "@/components/CtaLinks";
import { SectionHeading } from "./SectionHeading";

const NODE_ICONS: Record<string, LucideIcon> = {
  docs: FileText,
  embed: Layers,
  vector: Database,
  llm: Sparkles,
  answer: Bot,
};

function PipelineDiagram() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <ol ref={ref} className="relative space-y-3" aria-label="RAG pipeline">
      {/* Animated connector (SVG path drawing in turquoise) */}
      <svg aria-hidden="true" className="absolute top-6 bottom-6 left-[1.65rem] w-1" preserveAspectRatio="none" viewBox="0 0 2 100">
        <defs>
          <linearGradient id="rag-line" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#1DF2E2" />
            <stop offset="1" stopColor="#0FB8AA" />
          </linearGradient>
        </defs>
        <m.line
          x1="1"
          x2="1"
          y1="0"
          y2="100"
          stroke="url(#rag-line)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </svg>
      {RAG_PIPELINE.map((n, i) => {
        const Icon = NODE_ICONS[n.id];
        return (
          <m.li
            key={n.id}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : 0.25 * i }}
            className="glass relative flex items-center gap-4 px-4 py-3"
          >
            <span className="bg-surface-2 border-border-strong text-brand relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="font-display font-semibold">{n.label}</span>
              <span className="text-muted-foreground font-mono text-xs">{n.hint}</span>
            </span>
            <span className="text-brand ml-auto font-mono text-xs">0{i + 1}</span>
          </m.li>
        );
      })}
    </ol>
  );
}

function ChatDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [q, setQ] = useState(reduce ? RAG_DEMO.question.length : 0);
  const [a, setA] = useState(reduce ? RAG_DEMO.answer.length : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let qi = 0;
    let ai = 0;
    let t2: ReturnType<typeof setInterval> | undefined;
    const t1 = setInterval(() => {
      qi += 1;
      setQ(qi);
      if (qi >= RAG_DEMO.question.length) {
        clearInterval(t1);
        setTimeout(() => {
          t2 = setInterval(() => {
            ai += 2;
            setA(Math.min(ai, RAG_DEMO.answer.length));
            if (ai >= RAG_DEMO.answer.length && t2) clearInterval(t2);
          }, 28);
        }, 500);
      }
    }, 38);
    return () => {
      clearInterval(t1);
      if (t2) clearInterval(t2);
    };
  }, [inView, reduce]);

  const done = a >= RAG_DEMO.answer.length;

  return (
    <div ref={ref} className="glass relative overflow-hidden p-5" role="img" aria-label={`Demo chat. Question: ${RAG_DEMO.question} Answer: ${RAG_DEMO.answer}`}>
      <div className="animate-scan-line pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="text-muted-foreground mb-4 flex items-center gap-2 font-mono text-xs">
        <span className="animate-turquoise-pulse bg-primary size-2 rounded-full" /> live demo · illustrative content
      </div>
      <div className="min-h-[15rem] space-y-3 text-sm" aria-hidden="true">
        <div className="flex items-start gap-2.5">
          <span className="bg-surface-2 grid size-7 shrink-0 place-items-center rounded-full">
            <User className="size-3.5" />
          </span>
          <p className="bg-surface-2 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
            <span className={q < RAG_DEMO.question.length ? "caret" : ""}>{RAG_DEMO.question.slice(0, q)}</span>
          </p>
        </div>
        {q >= RAG_DEMO.question.length && (
          <div className="flex items-start gap-2.5">
            <span className="bg-brand-gradient text-ink grid size-7 shrink-0 place-items-center rounded-full">
              <Bot className="size-3.5" />
            </span>
            <div className="border-border rounded-2xl rounded-tl-sm border px-3.5 py-2.5">
              <span className={!done ? "caret" : ""}>{RAG_DEMO.answer.slice(0, a)}</span>
              {done && (
                <m.ul initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex flex-wrap gap-2">
                  {RAG_DEMO.sources.map((s) => (
                    <li key={s} className="border-border-strong text-brand rounded-full border bg-surface-2 px-2.5 py-1 font-mono text-[11px]">
                      {s}
                    </li>
                  ))}
                </m.ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function RagSpotlight() {
  return (
    <section id="rag" aria-labelledby="rag-h" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div aria-hidden="true" className="mesh-blob top-1/3 -right-20 -z-10 h-96 w-96" style={{ background: "var(--glow-a)" }} />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          id="rag-h"
          eyebrow="Flagship · RAG"
          title="AI that answers from your documents, and shows its sources."
          answer="Retrieval-augmented generation (RAG) searches your own knowledge before the model writes a word. The result is an assistant that is accurate, private and able to cite every claim."
        />
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          <PipelineDiagram />
          <div className="space-y-6">
            <ChatDemo />
            <CtaLink href="/rag-ai">Explore RAG implementation</CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
