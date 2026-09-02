"use client";

import { ArrowRight, FileDown, MapPin, Code2, Database, Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { profile } from "@/lib/site";
import Image from "next/image";
import { useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Hero() {
  const reduce = useReducedMotion();
  const [imgSrc, setImgSrc] = useState(profile.avatarUrl);

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-16 lg:min-h-screen lg:pt-32"
    >
      {/* Background ambient texture */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-80" />
        <div className="absolute top-1/4 right-[10%] size-80 rounded-full bg-accent/15 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-[5%] size-80 rounded-full bg-accent-2/10 blur-[100px] pointer-events-none" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Main Copy (Col 1-7) */}
          <motion.div
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            className="lg:col-span-7"
          >
            {/* Status Pill */}
            <motion.div variants={fadeUp} custom={0} className="mb-5 inline-block">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 font-mono text-xs text-foreground-muted backdrop-blur-md shadow-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span>Available for Full-Stack &amp; Backend Roles</span>
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              custom={1}
              className="font-mono text-sm font-semibold tracking-wide text-accent"
            >
              Hi, I&apos;m
            </motion.p>

            {/* Name Heading */}
            <motion.h1
              variants={fadeUp}
              custom={2}
              className="mt-1 font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem] leading-[1.08]"
            >
              {profile.name}
            </motion.h1>

            {/* Professional Role */}
            <motion.p
              variants={fadeUp}
              custom={3}
              className="mt-3 font-display text-xl font-medium text-gradient sm:text-2xl"
            >
              {profile.role}
            </motion.p>

            {/* Bio Tagline derived from CV */}
            <motion.p
              variants={fadeUp}
              custom={4}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={5}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#projects"
                className="btn-primary group px-6 py-3 text-sm"
              >
                <span>View Projects</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost group px-6 py-3 text-sm font-medium"
              >
                <FileDown className="size-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>Download CV</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
              >
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Quick Tech Highlights */}
            <motion.div
              variants={fadeUp}
              custom={6}
              className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-6 text-xs text-muted font-mono"
            >
              <span className="font-semibold text-foreground">Stack:</span>
              {["Python", "React.js", "Next.js", "REST APIs", "GraphQL", "Firebase", "Docker"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-card/60 px-2 py-0.5 text-foreground-muted"
                  >
                    {tech}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Right Visual / Headshot Area (Col 8-12) */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.95 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:col-span-5 lg:justify-end"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Subtle ambient glow behind card */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-accent/20 to-accent-2/20 blur-xl opacity-70"
              />

              {/* Main Headshot Frame */}
              <div className="surface relative overflow-hidden rounded-3xl p-5 shadow-soft border border-border">
                {/* Photo container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted/10 border border-border">
                  {/* TODO: replace placeholder image: Hero headshot - replace with real portrait photo */}
                  <Image
                    src={imgSrc}
                    alt={`${profile.name} - ${profile.role}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    onError={() => setImgSrc(profile.avatarFallback)}
                  />

                  {/* Top glass pill badge */}
                  <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-xs font-medium text-white backdrop-blur-md shadow-xs">
                    Software Developer
                  </div>

                  {/* Bottom location badge */}
                  <div className="absolute bottom-3 inset-x-3 rounded-xl border border-white/20 bg-black/50 p-2.5 text-white backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <MapPin className="size-3.5 text-accent" />
                        <span>{profile.location}</span>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                        BIT Scholar
                      </span>
                    </div>
                  </div>
                </div>

                {/* Micro tech indicators under headshot */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl border border-border bg-background/50 p-2">
                    <Code2 className="mx-auto size-4 text-accent" />
                    <p className="mt-1 font-mono text-[11px] font-semibold text-foreground">
                      Full-Stack
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background/50 p-2">
                    <Database className="mx-auto size-4 text-accent" />
                    <p className="mt-1 font-mono text-[11px] font-semibold text-foreground">
                      Backend
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background/50 p-2">
                    <Layers className="mx-auto size-4 text-accent" />
                    <p className="mt-1 font-mono text-[11px] font-semibold text-foreground">
                      Clean Code
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
