"use client";

import { FileDown, ExternalLink, ShieldCheck, CheckCircle2, FileText } from "lucide-react";
import Section from "@/components/section";
import Reveal from "@/components/reveal";
import { profile } from "@/lib/site";

export default function ResumeSection() {
  return (
    <Section
      id="resume"
      eyebrow="04 · Credentials"
      title="Curriculum Vitae &amp; Qualifications"
      subtitle="Complete overview of academic qualifications, technical proficiencies, and verified engineering projects."
    >
      <Reveal>
        <div className="surface mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border p-6 sm:p-10 shadow-soft">
          <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
            {/* Left: Highlight details (Col 1-7) */}
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 text-xs font-mono text-accent">
                <FileText className="size-3.5" />
                <span>Official PDF Document</span>
                <span aria-hidden="true">·</span>
                <span>Updated 2026</span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Mithlesh Kumar Das — Resume
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                ATS-friendly curriculum vitae summarizing hands-on engineering across Python AST parsers, FastAPI WebSockets, and modern Next.js 15 full-stack applications.
              </p>

              <div className="mt-6 space-y-2.5">
                {[
                  "Bachelor of Information Technology (BIT) Undergraduate",
                  "Hands-on with Python, PySide6, React.js, Next.js & Firebase",
                  "CI/CD with GitHub Actions & Docker containerization",
                  "Direct contact & verified GitHub open-source repositories",
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
                  className="btn-primary group px-6 py-3 text-sm font-semibold shadow-glow"
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

            {/* Right: Document Preview Card (Col 8-12) */}
            <div className="flex justify-center md:col-span-5">
              <div className="relative w-full max-w-[280px] rounded-2xl border border-border bg-card/90 p-5 shadow-soft backdrop-blur-md">
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

                <div className="mt-5 rounded-xl border border-border bg-background/50 p-2.5 text-center font-mono text-[11px] text-muted">
                  ATS Optimized · Single Page
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
