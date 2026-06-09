"use client";

import React from "react";
import { MapPin, Mail, Phone, MessageSquare, Landmark } from "lucide-react";
import { WA_LINK } from "@/lib/constants";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import RevealSection from "./RevealSection";

export default function Location() {
  return (
    <section id="location" className="w-full bg-card/30 py-24 px-6 md:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-hb-teal">
            Our Headquarters
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Based in Naroli. Built for the Corridor.
          </h2>
          <p className="text-muted-foreground max-w-xl text-sm md:text-base">
            We are rooted in the heart of the Naroli–Silvassa–Vapi industrial belt.
          </p>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Address Details Card - Slides in from left */}
          <RevealSection
            direction="right"
            className="lg:col-span-5 space-y-8 rounded-2xl border border-border/80 bg-card p-8 md:p-10 shadow-sm"
          >
            <div className="space-y-2">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-hb-teal/10 text-hb-teal">
                <Landmark className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Honeybadger Digital
              </h3>
              <p className="text-sm font-light text-muted-foreground">
                Revenue Infrastructure Partner
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-border">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-hb-teal mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-foreground">Office Address</h4>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed mt-1">
                    Naroli, Dadra and Nagar Haveli — 396 230
                  </p>
                </div>
              </div>

              {/* Markets */}
              <div className="flex items-start space-x-4">
                <MessageSquare className="h-5 w-5 text-hb-teal mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-foreground">Serving Corridor</h4>
                  <p className="text-sm font-semibold text-hb-teal leading-relaxed mt-1">
                    DNH · Silvassa · Vapi · Daman · Surat
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full bg-hb-teal text-hb-black font-semibold hover:bg-hb-teal-deep hover:text-white transition-all duration-300 flex items-center justify-center py-2.5 rounded-lg"
                )}
              >
                Let's Talk Business
              </a>
            </div>
          </RevealSection>

          {/* Map Embed - Slides in from right */}
          <RevealSection
            direction="left"
            className="lg:col-span-7 relative w-full h-[350px] md:h-[430px] rounded-2xl border border-border shadow-sm overflow-hidden bg-card"
          >
            <iframe
              title="Honeybadger Digital Naroli Location Map"
              src="https://maps.google.com/maps?q=Naroli,+Dadra+and+Nagar+Haveli&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
