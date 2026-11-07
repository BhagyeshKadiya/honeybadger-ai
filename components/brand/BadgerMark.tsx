"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export const LEFT_BOLT_PATH =
  "M26 15 L34 56 L39 50 L34 26 L56 42 L40 72 L52 85 L70 122 L73 122 L64 80 L58 72 L72 45 Z";
export const RIGHT_BOLT_PATH =
  "M132 15 L124 56 L119 50 L124 26 L102 42 L118 72 L106 85 L88 122 L85 122 L94 80 L100 72 L86 45 Z";
export const JAW_PATH =
  "M28 60 L12 80 L39 98 L63 136 L68 142 L90 142 L95 136 L119 98 L146 80 L130 60 L124 66 L132 77 L112 91 L92 130 L86 130 L84 127 L74 127 L72 130 L66 130 L46 91 L26 77 L34 66 Z";

/**
 * Standalone animated Honeybadger symbol mark (exact geometry from uploaded symbol).
 * Stroke-draws the 3 angular paths in turquoise (`pathLength` 0 -> 1, 1.2s),
 * then fades in the turquoise gradient fill with a subtle hover pulse.
 */
export function BadgerMark({
  className,
  size = 40,
  animate = true,
  title = "Honeybadger.AI symbol",
}: {
  className?: string;
  size?: number;
  animate?: boolean;
  title?: string;
}) {
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  return (
    <m.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 160"
      width={size}
      height={size}
      fill="none"
      role="img"
      aria-label={title}
      whileHover={reduce ? undefined : { scale: 1.08, rotate: [0, -3, 3, 0] }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className={cn("shrink-0 drop-shadow-[0_0_18px_rgba(29,242,226,0.4)]", className)}
    >
      <defs>
        <linearGradient id="bm-grad" x1="12" y1="15" x2="146" y2="142" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1DF2E2" />
          <stop offset="100%" stopColor="#0FB8AA" />
        </linearGradient>
      </defs>

      {/* Stroke-draw layer (0 -> 1 in 1.2s) */}
      <m.path
        d={`${LEFT_BOLT_PATH} ${RIGHT_BOLT_PATH} ${JAW_PATH}`}
        stroke="#1DF2E2"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: shouldAnimate ? 0 : 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Fill layer that fades in as stroke completes */}
      <m.g
        initial={{ opacity: shouldAnimate ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: shouldAnimate ? 0.9 : 0 }}
      >
        <path d={LEFT_BOLT_PATH} fill="url(#bm-grad)" />
        <path d={RIGHT_BOLT_PATH} fill="url(#bm-grad)" />
        <path d={JAW_PATH} fill="url(#bm-grad)" />
      </m.g>
    </m.svg>
  );
}
