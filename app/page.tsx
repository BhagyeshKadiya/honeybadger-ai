"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutStrip from "@/components/AboutStrip";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import SystemFlow from "@/components/SystemFlow";
import Location from "@/components/Location";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* SECTION 1 — Sticky Navigation Bar */}
      <Navbar />

      <main className="flex-grow">
        {/* SECTION 2 — Interactive Hero Section */}
        <Hero />

        {/* SECTION 3 — About Strip with Underline Drawing */}
        <AboutStrip />

        {/* SECTION 4 — The Three Pillars Services Cards */}
        <Services />

        {/* SECTION 5 — Built for Three Industries Tabs */}
        <Industries />

        {/* SECTION 6 — How The System Works Horizontal/Vertical Flow */}
        <SystemFlow />

        {/* SECTION 7 — Naroli & Corridor Headquarters Block */}
        <Location />

        {/* SECTION 8 — Final Radial-Glow CTA Banner */}
        <CtaBanner />
      </main>

      {/* SECTION 9 — Footer Block */}
      <Footer />
    </div>
  );
}
