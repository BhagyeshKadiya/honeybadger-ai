"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as m from "motion/react-m";
import { Briefcase, Cpu, Home, Layers, Send } from "lucide-react";

const TABS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Layers },
  { label: "RAG AI", href: "/rag-ai", icon: Cpu },
  { label: "Work", href: "/work", icon: Briefcase },
] as const;

/**
 * Native mobile-app style bottom navigation dock (mobile & tablet only).
 * Features spring-animated active tab indicator (`layoutId`), tactile press
 * states, and a prominent turquoise "Start" action pill.
 */
export function StickyMobileCta() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile app navigation"
      className="pb-safe fixed inset-x-0 bottom-0 z-40 px-2.5 pt-1 lg:hidden"
    >
      <div className="glass mx-auto flex max-w-md items-center justify-between gap-1 rounded-2xl border border-border-strong bg-surface/95 p-1.5 shadow-[0_-10px_40px_-8px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active =
            t.href === "/" ? pathname === "/" : pathname === t.href || pathname.startsWith(`${t.href}/`);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[11px] font-medium transition-transform active:scale-90"
            >
              {active && (
                <m.span
                  layoutId="mobile-dock-pill"
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="bg-primary/15 border-border-strong absolute inset-0 rounded-xl border"
                />
              )}
              <Icon
                className={active ? "text-brand relative z-10 size-4" : "text-muted-foreground relative z-10 size-4"}
                aria-hidden="true"
              />
              <span className={active ? "text-brand relative z-10 font-semibold" : "text-muted-foreground relative z-10"}>
                {t.label}
              </span>
            </Link>
          );
        })}

        <Link
          href="/contact"
          className="btn-primary-brand ml-1 flex h-11 shrink-0 items-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-transform active:scale-95"
        >
          <span className="relative z-10 inline-flex items-center gap-1.5">
            <Send className="size-3.5" aria-hidden="true" />
            Start
          </span>
        </Link>
      </div>
    </nav>
  );
}
