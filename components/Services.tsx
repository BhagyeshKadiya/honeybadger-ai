"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clapperboard, TrendingUp, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SERVICES_DATA = [
  {
    icon: Clapperboard,
    title: "AI Content Factory",
    body: "AI avatar reels, interior renders, UGC-style videos, trend reels — without shoots, without delays.",
    tag: "Reels · Renders · UGC",
  },
  {
    icon: TrendingUp,
    title: "Full-Funnel Ads",
    body: "Meta Pixel, CAPI, GA4, Google Ads — installed before a single rupee is spent. Awareness to conversion.",
    tag: "Meta · Google · YouTube",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    body: "AiSensy flows that qualify, follow up, retarget, and retain — running 24/7 without your sales team.",
    tag: "AiSensy · n8n · Auto",
  },
];

export default function Services() {
  const { ref, isInView, getVariants } = useScrollReveal(true, "-80px");
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="services" className="w-full bg-background py-24 px-6 md:px-8">
      <div className="mx-auto max-w-7xl" ref={ref}>
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-hb-teal">
            Core Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            The Three Pillars
          </h2>
          <p className="text-muted-foreground max-w-xl text-sm md:text-base">
            We deploy a single unified marketing framework to build qualified pipelines for your sales desk.
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SERVICES_DATA.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative flex flex-col justify-between rounded-2xl border bg-card p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-hb-teal border-hb-teal/10 dark:border-hb-teal/20"
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-hb-teal/10 text-hb-teal mb-6">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {service.title}
                  </h3>

                  {/* Body */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                    {service.body}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="inline-block self-start rounded-md bg-hb-teal/5 dark:bg-hb-teal/10 px-3 py-1 text-xs font-semibold tracking-wider text-hb-teal">
                  {service.tag}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
