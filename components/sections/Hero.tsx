"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { CtaLink, WhatsAppLink } from "@/components/CtaLinks";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { ServiceIcon } from "@/components/ServiceIcon";
import { HoloBadger3D } from "@/components/three/HoloBadger3D";
import { SERVICES } from "@/content/services";
import { SITE } from "@/lib/constants";

const HeroVisual = dynamic(() => import("./HeroVisual"), {
  ssr: false,
  loading: () => <div className="mx-auto h-[180px] w-full max-w-sm lg:h-[500px] lg:max-w-xl" aria-hidden="true" />,
});

const TRUST = ["Websites", "Web Apps", "Mobile Apps", "AI Automation", "RAG", "AEO/GEO"];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="noise relative isolate overflow-hidden pt-20 pb-10 sm:pt-32 sm:pb-16">
      {/* Radial turquoise glow + 4% white grid + 3D perspective horizon floor */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-hero-glow absolute inset-0" />
        <div className="bg-grid absolute inset-0" />
        <div className="bg-perspective-grid-3d pointer-events-none absolute inset-x-0 bottom-0 h-[55%] opacity-70" />
        <div className="mesh-blob -top-24 left-[8%] h-[420px] w-[420px]" style={{ background: "var(--glow-a)" }} />
        <div className="mesh-blob top-10 right-[4%] h-[460px] w-[460px]" style={{ background: "var(--glow-b)", animationDelay: "-6s" }} />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-7 px-4 sm:gap-10 sm:px-5 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex w-full min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
          {/* MOBILE 3D HOLOGRAPHIC BADGER CENTERPIECE (<lg only) */}
          <m.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="relative mb-3 flex flex-col items-center lg:hidden"
          >
            <div className="relative size-[148px]">
              <div
                aria-hidden="true"
                className="bg-brand-gradient pointer-events-none absolute inset-3 rounded-full opacity-25 blur-2xl"
              />
              <HoloBadger3D />
            </div>
            {/* Single unified, sleek pill badge right below the 3D core (no duplicate stacked pills) */}
            <span className="glass border-border-strong text-brand -mt-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-semibold tracking-wider uppercase shadow-[0_0_16px_rgba(29,242,226,0.22)] backdrop-blur-md">
              <span className="animate-turquoise-pulse bg-primary size-1.5 rounded-full" />
              3D Neural Core · Touch to rotate
            </span>
          </m.div>

          {/* DESKTOP STATUS EYEBROW PILL (>=lg only) */}
          <m.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="glass mb-6 hidden items-center gap-2.5 px-3.5 py-1.5 lg:inline-flex rounded-full"
          >
            <Image
              src="/brand/symbol.png"
              alt=""
              width={20}
              height={20}
              priority
              className="size-4.5 object-contain drop-shadow-[0_0_8px_rgba(29,242,226,0.6)]"
            />
            <span className="text-eyebrow text-xs tracking-[0.2em]">
              AI Development Studio · Naroli, DNH
            </span>
          </m.div>

          {/* HEADLINE: Responsive, fluid font sizing with zero cut-off words on mobile */}
          <TextReveal
            as="h1"
            text={SITE.tagline}
            highlight={[2, 10]}
            className="font-display w-full min-w-0 max-w-full px-1 text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.02em] sm:text-[2.25rem] lg:text-display"
          />
          <span id="hero-heading" className="sr-only">
            {SITE.tagline}
          </span>

          {/* SUBHEADING: Constrained to screen boundaries on mobile, fluid on desktop */}
          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="w-full min-w-0 max-w-md mx-auto text-muted-foreground mt-3 text-xs sm:text-sm leading-relaxed px-1 text-center lg:text-left lg:mx-0 lg:max-w-xl lg:text-lead"
          >
            Websites, web apps and mobile apps with AI at the core, plus the AEO, GEO, SEO and install campaigns that put
            them in front of customers.
          </m.p>

          {/* CTA ACTION BUTTONS: Centered thumb-friendly touch targets on mobile, inline on desktop */}
          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-5 flex w-full min-w-0 max-w-xs flex-col gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center sm:gap-3 lg:justify-start"
          >
            <Magnetic className="w-full sm:w-auto">
              <CtaLink href="/contact" size="lg" className="h-11.5 w-full rounded-2xl text-xs sm:text-sm font-semibold shadow-[0_0_24px_rgba(29,242,226,0.35)] sm:w-auto sm:h-12">
                Start your project
              </CtaLink>
            </Magnetic>
            <WhatsAppLink size="lg" className="h-11 w-full rounded-2xl text-xs sm:text-sm sm:h-12 sm:w-auto" />
          </m.div>

          {/* MOBILE QUICK-JUMP SERVICE CHIPS */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="mt-5 w-full min-w-0 max-w-full lg:hidden"
          >
            <div className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 py-1">
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="glass flex shrink-0 snap-start items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium transition-transform active:scale-95"
                >
                  <ServiceIcon name={s.icon} className="text-brand size-3.5" />
                  <span>{s.shortTitle}</span>
                  <ArrowUpRight className="text-muted-foreground size-3" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </m.div>
        </div>

        <HeroVisual />
      </div>

      {/* Desktop Trust Strip (Hidden on mobile since Quick-Jump service chips display above) */}
      <div className="mx-auto mt-10 hidden max-w-6xl px-4 sm:mt-14 sm:block sm:px-5">
        <ul className="border-border text-muted-foreground flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-y py-3.5 font-mono text-[11px] font-medium tracking-wider uppercase sm:py-4 sm:text-sm">
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
