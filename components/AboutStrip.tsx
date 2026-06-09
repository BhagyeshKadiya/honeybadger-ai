"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutStrip() {
  const { ref, isInView, getVariants } = useScrollReveal(true, "-40px");
  const shouldReduceMotion = useReducedMotion();

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2 },
    },
  };

  return (
    <section id="about" className="w-full bg-card py-16 px-6 md:px-8 border-y border-border/40">
      <div className="mx-auto max-w-7xl relative" ref={ref}>
        {/* Horizontal Drawing Line at top of strip */}
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute -top-6 left-0 h-[1.5px] w-full bg-hb-teal origin-left"
        />

        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center space-y-4"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-hb-teal">
            Our Strategy
          </span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight text-foreground max-w-4xl leading-relaxed">
            Not a general agency. We work only in{" "}
            <span className="font-semibold text-foreground underline decoration-hb-teal decoration-2 underline-offset-4">
              Real Estate
            </span>
            ,{" "}
            <span className="font-semibold text-foreground underline decoration-hb-teal decoration-2 underline-offset-4">
              Hospitality
            </span>
            , and{" "}
            <span className="font-semibold text-foreground underline decoration-hb-teal decoration-2 underline-offset-4">
              E-Commerce
            </span>{" "}
            — with one integrated system across all three.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
