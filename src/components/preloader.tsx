"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Full-viewport preloader. Waits for `studio:ready` (first WebGL frame),
 * fills the progress bar, fades out, then dispatches `studio:intro` to
 * start the camera fly-in.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let started = false;
    let tick: number | null = null;
    const start = () => {
      if (started) return;
      started = true;

      if (reduced) {
        setProgress(100);
        setVisible(false);
        setDone(true);
        document.dispatchEvent(new CustomEvent("studio:intro"));
        return;
      }

      tick = window.setInterval(() => {
        setProgress((p) => {
          const next = Math.min(p + 9 + Math.random() * 14, 92);
          return next;
        });
      }, 90);

      const onReady = () => {
        if (tick) window.clearInterval(tick);
        setProgress(100);
        window.setTimeout(() => {
          setVisible(false);
          setDone(true);
          document.dispatchEvent(new CustomEvent("studio:intro"));
        }, 420);
      };

      document.addEventListener("studio:ready", onReady, { once: true });
    };

    // Safety: never hold the page hostage if WebGL fails.
    const safety = window.setTimeout(start, 1600);
    const onFirstInteraction = () => {
      window.clearTimeout(safety);
      start();
    };
    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    // If studio already rendered (e.g. fast cache), start immediately.
    start();

    return () => {
      window.clearTimeout(safety);
      if (tick) window.clearInterval(tick);
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d1424]"
          aria-hidden={done}
        >
          <div className="flex flex-col items-center gap-6">
            <span className="font-display text-2xl font-bold tracking-tight text-[#f5edd8]">
              Mithlesh Kumar Das
            </span>
            <div className="h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8395CD] via-[#c9b8f0] to-[#e5a1aa] transition-[width] duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8395CD]">
              setting up the studio…
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
