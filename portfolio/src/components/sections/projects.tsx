"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, FolderGit2 } from "lucide-react";
import Section from "@/components/section";
import Reveal from "@/components/reveal";
import { GitHubIcon } from "@/components/icons";
import { projects, type Project } from "@/lib/site";

function ProjectCard({ project }: { project: Project }) {
  const [imgSrc, setImgSrc] = useState(project.imageUrl);

  return (
    <article className="surface group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border p-6 sm:p-7 shadow-soft transition-all duration-300 hover:border-accent/40 hover:-translate-y-1.5 hover:shadow-glow">
      {/* Cover Image */}
      <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted/10 border border-border">
        {/* TODO: replace placeholder image: Project cover - ${project.title} (${project.category}) */}
        <Image
          src={imgSrc}
          alt={`${project.title} preview cover`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImgSrc(project.fallbackImageUrl)}
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-mono text-xs font-medium text-white backdrop-blur-md shadow-xs">
          {project.category}
        </div>

        {/* Source link badge */}
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View source code for ${project.title} on GitHub`}
          className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:bg-black/80"
        >
          <ArrowUpRight className="size-4" />
        </a>
      </div>

      {/* Title & Tagline */}
      <div>
        <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-xs font-medium text-accent">
          {project.tagline}
        </p>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      {/* Key Highlights from CV */}
      <div className="mt-4 space-y-2 border-t border-border pt-4">
        {project.highlights.map((item, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-foreground-muted">
            <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500 mt-0.5" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Tech Stack Tags */}
      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-lg border border-accent/20 bg-accent/5 px-2.5 py-1 font-mono text-[11px] font-medium text-accent"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer Links */}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs font-medium">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-1.5 text-foreground hover:text-accent"
        >
          <GitHubIcon className="size-3.5" />
          <span>Source Code</span>
        </a>

        <span className="font-mono text-[11px] text-muted">
          Active Repository
        </span>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Work"
      title="Engineering Projects"
      subtitle="Real desktop, AI multimedia, and web applications built from scratch."
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <Reveal key={project.id} delay={idx * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {/* GitHub Callout Banner */}
      <Reveal delay={0.3} className="mt-12">
        <div className="surface flex flex-col items-center justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:px-8 border border-border">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <FolderGit2 className="size-6" />
            </div>
            <div>
              <p className="font-display text-base font-bold text-foreground">
                Looking for more experiments &amp; repositories?
              </p>
              <p className="text-xs text-muted">
                Explore all open-source repositories and hands-on code on GitHub.
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
            <span>Visit github.com/livelyfun</span>
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
