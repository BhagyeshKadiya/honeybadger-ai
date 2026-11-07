"use client";

import * as m from "motion/react-m";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** Soft turquoise glow that follows the cursor. Mounts only on fine-pointer desktops. */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] h-[400px] w-[400px] rounded-full opacity-60"
      style={{
        x: sx,
        y: sy,
        background: "radial-gradient(circle, rgba(29, 242, 226, 0.10), transparent 65%)",
      }}
    />
  );
}
