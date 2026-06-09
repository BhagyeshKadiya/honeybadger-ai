"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RevealSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  id?: string;
  staggerChildren?: number;
}

export default function RevealSection({
  children,
  delay = 0,
  direction = "up",
  className = "",
  id,
  staggerChildren = 0.12,
}: RevealSectionProps) {
  const { ref, isInView, getVariants } = useScrollReveal();

  return (
    <motion.div
      id={id}
      ref={ref}
      variants={getVariants(direction, delay, staggerChildren)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}
