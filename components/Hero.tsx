"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles, TrendingUp, MessageCircle } from "lucide-react";
import { WA_LINK } from "@/lib/constants";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const h1Words1 = "We don't run ads.".split(" ");
  const h1Words2 = "We build growth systems.".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: shouldReduceMotion ? 0 : delay,
      },
    }),
  };

  const rightVisualVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        delay: shouldReduceMotion ? 0 : 0.8,
      },
    },
  };

  const handleScrollToIndustries = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("industries");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-background px-6 py-12 md:px-8 overflow-hidden"
    >
      <div className="mx-auto grid max-w-7xl w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
        {/* Left Content Side */}
        <div className="flex flex-col space-y-8 lg:col-span-7">
          {/* Eyebrow Tag */}
          <motion.div
            custom={0.1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="self-start rounded-full border border-hb-teal/40 bg-hb-teal/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-hb-teal shadow-sm"
          >
            AI-Powered Revenue Infrastructure
          </motion.div>

          {/* Heading */}
          <h1 className="sr-only">We don't run ads. We build growth systems.</h1>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-hidden="true"
            className="text-display font-outfit font-bold tracking-tight text-foreground"
          >
            <span className="block mb-2">
              {h1Words1.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block text-hb-teal">
              {h1Words2.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            custom={0.5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-hero-sub text-muted-foreground max-w-2xl font-light"
          >
            AI content. Performance marketing. WhatsApp automation. For real
            estate, hospitality, and e-commerce across the{" "}
            <span className="text-foreground font-medium">
              Naroli–Silvassa–Vapi corridor
            </span>
            .
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            custom={0.7}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-hb-teal text-hb-black font-semibold hover:bg-hb-teal-deep hover:text-white transition-all duration-300 shadow-md shadow-hb-teal/10 inline-flex items-center justify-center rounded-xl"
              )}
            >
              Let's Build This <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#industries"
              onClick={handleScrollToIndustries}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-hb-silver/40 text-foreground hover:bg-muted font-medium inline-flex items-center justify-center rounded-xl group"
              )}
            >
              See Our Work{" "}
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
          </motion.div>

          {/* Social Proof Strip */}
          <motion.div
            custom={0.9}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="pt-6 border-t border-border/60 max-w-md"
          >
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase flex items-center space-x-3">
              <span>3 Focus Industries</span>
              <span className="h-1.5 w-1.5 rounded-full bg-hb-teal" />
              <span>AI-First Infrastructure</span>
              <span className="h-1.5 w-1.5 rounded-full bg-hb-teal" />
              <span>Based in Naroli, DNH</span>
            </p>
          </motion.div>
        </div>

        {/* Right System Diagram Visual Side */}
        <motion.div
          variants={rightVisualVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 relative w-full aspect-square max-w-[450px] mx-auto flex items-center justify-center rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-8 shadow-inner overflow-hidden"
        >
          {/* Static Cyber Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* SVG Animated Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Top Left -> Center */}
            <path
              d="M 110 110 L 225 225"
              stroke="#1BC6A0"
              strokeWidth="2"
              strokeOpacity="0.4"
              className="stroke-dasharray-[6,6]"
              style={{
                strokeDasharray: "6,6",
                animation: "hero-flow-line 1.5s linear infinite",
              }}
            />
            {/* Top Right -> Center */}
            <path
              d="M 340 110 L 225 225"
              stroke="#1BC6A0"
              strokeWidth="2"
              strokeOpacity="0.4"
              style={{
                strokeDasharray: "6,6",
                animation: "hero-flow-line 1.5s linear infinite reverse",
              }}
            />
            {/* Bottom -> Center */}
            <path
              d="M 225 340 L 225 225"
              stroke="#1BC6A0"
              strokeWidth="2"
              strokeOpacity="0.4"
              style={{
                strokeDasharray: "6,6",
                animation: "hero-flow-line 1.5s linear infinite",
              }}
            />
          </svg>

          {/* CSS animation inline definitions for the flow */}
          <style jsx global>{`
            @keyframes hero-flow-line {
              to {
                stroke-dashoffset: -24;
              }
            }
          `}</style>

          {/* Central Pulsing Hub */}
          <motion.div
            className="absolute z-20 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-hb-teal bg-background shadow-lg shadow-hb-teal/10 text-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 -m-1 animate-ping rounded-full border border-hb-teal/30 opacity-40" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-hb-teal">
              Core Hub
            </span>
            <span className="text-xs font-bold text-foreground mt-0.5">
              Growth System
            </span>
          </motion.div>

          {/* Node 1: AI Content */}
          <motion.div
            className="absolute top-[12%] left-[10%] z-10 flex items-center space-x-3 rounded-xl border border-border/80 bg-card p-3 shadow-md w-[165px]"
            animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hb-teal/10 text-hb-teal">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Pillar 01
              </p>
              <h3 className="text-xs font-bold text-foreground">AI Content</h3>
            </div>
          </motion.div>

          {/* Node 2: Performance Ads */}
          <motion.div
            className="absolute top-[12%] right-[10%] z-10 flex items-center space-x-3 rounded-xl border border-border/80 bg-card p-3 shadow-md w-[165px]"
            animate={shouldReduceMotion ? {} : { y: [0, -15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4.8,
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hb-teal/10 text-hb-teal">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Pillar 02
              </p>
              <h3 className="text-xs font-bold text-foreground">Full-Funnel Ads</h3>
            </div>
          </motion.div>

          {/* Node 3: WhatsApp Automation */}
          <motion.div
            className="absolute bottom-[12%] left-[50%] -translate-x-1/2 z-10 flex items-center space-x-3 rounded-xl border border-border/80 bg-card p-3 shadow-md w-[180px]"
            animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3.6,
              ease: "easeInOut",
              delay: 0.8,
            }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hb-teal/10 text-hb-teal">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Pillar 03
              </p>
              <h3 className="text-xs font-bold text-foreground">WA Automation</h3>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
