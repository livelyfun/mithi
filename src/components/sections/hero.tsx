"use client";

import { useState } from "react";
import {
  ArrowRight,
  FileDown,
  ArrowUpRight,
  Terminal,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { profile, projects, type Project } from "@/lib/site";
import { GitHubIcon } from "@/components/icons";

interface HeroProps {
  onSelectProject?: (projectId: string) => void;
  onOpenProjectModal?: (project: Project) => void;
}

export default function Hero({ onSelectProject, onOpenProjectModal }: HeroProps) {
  const [selectedHeroProject, setSelectedHeroProject] = useState<Project>(projects[0]);

  const coreStack = [
    { name: "Python 3.12", color: "bg-amber-400" },
    { name: "FastAPI", color: "bg-emerald-400" },
    { name: "React 19", color: "bg-sky-400" },
    { name: "Next.js 15", color: "bg-white" },
    { name: "TypeScript", color: "bg-blue-400" },
    { name: "Three.js", color: "bg-indigo-400" },
    { name: "Docker", color: "bg-sky-400" },
    { name: "PostgreSQL", color: "bg-indigo-400" },
  ];

  const handleChipClick = (p: Project) => {
    setSelectedHeroProject(p);
    onSelectProject?.(p.id);
    onOpenProjectModal?.(p);
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[94vh] flex-col justify-between overflow-hidden pt-28 pb-12 lg:min-h-screen lg:pt-32"
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column (Editorial Spotlight & Primary CTAs) */}
          <div className="lg:col-span-7 animate-hero-fade">
            {/* Live GitHub Status Pill - Featherweight Translucent */}
            <div className="mb-4 inline-block max-w-full">
              <a
                href="https://github.com/livelyfun?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/15 bg-slate-950/30 px-4 py-1.5 font-mono text-xs text-foreground-muted backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-accent hover:bg-slate-900/40 hover:text-foreground"
              >
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="truncate max-w-[130px] min-[400px]:max-w-none text-foreground font-semibold">
                  github.com/livelyfun
                </span>
                <span className="text-white/20">·</span>
                <span className="text-emerald-400 font-medium shrink-0">
                  17 Repos Active
                </span>
                <span className="hidden sm:inline text-white/20">·</span>
                <span className="hidden sm:inline text-accent-2 font-mono text-[11px]">
                  BIT Scholar
                </span>
              </a>
            </div>

            {/* Eyebrow */}
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-widest text-accent uppercase">
              <Sparkles className="size-3.5" />
              <span>Full-Stack &amp; Backend Software Developer</span>
            </div>

            {/* Name Heading with Luminous Typography */}
            <h1
              id="hero-title"
              className="mt-2 font-display text-4xl min-[420px]:text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08] break-words drop-shadow-sm"
            >
              {profile.name}
            </h1>

            {/* Role Subhead */}
            <p className="mt-3 font-display text-xl min-[420px]:text-2xl font-medium text-gradient sm:text-3xl">
              {profile.role}
            </p>

            {/* Bio Tagline */}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
              Building real production software across deterministic Python AST parsers,
              FastAPI WebSockets, Gemini AI multimedia pipelines, and high-performance Next.js 15 web applications.
            </p>

            {/* Tech Stack Pills with 3D Color Anchors */}
            <div className="mt-5 flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-xs text-muted mr-1.5">Core Stack:</span>
              {coreStack.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/35 px-2.5 py-1 font-mono text-xs text-foreground-muted backdrop-blur-md transition-colors hover:border-white/25 hover:text-foreground"
                >
                  <span className={`size-1.5 rounded-full ${tech.color}`} />
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-3 w-full min-[480px]:w-auto">
              <a
                href="#projects"
                className="btn-primary group px-6 py-3 text-sm font-semibold shadow-glow justify-center text-center backdrop-blur-sm"
              >
                <span>View Real Projects</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="https://github.com/livelyfun?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-slate-950/30 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-accent hover:bg-slate-900/40 text-center"
              >
                <GitHubIcon className="size-4" />
                <span>GitHub Repos</span>
                <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-slate-950/30 px-4 py-3 text-xs font-mono font-medium text-foreground-muted backdrop-blur-xl transition-all duration-300 hover:text-foreground hover:border-accent/50 text-center"
              >
                <FileDown className="size-3.5 text-accent" />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Right Column: Ultra-Transparent Live Dev Console & Featured Projects */}
          <div className="lg:col-span-5 animate-hero-scale">
            <div className="rounded-3xl border border-white/15 bg-slate-950/20 p-5 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:border-accent/40">
              {/* Subtle Ambient Radial Highlight */}
              <div className="absolute -top-16 -right-16 size-40 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

              {/* Console Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="size-4 text-accent" />
                  <span className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                    Live Telemetry Shell
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[11px] text-emerald-400 font-semibold">
                    10 Skill Nodes Live
                  </span>
                </div>
              </div>

              {/* 4 Ultra-Sheer Metric Tiles */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center backdrop-blur-sm">
                  <p className="font-display text-xl font-bold text-gradient">17+</p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted">Public Repositories</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center backdrop-blur-sm">
                  <p className="font-display text-xl font-bold text-gradient">5+</p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted">Production Systems</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center backdrop-blur-sm">
                  <p className="font-display text-xl font-bold text-cyan-400">3D</p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted">Spatial Constellation</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center backdrop-blur-sm">
                  <p className="font-display text-xl font-bold text-emerald-400">Nepal</p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted">Biratnagar / Remote</p>
                </div>
              </div>

              {/* Featured Repositories List with Live Inspection Action */}
              <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted">
                  <span>Featured Repositories (click to inspect):</span>
                  <span className="text-[11px] text-accent">livelyfun</span>
                </div>

                <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-none">
                  {projects.map((p) => {
                    const isSelected = selectedHeroProject.id === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleChipClick(p)}
                        className={`group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-mono text-xs transition-all ${
                          isSelected
                            ? "border border-accent/60 bg-accent/20 text-foreground shadow-xs font-semibold"
                            : "border border-white/10 bg-white/[0.02] text-foreground-muted hover:border-accent/40 hover:bg-white/[0.07] hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="size-1.5 rounded-full bg-accent shrink-0" />
                          <span className="truncate">{p.title}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 text-[11px] text-muted group-hover:text-accent">
                          <span>{p.category}</span>
                          <ExternalLink className="size-3 opacity-60 group-hover:opacity-100" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3D Spatial Rig Status Indicator */}
              <div className="mt-3.5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] text-muted">
                <span>SECTOR 01 // NEXUS CORE</span>
                <span className="text-cyan-400">3D Camera Synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator Pill */}
      <div className="mx-auto mt-6 hidden sm:flex items-center justify-center">
        <a
          href="#about"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/25 px-4 py-1.5 font-mono text-xs text-muted backdrop-blur-md transition-all hover:border-accent hover:text-foreground"
        >
          <span>Scroll down to navigate 3D sectors</span>
          <ChevronDown className="size-3.5 transition-transform group-hover:translate-y-0.5 text-accent" />
        </a>
      </div>
    </section>
  );
}
