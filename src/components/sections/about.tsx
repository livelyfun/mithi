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
      <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Visual Developer Dossier & Core Stats (Col 1-5) */}
        <div className="lg:col-span-5 flex flex-col">
          <Reveal direction="left" delay={0.05} className="h-full">
            <div className="surface relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card/60 p-5 shadow-soft backdrop-blur-xl">
              {/* Developer photo frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted/10 border border-border/80">
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
                    <div className="rounded-2xl border border-border/70 bg-card/60 p-3.5 text-center backdrop-blur-md transition-all hover:border-accent/40 hover:bg-card/80">
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

        {/* Right Column: Translucent Editorial Narrative & 4 Technical Pillars (Col 6-12) */}
        <div className="lg:col-span-7 flex flex-col">
          <Reveal direction="up" delay={0.1} className="h-full">
            <div className="surface relative flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 shadow-soft backdrop-blur-xl">
              <div>
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
              </div>

              {/* 4 Core Technical Pillars */}
              <div className="mt-8 border-t border-border/70 pt-6">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                  Core Technical Pillars
                </h4>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  {about.focusAreas.map((focus, i) => {
                    const Icon = focusIcons[i % focusIcons.length];
                    return (
                      <div
                        key={focus.title}
                        className="group relative h-full rounded-2xl border border-border/70 bg-card/50 p-4 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-card/80 hover:-translate-y-0.5"
                      >
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
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm px-4 py-2.5 text-xs text-muted font-mono">
                  <span className="flex items-center gap-1.5 text-foreground-muted">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    Comprehensive Unit &amp; Integration Testing
                  </span>
                  <span className="flex items-center gap-1.5 text-foreground-muted">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    Deterministic AST &amp; Type Safety
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
