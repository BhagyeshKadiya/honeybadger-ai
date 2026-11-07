"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

export const VIEWPORT = { once: true, margin: "-80px" } as const;
export const SPRING = { type: "spring", stiffness: 120, damping: 20 } as const;
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "header";
}

/** Fade + rise on enter. Animates only opacity and transform. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
    >
      {children}
    </Comp>
  );
}

