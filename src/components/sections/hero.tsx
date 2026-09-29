"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  FileDown,
  MapPin,
  Code2,
  Database,
  Layers,
  Cpu,
  ArrowUpRight,
  Play,
} from "lucide-react";
import { profile, projects, type Project } from "@/lib/site";
import DevSpatialViewport from "@/components/dev-spatial-viewport";
import { GitHubIcon } from "@/components/icons";

interface HeroProps {
  onSelectProject?: (projectId: string) => void;
  onOpenProjectModal?: (project: Project) => void;
}

export default function Hero({ onSelectProject, onOpenProjectModal }: HeroProps) {
  const [activeVisualTab, setActiveVisualTab] = useState<"3d" | "repos" | "photo">("3d");
  const [selectedHeroProject, setSelectedHeroProject] = useState<Project>(projects[0]);
  const [imgSrc, setImgSrc] = useState<string>(profile.avatarUrl);

  const headlineStack = ["Python", "FastAPI", "React 19", "Next.js 15", "Three.js", "Docker"];

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-16 lg:min-h-screen lg:pt-32"
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column (Copy & Real Projects Quick Access) */}
          <div className="lg:col-span-6 animate-hero-fade">
            {/* Live GitHub Status Pill */}
            <div className="mb-4 inline-block animate-hero-fade max-w-full" style={{ animationDelay: "60ms" }}>
              <a
                href="https://github.com/livelyfun?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 font-mono text-xs text-foreground-muted backdrop-blur-md shadow-xs transition-colors hover:border-accent hover:text-foreground"
              >
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="truncate max-w-[125px] min-[400px]:max-w-none text-foreground font-semibold">
                  github.com/livelyfun
                </span>
                <span className="text-muted">·</span>
                <span className="text-emerald-500 font-medium shrink-0">
                  17 Repos Active
                </span>
              </a>
            </div>

            {/* Eyebrow */}
            <p
              className="font-mono text-xs font-semibold tracking-widest text-accent uppercase animate-hero-fade"
              style={{ animationDelay: "120ms" }}
            >
              Full-Stack &amp; Backend Software Developer
            </p>

            {/* Name Heading */}
            <h1
              id="hero-title"
              className="mt-1 font-display text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-bold tracking-tight text-foreground leading-[1.1] animate-hero-fade break-words"
              style={{ animationDelay: "180ms" }}
            >
              {profile.name}
            </h1>

            {/* Role Subhead */}
            <p
              className="mt-3 font-display text-lg min-[400px]:text-xl font-medium text-gradient sm:text-2xl animate-hero-fade"
              style={{ animationDelay: "240ms" }}
            >
              {profile.role}
            </p>

            {/* Bio Tagline */}
            <p
              className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base animate-hero-fade"
              style={{ animationDelay: "300ms" }}
            >
              Building real production software across Python AST parsers, FastAPI WebSockets,
              Gemini AI video generation, and high-performance Next.js 15 web applications.
            </p>

            {/* Tech Stack inline */}
            <p
              className="mt-2 font-mono text-xs text-muted animate-hero-fade"
              style={{ animationDelay: "360ms" }}
            >
              {"Production Stack: "}
              {headlineStack.map((tech, i) => (
                <span key={tech}>
                  <span className="text-foreground font-medium">{tech}</span>
                  {i < headlineStack.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>

            {/* Primary CTAs */}
            <div
              className="mt-8 flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-3 animate-hero-fade w-full min-[480px]:w-auto"
              style={{ animationDelay: "420ms" }}
            >
              <a
                href="#projects"
                className="btn-primary group px-6 py-3 text-sm font-semibold shadow-glow justify-center text-center"
              >
                <span>View Real Projects</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="https://github.com/livelyfun?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost group px-5 py-3 text-sm font-medium justify-center text-center"
              >
                <GitHubIcon className="size-4" />
                <span>GitHub Repos</span>
                <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card/60 px-4 py-3 text-xs font-mono font-medium text-foreground-muted transition-colors hover:text-foreground hover:border-accent/40 text-center"
              >
                <FileDown className="size-3.5 text-accent" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Quick Interactive Project Switcher Chips from livelyfun/repos */}
            <div
              className="mt-10 border-t border-border pt-5 animate-hero-fade"
              style={{ animationDelay: "480ms" }}
            >
              <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                <span>Featured Repositories (click to preview):</span>
                <span className="text-[11px] text-accent">livelyfun</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {projects.map((p) => {
                  const isSelected = selectedHeroProject.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelectedHeroProject(p);
                        setActiveVisualTab("repos");
                      }}
                      className={`rounded-lg px-2.5 py-1 font-mono text-xs transition-colors ${
                        isSelected && activeVisualTab === "repos"
                          ? "bg-accent text-white shadow-xs"
                          : "border border-border bg-card/60 text-foreground-muted hover:border-accent/40 hover:text-foreground"
                      }`}
                    >
                      {p.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: 3D Spatial Canvas / Real Project Preview / Headshot */}
          <div className="flex flex-col items-center lg:col-span-6 lg:items-end animate-hero-scale">
            {/* View Switcher Segmented Control */}
            <div className="mb-3 flex w-full sm:w-auto items-center justify-center gap-1 rounded-2xl border border-border bg-card/80 p-1 font-mono text-xs shadow-soft backdrop-blur-md overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveVisualTab("3d")}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 sm:px-3.5 py-1.5 font-semibold transition-colors ${
                  activeVisualTab === "3d"
                    ? "bg-accent text-white shadow-xs"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Cpu className="size-3.5" />
                <span className="hidden sm:inline">3D Spatial Viewport</span>
                <span className="sm:hidden">3D View</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveVisualTab("repos")}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 sm:px-3.5 py-1.5 font-semibold transition-colors ${
                  activeVisualTab === "repos"
                    ? "bg-accent text-white shadow-xs"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Layers className="size-3.5" />
                <span className="hidden sm:inline">Architecture Blueprint</span>
                <span className="sm:hidden">Blueprint</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveVisualTab("photo")}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 sm:px-3.5 py-1.5 font-semibold transition-colors ${
                  activeVisualTab === "photo"
                    ? "bg-accent text-white shadow-xs"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Code2 className="size-3.5" />
                <span className="hidden sm:inline">Developer Dossier</span>
                <span className="sm:hidden">Dossier</span>
              </button>
            </div>

            {/* TAB 1: 3D Spatial Canvas Viewport (Three.js WebGL) */}
            {activeVisualTab === "3d" && (
              <div className="w-full">
                <DevSpatialViewport
                  onSelectProject={onSelectProject}
                  className="h-[300px] min-[420px]:h-[360px] sm:h-[440px] lg:h-[490px] w-full"
                />
                <p className="mt-2 text-center lg:text-right font-mono text-[11px] text-muted">
                  Interactive Three.js WebGL · Drag to rotate · Click nodes to inspect
                </p>
              </div>
            )}

            {/* TAB 2: Real Repo Showcase Card */}
            {activeVisualTab === "repos" && (
              <div className="surface w-full rounded-3xl border border-border p-6 shadow-soft">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border mb-4">
                  <Image
                    src={selectedHeroProject.imageUrl}
                    alt={selectedHeroProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Clean unboxed metadata overlay */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between text-xs font-mono text-white pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-black/65 px-2.5 py-1 backdrop-blur-md border border-white/10 font-semibold">
                        {selectedHeroProject.category}
                      </span>
                      <span className="rounded-lg bg-emerald-950/80 px-2 py-0.5 text-emerald-300 backdrop-blur-md border border-emerald-500/30 text-[11px] font-medium">
                        {selectedHeroProject.status}
                      </span>
                    </div>
                    <span className="rounded-lg bg-black/65 px-2.5 py-1 text-slate-300 backdrop-blur-md border border-white/10 text-[11px]">
                      {selectedHeroProject.version}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white pointer-events-none">
                    <span className="font-semibold text-accent">{selectedHeroProject.version}</span>
                    <span className="text-slate-400">github.com/livelyfun</span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {selectedHeroProject.title}
                    </h3>
                    <p className="font-mono text-xs text-accent mt-0.5">
                      {selectedHeroProject.tagline}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted line-clamp-3">
                  {selectedHeroProject.description}
                </p>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-border bg-card/60 p-2.5 font-mono text-[11px]">
                  {selectedHeroProject.metrics.slice(0, 2).map((m, i) => (
                    <div key={i}>
                      <span className="text-[10px] text-muted uppercase">{m.label}</span>
                      <p className="font-semibold text-foreground">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <button
                    type="button"
                    onClick={() => onOpenProjectModal?.(selectedHeroProject)}
                    className="flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 font-mono text-xs font-semibold text-white shadow-glow hover:bg-accent/90"
                  >
                    <Play className="size-3 fill-current" />
                    <span>Open 3D Blueprint</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {selectedHeroProject.demo && (
                      <a
                        href={selectedHeroProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-mono text-xs text-accent hover:underline"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="size-3" />
                      </a>
                    )}
                    <a
                      href={selectedHeroProject.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-lg border border-border bg-card/80 px-2.5 py-1.5 font-mono text-xs text-foreground-muted hover:text-foreground"
                    >
                      <GitHubIcon className="size-3.5" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Developer Profile Photo */}
            {activeVisualTab === "photo" && (
              <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                <div
                  aria-hidden="true"
                  className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-accent/20 to-accent-2/20 blur-xl opacity-70"
                />

                <div className="surface relative overflow-hidden rounded-3xl p-5 shadow-soft border border-border">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted/10 border border-border">
                    <Image
                      src={imgSrc}
                      alt={`${profile.name}, Backend & Full-Stack Developer`}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      priority
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      onError={() => setImgSrc(profile.avatarFallback)}
                    />

                    <div className="absolute top-3 left-3 rounded-xl border border-white/10 bg-black/60 px-3 py-1 font-mono text-xs font-medium text-white backdrop-blur-md shadow-xs">
                      Software Developer
                    </div>

                    <div className="absolute bottom-3 inset-x-3 rounded-xl border border-white/20 bg-black/50 p-2.5 text-white backdrop-blur-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <MapPin className="size-3.5 text-accent" />
                          <span>{profile.location}</span>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                          BIT Scholar
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="rounded-xl border border-border bg-background/50 p-2">
                      <Code2 className="mx-auto size-4 text-accent" />
                      <p className="mt-1 text-[11px] font-semibold text-foreground">
                        Full-Stack
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-background/50 p-2">
                      <Database className="mx-auto size-4 text-accent" />
                      <p className="mt-1 text-[11px] font-semibold text-foreground">
                        Backend
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-background/50 p-2">
                      <Layers className="mx-auto size-4 text-accent" />
                      <p className="mt-1 text-[11px] font-semibold text-foreground">
                        Clean Code
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
