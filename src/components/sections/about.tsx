"use client";

import { useState } from "react";
import Image from "next/image";
import { Server, Terminal, Cpu, GitBranch, MapPin, CheckCircle2 } from "lucide-react";
import Section from "@/components/section";
import Reveal from "@/components/reveal";
import { about } from "@/lib/site";

const focusIcons = [Server, Terminal, Cpu, GitBranch];

export default function About() {
  const [workspaceImg, setWorkspaceImg] = useState("/images/profile.jpg");

  return (
    <Section
      id="about"
      eyebrow="01 · Engineering Philosophy"
      title="Background &amp; Technical Architecture"
      subtitle="Full-stack software developer focused on deterministic AST evaluation, real-time WebSockets, and clean decoupled systems."
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Visual Developer Dossier & Core Stats (Col 1-5) */}
        <div className="lg:col-span-5">
          <Reveal direction="left" delay={0.05}>
            <div className="surface relative overflow-hidden rounded-3xl p-5 shadow-soft border border-border">
              {/* Developer photo frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted/10 border border-border">
                <Image
                  src={workspaceImg}
                  alt="Mithlesh Kumar Das, Backend & Full-Stack Developer"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  onError={() => setWorkspaceImg("/images/profile.jpg")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-accent-2 font-medium">
                      <MapPin className="size-3.5" />
                      Biratnagar, Nepal
                    </span>
                    <span className="text-emerald-400 font-semibold">BIT Scholar</span>
                  </div>
                  <p className="mt-1 font-display text-base font-semibold text-white">
                    Python · FastAPI · React 19 · Next.js 15
                  </p>
                </div>
              </div>

              {/* Core telemetry metrics */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                {about.stats.map((stat, i) => (
                  <Reveal key={stat.label} direction="up" delay={0.15 + i * 0.06}>
                    <div className="rounded-2xl border border-border/80 bg-card/60 p-3.5 text-center transition-colors hover:border-accent/40">
                      <p className="font-display text-2xl font-bold text-gradient">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-[11px] font-mono text-muted">
                        {stat.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Editorial Narrative & 4 Technical Pillars (Col 6-12) */}
        <div className="lg:col-span-7">
          <Reveal direction="up" delay={0.1}>
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider mb-2">
              <span>Full-Stack Engineering</span>
              <span aria-hidden="true">·</span>
              <span>Systems Design</span>
            </div>

            <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl leading-snug">
              {about.headline}
            </h3>

            <div className="mt-4 space-y-3.5 text-sm sm:text-base leading-relaxed text-foreground-muted">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* 4 Core Technical Pillars with staggered Intersection Observer Reveal */}
          <div className="mt-8 border-t border-border pt-6">
            <Reveal direction="fade" delay={0.15}>
              <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                Core Technical Pillars
              </h4>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {about.focusAreas.map((focus, i) => {
                const Icon = focusIcons[i % focusIcons.length];
                return (
                  <Reveal
                    key={focus.title}
                    direction="up"
                    delay={0.18 + i * 0.08}
                  >
                    <div className="group relative h-full rounded-2xl border border-border bg-card/40 p-4 transition-all duration-300 hover:border-accent/40 hover:bg-card/80 hover:-translate-y-0.5">
                      <div className="flex items-start gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
                          <Icon className="size-4.5" />
                        </div>
                        <div>
                          <h5 className="font-display text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                            {focus.title}
                          </h5>
                          <p className="mt-1 text-xs leading-relaxed text-muted">
                            {focus.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal direction="up" delay={0.35} className="mt-6">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted font-mono">
                <span className="flex items-center gap-1.5 text-foreground-muted">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  Comprehensive Unit &amp; Integration Testing
                </span>
                <span className="flex items-center gap-1.5 text-foreground-muted">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  Deterministic AST &amp; Type Safety
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
