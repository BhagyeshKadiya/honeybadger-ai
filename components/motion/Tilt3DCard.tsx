"use client";

import * as m from "motion/react-m";
import { useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Interactive 3D perspective card with:
 * - Spring-smoothed `rotateX` and `rotateY` in a 1100px 3D perspective space
 * - `transform-style: preserve-3d` so child elements with `.depth-z-*` pop out in 3D
 * - Specular 3D glare + turquoise radial spotlight tracking the pointer
 */
export function Tilt3DCard({
  children,
  className,
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const mx = useMotionValue(180);
  const my = useMotionValue(120);

  const springConfig = { stiffness: 180, damping: 20, mass: 0.6 };
  const sPx = useSpring(px, springConfig);
  const sPy = useSpring(py, springConfig);

  const rotateX = useTransform(sPy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(sPx, [0, 1], [-intensity, intensity]);
  const glareX = useTransform(sPx, [0, 1], [0, 100]);
  const glareY = useTransform(sPy, [0, 1], [0, 100]);

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, rgba(29, 242, 226, 0.20), transparent 65%)`;
  const glare = useMotionTemplate`radial-gradient(280px circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.10), transparent 60%)`;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x);
    my.set(y);
    px.set(Math.min(1, Math.max(0, x / r.width)));
    py.set(Math.min(1, Math.max(0, y / r.height)));
  }

  function onPointerLeave() {
    setHovered(false);
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="perspective-distant h-full" style={{ perspective: "1100px" }}>
      <m.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={onPointerLeave}
        style={
          reduce
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        whileHover={reduce ? undefined : { z: 16, scale: 1.015 }}
        whileTap={reduce ? undefined : { scale: 0.985 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className={cn(
          "glass card-3d group relative h-full overflow-visible",
          hovered && "shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9),0_0_32px_rgba(29,242,226,0.22)]",
          className,
        )}
      >
        {/* Clipped surface glow & specular glare */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <m.div
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0, background: spotlight }}
          />
          <m.div
            className="absolute inset-0 mix-blend-screen transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0, background: glare }}
          />
        </div>

        {/* 3D preserved content layer */}
        <div className="relative h-full" style={{ transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </m.div>
    </div>
  );
}

