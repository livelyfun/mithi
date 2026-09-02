"use client";

import { ArrowUp } from "lucide-react";
import { profile, navLinks } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "./icons";

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
              {profile.initials}
            </span>
            <div>
              <p className="font-display text-sm font-bold text-foreground">
                {profile.name}
              </p>
              <p className="text-xs text-muted">{profile.role}</p>
            </div>
          </div>

          {/* Quick Nav */}
          <nav
            className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted"
            aria-label="Footer Navigation"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-card text-muted transition-colors hover:text-foreground hover:border-accent/40"
              >
                <GitHubIcon className="size-3.5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-card text-muted transition-colors hover:text-foreground hover:border-accent/40"
              >
                <LinkedInIcon className="size-3.5" />
              </a>
            </div>

            {/* Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted transition-all duration-200 hover:border-accent/40 hover:text-foreground"
            >
              <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 font-mono text-[11px]">
            <span>Crafted with Next.js 15, React 19 &amp; TailwindCSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
