"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const ACCENTS = ["#e5a1aa", "#8395CD", "#7AD0AC", "#c9b8f0", "#f0d28c"];

/**
 * Fixed vertical progress rail on the right edge. Fills with page scroll
 * progress and highlights the section currently in view — the studio's
 * navigation compass.
 */
export default function ProgressRail() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-35% 0px -45% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 lg:flex xl:right-5"
    >
      <div className="relative flex flex-col items-center gap-4 py-3">
        <div
          aria-hidden="true"
          className="absolute bottom-3 top-3 w-px bg-border"
        />
        <div
          aria-hidden="true"
          className="absolute top-3 w-px origin-top bg-gradient-to-b from-[#e5a1aa] via-[#8395CD] to-[#7AD0AC] transition-[height] duration-150 ease-out"
          style={{ height: `calc((100% - 1.5rem) * ${progress})` }}
        />
        {navLinks.map((link, i) => {
          const isActive = active === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              className="group relative z-10 flex items-center gap-2.5"
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={cn(
                  "pointer-events-none translate-x-1 whitespace-nowrap rounded-full border border-border bg-card-solid px-2.5 py-1 font-mono text-[10px] font-medium text-foreground-muted opacity-0 shadow-soft transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                )}
              >
                {link.label}
              </span>
              <span
                className={cn(
                  "block rounded-full border transition-all duration-300",
                  isActive
                    ? "size-2.5 border-transparent"
                    : "size-2 border-border-strong group-hover:border-[#8395CD]"
                )}
                style={
                  isActive
                    ? { backgroundColor: ACCENTS[i % ACCENTS.length] }
                    : undefined
                }
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
