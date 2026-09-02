"use client";

import { useState } from "react";
import Image from "next/image";
import { Server, Layout, Terminal, Sparkles } from "lucide-react";
import Section from "@/components/section";
import Reveal from "@/components/reveal";
import { about } from "@/lib/site";

const focusIcons = [Server, Layout, Terminal, Sparkles];

export default function About() {
  const [workspaceImg, setWorkspaceImg] = useState(
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
  );

  return (
    <Section
      id="about"
      eyebrow="About Me"
      title="Background & Engineering Focus"
      subtitle="Full-stack developer building clean web solutions, backend services, and scalable tools."
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left Visual Illustration / Workspace (Col 1-5) */}
        <Reveal className="lg:col-span-5">
          <div className="surface relative overflow-hidden rounded-3xl p-4 shadow-soft border border-border">
            {/* Supporting illustration / developer workspace image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted/10 border border-border">
              {/* TODO: replace placeholder image: About section visual / workspace illustration */}
              <Image
                src={workspaceImg}
                alt="Developer workspace and coding environment"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-700 hover:scale-105"
                onError={() =>
                  setWorkspaceImg(
                    "https://picsum.photos/seed/mithlesh-workspace/800/600"
                  )
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-mono text-xs text-accent-2 font-medium">
                  Biratnagar, Nepal
                </p>
                <p className="font-display text-sm font-semibold">
                  Engineering with Python, React &amp; Next.js
                </p>
              </div>
            </div>

            {/* Quick stats strip */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-card/60 p-3.5 text-center"
                >
                  <p className="font-display text-xl font-bold text-gradient">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right Story & Focus Areas (Col 6-12) */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl leading-snug">
              {about.headline}
            </h3>

            <div className="mt-5 space-y-4 text-base leading-relaxed text-foreground-muted">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* 4 Key Pillars */}
          <Reveal delay={0.2} className="mt-8">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Core Technical Pillars
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {about.focusAreas.map((focus, i) => {
                const Icon = focusIcons[i % focusIcons.length];
                return (
                  <div
                    key={focus.title}
                    className="surface rounded-2xl p-4 border border-border transition-all duration-200 hover:border-accent/40 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <h5 className="font-display text-sm font-semibold text-foreground">
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
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
