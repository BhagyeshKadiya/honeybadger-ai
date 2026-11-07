"use client";

import * as m from "motion/react-m";
import { useScroll, useSpring } from "motion/react";

/** Thin honey-gradient progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      className="bg-honey-gradient fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
      style={{ scaleX }}
    />
  );
}

