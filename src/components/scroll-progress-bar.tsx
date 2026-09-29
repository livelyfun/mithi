"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { navLinks } from "@/lib/site";

/**
 * Universal Mobile & Device-Responsive Framer Motion scroll progress bar.
 * Sits at the top of the viewport with a fluid spring-physics gradient
 * and compact adaptive navigation feedback across mobile phones, tablets, and desktop displays.
 */
export default function ScrollProgressBar() {
  const [mounted, setMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>("Home");
  const [percent, setPercent] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const { scrollYProgress } = useScroll();

  // Smooth physics-based spring for organic motion
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const updateSectionAndProgress = useCallback(() => {
    if (typeof window === "undefined") return;

    // Direct scroll calculation for reliable mobile/tablet support
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const directProgress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
    setPercent(Math.round(directProgress * 100));

    // Identify current section
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    const sectionElements = navLinks.map((l) => ({
      id: l.href.slice(1),
      label: l.label,
      el: document.getElementById(l.href.slice(1)),
    }));

    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const item = sectionElements[i];
      if (item.el && item.el.offsetTop <= scrollPos) {
        setCurrentSection(item.label);
        return;
      }
    }
    setCurrentSection("Home");
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track percentage and current section during scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const onScroll = () => {
      updateSectionAndProgress();
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateSectionAndProgress, { passive: true });
    onScroll();

    // Also sync with Framer Motion scrollYProgress for instant reactive updates
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    });

    return () => {
      unsubscribe();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateSectionAndProgress);
      clearTimeout(scrollTimeout);
    };
  }, [scrollYProgress, updateSectionAndProgress]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 inset-x-0 z-[100] flex flex-col items-center"
    >
      {/* Background track (subtle hairline) */}
      <div className="relative h-[3px] min-[480px]:h-[3.5px] sm:h-[4px] w-full bg-border/40 backdrop-blur-xs">
        {/* Animated Gradient Progress Line */}
        <motion.div
          style={{
            scaleX,
            transformOrigin: "0%",
          }}
          className="relative h-full w-full bg-gradient-to-r from-accent via-accent-2 to-indigo-500 shadow-[0_0_12px_rgba(129,140,248,0.85)]"
        >
          {/* Luminous beacon dot at the head of the progress bar */}
          <div className="absolute right-0 top-1/2 size-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(56,189,248,0.9)] opacity-95 sm:size-2.5" />
        </motion.div>
      </div>

      {/* Adaptive Navigation Feedback Badge - Fully Responsive on Mobile, Tablet & Desktop */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{
          opacity: isScrolling && percent > 0 && percent < 100 ? 1 : 0,
          y: isScrolling && percent > 0 && percent < 100 ? 0 : -6,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="mt-1.5 flex items-center gap-1.5 rounded-full border border-border/80 bg-slate-950/90 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-200 shadow-lg backdrop-blur-md min-[480px]:text-[11px] sm:gap-2 sm:px-3 sm:py-1 sm:text-xs"
      >
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="max-w-[110px] min-[400px]:max-w-[160px] sm:max-w-none truncate text-white">
          {currentSection}
        </span>
        <span className="text-muted">·</span>
        <span className="text-accent-2 font-bold tabular-nums shrink-0">
          {percent}%
        </span>
      </motion.div>
    </div>
  );
}
