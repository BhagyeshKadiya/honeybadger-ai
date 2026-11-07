"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as m from "motion/react-m";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Menu } from "lucide-react";
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
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 120);
    setScrolled(latest > 12);
  });

  return (
    <m.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <div
        className={cn(
          "glass mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 transition-shadow duration-300 sm:px-5",
          scrolled && "shadow-[0_10px_40px_-12px_rgba(0,0,0,0.85)]",
        )}
      >
        {/* Horizontal logo at 34px height (next/image, priority) + light-theme variant + SR/visible brand text */}
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <Image
            src="/logo.png"
            alt={`${SITE.name} logo`}
            width={1024}
            height={341}
            priority
            style={{ width: "auto", height: "34px" }}
            className="hidden drop-shadow-[0_0_14px_rgba(29,242,226,0.28)] dark:block"
          />
          <Image
            src="/brand/logo-light.svg"
            alt={`${SITE.name} logo`}
            width={220}
            height={34}
            priority
            style={{ width: "auto", height: "34px" }}
            className="block dark:hidden"
          />
          <span className="wordmark-text sr-only">HONEYBADGER.AI</span>
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

          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={() => setHovered(l.href)}
              onFocus={() => setHovered(l.href)}
              className="link-draw text-muted-foreground hover:text-foreground relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
            >
              {hovered === l.href && (
                <m.span
                  layoutId="nav-pill"
                  className="bg-surface-2 absolute inset-0 -z-10 rounded-lg"
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              )}
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <WhatsAppLink className="hidden md:inline-flex">Talk to us</WhatsAppLink>
          <CtaLink href="/contact" className="hidden xl:inline-flex">
            Start your project
          </CtaLink>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon-lg" aria-label="Open menu" className="lg:hidden" />}>
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[88%] max-w-sm overflow-y-auto p-5">
              <SheetTitle className="wordmark-text text-sm font-semibold">HONEYBADGER.AI</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                <p className="text-eyebrow mt-2 px-2">Services</p>
                {SERVICES.map((s) => (
                  <SheetClose key={s.slug} render={<Link href={`/services/${s.slug}`} />} className="hover:bg-surface-2 flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm">
                    <ServiceIcon name={s.icon} className="text-brand size-4" />
                    {s.title}
                  </SheetClose>
                ))}
                <p className="text-eyebrow mt-4 px-2">Company</p>
                {[{ label: "RAG & AI", href: "/rag-ai" }, ...NAV_LINKS, { label: "Contact", href: "/contact" }].map((l) => (
                  <SheetClose key={l.href} render={<Link href={l.href} />} className="hover:bg-surface-2 rounded-lg px-2 py-2.5 text-sm">
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
