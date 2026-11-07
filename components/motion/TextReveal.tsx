"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "./Reveal";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Words (by index) to render with the honey gradient */
  highlight?: number[];
  delay?: number;
  as?: "h1" | "h2" | "p";
}

/** Word-by-word blur-in. Text stays in the DOM as one string for SEO and screen readers. */
export function TextReveal({ text, className, highlight = [], delay = 0, as = "h1" }: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Comp = m[as];

  return (
    <Comp
      className={className}
      aria-label={text}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <m.span
          key={`${word}-${i}`}
          aria-hidden="true"
          className={cn("inline-block will-change-transform", highlight.includes(i) && "text-honey-gradient")}
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : 14, filter: reduce ? "blur(0px)" : "blur(10px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE_OUT } },
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </m.span>
      ))}
    </Comp>
  );
}

