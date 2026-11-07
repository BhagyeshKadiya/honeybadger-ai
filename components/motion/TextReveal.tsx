"use client";

import { Fragment } from "react";
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

/** Word-by-word blur-in with natural browser word-wrapping on mobile and desktop. */
export function TextReveal({ text, className, highlight = [], delay = 0, as = "h1" }: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Comp = m[as];

  return (
    <Comp
      className={cn("text-balance", className)}
      aria-label={text}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
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
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Comp>
  );
}
