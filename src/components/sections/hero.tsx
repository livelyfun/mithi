"use client";

import { useState } from "react";
import {
  ArrowRight,
  FileDown,
  ArrowUpRight,
} from "lucide-react";
import { profile, projects, type Project } from "@/lib/site";
import DevSpatialViewport from "@/components/dev-spatial-viewport";
import { GitHubIcon } from "@/components/icons";

interface HeroProps {
  onSelectProject?: (projectId: string) => void;
  onOpenProjectModal?: (project: Project) => void;
}

export default function Hero({ onSelectProject }: HeroProps) {
  const [selectedHeroProject, setSelectedHeroProject] = useState<Project>(projects[0]);

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
                <span>Featured Repositories (click to inspect in 3D):</span>
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
                        onSelectProject?.(p.id);
                      }}
                      className={`rounded-lg px-2.5 py-1 font-mono text-xs transition-colors ${
                        isSelected
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

          {/* Right Column: 3D Spatial Canvas Viewport */}
          <div className="flex flex-col items-center lg:col-span-6 lg:items-end w-full animate-hero-scale">
            <div className="w-full">
              <DevSpatialViewport
                onSelectProject={onSelectProject}
                className="h-[320px] min-[420px]:h-[380px] sm:h-[450px] lg:h-[500px] w-full"
              />
              <p className="mt-2.5 text-center lg:text-right font-mono text-[11px] text-muted">
                Interactive Three.js WebGL · Drag to rotate · Click nodes to inspect
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
