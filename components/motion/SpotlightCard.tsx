"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a cursor-follow radial turquoise spotlight.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      className={cn("glass group relative overflow-hidden", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(29, 242, 226, 0.16), transparent 60%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
