"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import { WA_LINK } from "@/lib/constants";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "How It Works", href: "#system" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    // Render skeleton navbar to prevent layout shift during hydration
    return (
      <header className="sticky top-0 z-50 w-full bg-transparent">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
          <div className="h-9 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="hidden space-x-8 md:flex">
            <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </header>
    );
  }

  const isLight = resolvedTheme === "light";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
        {/* Logo Section */}
        <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="relative z-50 flex items-center">
          <div
            className={`transition-all duration-300 flex items-center ${
              isLight ? "bg-[#0A0A0A] px-3 py-1.5 rounded-lg shadow-sm" : ""
            }`}
          >
            <Image
              src="/logo.png"
              alt="Honeybadger.AI Logo"
              width={180}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-hb-teal"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Theme and CTA Button */}
        <div className="hidden items-center space-x-4 md:flex">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted"
            aria-label="Toggle visual theme"
          >
            {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-hb-teal text-hb-black font-semibold hover:bg-hb-teal-deep hover:text-white transition-colors duration-300 px-4 py-2 inline-flex items-center justify-center rounded-lg"
            )}
          >
            Talk to Us <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        {/* Mobile controls: Theme toggle & Hamburger menu */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted"
            aria-label="Toggle visual theme"
          >
            {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Drawer Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-[320px] flex-col bg-background p-6 shadow-xl border-l border-border md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="flex items-center">
                  <div className={`transition-all duration-300 ${isLight ? "bg-[#0A0A0A] px-3 py-1 rounded-lg" : ""}`}>
                    <Image
                      src="/logo.png"
                      alt="Honeybadger.AI Logo"
                      width={130}
                      height={26}
                      className="h-7 w-auto object-contain"
                    />
                  </div>
                </a>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Content links */}
              <nav className="flex flex-col space-y-6 pt-10">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-lg font-medium text-foreground transition-colors hover:text-hb-teal"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Drawer Footer CTA */}
              <div className="mt-auto pt-6 border-t border-border">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full bg-hb-teal text-hb-black font-semibold hover:bg-hb-teal-deep hover:text-white transition-colors duration-300 py-3 flex items-center justify-center rounded-lg"
                  )}
                >
                  Talk to Us <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
