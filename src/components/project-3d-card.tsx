"use client";

import { useState, useRef, MouseEvent, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, Cpu, CheckCircle2, Play } from "lucide-react";
import { type Project } from "@/lib/site";
import { GitHubIcon } from "@/components/icons";

interface Project3DCardProps {
  project: Project;
  onInspect: (project: Project) => void;
  onOpenSandbox: (project: Project) => void;
}

export default function Project3DCard({
  project,
  onInspect,
  onOpenSandbox,
}: Project3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(project.imageUrl);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth tilt angles
    const rX = -((y - centerY) / centerY) * 8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.2,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  return (
    <div
      style={{ perspective: "1000px" }}
      className="group relative h-full w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
            isHovered ? "1.01" : "1"
          }, ${isHovered ? "1.01" : "1"}, 1)`,
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.1s ease-out, box-shadow 0.2s ease"
            : "transform 0.5s cubic-bezier(0.2, 1, 0.3, 1), box-shadow 0.5s ease",
        }}
        className="surface relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border p-6 shadow-soft transition-colors hover:border-accent/40"
      >
        {/* Dynamic Specular Glare Layer */}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
          className="absolute inset-0 z-30 transition-opacity duration-300"
        />

        {/* Top: Image Preview & Fast Action Launch */}
        <div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-slate-900/60 mb-5">
            <Image
              src={imgSrc}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgSrc(project.fallbackImageUrl)}
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Clean Metadata Header Bar inside image */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between text-xs font-mono text-white pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-black/65 px-2.5 py-1 backdrop-blur-md border border-white/10 font-semibold">
                  {project.category}
                </span>
                <span className="rounded-lg bg-emerald-950/80 px-2 py-0.5 text-emerald-300 backdrop-blur-md border border-emerald-500/30 text-[11px] font-medium">
                  {project.status}
                </span>
              </div>
              <span className="rounded-lg bg-black/65 px-2 py-0.5 text-slate-300 backdrop-blur-md border border-white/10 text-[11px]">
                {project.version}
              </span>
            </div>

            {/* Hover Overlay: Fast Sandbox Trigger */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => onOpenSandbox(project)}
                className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 font-mono text-xs font-semibold text-white shadow-glow transition-transform hover:scale-105"
              >
                <Play className="size-3.5 fill-current" />
                <span>Launch Interactive Sandbox</span>
              </button>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
                {project.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-accent font-medium">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-3 text-xs leading-relaxed text-muted line-clamp-3">
            {project.description}
          </p>

          {/* Real Telemetry Metrics (Grid of 2) */}
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-border bg-card/60 p-3 font-mono text-[11px]">
            {project.metrics.slice(0, 2).map((m, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] text-muted uppercase tracking-wider">{m.label}</span>
                <span className="font-semibold text-foreground tabular-nums mt-0.5">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Key Architecture Highlights */}
          <div className="mt-4 space-y-1.5 border-t border-border pt-3">
            {project.highlights.slice(0, 2).map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-foreground-muted">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack - Clean Typography without Pill Candy */}
          <p className="mt-4 font-mono text-xs text-muted">
            <span className="text-foreground-muted font-medium">Stack: </span>
            {project.stack.map((tech, idx) => (
              <span key={tech}>
                <span className="text-foreground font-medium">{tech}</span>
                {idx < project.stack.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2.5 border-t border-border pt-4 text-xs">
          <button
            type="button"
            onClick={() => onInspect(project)}
            className="flex items-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors hover:text-accent-2"
          >
            <Cpu className="size-3.5" />
            <span><span className="hidden min-[390px]:inline">3D Architecture </span>Blueprint</span>
          </button>

          <div className="flex items-center gap-2">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-xs text-accent hover:underline"
              >
                <span>Demo</span>
                <ArrowUpRight className="size-3" />
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-card/80 px-2.5 py-1.5 font-mono text-xs text-foreground-muted hover:text-foreground hover:border-accent/40 transition-colors"
            >
              <GitHubIcon className="size-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
