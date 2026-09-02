"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Wraps content in a fade + slide-up reveal that triggers when scrolled into view.
 * Respects the user's reduced-motion preference.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.985 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
