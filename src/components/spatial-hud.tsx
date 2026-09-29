"use client";

import { useState, useEffect } from "react";
import { Minimize2, Move3d } from "lucide-react";

interface TelemetryData {
  sectorId: string;
  sectorName: string;
  sectorIndex: number;
  totalSectors: number;
  x: string;
  y: string;
  z: string;
  mode: "reactive" | "orbit" | "zen";
}

export default function SpatialHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    sectorId: "home",
    sectorName: "01 // NEXUS CORE",
    sectorIndex: 1,
    totalSectors: 8,
    x: "0.00",
    y: "0.00",
    z: "7.80",
    mode: "reactive",
  });

  useEffect(() => {
    const handleTelemetry = (e: Event) => {
      const custom = e as CustomEvent<TelemetryData>;
      if (custom.detail) {
        setTelemetry(custom.detail);
      }
    };

    window.addEventListener("spatial-telemetry-update", handleTelemetry as EventListener);
    return () => {
      window.removeEventListener("spatial-telemetry-update", handleTelemetry as EventListener);
    };
  }, []);

  const changeMode = (mode: "reactive" | "orbit" | "zen") => {
    setTelemetry((prev) => ({ ...prev, mode }));
    window.dispatchEvent(new CustomEvent("set-spatial-mode", { detail: { mode } }));
  };

  const scrollToSector = (sectorId: string) => {
    const el = document.getElementById(sectorId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside aria-label="3D Spatial Viewport Controls" className="fixed bottom-4 left-4 z-40 select-none">
      {/* Expanded Control Matrix */}
      {isOpen && (
        <div className="mb-2 w-72 sm:w-80 rounded-2xl border border-border/80 bg-card/90 p-4 shadow-soft backdrop-blur-xl animate-hero-scale">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-cyan-500" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                3D Spatial Telemetry
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close 3D Spatial controls"
              className="rounded-lg p-1 text-muted hover:bg-white/10 hover:text-foreground transition-colors"
            >
              <Minimize2 className="size-3.5" />
            </button>
          </div>

          {/* Real-time Sector Readout */}
          <div className="mt-3 space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between rounded-xl bg-background/50 border border-border/50 px-3 py-1.5">
              <span className="text-muted">ACTIVE SECTOR:</span>
              <span className="font-semibold text-accent truncate max-w-[170px]">
                {telemetry.sectorName}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="rounded-lg bg-background/40 border border-border/40 p-1.5">
                <span className="text-[10px] text-muted">CAM X</span>
                <p className="font-semibold text-cyan-400">{telemetry.x}</p>
              </div>
              <div className="rounded-lg bg-background/40 border border-border/40 p-1.5">
                <span className="text-[10px] text-muted">CAM Y</span>
                <p className="font-semibold text-indigo-400">{telemetry.y}</p>
              </div>
              <div className="rounded-lg bg-background/40 border border-border/40 p-1.5">
                <span className="text-[10px] text-muted">CAM Z</span>
                <p className="font-semibold text-amber-400">{telemetry.z}</p>
              </div>
            </div>
          </div>

          {/* Perspective Flight Modes */}
          <div className="mt-3.5">
            <span className="font-mono text-[10px] uppercase text-muted tracking-wider">
              Camera Motion Mode
            </span>
            <div className="mt-1.5 grid grid-cols-3 gap-1.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => changeMode("reactive")}
                className={`rounded-xl px-2 py-1.5 text-center transition-all ${
                  telemetry.mode === "reactive"
                    ? "bg-accent text-white shadow-xs font-semibold"
                    : "border border-border/60 bg-background/40 text-muted hover:text-foreground"
                }`}
              >
                Reactive
              </button>
              <button
                type="button"
                onClick={() => changeMode("orbit")}
                className={`rounded-xl px-2 py-1.5 text-center transition-all ${
                  telemetry.mode === "orbit"
                    ? "bg-accent text-white shadow-xs font-semibold"
                    : "border border-border/60 bg-background/40 text-muted hover:text-foreground"
                }`}
              >
                Orbit 360°
              </button>
              <button
                type="button"
                onClick={() => changeMode("zen")}
                className={`rounded-xl px-2 py-1.5 text-center transition-all ${
                  telemetry.mode === "zen"
                    ? "bg-accent text-white shadow-xs font-semibold"
                    : "border border-border/60 bg-background/40 text-muted hover:text-foreground"
                }`}
              >
                Zen
              </button>
            </div>
          </div>

          {/* Spatial Skill Badges Indicator */}
          <div className="mt-3 rounded-xl bg-background/50 border border-border/50 p-2 font-mono text-[10px]">
            <div className="flex items-center justify-between text-muted mb-1">
              <span>3D SKILL NODES:</span>
              <span className="text-emerald-400 font-semibold">10 Icons Live</span>
            </div>
            <div className="flex flex-wrap gap-1 text-[9px] text-foreground-muted">
              {["Python", "React", "Next.js", "FastAPI", "Docker", "PostgreSQL", "TS", "Git"].map((name) => (
                <span key={name} className="rounded-md bg-white/5 px-1.5 py-0.5 border border-white/10">
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Sector Warp Buttons */}
          <div className="mt-3.5 border-t border-border/60 pt-2.5">
            <span className="font-mono text-[10px] uppercase text-muted tracking-wider">
              Quick Warp Sector
            </span>
            <div className="mt-1.5 flex flex-wrap gap-1 font-mono text-[10px]">
              {[
                { id: "home", label: "Hero" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "experience", label: "Timeline" },
                { id: "contact", label: "Contact" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToSector(s.id)}
                  className="rounded-lg border border-border/60 bg-background/40 px-2 py-1 text-foreground-muted hover:border-accent hover:text-accent transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-3 text-[10px] font-mono text-muted text-center">
            Adaptive opacity scrim maintains 100% text readability.
          </p>
        </div>
      )}

      {/* Floating Status Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-2 rounded-2xl border border-border/80 bg-card/85 px-3 py-2 font-mono text-xs text-foreground shadow-soft backdrop-blur-xl transition-all duration-300 hover:border-accent hover:bg-card hover:shadow-glow"
        title="Toggle 3D Spatial Telemetry Controller"
      >
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-cyan-500" />
        </span>

        <Move3d className="size-3.5 text-accent transition-transform duration-300 group-hover:rotate-45" />

        <span className="hidden sm:inline font-semibold text-accent">3D Spatial</span>
        <span className="text-muted hidden sm:inline">·</span>
        <span className="text-foreground-muted truncate max-w-[130px] sm:max-w-[180px]">
          {telemetry.sectorName.replace(/^\d+\s*\/\/\s*/, "")}
        </span>

        <span className="hidden min-[480px]:inline-block rounded-md bg-white/5 border border-white/10 px-1.5 py-0.5 text-[10px] text-muted font-mono">
          Z:{telemetry.z}
        </span>
      </button>
    </aside>
  );
}
