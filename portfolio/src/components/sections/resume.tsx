"use client";

import { FileDown, ExternalLink, FileText, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Section from "@/components/section";
import Reveal from "@/components/reveal";
import { profile } from "@/lib/site";

export default function ResumeSection() {
  return (
    <Section
      id="resume"
      eyebrow="Curriculum Vitae"
      title="Resume &amp; Credentials"
      subtitle="Complete overview of technical qualifications, educational background, and engineering projects."
    >
      <Reveal>
        <div className="surface mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border p-6 sm:p-10 shadow-soft">
          <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
            {/* Left: Highlight details (Col 1-7) */}
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent">
                <Sparkles className="size-3.5" />
                <span>Official Document · Updated 2026</span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Mithlesh Kumar Das — Resume
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                Download the official, ATS-friendly curriculum vitae detailing full-stack web and backend projects, Python engineering, and academic records.
              </p>

              <div className="mt-6 space-y-2.5">
                {[
                  "Bachelor of Information Technology (BIT) Undergraduate",
                  "Hands-on with Python, PySide6, React.js, Next.js & Firebase",
                  "CI/CD with GitHub Actions & Docker fundamentals",
                  "Direct contact & verified GitHub repositories",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs font-medium text-foreground-muted sm:text-sm"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={profile.resumeUrl}
                  download="Mithlesh_Kumar_Das_CV.pdf"
                  className="btn-primary group px-6 py-3 text-sm font-semibold"
                >
                  <FileDown className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span>Download CV (PDF)</span>
                </a>

                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost group px-6 py-3 text-sm font-medium"
                >
                  <ExternalLink className="size-4 text-accent transition-transform duration-300 group-hover:scale-110" />
                  <span>Open in Tab</span>
                </a>
              </div>
            </div>

            {/* Right: Visual Document Card Preview (Col 8-12) */}
            <div className="flex justify-center md:col-span-5">
              <div className="relative w-full max-w-[280px] rounded-2xl border border-border bg-card/80 p-5 shadow-soft backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-red-500/10 text-red-500 font-mono text-xs font-bold">
                      PDF
                    </div>
                    <span className="font-mono text-xs font-medium text-foreground truncate max-w-[140px]">
                      Mithlesh_CV.pdf
                    </span>
                  </div>
                  <ShieldCheck className="size-4 text-emerald-500" />
                </div>

                {/* Document Skeleton Lines */}
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-3/4 rounded-sm bg-foreground/15" />
                  <div className="h-2 w-1/2 rounded-sm bg-accent/30" />
                  <div className="my-3 border-t border-border" />
                  <div className="h-2 w-full rounded-sm bg-foreground/10" />
                  <div className="h-2 w-5/6 rounded-sm bg-foreground/10" />
                  <div className="h-2 w-4/5 rounded-sm bg-foreground/10" />
                  <div className="my-3 border-t border-border" />
                  <div className="h-2 w-full rounded-sm bg-foreground/10" />
                  <div className="h-2 w-2/3 rounded-sm bg-foreground/10" />
                </div>

                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl border border-accent/30 bg-accent/10 py-2 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
                >
                  <FileText className="size-3.5" />
                  <span>Preview Document</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
