"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { EASE_OUT, VIEWPORT } from "./Reveal";

const container = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <m.div
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={item}>
      {children}
    </m.div>
  );
}

