"use client";

import { useState } from "react";
import { FolderGit2, Cpu } from "lucide-react";
import Section from "@/components/section";
import Reveal from "@/components/reveal";
import { GitHubIcon } from "@/components/icons";
import { projects, type Project } from "@/lib/site";
import Project3DCard from "@/components/project-3d-card";
import ProjectModal from "@/components/project-modal";

interface ProjectsProps {
  onInspectProject?: (project: Project) => void;
}

export default function Projects({
  onInspectProject: externalOnInspect,
}: ProjectsProps) {
  const [filter, setFilter] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<"architecture" | "sandbox" | "commits">("architecture");

  const categories = [
    "All",
    "Backend & APIs",
    "Desktop & Python",
    "AI & Multimedia",
    "Web & Full-Stack",
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    return p.category === filter;
  });

  const handleInspect = (p: Project) => {
    setActiveModalProject(p);
    setModalInitialTab("architecture");
    externalOnInspect?.(p);
  };

  const handleOpenSandbox = (p: Project) => {
    setActiveModalProject(p);
    setModalInitialTab("sandbox");
  };

  return (
    <Section
      id="projects"
      eyebrow="Featured Systems"
      title="Engineering Projects &amp; 3D Blueprints"
      subtitle="Production-grade desktop engines, AI multimedia pipelines, and distributed backend architectures."
    >
      {/* Category Filter Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-card/80 p-1.5 shadow-soft">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all ${
                filter === cat
                  ? "bg-accent text-white shadow-xs"
                  : "text-muted hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted">
          <Cpu className="size-3.5 text-accent" />
          <span>3D Tilt Cards with Depth Layering</span>
        </div>
      </div>

      {/* 3D Projects Grid */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {filteredProjects.map((project, idx) => (
          <Reveal key={project.id} delay={idx * 0.1}>
            <Project3DCard
              project={project}
              onInspect={handleInspect}
              onOpenSandbox={handleOpenSandbox}
            />
          </Reveal>
        ))}
      </div>

      {/* GitHub Callout Banner */}
      <Reveal delay={0.3} className="mt-14">
        <div className="surface flex flex-col items-center justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:px-8 border border-border shadow-soft">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <FolderGit2 className="size-6" />
            </div>
            <div>
              <p className="font-display text-base font-bold text-foreground">
                Looking for more open-source repositories &amp; experiments?
              </p>
              <p className="text-xs text-muted">
                Explore all active Python kernels, React experiments, and backend microservices on GitHub.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/livelyfun"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-5 py-2.5 text-xs font-semibold"
          >
            <GitHubIcon className="size-3.5" />
            <span>github.com/livelyfun</span>
          </a>
        </div>
      </Reveal>

      {/* Interactive Project Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          initialTab={modalInitialTab}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </Section>
  );
}
