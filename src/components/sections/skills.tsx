"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Terminal,
} from "lucide-react";
import Section from "@/components/section";
import Reveal from "@/components/reveal";

interface SkillDetail {
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "DevOps";
  level: string;
  percent: number;
  highlight?: boolean;
  projectUsage: string;
  coreConcepts: string;
}

const skillsDatabase: SkillDetail[] = [
  // Languages
  {
    name: "Python",
    category: "Languages",
    level: "Advanced Proficiency",
    percent: 92,
    highlight: true,
    projectUsage: "Kira Calculator & Smart Watchdog",
    coreConcepts: "AST parsing · PySide6 GUI · pytest suites · OOP architecture",
  },
  {
    name: "TypeScript & JavaScript (ES6+)",
    category: "Languages",
    level: "Advanced Proficiency",
    percent: 90,
    highlight: true,
    projectUsage: "StockMatrix & Next.js 15 Suite",
    coreConcepts: "Strict type systems · Generics · Async/Await · Functional composition",
  },
  {
    name: "HTML5 & Semantic Markup",
    category: "Languages",
    level: "Core Standard",
    percent: 95,
    projectUsage: "Production Web Applications",
    coreConcepts: "Accessibility (WCAG AA) · Responsive layouts · Microdata schemas",
  },
  {
    name: "CSS3 & Modern Layouts",
    category: "Languages",
    level: "Core Standard",
    percent: 92,
    projectUsage: "Modern Web Interfaces",
    coreConcepts: "Tailwind v4 · Flexbox & CSS Grid · Custom properties · Keyframe physics",
  },

  // Frontend
  {
    name: "React.js & React 19",
    category: "Frontend",
    level: "Production Ready",
    percent: 94,
    highlight: true,
    projectUsage: "StockMatrix & AI Reel Studio",
    coreConcepts: "Hooks lifecycle · React 19 Actions · Optimistic state · Virtualized feeds",
  },
  {
    name: "Next.js 15 (App Router)",
    category: "Frontend",
    level: "Production Ready",
    percent: 92,
    highlight: true,
    projectUsage: "Portfolio & Full-Stack Suite",
    coreConcepts: "Server Components · Server Actions · Standalone output · Edge caching",
  },
  {
    name: "Three.js & WebGL",
    category: "Frontend",
    level: "Intermediate",
    percent: 82,
    highlight: true,
    projectUsage: "3D Spatial Rig & Constellations",
    coreConcepts: "Scene graphs · Custom geometry · Shader materials · Orbit raycasting",
  },
  {
    name: "PySide6 (Qt GUI)",
    category: "Frontend",
    level: "Advanced",
    percent: 88,
    highlight: true,
    projectUsage: "Kira Scientific Calculator",
    coreConcepts: "QWidgets · Signal/Slot architecture · Custom QStyles · Event filters",
  },
  {
    name: "Tailwind CSS & Framer Motion",
    category: "Frontend",
    level: "Production Ready",
    percent: 94,
    projectUsage: "Modern UI/UX Designs",
    coreConcepts: "Design tokens · Micro-interactions · Reduced-motion compliance",
  },

  // Backend
  {
    name: "FastAPI & Python WebSockets",
    category: "Backend",
    level: "Production Ready",
    percent: 89,
    highlight: true,
    projectUsage: "StockMatrix Trading Engine",
    coreConcepts: "Async event loops · WebSocket broadcasters · Pydantic validation · CORS",
  },
  {
    name: "GraphQL & RESTful APIs",
    category: "Backend",
    level: "Production Ready",
    percent: 88,
    highlight: true,
    projectUsage: "Nexus Backend Gateway",
    coreConcepts: "Schema definition · Resolvers · Query optimization · Token authentication",
  },
  {
    name: "Firebase (Firestore & Auth)",
    category: "Backend",
    level: "Production Ready",
    percent: 90,
    highlight: true,
    projectUsage: "User Authentication & Storage",
    coreConcepts: "Real-time listeners · Security rules · Multi-factor auth · FCM push",
  },
  {
    name: "Node.js & Express",
    category: "Backend",
    level: "Working Knowledge",
    percent: 82,
    projectUsage: "Microservices & Serverless",
    coreConcepts: "Middleware chains · Event emitters · RESTful routing · Environment configs",
  },

  // DevOps
  {
    name: "Git & GitHub Version Control",
    category: "DevOps",
    level: "Advanced Workflow",
    percent: 95,
    highlight: true,
    projectUsage: "17+ Active Public Repos",
    coreConcepts: "Trunk-based branching · Merge rebasing · Conflict resolution · Semantic commits",
  },
  {
    name: "GitHub Actions (CI/CD)",
    category: "DevOps",
    level: "Production Ready",
    percent: 86,
    highlight: true,
    projectUsage: "Automated Build & Test Pipelines",
    coreConcepts: "Multi-job workflows · Matrix runners · Cache actions · Secret management",
  },
  {
    name: "Docker (Containerization)",
    category: "DevOps",
    level: "Intermediate",
    percent: 80,
    projectUsage: "Reproducible Dev Environments",
    coreConcepts: "Multi-stage Dockerfiles · Compose orchestration · Alpine images",
  },
  {
    name: "pytest & Unit Testing",
    category: "DevOps",
    level: "Advanced",
    percent: 90,
    highlight: true,
    projectUsage: "Kira AST Math & Backend Suites",
    coreConcepts: "Parameterized tests · Fixtures · Mock objects · Code coverage reports",
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: "All Technologies" },
    { id: "Languages", label: "Core Languages" },
    { id: "Frontend", label: "Frontend & UI" },
    { id: "Backend", label: "Backend & APIs" },
    { id: "DevOps", label: "DevOps & Testing" },
  ];

  const filteredSkills = skillsDatabase.filter((s) => {
    if (activeCategory === "All") return true;
    return s.category === activeCategory;
  });

  return (
    <Section
      id="skills"
      eyebrow="02 · Technical Matrix"
      title="Skills &amp; Engineering Stack"
      subtitle="Hands-on languages, frameworks, and developer workflows verified across real open-source systems."
    >
      {/* Category Tabs */}
      <Reveal direction="fade" delay={0.05} className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-card/80 p-1.5 shadow-soft">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-accent text-white shadow-xs"
                    : "text-muted hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted">
            <Terminal className="size-3.5 text-accent" />
            <span>Real Repository Verified</span>
          </div>
        </div>
      </Reveal>

      {/* Skills Matrix Grid with staggered scroll reveal */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.map((skill, idx) => (
          <Reveal
            key={skill.name}
            direction="up"
            delay={(idx % 6) * 0.06}
            threshold={0.08}
          >
            <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card/75 backdrop-blur-md p-5 transition-all duration-300 hover:border-accent/50 hover:bg-card hover:-translate-y-1 hover:shadow-soft">
              <div>
                {/* Header: Skill Name & Category */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground group-hover:text-accent transition-colors">
                      {skill.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted">
                      {skill.level}
                    </p>
                  </div>

                  <span className="font-mono text-xs font-semibold text-accent tabular-nums">
                    {skill.percent}%
                  </span>
                </div>

                {/* Progress Gauge */}
                <div className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                  <div
                    style={{ width: `${skill.percent}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-700 ease-out"
                  />
                </div>

                {/* Concepts list */}
                <p className="mt-3 text-xs leading-relaxed text-foreground-muted">
                  {skill.coreConcepts}
                </p>
              </div>

              {/* Verified Project Link / Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] font-mono text-muted">
                <span className="truncate text-accent font-medium">
                  {skill.projectUsage}
                </span>
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Bottom Engineering Proof Banner */}
      <Reveal direction="scale" delay={0.15} className="mt-10">
        <div className="surface grid grid-cols-2 gap-4 rounded-3xl border border-border p-6 shadow-soft sm:grid-cols-4 sm:gap-6 text-center">
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              17+
            </p>
            <p className="mt-1 text-xs font-mono text-muted">
              Public Repositories
            </p>
          </div>
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-accent">
              100%
            </p>
            <p className="mt-1 text-xs font-mono text-muted">
              Type-Safe TS &amp; Python
            </p>
          </div>
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-500">
              99.2%
            </p>
            <p className="mt-1 text-xs font-mono text-muted">
              pytest Test Pass Rate
            </p>
          </div>
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              CI/CD
            </p>
            <p className="mt-1 text-xs font-mono text-muted">
              Automated Workflows
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
