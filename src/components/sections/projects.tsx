"use client";

import { useState, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { projects } from "@/lib/site";
import SectionShell from "@/components/section-shell";
import Reveal from "@/components/reveal";

const STATUS_STYLES: Record<string, string> = {
  Production: "bg-[#7AD0AC]/15 text-[#4faf8d] dark:text-[#7AD0AC]",
  "Active Dev": "bg-[#f0d28c]/15 text-[#a4842f] dark:text-[#f0d28c]",
  Benchmarked: "bg-[#8395CD]/15 text-[#5a6ca8] dark:text-[#8395CD]",
};

const CATEGORIES = [
  "All",
  "Web & Full-Stack",
  "AI & Multimedia",
  "Backend & APIs",
  "Desktop & Python",
] as const;

type Category = (typeof CATEGORIES)[number];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <SectionShell
      id="projects"
      index="03"
      label="Projects"
      title="Things I've built and maintain."
      subtitle="Selected production web applications, AI systems, and open-source tools with live Vercel deployments."
      side="left"
      accent="#7AD0AC"
    >
      {/* Category Filter Tabs */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => {
          const count =
            cat === "All"
              ? projects.length
              : projects.filter((p) => p.category === cat).length;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-medium transition-all ${
                isActive
                  ? "border border-[#7AD0AC]/60 bg-[#7AD0AC]/15 text-[#3d9173] shadow-sm dark:text-[#7AD0AC]"
                  : "border border-border/80 bg-background/50 text-muted hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`rounded-full px-1.5 py-px font-mono text-[9.5px] ${
                  isActive
                    ? "bg-[#7AD0AC]/20 text-[#3d9173] dark:text-[#7AD0AC]"
                    : "bg-card text-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filteredProjects.map((project, i) => (
          <Reveal key={project.id} delay={0.02 * i}>
            <article className="group rounded-2xl border border-border bg-background/40 p-4 transition-all duration-200 hover:border-[#7AD0AC]/40 hover:bg-background/60 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-base font-bold text-foreground sm:text-lg">
                      {project.title}
                    </h3>
                    <span className="rounded-full border border-border px-2 py-px font-mono text-[10px] text-muted">
                      {project.version}
                    </span>
                    <span
                      className={`rounded-full px-2 py-px font-mono text-[10px] font-semibold ${
                        STATUS_STYLES[project.status] ?? STATUS_STYLES.Production
                      }`}
                    >
                      {project.status}
                    </span>
                    <span className="rounded-full border border-border/70 bg-card/60 px-2 py-px font-mono text-[10px] text-muted">
                      {project.category}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#7AD0AC]/40 bg-[#7AD0AC]/10 px-2.5 text-[11px] font-medium text-[#3d9173] transition-colors hover:border-[#7AD0AC] hover:bg-[#7AD0AC]/20 hover:text-[#2d735a] dark:text-[#7AD0AC] dark:hover:text-[#a0e4c8]"
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7AD0AC] opacity-75"></span>
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7AD0AC]"></span>
                      </span>
                      <span>Demo</span>
                      <ArrowUpRight className="size-3" />
                    </a>
                  ) : null}

                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} repository`}
                    className="flex size-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    <GitHubIcon className="size-3.5" />
                  </a>
                </div>
              </div>

              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 6).map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full bg-card/70 px-2.5 py-0.5 font-mono text-[10.5px] text-foreground-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-border/60 pt-3 sm:grid-cols-4">
                {project.metrics.slice(0, 4).map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <dt className="text-[10px] uppercase tracking-wide text-muted">
                      {m.label}
                    </dt>
                    <dd className="font-mono text-[11.5px] font-medium text-foreground">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

