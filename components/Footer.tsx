"use client";

import React from "react";
import Image from "next/image";
import { WA_LINK, WA_NUMBER } from "@/lib/constants";

const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "How It Works", href: "#system" },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="w-full bg-[#050505] text-zinc-400 py-16 px-6 md:px-8 border-t border-zinc-900 z-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-zinc-900">
          
          {/* Left Side: Logo & Description */}
          <div className="col-span-1 md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Honeybadger.AI Logo"
                width={160}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-xs font-light text-zinc-500 tracking-wide max-w-xs">
              Revenue Infrastructure Partner for real estate, hospitality, and e-commerce brands in Naroli, DNH, and Vapi.
            </p>
          </div>

          {/* Center Side: Nav Links */}
          <div className="col-span-1 md:col-span-4 flex flex-col space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm font-light hover:text-hb-teal transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Contact / WhatsApp */}
          <div className="col-span-1 md:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact
            </h4>
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-light text-zinc-500">Get in touch directly:</span>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-hb-teal hover:text-hb-teal-deep transition-colors duration-200"
              >
                WhatsApp: +91 90231 00608
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-xs font-light text-zinc-600 space-y-4 md:space-y-0">
          <p>© 2025 Honeybadger Digital · Naroli, DNH · All rights reserved.</p>
          <p className="flex items-center space-x-2">
            <span>AI-First Infrastructure</span>
            <span>·</span>
            <span>Vapi-Silvassa Corridor</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
