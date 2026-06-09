"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { WA_LINK } from "@/lib/constants";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import RevealSection from "./RevealSection";

export default function CtaBanner() {
  return (
    <section
      id="contact-cta"
      className="relative w-full py-32 px-6 md:px-8 bg-black border-t border-zinc-900 text-center overflow-hidden z-10"
    >
      {/* Restrained Teal Radial Glow behind the headline */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(27, 198, 160, 0.08) 0%, rgba(0, 0, 0, 0) 65%)",
        }}
      />

      {/* Cyber Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-4xl z-10">
        <RevealSection className="flex flex-col items-center space-y-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-hb-teal bg-hb-teal/10 px-4 py-1.5 rounded-full border border-hb-teal/20">
            Let's Collaborate
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-outfit tracking-tight text-white max-w-3xl leading-tight">
            Ready to stop running ads <br />
            and start running a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hb-teal to-hb-teal-deep">
              system?
            </span>
          </h2>

          <p className="text-zinc-400 max-w-xl text-sm md:text-base font-light leading-relaxed">
            One conversation. We'll show you exactly what we'd build for your hospitality, real estate, or e-commerce business.
          </p>

          <div className="pt-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-hb-teal text-hb-black font-semibold hover:bg-hb-teal-deep hover:text-white transition-all duration-300 px-8 py-6 text-base shadow-lg shadow-hb-teal/10 inline-flex items-center justify-center rounded-xl"
              )}
            >
              Start on WhatsApp <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
