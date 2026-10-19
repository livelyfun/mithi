"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, FileDown, Mail } from "lucide-react";
import { profile, projects } from "@/lib/site";

declare global {
  interface Window {
    __studioIntroDone?: boolean;
  }
}

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.__studioIntroDone) {
      setReady(true);
      return;
    }
    const onDone = () => setReady(true);
    document.addEventListener("studio:intro-complete", onDone, { once: true });
    const safety = window.setTimeout(() => setReady(true), 4500);
    return () => {
      document.removeEventListener("studio:intro-complete", onDone);
      window.clearTimeout(safety);
    };
  }, []);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <motion.div {...rise(0.05)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 font-mono text-[11px] font-medium text-muted backdrop-blur-md">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.14)}
            className="mt-6 font-display text-[3.1rem] font-bold leading-[1.02] tracking-tight text-foreground sm:text-7xl"
          >
            Mithlesh
            <br />
            <span className="text-gradient">Kumar Das</span>
          </motion.h1>

          <motion.p
            {...rise(0.24)}
            className="mt-5 max-w-xl text-lg leading-relaxed text-foreground-muted"
          >
            {profile.role} based in Biratnagar, Nepal — building full-stack
            products, backend systems, and AI/RAG tooling. Welcome to my
            studio.
          </motion.p>

          <motion.div {...rise(0.34)} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary px-6 py-3 text-sm">
              View Projects
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="btn-ghost px-6 py-3 text-sm"
            >
              <Mail className="size-4" aria-hidden="true" />
              Contact
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-6 py-3 text-sm"
            >
              <FileDown className="size-4" aria-hidden="true" />
              CV
            </a>
          </motion.div>

          <motion.div
            {...rise(0.46)}
            className="mt-12 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <span>{projects.length} featured projects</span>
            <span className="h-3 w-px bg-border-strong" />
            <span>Scroll to enter</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
