"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FLOW_STEPS = [
  {
    num: "01",
    title: "AI Content Engine",
    desc: "Hyper-realistic avatars and UGC renders generated automatically.",
  },
  {
    num: "02",
    title: "Launch Traffic",
    desc: "Meta and Google ads capture attention across the corridor.",
  },
  {
    num: "03",
    title: "WhatsApp Capture",
    desc: "Prospects click straight into a dedicated WhatsApp thread.",
  },
  {
    num: "04",
    title: "Instant Qualification",
    desc: "AiSensy bot qualifies buyer intent, budget, and location 24/7.",
  },
  {
    num: "05",
    title: "Sales Closure",
    desc: "Hot leads route to sales desks, cold leads receive follow-up drips.",
  },
];

export default function SystemFlow() {
  const { ref, isInView, getVariants } = useScrollReveal(true, "-80px");
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="system" className="w-full bg-background py-24 px-6 md:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-20">
          <span className="text-[11px] font-bold uppercase tracking-widest text-hb-teal">
            The Methodology
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            One System. Every Stage.
          </h2>
          <p className="text-muted-foreground max-w-xl text-sm md:text-base">
            From awareness to conversion, we build the bridges that turn clicks into revenue.
          </p>
        </div>

        {/* Steps Diagram wrapper */}
        <div className="relative min-h-[250px]" ref={ref}>
          {/* SVG Animated Connector Line - Desktop Horizontal */}
          <svg className="absolute top-12 left-[10%] w-[80%] h-1 pointer-events-none hidden md:block z-0">
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="#1BC6A0"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              style={{
                strokeDasharray: "6 4",
                animation: "horizontal-flow 1.2s linear infinite",
              }}
            />
          </svg>

          {/* SVG Animated Connector Line - Mobile Vertical */}
          <svg className="absolute left-[34px] top-6 w-1 h-[88%] pointer-events-none md:hidden z-0">
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="#1BC6A0"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              style={{
                strokeDasharray: "6 4",
                animation: "vertical-flow 1.2s linear infinite",
              }}
            />
          </svg>

          <style jsx global>{`
            @keyframes horizontal-flow {
              to {
                stroke-dashoffset: -20;
              }
            }
            @keyframes vertical-flow {
              to {
                stroke-dashoffset: -20;
              }
            }
          `}</style>

          {/* Steps list */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10"
          >
            {FLOW_STEPS.map((step, index) => (
              <motion.div
                key={index}
                variants={stepVariants}
                className="flex md:flex-col items-start md:items-center text-left md:text-center space-x-4 md:space-x-0 group"
              >
                {/* Number Badge */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-hb-teal/30 bg-card text-sm font-bold text-hb-teal shadow-sm transition-colors duration-300 group-hover:bg-hb-teal group-hover:text-hb-black group-hover:border-hb-teal md:mb-6">
                  {step.num}
                </div>

                {/* Text Context */}
                <div className="flex flex-col space-y-2">
                  <h3 className="text-base font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs font-light text-muted-foreground leading-relaxed max-w-[200px] md:mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Differentiator Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 text-center max-w-3xl mx-auto border border-hb-teal/15 dark:border-hb-teal/20 bg-hb-teal/[0.02] rounded-2xl p-8 shadow-sm"
        >
          <p className="text-base md:text-lg font-bold text-foreground tracking-tight leading-relaxed">
            "No other agency in the{" "}
            <span className="text-hb-teal font-extrabold">Naroli–DNH–Vapi corridor</span>{" "}
            combines all three pillars under one unified roof."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
