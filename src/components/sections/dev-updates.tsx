"use client";

import { useState } from "react";
import { GitCommit, Filter } from "lucide-react";
import Section from "@/components/section";
import Reveal from "@/components/reveal";
import { developerLogs, devSystem } from "@/lib/site";

export default function DevUpdatesSection() {
  const [filter, setFilter] = useState<string>("All");

  const filteredLogs = developerLogs.filter((log) => {
    if (filter === "All") return true;
    return log.type.toLowerCase() === filter.toLowerCase();
  });

  return (
    <Section
      id="dev-updates"
      eyebrow="Release Stream"
      title="Engineering Log &amp; System Updates"
      subtitle="Changelogs, architectural refactors, and performance benchmark milestones."
    >
      {/* System Telemetry Top Bar */}
      <div className="surface mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border p-4 font-mono text-xs shadow-soft">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-semibold text-foreground">Cluster:</span>
            <span className="text-emerald-500 font-medium">{devSystem.state}</span>
          </div>
          <span className="text-muted">·</span>
          <div>
            <span className="text-muted">Branch:</span>{" "}
            <span className="text-accent font-semibold">{devSystem.branch}</span>
          </div>
          <span className="text-muted">·</span>
          <div>
            <span className="text-muted">Runtime:</span>{" "}
            <span className="text-foreground">{devSystem.runtime}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-muted">
          <span>{devSystem.totalTests}</span>
          <span>·</span>
          <span className="text-accent font-semibold">P99: {devSystem.p99Latency}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-muted mr-1 flex items-center gap-1.5">
          <Filter className="size-3 text-accent" /> Filter Stream:
        </span>
        {["All", "Architecture", "Performance", "Feature"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-medium transition-all ${
              filter === cat
                ? "bg-accent text-white shadow-xs"
                : "border border-border bg-card/60 text-muted hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="space-y-4">
        {filteredLogs.map((log, idx) => (
          <Reveal key={log.id} delay={Math.min(idx * 0.06, 0.25)}>
            <div className="surface group relative flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-3xl border border-border p-5 sm:p-6 shadow-soft transition-all hover:border-accent/40 hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                  <GitCommit className="size-5" />
                </div>

                <div>
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="font-semibold text-accent">
                      {log.project}
                    </span>
                    <span className="text-muted">·</span>
                    <span className="text-foreground-muted">
                      {log.type}
                    </span>
                    <span className="text-muted">·</span>
                    <span className="text-muted">{log.date}</span>
                  </div>

                  <h3 className="mt-1.5 font-display text-base font-bold text-foreground">
                    {log.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted max-w-2xl">
                    {log.summary}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-border pt-3 sm:pt-0 font-mono text-xs">
                <span className="text-[11px] font-semibold text-emerald-500 tabular-nums">
                  {log.diffStats}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
