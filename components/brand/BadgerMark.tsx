"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const OUTER_PATH =
  "M20 12 L48 30 L38 56 L53 102 L44 106 L12 56 L24 40 L16 16 Z M100 12 L72 30 L82 56 L67 102 L76 106 L108 56 L96 40 L104 16 Z";
const INNER_PATH =
  "M46 34 L55 52 L46 70 L56 98 L60 98 L64 98 L74 70 L65 52 L74 34 L63 44 L60 36 L57 44 Z";
const SNOUT_PATH = "M50 104 L70 104 L66 112 L54 112 Z";

/**
 * Standalone animated Honeybadger mark.
 * On first load, stroke-draws the angular paths in turquoise (`pathLength` 0 -> 1, 1.2s),
 * then fades in the turquoise gradient fill. Respects `prefers-reduced-motion`.
 */
export function BadgerMark({
  className,
  size = 40,
  animate = true,
  title = "Honeybadger.AI mark",
}: {
  className?: string;
  size?: number;
  animate?: boolean;
  title?: string;
}) {
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      role="img"
      aria-label={title}
      className={cn("shrink-0 drop-shadow-[0_0_16px_rgba(29,242,226,0.35)]", className)}
    >
      <defs>
        <linearGradient id="bm-grad" x1="16" y1="10" x2="104" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1DF2E2" />
          <stop offset="100%" stopColor="#0FB8AA" />
        </linearGradient>
      </defs>

      {/* Stroke-draw layer (0 -> 1 in 1.2s) */}
      <m.path
        d={`${OUTER_PATH} ${INNER_PATH} ${SNOUT_PATH}`}
        stroke="#1DF2E2"
        strokeWidth="2.5"
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
        transition={{ duration: 0.45, delay: shouldAnimate ? 0.95 : 0 }}
      >
        <path d={OUTER_PATH} fill="url(#bm-grad)" />
        <path d="M25 22 L42 33 L32 54 L22 40 Z M95 22 L78 33 L88 54 L98 40 Z" fill="var(--background)" />
        <path d={INNER_PATH} fill="url(#bm-grad)" />
        <polygon points="39,57 46,64 43,68 36,61" fill="#1DF2E2" />
        <polygon points="81,57 74,64 77,68 84,61" fill="#1DF2E2" />
        <polygon points="50,104 70,104 66,112 54,112" fill="#1DF2E2" />
      </m.g>
    </svg>
  );
}

