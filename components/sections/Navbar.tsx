"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as m from "motion/react-m";
import { useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, MessageCircle, Sparkles } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CtaLink, WhatsAppLink } from "@/components/CtaLinks";
import { ServiceIcon } from "@/components/ServiceIcon";
import { SERVICES } from "@/content/services";
import { NAV_LINKS, SITE, WA_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 140);
    setScrolled(latest > 12);
  });

  return (
    <m.header
      animate={{ y: hidden ? "-115%" : "0%" }}
      transition={{ type: "spring", stiffness: 140, damping: 22 }}
      className="fixed inset-x-0 top-0 z-50 px-2.5 pt-2 sm:px-5 sm:pt-3"
    >
      <div
        className={cn(
          "glass mx-auto flex h-13.5 max-w-6xl items-center justify-between gap-2 px-3 transition-shadow duration-300 sm:h-14 sm:gap-3 sm:px-5",
          scrolled && "shadow-[0_12px_40px_-10px_rgba(0,0,0,0.9)] border-border-strong",
        )}
      >
        {/* Brand lockup: uploaded symbol + geometric wordmark */}
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5"
        >
          <span className="relative flex size-8.5 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-surface-2/90 p-1 shadow-[0_0_18px_rgba(29,242,226,0.25)] transition-transform duration-200 group-hover:scale-105 group-active:scale-95 sm:size-9">
            <Image
              src="/brand/symbol.png"
              alt={`${SITE.name} symbol`}
              width={64}
              height={64}
              priority
              className="size-6.5 object-contain drop-shadow-[0_0_10px_rgba(29,242,226,0.55)] sm:size-7"
            />
            <span className="animate-turquoise-pulse bg-primary ring-background absolute -top-0.5 -right-0.5 size-2 rounded-full ring-2" />
          </span>
          <span className="wordmark-text whitespace-nowrap text-[11.5px] font-semibold tracking-[0.14em] sm:text-sm sm:tracking-[0.22em]">
            HONEYB<span className="text-brand">&#923;</span>DGER.<span className="text-brand">&#923;</span>I
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[640px] grid-cols-2 gap-1 p-2">
                    {SERVICES.map((s) => (
                      <li key={s.slug}>
                        <NavigationMenuLink render={<Link href={`/services/${s.slug}`} />} className="items-start gap-3 p-3">
                          <span className="text-brand mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-2">
                            <ServiceIcon name={s.icon} className="size-4" />
                          </span>
                          <span className="flex flex-col">
                            <span className="font-display font-medium">{s.title}</span>
                            <span className="text-muted-foreground text-xs leading-snug">{s.valueProp}</span>
                          </span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="col-span-2">
                      <NavigationMenuLink
                        render={<Link href="/rag-ai" />}
                        className="justify-between border border-dashed border-border-strong p-3"
                      >
                        <span className="font-display font-medium">Flagship: RAG &amp; private-knowledge AI</span>
                        <span className="text-brand font-mono text-xs">Explore →</span>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {NAV_LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                onFocus={() => setHovered(l.href)}
                className={cn(
                  "link-draw relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  active ? "text-brand" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {hovered === l.href && (
                  <m.span
                    layoutId="nav-pill"
                    className="bg-surface-2 absolute inset-0 -z-10 rounded-lg"
                    transition={{ type: "spring", stiffness: 140, damping: 20 }}
                  />
                )}
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <ThemeToggle />
          {/* Quick WhatsApp icon button on mobile header */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="btn-secondary-brand grid size-8.5 place-items-center rounded-lg transition-transform active:scale-90 md:hidden"
          >
            <MessageCircle className="text-brand size-4" aria-hidden="true" />
          </a>
          <WhatsAppLink className="hidden md:inline-flex">Talk to us</WhatsAppLink>
          <CtaLink href="/contact" className="hidden xl:inline-flex">
            Start your project
          </CtaLink>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" className="size-8.5 lg:hidden" />}>
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[92%] max-w-sm overflow-y-auto border-l border-border-strong bg-background/95 p-4 backdrop-blur-2xl">
              <div className="flex items-center gap-2.5 border-b border-border pb-3.5">
                <span className="flex size-8 items-center justify-center rounded-lg border border-border-strong bg-surface-2 p-1">
                  <Image src="/brand/symbol.png" alt="" width={40} height={40} className="size-6 object-contain" />
                </span>
                <SheetTitle className="wordmark-text text-xs font-semibold">
                  HONEYB<span className="text-brand">&#923;</span>DGER.<span className="text-brand">&#923;</span>I
                </SheetTitle>
              </div>
              <SheetDescription className="sr-only">Mobile app command menu</SheetDescription>

              <nav aria-label="Mobile" className="mt-3 flex flex-col gap-3">
                {/* Flagship 3D RAG Spotlight Banner */}
                <SheetClose
                  render={<Link href="/rag-ai" />}
                  className="glass border-border-strong flex items-center justify-between gap-3 rounded-2xl border p-3.5 transition-transform active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-brand-gradient text-ink grid size-9 shrink-0 place-items-center rounded-xl shadow-[0_0_16px_rgba(29,242,226,0.4)]">
                      <Sparkles className="size-4" />
                    </span>
                    <div>
                      <p className="font-display text-xs font-semibold text-foreground">Flagship: Private RAG AI</p>
                      <p className="text-muted-foreground font-mono text-[11px]">Answers from your docs + citations</p>
                    </div>
                  </div>
                  <ArrowUpRight className="text-brand size-4 shrink-0" />
                </SheetClose>

                {/* 2-Column App Bento Grid for all 7 Services */}
                <div>
                  <p className="text-eyebrow mb-2 px-1 text-[11px]">Capabilities (7)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES.map((s) => (
                      <SheetClose
                        key={s.slug}
                        render={<Link href={`/services/${s.slug}`} />}
                        className="glass flex flex-col justify-between gap-2 rounded-xl p-2.5 transition-transform active:scale-95"
                      >
                        <span className="border-border-strong bg-surface-2 text-brand grid size-7 place-items-center rounded-lg border">
                          <ServiceIcon name={s.icon} className="size-3.5" />
                        </span>
                        <span className="font-display line-clamp-2 text-xs font-medium leading-tight">{s.shortTitle}</span>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                {/* Quick Company Links Grid */}
                <div>
                  <p className="text-eyebrow mb-2 px-1 text-[11px]">Explore</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[...NAV_LINKS, { label: "Contact", href: "/contact" }].map((l) => (
                      <SheetClose
                        key={l.href}
                        render={<Link href={l.href} />}
                        className="bg-surface-2 hover:border-border-strong flex items-center justify-between rounded-xl border border-border px-3 py-2.5 text-xs font-medium transition-transform active:scale-95"
                      >
                        <span>{l.label}</span>
                        <ArrowUpRight className="text-muted-foreground size-3.5" />
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="mt-auto flex flex-col gap-2 pt-4">
                <CtaLink href="/contact" size="lg" className="w-full">
                  Start your project
                </CtaLink>
                <WhatsAppLink size="lg" className="w-full">
                  Chat on WhatsApp
                </WhatsAppLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </m.header>
  );
}
