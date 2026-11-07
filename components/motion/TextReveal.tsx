"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "./Reveal";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Words (by index) to render with the brand turquoise gradient */
  highlight?: number[];
  delay?: number;
  as?: "h1" | "h2" | "p";
}

/**
 * Word-by-word blur-in with safe wrapping on narrow mobile screens.
 * Uses inline-block word spans with non-breaking word units and breakable spacing,
 * ensuring no words are clipped or pushed beyond the viewport width.
 */
export function TextReveal({ text, className, highlight = [], delay = 0, as = "h1" }: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Comp = m[as];

  return (
    <Comp
      className={cn("w-full min-w-0 max-w-full text-balance break-normal", className)}
      aria-label={text}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block whitespace-nowrap">
          <m.span
            aria-hidden="true"
            className={cn("inline-block will-change-transform", highlight.includes(i) && "text-honey-gradient")}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 12, filter: reduce ? "blur(0px)" : "blur(8px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE_OUT } },
            }}
          >
            {word}
          </m.span>
          {i < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </Comp>
  );
}
