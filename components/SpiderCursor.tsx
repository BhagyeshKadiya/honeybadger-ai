"use client";

import React, { useEffect, useRef, useState } from "react";

export default function SpiderCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // References for position tracking
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRefEl = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Maintain 12 points for the spider web trail
  const trailRef = useRef<{ x: number; y: number }[]>(
    Array.from({ length: 12 }, () => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    setIsMounted(true);
    
    // Check if it's a touch device
    const touchCheck =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia("(any-pointer: coarse)").matches);
    
    setIsTouch(touchCheck);

    if (touchCheck) return;

    // Enable custom cursor styles on body
    document.documentElement.classList.add("desktop-custom-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Track hovered elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const checkInteractive = (el: HTMLElement | null): boolean => {
        if (!el) return false;
        const tag = el.tagName.toLowerCase();
        if (
          tag === "a" ||
          tag === "button" ||
          el.hasAttribute("data-hover") ||
          el.getAttribute("role") === "button" ||
          el.closest("a") ||
          el.closest("button")
        ) {
          return true;
        }
        return false;
      };

      if (checkInteractive(target)) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Initial setup of coordinates to prevent jumping
    const initCoords = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      ringRef.current.x = e.clientX;
      ringRef.current.y = e.clientY;
      trailRef.current.forEach((pt) => {
        pt.x = e.clientX;
        pt.y = e.clientY;
      });
      window.removeEventListener("mousemove", initCoords);
    };
    window.addEventListener("mousemove", initCoords);

    let animationFrameId: number;

    const tick = () => {
      const mouse = mouseRef.current;
      const ring = ringRef.current;
      const trail = trailRef.current;

      // Update dot position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }

      // Update ring position with lerp (lag)
      // 80ms lag corresponds to ~0.15 lerp factor at 60fps
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;

      if (ringRefEl.current) {
        ringRefEl.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      // Update spider silk trail points: physics-based follow
      trail[0].x += (mouse.x - trail[0].x) * 0.25;
      trail[0].y += (mouse.y - trail[0].y) * 0.25;

      for (let i = 1; i < trail.length; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.25;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.25;
      }

      // Update SVG lines directly
      if (svgRef.current) {
        const lines = svgRef.current.querySelectorAll("line");
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const pt1 = trail[i];
          const pt2 = trail[i + 1];
          if (pt1 && pt2 && line) {
            line.setAttribute("x1", pt1.x.toString());
            line.setAttribute("y1", pt1.y.toString());
            line.setAttribute("x2", pt2.x.toString());
            line.setAttribute("y2", pt2.y.toString());
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("desktop-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isMounted || isTouch) return null;

  return (
    <>
      {/* Spider Silk Trail SVG Overlay */}
      <svg id="spider-canvas" ref={svgRef} className="pointer-events-none fixed inset-0 z-50">
        {Array.from({ length: 11 }).map((_, index) => {
          // Opacity decreases along the length of the tail
          const opacity = (1 - index / 11) * 0.15;
          return (
            <line
              key={index}
              stroke="#1BC6A0"
              strokeWidth="0.8"
              strokeOpacity={opacity}
              strokeDasharray="2 1"
            />
          );
        })}
      </svg>

      {/* Custom Mouse Dot */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full bg-hb-teal transition-all duration-200 ease-out`}
        style={{
          width: isHovered ? "48px" : "8px",
          height: isHovered ? "48px" : "8px",
          backgroundColor: isHovered ? "#1BC6A0" : "#1BC6A0",
          opacity: isHovered ? 0.15 : 1,
        }}
      />

      {/* Custom Lagging Ring */}
      <div
        ref={ringRefEl}
        className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-hb-teal/40 transition-all duration-200 ease-out"
        style={{
          width: "32px",
          height: "32px",
          transform: "scale(1)",
          opacity: isHovered ? 0 : 1,
        }}
      />
    </>
  );
}
