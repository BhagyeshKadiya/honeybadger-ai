"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={cn(
            "fixed bottom-[88px] right-6 md:bottom-24 md:right-7 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-hb-teal/30 bg-card/80 text-hb-teal shadow-md backdrop-blur-md transition-colors duration-300 hover:bg-hb-teal hover:text-hb-black hover:border-hb-teal"
          )}
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="h-5 w-5 animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
