"use client";

import { Code2, Globe, Database, Cpu, Sparkles, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Section from "@/components/section";
import Reveal from "@/components/reveal";
import { skillCategories } from "@/lib/site";

const categoryIcons: LucideIcon[] = [Code2, Globe, Database, Cpu];

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical Stack"
      title="Skills & Technologies"
      subtitle="Comprehensive tools, frameworks, and languages I use to build scalable software."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((cat, idx) => {
          const Icon = categoryIcons[idx % categoryIcons.length];
          return (
            <Reveal key={cat.title} delay={idx * 0.08}>
              <div className="surface group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-7 shadow-soft border border-border transition-all duration-300 hover:border-accent/40 hover:-translate-y-1">
                {/* Ambient hover glow */}
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 size-36 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-11 items-center justify-center rounded-2xl border border-border bg-card text-accent shadow-xs transition-transform duration-300 group-hover:scale-105">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {cat.title}
                        </h3>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                          {cat.badge}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-muted/50">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Skills Badges */}
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {cat.items.map((skill) => (
                      <span
                        key={skill.name}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-mono text-xs font-medium transition-all duration-200 ${
                          skill.highlight
                            ? "border border-accent/30 bg-accent/10 text-accent font-semibold shadow-xs"
                            : "border border-border bg-card/70 text-foreground-muted hover:border-accent/30 hover:text-foreground"
                        }`}
                      >
                        {skill.highlight && (
                          <Sparkles className="size-3 text-accent" />
                        )}
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-[11px] text-muted font-mono">
                  <Check className="size-3 text-emerald-500" />
                  <span>Hands-on project exposure &amp; production workflows</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
