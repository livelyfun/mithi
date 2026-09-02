"use client";

import { useEffect, useState } from "react";
import { Menu, X, FileDown, ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/lib/site";
import ThemeToggle from "./theme-toggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
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
      { rootMargin: "-30% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={cn(
          "mx-auto flex h-14 w-full max-w-5xl items-center justify-between rounded-full px-4 transition-all duration-300 sm:px-6",
          scrolled
            ? "glass-strong shadow-soft border border-border"
            : "bg-transparent border border-transparent"
        )}
      >
        {/* Brand */}
        <a
          href="#home"
          className="group flex items-center gap-2 font-display text-base font-bold tracking-tight text-foreground transition-transform hover:scale-[1.02]"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-accent/15 font-mono text-xs font-semibold text-accent">
            {profile.initials}
          </span>
          <span className="hidden sm:inline text-foreground group-hover:text-accent transition-colors">
            {profile.name}
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "text-accent font-semibold"
                    : "text-muted hover:text-foreground"
                )}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-accent/10 border border-accent/25"
                  />
                )}
                {link.label}
              </a>
            );
          })}

          <div className="ml-2 flex items-center gap-2 border-l border-border pl-3">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-mono text-xs font-medium text-accent transition-all duration-200 hover:bg-accent/20 hover:shadow-glow"
            >
              <FileDown className="size-3.5" aria-hidden="true" />
              CV
            </a>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent"
          >
            <FileDown className="size-3" aria-hidden="true" />
            CV
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <nav
          className="glass-strong mt-2.5 mx-auto max-w-5xl rounded-3xl p-4 shadow-soft md:hidden border border-border"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent/15 text-accent font-semibold"
                      : "text-foreground-muted hover:bg-foreground/5 hover:text-foreground"
                  )}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="size-3.5 opacity-40" />
                </a>
              );
            })}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
            >
              <FileDown className="size-4" aria-hidden="true" />
              Download Full CV (PDF)
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
