"use client";

import dynamic from "next/dynamic";
import * as m from "motion/react-m";
import { CtaLink, WhatsAppLink } from "@/components/CtaLinks";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { BadgerMark } from "@/components/brand/BadgerMark";
import { SITE } from "@/lib/constants";

const HeroVisual = dynamic(() => import("./HeroVisual"), {
  ssr: false,
  loading: () => <div className="mx-auto h-[420px] w-full max-w-xl sm:h-[460px]" aria-hidden="true" />,
});

const TRUST = ["Websites", "Web Apps", "Mobile Apps", "AI Automation", "RAG", "AEO/GEO"];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="noise relative isolate overflow-hidden pt-32 pb-16 sm:pt-40">
      {/* Radial turquoise glow + 4% white grid */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-hero-glow absolute inset-0" />
        <div className="bg-grid absolute inset-0" />
        <div className="mesh-blob -top-24 left-[8%] h-[420px] w-[420px]" style={{ background: "var(--glow-a)" }} />
        <div className="mesh-blob top-10 right-[4%] h-[460px] w-[460px]" style={{ background: "var(--glow-b)", animationDelay: "-6s" }} />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass mb-6 inline-flex items-center gap-2.5 px-4 py-1.5"
            style={{ borderRadius: "9999px" }}
          >
            <BadgerMark size={20} title="Honeybadger mark" />
            <span className="text-eyebrow">AI development company · Naroli, DNH</span>
          </m.div>

          <TextReveal
            as="h1"
            text={SITE.tagline}
            highlight={[2, 10]}
            className="text-display"
          />
          <span id="hero-heading" className="sr-only">
            {SITE.tagline}
          </span>

          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lead text-muted-foreground mt-6 max-w-xl"
          >
            Websites, web apps and mobile apps with AI at the core, plus the AEO, GEO, SEO and install campaigns that put
            them in front of customers. Relentless, like the badger.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic>
              <CtaLink href="/contact" size="lg">
                Start your project
              </CtaLink>
            </Magnetic>
            <WhatsAppLink size="lg" />
          </m.div>
        </div>

        <HeroVisual />
      </div>

      {/* Trust strip */}
      <div className="mx-auto mt-14 max-w-6xl px-5">
        <ul className="border-border text-muted-foreground flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-y py-4 font-mono text-xs font-medium tracking-wider uppercase sm:text-sm">
          {TRUST.map((t, i) => (
            <li key={t} className="flex items-center gap-3">
              {t}
              {i < TRUST.length - 1 && (
                <span aria-hidden="true" className="text-brand">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
