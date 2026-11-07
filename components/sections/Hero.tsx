"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import * as m from "motion/react-m";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { CtaLink, WhatsAppLink } from "@/components/CtaLinks";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { ServiceIcon } from "@/components/ServiceIcon";
import { HoloBadger3D } from "@/components/three/HoloBadger3D";
import { SERVICES } from "@/content/services";
import { SITE } from "@/lib/constants";

const HeroVisual = dynamic(() => import("./HeroVisual"), {
  ssr: false,
  loading: () => <div className="mx-auto h-[180px] w-full max-w-md lg:h-[500px] lg:max-w-xl" aria-hidden="true" />,
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
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* MOBILE 3D HOLOGRAPHIC BADGER CENTERPIECE (Visible immediately above the fold on mobile/tablet) */}
          <m.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="relative mb-2 flex flex-col items-center lg:hidden"
          >
            <div className="relative size-[168px] sm:size-[200px]">
              <div
                aria-hidden="true"
                className="bg-brand-gradient pointer-events-none absolute inset-4 rounded-full opacity-25 blur-2xl"
              />
              <HoloBadger3D />
            </div>
            <span className="border-primary/30 text-brand -mt-2 inline-flex items-center gap-1.5 rounded-full border bg-black/80 px-3 py-1 font-mono text-[10px] font-medium tracking-wider uppercase shadow-[0_0_20px_rgba(29,242,226,0.22)] backdrop-blur-md">
              <Sparkles className="size-3" /> 3D Neural Core · Touch to rotate
            </span>
          </m.div>

          {/* Desktop & Mobile Status Eyebrow Pill */}
          <m.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="glass mt-2 mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 sm:mb-6 lg:mt-0"
            style={{ borderRadius: "9999px" }}
          >
            <Image
              src="/brand/symbol.png"
              alt=""
              width={20}
              height={20}
              priority
              className=" hidden size-4.5 object-contain drop-shadow-[0_0_8px_rgba(29,242,226,0.6)] lg:block"
            />
            <span className="animate-turquoise-pulse bg-primary size-1.5 rounded-full lg:hidden" />
            <span className="text-eyebrow whitespace-nowrap text-[10.5px] tracking-[0.16em] sm:text-xs sm:tracking-[0.2em]">
              AI Development Studio · India
            </span>
          </m.div>

          <TextReveal
            as="h1"
            text={SITE.tagline}
            highlight={[2, 10]}
            className="font-display text-[1.95rem] leading-[1.08] font-semibold tracking-[-0.025em] sm:text-display"
          />
          <span id="hero-heading" className="sr-only">
            {SITE.tagline}
          </span>

          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-muted-foreground mt-3.5 max-w-md text-sm leading-relaxed sm:mt-6 sm:max-w-xl sm:text-lead"
          >
            Websites, web apps and mobile apps with AI at the core, plus the AEO, GEO, SEO and install campaigns that put
            them in front of customers.
          </m.p>

          {/* Primary & Secondary Action Buttons (Full-width clean app buttons on mobile, inline on sm+) */}
          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-5 flex w-full max-w-md flex-col gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center sm:gap-3 lg:justify-start"
          >
            <Magnetic className="w-full sm:w-auto">
              <CtaLink href="/contact" size="lg" className="h-12 w-full rounded-2xl text-sm font-semibold sm:w-auto">
                Start your project
              </CtaLink>
            </Magnetic>
            <WhatsAppLink size="lg" className="h-11 w-full rounded-2xl text-sm sm:h-12 sm:w-auto" />
          </m.div>

          {/* Mobile App Quick-Jump Service Chips */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="mt-5 w-full max-w-md lg:hidden"
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

      {/* Desktop Trust Strip (Hidden on mobile since Quick-Jump service chips already display above) */}
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
