"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Normalized 2D vertices of the uploaded Honeybadger symbol (centered around 0,0 in [-1, 1]),
 * which we extrude into a 3D mesh with front face (z = +depth), back face (z = -depth),
 * and 3D connecting ribs, plus orbiting 3D neural particles and gyroscopic rings.
 */
const LEFT_BOLT_2D: [number, number][] = [
  [-0.66, -0.81],
  [-0.56, -0.3],
  [-0.5, -0.38],
  [-0.56, -0.68],
  [-0.29, -0.48],
  [-0.49, -0.1],
  [-0.34, 0.06],
  [-0.11, 0.53],
  [-0.08, 0.53],
  [-0.19, 0.0],
  [-0.26, -0.1],
  [-0.09, -0.44],
];

const RIGHT_BOLT_2D: [number, number][] = LEFT_BOLT_2D.map(([x, y]) => [-x, y]);

const JAW_2D: [number, number][] = [
  [-0.64, -0.25],
  [-0.84, 0.0],
  [-0.5, 0.23],
  [-0.2, 0.7],
  [-0.14, 0.78],
  [0.14, 0.78],
  [0.2, 0.7],
  [0.5, 0.23],
  [0.84, 0.0],
  [0.64, -0.25],
  [0.56, -0.18],
  [0.66, -0.04],
  [0.41, 0.14],
  [0.16, 0.63],
  [0.09, 0.63],
  [0.06, 0.59],
  [-0.06, 0.59],
  [-0.09, 0.63],
  [-0.16, 0.63],
  [-0.41, 0.14],
  [-0.66, -0.04],
  [-0.56, -0.18],
];

const POLYGONS = [LEFT_BOLT_2D, RIGHT_BOLT_2D, JAW_2D];

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function rotate3D(p: Vec3, rx: number, ry: number, rz: number): Vec3 {
  // Rotate around Y
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;

  // Rotate around X
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y2 = p.y * cosX - z1 * sinX;
  const z2 = p.y * sinX + z1 * cosX;

  // Rotate around Z
  const cosZ = Math.cos(rz);
  const sinZ = Math.sin(rz);
  const x3 = x1 * cosZ - y2 * sinZ;
  const y3 = x1 * sinZ + y2 * cosZ;

  return { x: x3, y: y3, z: z2 };
}

/**
 * Real-time 60fps 3D WebGL-style projection canvas of the extruded Honeybadger symbol
 * with orbital 3D rings and neural particles. Interactive with mouse/touch drag & hover.
 */
export function HoloBadger3D({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 320;
      height = rect.height || 320;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // 3D orbital particles
    const particles: Vec3[] = Array.from({ length: 42 }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / 42);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.18 + (i % 3) * 0.14;
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      };
    });

    let targetRx = -0.18;
    let targetRy = 0.35;
    let curRx = targetRx;
    let curRy = targetRy;
    let autoAngle = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRy = nx * 1.35;
      targetRx = -ny * 0.95;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const depth = 0.16;
    const fov = 3.2;

    const project = (v: Vec3) => {
      const scale = (Math.min(width, height) * 0.44 * fov) / (fov + v.z + 1.5);
      return {
        x: width / 2 + v.x * scale,
        y: height / 2 + v.y * scale,
        z: v.z,
        scale,
      };
    };

    const render = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      if (!reduce) {
        autoAngle += 0.012;
      }
      const desiredRy = targetRy + Math.sin(autoAngle) * 0.42;
      const desiredRx = targetRx + Math.cos(autoAngle * 0.7) * 0.14;
      curRx += (desiredRx - curRx) * 0.08;
      curRy += (desiredRy - curRy) * 0.08;
      const rz = Math.sin(autoAngle * 0.5) * 0.05;

      // 1. Center ambient 3D core glow
      const cx = width / 2;
      const cy = height / 2;
      const rad = Math.min(width, height) * 0.46;
      const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, rad);
      grad.addColorStop(0, "rgba(29, 242, 226, 0.22)");
      grad.addColorStop(0.55, "rgba(15, 184, 170, 0.07)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Gyroscopic Orbital Rings
      for (let ring = 0; ring < 2; ring++) {
        ctx.beginPath();
        const steps = 64;
        const rRadius = ring === 0 ? 1.12 : 1.28;
        for (let s = 0; s <= steps; s++) {
          const a = (s / steps) * Math.PI * 2;
          const raw: Vec3 =
            ring === 0
              ? { x: Math.cos(a) * rRadius, y: Math.sin(a) * 0.28, z: Math.sin(a) * rRadius }
              : { x: Math.cos(a) * rRadius, y: Math.sin(a) * rRadius, z: Math.cos(a) * 0.35 };
          const rot = rotate3D(raw, curRx + ring * 0.4, curRy - autoAngle * (ring === 0 ? 0.6 : -0.4), rz);
          const p = project(rot);
          if (s === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = ring === 0 ? "rgba(29, 242, 226, 0.22)" : "rgba(15, 184, 170, 0.14)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. Extruded 3D Badger Mesh (Back face -> 3D connecting struts -> Front face)
      for (const poly of POLYGONS) {
        const frontPts = poly.map(([x, y]) => project(rotate3D({ x, y, z: -depth }, curRx, curRy, rz)));
        const backPts = poly.map(([x, y]) => project(rotate3D({ x, y, z: depth }, curRx, curRy, rz)));

        // Back face fill & wireframe
        ctx.beginPath();
        backPts.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.closePath();
        ctx.fillStyle = "rgba(15, 184, 170, 0.10)";
        ctx.fill();
        ctx.strokeStyle = "rgba(15, 184, 170, 0.42)";
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // 3D depth struts connecting front & back vertices
        ctx.beginPath();
        for (let i = 0; i < frontPts.length; i++) {
          ctx.moveTo(frontPts[i].x, frontPts[i].y);
          ctx.lineTo(backPts[i].x, backPts[i].y);
        }
        ctx.strokeStyle = "rgba(29, 242, 226, 0.32)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Front face translucent holographic fill + neon turquoise edge
        ctx.beginPath();
        frontPts.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.closePath();
        const faceGrad = ctx.createLinearGradient(cx - 80, cy - 80, cx + 80, cy + 80);
        faceGrad.addColorStop(0, "rgba(29, 242, 226, 0.38)");
        faceGrad.addColorStop(1, "rgba(15, 184, 170, 0.18)");
        ctx.fillStyle = faceGrad;
        ctx.fill();
        ctx.shadowColor = "rgba(29, 242, 226, 0.65)";
        ctx.shadowBlur = 12;
        ctx.strokeStyle = "#1DF2E2";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Glowing vertex nodes on front face
        ctx.fillStyle = "#5CF7EC";
        for (const p of frontPts) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Orbiting 3D Neural Field Particles
      for (let i = 0; i < particles.length; i++) {
        const rot = rotate3D(particles[i], curRx * 0.7, curRy + autoAngle * 0.45, rz);
        const p = project(rot);
        const alpha = Math.max(0.15, Math.min(0.85, (1.5 - rot.z) * 0.45));
        ctx.fillStyle = `rgba(29, 242, 226, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rot.z < 0 ? 2.1 : 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) {
        raf = requestAnimationFrame(render);
      }
    };

    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Interactive 3D holographic Honeybadger symbol"
      className={cn("h-full w-full cursor-grab active:cursor-grabbing", className)}
    />
  );
}
