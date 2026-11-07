"use client";

import * as m from "motion/react-m";
import { VIEWPORT } from "./Reveal";
import { cn } from "@/lib/utils";

/** 1px turquoise gradient line that draws in on scroll. */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("mx-auto max-w-6xl px-5", className)}>
      <m.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(29,242,226,0.55) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

