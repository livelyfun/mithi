"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: ReactNode;
  delay?: number; // e.g. 0.1 (seconds) or 100 (ms)
  duration?: number; // in ms
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  threshold?: number;
  rootMargin?: string;
  className?: string;
  once?: boolean;
}

/**
 * High-performance Intersection Observer reveal component.
 * Gracefully fades and slides elements into view as the user scrolls down the page.
 * Hydration-safe with GPU-accelerated transforms and reduced-motion compliance.
 */
export default function Reveal({
  children,
  delay = 0,
  duration,
  direction = "up",
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
  className,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const element = ref.current;
    if (!element) return;

    // Fallback if IntersectionObserver isn't supported
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  // Normalize delay (seconds vs milliseconds)
  const delayMs = delay < 15 ? delay * 1000 : delay;

  // Direction specific classes
  const directionClasses: Record<string, string> = {
    up: "reveal-up",
    down: "reveal-down",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
    fade: "reveal-fade",
  };

  const initialClass = directionClasses[direction] || "reveal-up";

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delayMs}ms`,
        ...(duration ? { transitionDuration: `${duration}ms` } : {}),
      }}
      className={cn(
        hasMounted ? "reveal-init" : "",
        hasMounted && !isVisible ? initialClass : "",
        hasMounted && isVisible ? "reveal-visible" : "",
        className
      )}
    >
      {children}
    </div>
  );
}
