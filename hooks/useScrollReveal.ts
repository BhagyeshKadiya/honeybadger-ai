"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function useScrollReveal(once = true, margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as any });
  const shouldReduceMotion = useReducedMotion();

  const getVariants = (
    direction: "up" | "down" | "left" | "right" = "up",
    delay = 0,
    staggerChildren = 0.12
  ) => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 1, x: 0, y: 0 },
        visible: { opacity: 1, x: 0, y: 0 },
      };
    }

    const offsets = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { x: 40, y: 0 },
      right: { x: -40, y: 0 },
    };

    return {
      hidden: {
        opacity: 0,
        x: offsets[direction].x,
        y: offsets[direction].y,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          delay,
          when: "beforeChildren",
          staggerChildren,
        },
      },
    };
  };

  return { ref, isInView, getVariants };
}
export type ScrollRevealHook = ReturnType<typeof useScrollReveal>;
