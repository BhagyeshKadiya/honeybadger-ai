"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Async-loaded feature bundle. We use domMax (not domAnimation) because the
 * tab and nav indicators rely on `layout` / `layoutId`, which domAnimation
 * does not include. It is code-split so it never blocks first paint.
 */
const loadFeatures = () => import("./features").then((res) => res.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

