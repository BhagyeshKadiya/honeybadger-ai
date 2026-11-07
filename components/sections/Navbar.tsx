"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as m from "motion/react-m";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Menu, MessageCircle } from "lucide-react";
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
import { BadgerMark } from "@/components/brand/BadgerMark";
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
      className="fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 sm:px-5 sm:pt-3"
    >
      <div
        className={cn(
          "glass mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-3.5 transition-shadow duration-300 sm:px-5",
          scrolled && "shadow-[0_12px_40px_-10px_rgba(0,0,0,0.9)] border-border-strong",
        )}
      >
        {/* Brand lockup: uploaded symbol + animated stroke-draw mark + geometric wordmark */}
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="group flex shrink-0 items-center gap-2.5"
        >
          <span className="relative flex size-9 items-center justify-center rounded-xl border border-white/10 bg-surface-2/80 p-1 shadow-[0_0_18px_rgba(29,242,226,0.22)] transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
            <Image
              src="/brand/symbol.png"
              alt={`${SITE.name} symbol`}
              width={64}
              height={64}
              priority
              className="size-7 object-contain drop-shadow-[0_0_10px_rgba(29,242,226,0.5)]"
            />
          </span>
          <span className="wordmark-text text-[13px] font-semibold tracking-[0.18em] sm:text-sm sm:tracking-[0.22em]">
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

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          {/* Quick WhatsApp icon button on mobile header */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="btn-secondary-brand grid size-9 place-items-center rounded-lg md:hidden"
          >
            <MessageCircle className="text-brand size-4" aria-hidden="true" />
          </a>
          <WhatsAppLink className="hidden md:inline-flex">Talk to us</WhatsAppLink>
          <CtaLink href="/contact" className="hidden xl:inline-flex">
            Start your project
          </CtaLink>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden" />}>
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[88%] max-w-sm overflow-y-auto p-5">
              <div className="flex items-center gap-2.5">
                <BadgerMark size={28} animate />
                <SheetTitle className="wordmark-text text-xs font-semibold">
                  HONEYB<span className="text-brand">&#923;</span>DGER.<span className="text-brand">&#923;</span>I
                </SheetTitle>
              </div>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <nav aria-label="Mobile" className="mt-2 flex flex-col gap-1">
                <p className="text-eyebrow mt-2 px-2">Services</p>
                {SERVICES.map((s) => (
                  <SheetClose
                    key={s.slug}
                    render={<Link href={`/services/${s.slug}`} />}
                    className="hover:bg-surface-2 active:bg-surface-2 flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm transition-transform active:scale-[0.98]"
                  >
                    <span className="border-border bg-surface-2 text-brand grid size-8 shrink-0 place-items-center rounded-lg border">
                      <ServiceIcon name={s.icon} className="size-4" />
                    </span>
                    <span className="font-medium">{s.title}</span>
                  </SheetClose>
                ))}
                <p className="text-eyebrow mt-4 px-2">Company</p>
                {[{ label: "RAG & AI", href: "/rag-ai" }, ...NAV_LINKS, { label: "Contact", href: "/contact" }].map((l) => (
                  <SheetClose
                    key={l.href}
                    render={<Link href={l.href} />}
                    className="hover:bg-surface-2 rounded-xl px-2.5 py-2.5 text-sm font-medium"
                  >
                    {l.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 pt-4">
                <CtaLink href="/contact" size="lg">
                  Start your project
                </CtaLink>
                <WhatsAppLink size="lg">Chat on WhatsApp</WhatsAppLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </m.header>
  );
}
