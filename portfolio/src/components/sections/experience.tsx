"use client";

import {
  GraduationCap,
  MapPin,
  CheckCircle,
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
      eyebrow="Academic & Leadership"
      title="Education & Competencies"
      subtitle="Formal coursework, academic achievements, and professional work methodology."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left: Education Timeline (Col 1-7) */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="mb-6 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <GraduationCap className="size-4" />
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">
                Academic Journey
              </h3>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-border space-y-8">
              {educationList.map((edu, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Dot */}
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

                  <div className="surface group rounded-3xl p-5 sm:p-6 border border-border shadow-soft transition-all duration-300 hover:border-accent/40 hover:-translate-y-0.5">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold ${
                            edu.status === "In Progress"
                              ? "bg-accent/15 text-accent border border-accent/25"
                              : "bg-muted/10 text-muted border border-border"
                          }`}
                        >
                          {edu.period}
                        </span>
                        <h4 className="mt-2 font-display text-lg font-bold text-foreground">
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

                    {/* Highlights if any */}
                    {edu.highlights && (
                      <div className="mt-3 space-y-1.5 border-t border-border pt-3">
                        {edu.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-foreground-muted"
                          >
                            <CheckCircle className="size-3 text-emerald-500 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: Competencies (Col 8-12) */}
        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <div className="mb-6 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Workflow className="size-4" />
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">
                Work Style &amp; Traits
              </h3>
            </div>

            <div className="space-y-4">
              {competencyGroups.map((group) => {
                const Icon = competencyIcons[group.iconName] ?? Sparkles;
                return (
                  <div
                    key={group.category}
                    className="surface rounded-3xl p-5 border border-border shadow-soft transition-all duration-300 hover:border-accent/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon className="size-4" />
                      </div>
                      <h4 className="font-display text-sm font-bold text-foreground uppercase tracking-wide">
                        {group.category}
                      </h4>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-border bg-card/60 px-2.5 py-1 text-xs font-medium text-foreground-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
