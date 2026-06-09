"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, MapPin } from "lucide-react";
import RevealSection from "./RevealSection";

const INDUSTRIES_DATA = [
  {
    id: "real-estate",
    label: "Real Estate",
    problem:
      "Leads come in, get a call, and disappear. No follow-up, no retargeting, broken attribution.",
    solutions: [
      "AI content engine producing custom avatar reels, high-fidelity interior renders, and UGC walkthroughs.",
      "3-stage Meta ad funnel: Awareness targeting corridor industrial/GIDC workers, warm lead retargeting, and click-to-WhatsApp conversion.",
      "AiSensy conversational bot qualifying buyers instantly on property type, preferred location, budget, and purchasing timeline.",
      "Automated 7-day and 25-day retention drips and broadcasting sequences.",
    ],
    market: "Naroli · Dadra Nagar Haveli · Silvassa · Vapi corridor",
  },
  {
    id: "hospitality",
    label: "Hospitality",
    problem:
      "OTA platforms take 15–25% commission. The guest relationship belongs to booking aggregators, not your hotel.",
    solutions: [
      "Direct booking campaign funnels targeting weekend travelers in Surat, Mumbai, and Vadodara.",
      "QR-code-based check-in guest database capture directly into your CRM database.",
      "AiSensy automated post-checkout flows: Thank you drips, direct booking cashbacks, and room upsell options.",
      "Targeted seasonal broadcast campaigns sent directly to past guests to drive recurring occupancy.",
    ],
    market: "Daman · Silvassa · Dadra Nagar Haveli",
  },
  {
    id: "e-commerce",
    label: "E-Commerce",
    problem:
      "Expensive studio shoots, broken conversion tracking, high cart abandonment, and COD return rates eating your product margins.",
    solutions: [
      "AI product shoot rendering replacing slow, high-cost studio photography setups.",
      "Full Shopify integration with Meta Pixel CAPI events configured correctly.",
      "Instant WhatsApp abandoned cart recovery flows triggered automatically.",
      "COD confirmation message prompts reducing Return to Origin (RTO) rates.",
      "Post-delivery review requests and customer retention flows for repeat orders.",
    ],
    market: "Vapi · Silvassa · D2C brands across western India",
  },
];

export default function Industries() {
  const [activeTab, setActiveTab] = useState("real-estate");
  const activeData = INDUSTRIES_DATA.find((ind) => ind.id === activeTab)!;

  return (
    <section id="industries" className="w-full bg-card/50 py-24 px-6 md:px-8 border-y border-border/40">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-hb-teal">
            Market Integration
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Built for Three Industries
          </h2>
          <p className="text-muted-foreground max-w-xl text-sm md:text-base">
            No generic strategies. We deploy verticalized infrastructure tailored for high-growth sectors.
          </p>
        </div>

        {/* Tab Controllers */}
        <RevealSection className="flex justify-center mb-12" delay={0.1}>
          <div className="inline-flex rounded-xl bg-background p-1.5 border border-border/80 shadow-inner">
            {INDUSTRIES_DATA.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative rounded-lg px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {/* Sliding Teal Underline indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-hb-teal/10 dark:bg-hb-teal/15 border-b-2 border-hb-teal rounded-lg"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </RevealSection>

        {/* Tab Content Display Container */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Problem Column (Left) */}
              <div className="lg:col-span-5 rounded-2xl border border-red-500/10 dark:border-red-500/20 bg-red-500/[0.02] p-8 shadow-sm flex flex-col justify-between h-full min-h-[300px]">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 text-red-500 dark:text-red-400">
                    <AlertCircle className="h-6 w-6 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      The Problem
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground leading-relaxed">
                    "{activeData.problem}"
                  </h3>
                </div>

                <div className="mt-8 pt-6 border-t border-red-500/10 flex items-center text-muted-foreground text-xs font-medium space-x-2">
                  <MapPin className="h-4 w-4 text-red-500/50 shrink-0" />
                  <span>Target market: {activeData.market}</span>
                </div>
              </div>

              {/* Solution Column (Right) */}
              <div className="lg:col-span-7 rounded-2xl border border-hb-teal/15 dark:border-hb-teal/20 bg-hb-teal/[0.02] p-8 shadow-sm flex flex-col justify-between h-full min-h-[300px]">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 text-hb-teal">
                    <CheckCircle2 className="h-6 w-6 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      What We Build
                    </span>
                  </div>
                  
                  <ul className="space-y-4">
                    {activeData.solutions.map((sol, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hb-teal" />
                        <span className="text-sm font-light text-muted-foreground leading-relaxed">
                          {sol}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-hb-teal/15 flex items-center text-xs font-medium text-hb-teal/80">
                  Ready to deploy for businesses in the corridor.
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
