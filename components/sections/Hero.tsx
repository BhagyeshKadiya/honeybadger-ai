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
import { SERVICES } from "@/content/services";
import { SITE } from "@/lib/constants";

const HeroVisual = dynamic(() => import("./HeroVisual"), {
  ssr: false,
  loading: () => <div className="mx-auto h-[340px] w-full max-w-xl sm:h-[460px]" aria-hidden="true" />,
});

const TRUST = ["Websites", "Web Apps", "Mobile Apps", "AI Automation", "RAG", "AEO/GEO"];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="noise relative isolate overflow-hidden pt-24 pb-12 sm:pt-36 sm:pb-16">
      {/* Radial turquoise glow + 4% white grid + 3D perspective horizon floor */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-hero-glow absolute inset-0" />
        <div className="bg-grid absolute inset-0" />
        <div className="bg-perspective-grid-3d pointer-events-none absolute inset-x-0 bottom-0 h-[55%] opacity-70" />
        <div className="mesh-blob -top-24 left-[8%] h-[420px] w-[420px]" style={{ background: "var(--glow-a)" }} />
        <div className="mesh-blob top-10 right-[4%] h-[460px] w-[460px]" style={{ background: "var(--glow-b)", animationDelay: "-6s" }} />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-5 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <m.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="glass mb-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:mb-6"
            style={{ borderRadius: "9999px" }}
          >
            <Image
              src="/brand/symbol.png"
              alt=""
              width={22}
              height={22}
              priority
              className="size-5 object-contain drop-shadow-[0_0_8px_rgba(29,242,226,0.6)]"
            />
            <span className="text-eyebrow text-[11px] sm:text-xs">AI development company · Naroli, DNH</span>
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
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-lead text-muted-foreground mt-4 max-w-xl sm:mt-6"
          >
            Websites, web apps and mobile apps with AI at the core, plus the AEO, GEO, SEO and install campaigns that put
            them in front of customers. Relentless, like the badger.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:flex sm:flex-row sm:gap-3"
          >
            <Magnetic className="w-full sm:w-auto">
              <CtaLink href="/contact" size="lg" className="w-full sm:w-auto">
                Start your project
              </CtaLink>
            </Magnetic>
            <WhatsAppLink size="lg" className="w-full sm:w-auto" />
          </m.div>

          {/* Mobile App Quick-Launch Service Pills (horizontal swipe on mobile) */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="mt-6 lg:hidden"
          >
            <p className="text-muted-foreground mb-2 font-mono text-[11px] uppercase tracking-wider">
              Quick jump →
            </p>
            <div className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1">
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

      {/* Trust strip */}
      <div className="mx-auto mt-10 max-w-6xl px-4 sm:mt-14 sm:px-5">
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
