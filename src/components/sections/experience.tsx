"use client";

import {
  GraduationCap,
  MapPin,
  CheckCircle2,
  Workflow,
  MessageSquare,
  Users,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Section from "@/components/section";
import Reveal from "@/components/reveal";
import { educationList, competencyGroups } from "@/lib/site";

const competencyIcons: Record<string, LucideIcon> = {
  Workflow,
  MessageSquare,
  Users,
  Sparkles,
};

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="03 · Foundations &amp; Growth"
      title="Education &amp; Competencies"
      subtitle="Academic training in Information Technology, rigorous coursework, and professional engineering practices."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: Education Timeline (Col 1-7) */}
        <div className="lg:col-span-7">
          <Reveal direction="up" delay={0.05}>
            <div className="mb-6 flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <GraduationCap className="size-4.5" />
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">
                Academic Journey
              </h3>
            </div>
          </Reveal>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-border space-y-8">
            {educationList.map((edu, idx) => (
              <Reveal
                key={idx}
                direction="left"
                delay={0.1 + idx * 0.12}
                threshold={0.1}
                className="relative"
              >
                {/* Timeline Node Dot */}
                <span
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 flex size-4 items-center justify-center rounded-full border-2 ${
                    edu.status === "In Progress"
                      ? "border-accent bg-accent text-white shadow-glow"
                      : "border-border bg-card"
                  }`}
                >
                  {edu.status === "In Progress" && (
                    <span className="size-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </span>

                <div className="surface group rounded-3xl p-6 border border-border shadow-soft transition-all duration-300 hover:border-accent/40 hover:-translate-y-0.5">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      {/* Clean unboxed period & status */}
                      <div className="flex items-center gap-2 text-xs font-mono text-muted">
                        <span className={edu.status === "In Progress" ? "text-accent font-semibold" : ""}>
                          {edu.period}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className={edu.status === "In Progress" ? "text-emerald-500 font-semibold" : ""}>
                          {edu.status}
                        </span>
                      </div>

                      <h4 className="mt-1.5 font-display text-lg font-bold text-foreground">
                        {edu.degree}
                      </h4>
                    </div>

                    {edu.score && (
                      <span className="rounded-xl border border-accent/20 bg-accent/5 px-2.5 py-1 font-mono text-xs font-bold text-accent">
                        {edu.score}
                      </span>
                    )}
                  </div>

                  {/* School & Location */}
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                    <span className="font-medium text-foreground-muted">
                      {edu.institution}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3 text-accent" />
                      {edu.location}
                    </span>
                  </div>

                  {/* Details */}
                  <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                    {edu.details}
                  </p>

                  {/* Course highlights */}
                  {edu.highlights && (
                    <div className="mt-4 space-y-1.5 border-t border-border pt-3">
                      {edu.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-foreground-muted"
                        >
                          <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right: Professional Competencies (Col 8-12) */}
        <div className="lg:col-span-5">
          <Reveal direction="up" delay={0.1}>
            <div className="mb-6 flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Workflow className="size-4.5" />
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">
                Engineering Work Style
              </h3>
            </div>
          </Reveal>

          <div className="space-y-4">
            {competencyGroups.map((group, idx) => {
              const Icon = competencyIcons[group.iconName] ?? Sparkles;
              return (
                <Reveal
                  key={group.category}
                  direction="right"
                  delay={0.15 + idx * 0.1}
                  threshold={0.1}
                >
                  <div className="surface rounded-2xl p-5 border border-border shadow-soft transition-all duration-300 hover:border-accent/40">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon className="size-4" />
                      </div>
                      <h4 className="font-display text-sm font-bold text-foreground">
                        {group.category}
                      </h4>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-foreground-muted">
                      {group.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2">
                          <span className="size-1 rounded-full bg-accent" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
