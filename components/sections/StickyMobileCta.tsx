"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as m from "motion/react-m";
import { Briefcase, Cpu, Home, Layers, MessageCircle, Send } from "lucide-react";
import { WA_LINK } from "@/lib/constants";

const TABS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Layers },
  { label: "RAG AI", href: "/rag-ai", icon: Cpu },
  { label: "Work", href: "/work", icon: Briefcase },
] as const;

/**
 * Native mobile-app style 3D bottom navigation dock (mobile & tablet only).
 * Features spring-animated active tab indicator (`layoutId`) with top neon beam,
 * tactile press states, WhatsApp quick action, and a turquoise "Start" action pill.
 */
export function StickyMobileCta() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile app navigation"
      className="pb-safe fixed inset-x-0 bottom-0 z-40 px-2.5 pt-1 lg:hidden"
    >
      <div className="glass mx-auto flex max-w-md items-center justify-between gap-1 rounded-2xl border border-border-strong bg-surface/95 p-1.5 shadow-[0_-12px_44px_-6px_rgba(0,0,0,0.95),0_0_24px_rgba(29,242,226,0.16)] backdrop-blur-2xl">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active =
            t.href === "/" ? pathname === "/" : pathname === t.href || pathname.startsWith(`${t.href}/`);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[10.5px] font-medium transition-transform active:scale-90"
            >
              {active && (
                <m.span
                  layoutId="mobile-dock-pill"
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="bg-primary/15 border-border-strong absolute inset-0 rounded-xl border"
                >
                  <span className="bg-brand-gradient absolute inset-x-3 -top-px h-0.5 rounded-full shadow-[0_0_10px_#1DF2E2]" />
                </m.span>
              )}
              <Icon
                className={active ? "text-brand relative z-10 size-4 drop-shadow-[0_0_8px_rgba(29,242,226,0.6)]" : "text-muted-foreground relative z-10 size-4"}
                aria-hidden="true"
              />
              <span className={active ? "text-brand relative z-10 font-semibold" : "text-muted-foreground relative z-10"}>
                {t.label}
              </span>
            </Link>
          );
        })}

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="btn-secondary-brand grid size-10 shrink-0 place-items-center rounded-xl transition-transform active:scale-90"
        >
          <MessageCircle className="text-brand size-4" aria-hidden="true" />
        </a>

        <Link
          href="/contact"
          className="btn-primary-brand flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold transition-transform active:scale-95"
        >
          <span className="relative z-10 inline-flex items-center gap-1">
            <Send className="size-3.5" aria-hidden="true" />
            Start
          </span>
        </Link>
      </div>
    </nav>
  );
}
