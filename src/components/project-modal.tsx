"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Play,
  Cpu,
  Layers,
  GitCommit,
  CheckCircle2,
  ArrowUpRight,
  Volume2,
} from "lucide-react";
import { type Project } from "@/lib/site";
import { GitHubIcon } from "@/components/icons";

interface ProjectModalProps {
  project: Project | null;
  initialTab?: "architecture" | "sandbox" | "commits";
  onClose: () => void;
}

export default function ProjectModal({
  project,
  initialTab = "architecture",
  onClose,
}: ProjectModalProps) {
  const [tab, setTab] = useState<"architecture" | "sandbox" | "commits">("architecture");

  // Calculator Sandbox state
  const [calcInput, setCalcInput] = useState<string>("sin(pi/6) * 12 + 2^4");
  const [calcResult, setCalcResult] = useState<string>("22");
  const [calcTokens, setCalcTokens] = useState<string[]>([
    "FUNCTION(sin)",
    "LPAREN",
    "CONST(pi)",
    "DIV",
    "NUMBER(6)",
    "RPAREN",
    "MUL",
    "NUMBER(12)",
    "PLUS",
    "NUMBER(2)",
    "POW",
    "NUMBER(4)",
  ]);

  // AI Reel Studio Sandbox state
  const [promptText, setPromptText] = useState<string>(
    "Explain how Python AST parsers work with high-energy animated visuals"
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioTick, setAudioTick] = useState<number>(0);
  const [activeFrame, setActiveFrame] = useState<number>(1);

  useEffect(() => {
    if (!isPlayingAudio) return;
    const timer = setInterval(() => {
      setAudioTick((t) => (t + 1) % 1000);
    }, 80);
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  // GraphQL Sandbox state
  const [gqlQuery, setGqlQuery] = useState<string>(
    `query GetProjectTelemetry {\n  project(id: "nexus-backend") {\n    title\n    version\n    p99Latency\n    cacheHitRate\n    activeServices\n  }\n}`
  );
  const [gqlResponse, setGqlResponse] = useState<string>(
    `{\n  "data": {\n    "project": {\n      "title": "Nexus Backend & GraphQL Gateway",\n      "version": "v1.8.4",\n      "p99Latency": "42ms",\n      "cacheHitRate": "94.2%",\n      "activeServices": ["Auth", "Firestore", "RateLimiter"]\n    }\n  }\n}`
  );
  const [isExecutingGql, setIsExecutingGql] = useState<boolean>(false);

  useEffect(() => {
    if (initialTab) setTab(initialTab);
  }, [initialTab]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // Safe Calculator evaluator
  const handleEvaluateMath = (expression: string) => {
    try {
      const sanitized = expression
        .replace(/pi/gi, String(Math.PI))
        .replace(/e/gi, String(Math.E))
        .replace(/\^/g, "**")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/log\(/g, "Math.log10(");

      // Safe evaluation of mathematical tokens only
      if (!/^[0-9+\-*/().\s,MathsincotaqrlogEPI*]+$/.test(sanitized)) {
        setCalcResult("Invalid syntax");
        return;
      }

      const result = Function(`"use strict"; return (${sanitized});`)();
      const num = Number(result);
      setCalcResult(isNaN(num) ? "Error" : num.toFixed(4).replace(/\.?0+$/, ""));

      // Tokenize preview
      const parts = expression.match(/[a-zA-Z]+|[0-9.]+|[+\-*/^()]/g) || [];
      setCalcTokens(parts.map((p) => `TOKEN(${p})`));
    } catch {
      setCalcResult("Evaluation error");
    }
  };

  const handleRunGql = () => {
    setIsExecutingGql(true);
    setTimeout(() => {
      setIsExecutingGql(false);
      setGqlResponse(
        `{\n  "data": {\n    "project": {\n      "title": "${project.title}",\n      "version": "${project.version}",\n      "status": "${project.status}",\n      "timestamp": "${new Date().toISOString()}",\n      "clusterStatus": "ONLINE_HEALTHY"\n    }\n  },\n  "extensions": {\n    "queryDurationMs": 28,\n    "cacheHit": true\n  }\n}`
      );
    }, 350);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 text-foreground shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border/80 px-4 py-3 sm:px-6 sm:py-4 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent font-mono text-xs font-bold">
              3D
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-base sm:text-lg font-bold tracking-tight text-white truncate">
                  {project.title}
                </h2>
                <span className="rounded-md border border-accent/30 bg-accent/10 px-1.5 sm:px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-accent font-semibold shrink-0">
                  {project.version}
                </span>
              </div>
              <p className="font-mono text-[11px] sm:text-xs text-slate-400 truncate max-w-[200px] sm:max-w-md">{project.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1.5 font-mono text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <GitHubIcon className="size-3.5" />
              <span className="hidden sm:inline">Source</span>
              <ArrowUpRight className="size-3" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="flex size-8 sm:size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Tab Controls - Responsive with smooth touch scrolling */}
        <div className="flex items-center gap-1.5 sm:gap-2 border-b border-border/60 bg-black/40 px-3 sm:px-6 py-2 sm:py-2.5 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setTab("architecture")}
            className={`flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-xs font-semibold transition-colors ${
              tab === "architecture"
                ? "bg-accent text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Cpu className="size-3.5" />
            <span className="hidden sm:inline">3D System Architecture</span>
            <span className="sm:hidden">Architecture</span>
          </button>

          <button
            type="button"
            onClick={() => setTab("sandbox")}
            className={`flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-xs font-semibold transition-colors ${
              tab === "sandbox"
                ? "bg-accent text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Play className="size-3.5 fill-current" />
            <span className="hidden sm:inline">Interactive Sandbox</span>
            <span className="sm:hidden">Sandbox</span>
          </button>

          <button
            type="button"
            onClick={() => setTab("commits")}
            className={`flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-xs font-semibold transition-colors ${
              tab === "commits"
                ? "bg-accent text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <GitCommit className="size-3.5" />
            <span className="hidden sm:inline">Changelog &amp; Commits</span>
            <span className="sm:hidden">Commits</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-sm">
          {/* TAB 1: ARCHITECTURE */}
          {tab === "architecture" && (
            <div className="space-y-6">
              {/* Top Banner Overview */}
              <div className="grid gap-6 md:grid-cols-12 items-center">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 md:col-span-5">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                    <span>Status: {project.status}</span>
                    <span>{project.category}</span>
                  </div>
                </div>

                <div className="md:col-span-7">
                  <h3 className="font-display text-xl font-bold text-white">
                    Engineering Overview
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {project.description}
                  </p>

                  {/* Metrics Grid */}
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {project.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-white/10 bg-white/5 p-3 text-center font-mono"
                      >
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                          {m.label}
                        </p>
                        <p className="mt-1 text-xs font-bold text-accent tabular-nums">
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Architectural Decomposition */}
              <div>
                <h4 className="flex items-center gap-2 font-display text-base font-bold text-white">
                  <Layers className="size-4 text-accent" />
                  <span>Architectural Layer Decomposition</span>
                </h4>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {project.architecture.map((arch, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-accent/40"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex size-5 items-center justify-center rounded-md bg-accent/20 font-mono text-[10px] font-bold text-accent">
                          0{idx + 1}
                        </span>
                        <h5 className="font-mono text-xs font-semibold text-white">
                          {arch.layer}
                        </h5>
                      </div>
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                        {arch.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Highlights */}
              <div>
                <h4 className="flex items-center gap-2 font-display text-base font-bold text-white">
                  <CheckCircle2 className="size-4 text-emerald-400" />
                  <span>Engineering Highlights &amp; Invariants</span>
                </h4>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {project.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-slate-300"
                    >
                      <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE INTERACTIVE SANDBOX */}
          {tab === "sandbox" && (
            <div>
              {/* CALCULATOR SANDBOX */}
              {project.sandboxType === "calculator" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        Kira AST Math Kernel Live Sandbox
                      </h3>
                      <p className="font-mono text-xs text-slate-400">
                        Test the Shunting-Yard mathematical expression parser directly in browser.
                      </p>
                    </div>
                    <span className="font-mono text-xs text-emerald-400">● 120 tests verified</span>
                  </div>

                  {/* Calculator Console */}
                  <div className="rounded-2xl border border-white/15 bg-black/70 p-5 font-mono shadow-inner">
                    <label htmlFor="calc-expr-input" className="text-xs text-slate-400 block mb-2">
                      Input Mathematical Expression:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        id="calc-expr-input"
                        type="text"
                        value={calcInput}
                        onChange={(e) => setCalcInput(e.target.value)}
                        placeholder="e.g. sin(pi/4) * 8 + 2^3"
                        className="flex-1 rounded-xl border border-white/20 bg-slate-900 px-4 py-2.5 font-mono text-sm text-white focus:border-accent focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleEvaluateMath(calcInput)}
                        className="rounded-xl bg-accent px-6 py-2.5 font-mono text-xs font-bold text-white shadow-glow hover:bg-accent/90"
                      >
                        Evaluate AST
                      </button>
                    </div>

                    {/* Result Output */}
                    <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3.5">
                      <span className="text-xs text-emerald-300">Computed Output:</span>
                      <span className="text-xl font-bold text-emerald-400 tabular-nums">
                        {calcResult}
                      </span>
                    </div>

                    {/* Parsed Tokens */}
                    <div className="mt-4">
                      <p className="text-[11px] text-slate-400 mb-2">
                        Tokenized Stream (Operator Precedence Tree):
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {calcTokens.map((tok, i) => (
                          <span
                            key={i}
                            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-cyan-300"
                          >
                            {tok}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Preset Quick Chips */}
                  <div>
                    <p className="font-mono text-xs text-slate-400 mb-2">Try Preset Equations:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "sqrt(144) + 2^4",
                        "cos(pi/3) * 100",
                        "log(1000) * 15 + 5",
                        "sin(pi/2) * (8 + 2)",
                      ].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setCalcInput(preset);
                            handleEvaluateMath(preset);
                          }}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300 hover:border-accent hover:text-white"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* REEL STUDIO SANDBOX */}
              {project.sandboxType === "reel-studio" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        AI Reel Storyboard &amp; Timeline Simulator
                      </h3>
                      <p className="font-mono text-xs text-slate-400">
                        Prompt-driven multimodal script synthesis and canvas frame orchestrator.
                      </p>
                    </div>
                    <span className="font-mono text-xs text-accent">● Gemini Multimodal Engine</span>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-black/70 p-5 font-mono">
                    <label htmlFor="reel-prompt-input" className="text-xs text-slate-400 block mb-2">
                      Creative Video Prompt:
                    </label>
                    <textarea
                      id="reel-prompt-input"
                      rows={2}
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-slate-900 p-3 font-mono text-xs text-white focus:border-accent focus:outline-none"
                    />

                    {/* Timeline Preview */}
                    <div className="mt-4 border-t border-white/10 pt-4">
                      <div className="flex items-center justify-between mb-3 text-xs">
                        <span className="text-slate-400">Storyboard Scene Frames (9:16 Vertical):</span>
                        <button
                          type="button"
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1 text-accent hover:bg-accent/20"
                        >
                          <Volume2 className="size-3.5" />
                          <span>{isPlayingAudio ? "Stop Audio Wave" : "Play Simulated Voiceover"}</span>
                        </button>
                      </div>

                      {/* Frame Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 1, time: "0:00 - 0:05", title: "Scene 1: Hook & Tokenization" },
                          { id: 2, time: "0:05 - 0:15", title: "Scene 2: Grammar Parse Tree" },
                          { id: 3, time: "0:15 - 0:30", title: "Scene 3: Execution Kernel" },
                        ].map((frame) => (
                          <div
                            key={frame.id}
                            onClick={() => setActiveFrame(frame.id)}
                            className={`cursor-pointer rounded-xl border p-3 transition-colors ${
                              activeFrame === frame.id
                                ? "border-accent bg-accent/10"
                                : "border-white/10 bg-white/5 hover:border-white/20"
                            }`}
                          >
                            <span className="text-[10px] text-accent block">{frame.time}</span>
                            <p className="mt-1 text-xs font-semibold text-white line-clamp-1">
                              {frame.title}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Simulated Audio Spectrum Waveform */}
                      <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/90 p-3">
                        <p className="text-[10px] text-slate-400 mb-2">
                          Web Audio API Frequency Spectrum (60 FPS):
                        </p>
                        <div className="flex items-end gap-1 h-12">
                          {Array.from({ length: 36 }).map((_, i) => {
                            const height = isPlayingAudio
                              ? Math.max(15, ((Math.sin(i * 0.4 + audioTick * 0.4) + 1) / 2) * 100)
                              : ((i * 7) % 60) + 10;
                            return (
                              <div
                                key={i}
                                style={{ height: `${height}%` }}
                                className="flex-1 rounded-t-xs bg-gradient-to-t from-accent to-cyan-400 transition-all duration-150"
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* GRAPHQL SANDBOX */}
              {project.sandboxType === "graphql" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        GraphQL Gateway &amp; Telemetry Explorer
                      </h3>
                      <p className="font-mono text-xs text-slate-400">
                        Interactive query runner with DataLoader caching and latency profiling.
                      </p>
                    </div>
                    <span className="font-mono text-xs text-emerald-400">● P99: 42ms</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Query Editor */}
                    <div className="rounded-2xl border border-white/15 bg-black/70 p-4 font-mono">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400">GraphQL Query:</span>
                        <button
                          type="button"
                          disabled={isExecutingGql}
                          onClick={handleRunGql}
                          className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50"
                        >
                          <Play className="size-3 fill-current" />
                          <span>{isExecutingGql ? "Executing..." : "Run Query"}</span>
                        </button>
                      </div>
                      <textarea
                        rows={10}
                        value={gqlQuery}
                        onChange={(e) => setGqlQuery(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-slate-900 p-3 font-mono text-xs text-cyan-300 focus:outline-none"
                      />
                    </div>

                    {/* JSON Response */}
                    <div className="rounded-2xl border border-white/15 bg-black/70 p-4 font-mono">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400">Response Payload (JSON):</span>
                        <span className="text-[10px] text-emerald-400">200 OK · 28ms</span>
                      </div>
                      <pre className="h-[210px] overflow-auto rounded-xl border border-white/10 bg-slate-900 p-3 font-mono text-xs text-emerald-300">
                        {gqlResponse}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* PERFORMANCE SANDBOX */}
              {project.sandboxType === "performance" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        Next.js 15 RSC &amp; Lighthouse Profiler
                      </h3>
                      <p className="font-mono text-xs text-slate-400">
                        Real-time audit telemetry, Core Web Vitals, and bundle analysis.
                      </p>
                    </div>
                    <span className="font-mono text-xs text-accent">● Edge Container Standalone</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-4">
                    {[
                      { label: "Performance", score: "100", grade: "Optimal" },
                      { label: "Accessibility", score: "100", grade: "WCAG AA" },
                      { label: "Best Practices", score: "100", grade: "Verified" },
                      { label: "SEO Audit", score: "100", grade: "Structured" },
                    ].map((audit, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-center font-mono"
                      >
                        <div className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-emerald-400 text-xl font-bold text-emerald-400">
                          {audit.score}
                        </div>
                        <p className="mt-2 text-xs font-semibold text-white">{audit.label}</p>
                        <p className="text-[10px] text-emerald-300">{audit.grade}</p>
                      </div>
                    ))}
                  </div>

                  {/* Core Web Vitals Row */}
                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4 font-mono">
                    <p className="text-xs text-slate-400 mb-3">Core Web Vitals Metrics (P75):</p>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <span className="text-[10px] text-slate-400">LCP</span>
                        <p className="text-base font-bold text-emerald-400">0.42s</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <span className="text-[10px] text-slate-400">FID</span>
                        <p className="text-base font-bold text-emerald-400">8ms</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <span className="text-[10px] text-slate-400">CLS</span>
                        <p className="text-base font-bold text-emerald-400">0.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: COMMITS & CHANGELOG */}
          {tab === "commits" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Git Commits &amp; Release History
                  </h3>
                  <p className="font-mono text-xs text-slate-400">
                    Chronological git log and technical architecture notes for {project.title}.
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-400">Branch: main</span>
              </div>

              <div className="space-y-3">
                {project.commits.map((c, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 font-mono"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent text-xs">
                        <GitCommit className="size-4" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{c.msg}</span>
                          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-cyan-300">
                            {c.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">Author: Mithlesh Kumar Das</p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col sm:items-end justify-between text-xs text-slate-400 border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
                      <span className="font-mono text-accent">{c.hash}</span>
                      <span className="text-[11px]">{c.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-border/80 bg-black/60 px-6 py-3 text-xs font-mono text-slate-400">
          <span>Ready for Deployment · AI Studio Node.js Runtime</span>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-bold text-accent hover:text-accent-2 transition-colors"
          >
            <span>Clone Repo</span>
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
