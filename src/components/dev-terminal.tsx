"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from "lucide-react";
import { projects, profile, developerLogs, devSystem, type Project } from "@/lib/site";

interface DevTerminalProps {
  onInspectProject?: (project: Project) => void;
}

interface HistoryItem {
  id: string;
  command: string;
  output: string | React.ReactNode;
}

export default function DevTerminal({ onInspectProject }: DevTerminalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [terminalLogs, setTerminalLogs] = useState<HistoryItem[]>([
    {
      id: "init-0",
      command: "welcome",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-accent font-bold">Mithlesh Kumar Das — Developer Terminal (v2.4)</p>
          <p className="text-xs text-slate-400">
            Node.js v22 · Next.js 15 · Three.js 3D Spatial Rig Active.
          </p>
          <p className="text-xs text-slate-400">
            Type <span className="text-accent font-semibold">help</span> to list commands or click shortcuts below.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLogs, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Global hotkey: press ` (backtick) or ~ to toggle terminal
  useEffect(() => {
    const handleGlobalKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "`" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add to history
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    let output: string | React.ReactNode = "";

    switch (mainCmd) {
      case "help":
        output = (
          <div className="space-y-1 text-slate-300 text-xs">
            <p className="font-semibold text-white">Available Shell Commands:</p>
            <p><span className="text-accent font-mono w-28 inline-block">projects</span> — List all engineering projects with status</p>
            <p><span className="text-accent font-mono w-28 inline-block">inspect &lt;id&gt;</span> — Launch 3D workbench for a project</p>
            <p><span className="text-accent font-mono w-28 inline-block">calc &lt;math&gt;</span> — Evaluate expressions with Kira math kernel</p>
            <p><span className="text-accent font-mono w-28 inline-block">skills</span> — View full-stack &amp; backend technical competencies</p>
            <p><span className="text-accent font-mono w-28 inline-block">git log</span> — View latest developer commits &amp; architecture notes</p>
            <p><span className="text-accent font-mono w-28 inline-block">whoami</span> — Developer profile, education &amp; contact info</p>
            <p><span className="text-accent font-mono w-28 inline-block">clear</span> — Clear the terminal history</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-xs">
            <p className="font-semibold text-white">Featured Engineering Projects:</p>
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between border-b border-white/5 py-1">
                <div>
                  <span className="font-bold text-accent">{p.id}</span>
                  <span className="text-slate-400"> — {p.title} ({p.version})</span>
                </div>
                <button
                  type="button"
                  onClick={() => onInspectProject?.(p)}
                  className="rounded-sm bg-white/10 px-2 py-0.5 text-[11px] text-cyan-300 hover:bg-white/20"
                >
                  inspect
                </button>
              </div>
            ))}
          </div>
        );
        break;

      case "inspect":
        {
          const found = projects.find((p) => p.id === arg || p.title.toLowerCase().includes(arg.toLowerCase()));
          if (found) {
            output = `Launching 3D Workbench for ${found.title}...`;
            onInspectProject?.(found);
          } else {
            output = `Project '${arg}' not found. Run 'projects' to list valid IDs.`;
          }
        }
        break;

      case "calc":
        try {
          const sanitized = arg
            .replace(/pi/gi, String(Math.PI))
            .replace(/e/gi, String(Math.E))
            .replace(/\^/g, "**")
            .replace(/sin\(/g, "Math.sin(")
            .replace(/cos\(/g, "Math.cos(")
            .replace(/sqrt\(/g, "Math.sqrt(");
          const res = Function(`"use strict"; return (${sanitized});`)();
          output = (
            <div className="text-xs">
              <span className="text-slate-400">Input:</span> <span className="text-white">{arg}</span>
              <br />
              <span className="text-emerald-400 font-bold">Result: {Number(res).toFixed(4).replace(/\.?0+$/, "")}</span>
            </div>
          );
        } catch {
          output = `Evaluation error for expression '${arg}'.`;
        }
        break;

      case "skills":
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p><span className="text-accent font-semibold">Languages:</span> Python, JavaScript (ES6+), TypeScript, HTML5, CSS3</p>
            <p><span className="text-cyan-400 font-semibold">Frameworks:</span> React 19, Next.js 15, PySide6 (Qt), Tailwind CSS v4, Three.js</p>
            <p><span className="text-emerald-400 font-semibold">Backend:</span> RESTful APIs, GraphQL, Firebase Firestore, Node.js</p>
            <p><span className="text-pink-400 font-semibold">DevOps:</span> Git, GitHub Actions (CI/CD), Docker, pytest, standalone builds</p>
          </div>
        );
        break;

      case "git":
        if (arg === "log" || arg === "status") {
          output = (
            <div className="space-y-1.5 text-xs font-mono">
              <p className="text-slate-400">On branch {devSystem.branch} · Clean working tree</p>
              {developerLogs.slice(0, 3).map((l) => (
                <div key={l.id} className="text-slate-300">
                  <span className="text-accent">{l.id}</span> {l.title} (<span className="text-emerald-400">{l.diffStats}</span>)
                </div>
              ))}
            </div>
          );
        } else {
          output = "Try: 'git log' or 'git status'";
        }
        break;

      case "whoami":
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="font-bold text-white">{profile.name} — {profile.role}</p>
            <p className="text-slate-400">{profile.bioShort}</p>
            <p>Location: {profile.location} · Email: {profile.email}</p>
            <p>GitHub: <a href={profile.github} target="_blank" rel="noreferrer" className="text-accent underline">{profile.github}</a></p>
          </div>
        );
        break;

      case "clear":
        setTerminalLogs([]);
        setInputVal("");
        return;

      default:
        output = `command not found: ${mainCmd}. Type 'help' to see valid commands.`;
    }

    setTerminalLogs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        output,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(cmdHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open developer terminal"
        title="Open Developer Terminal (`)"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-2 rounded-2xl border border-white/20 bg-slate-950/90 px-3 py-2 sm:px-4 sm:py-2.5 font-mono text-xs font-semibold text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-105 hover:border-accent hover:shadow-glow"
      >
        <TerminalIcon className="size-3.5 sm:size-4 text-accent" />
        <span className="hidden sm:inline">dev-shell</span>
        <span className="rounded-sm border border-white/20 bg-white/10 px-1 text-[9px] sm:text-[10px] text-slate-300">
          `
        </span>
      </button>

      {/* Terminal Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
          />

          <div
            className={`surface relative flex w-full flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl border border-white/20 bg-slate-950 font-mono shadow-2xl transition-all ${
              isExpanded
                ? "h-[92vh] max-w-5xl"
                : "h-[85vh] sm:h-[500px] max-w-2xl"
            }`}
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-3 sm:px-4 py-2.5 sm:py-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 sm:size-3 rounded-full bg-red-500/80" />
                <span className="size-2.5 sm:size-3 rounded-full bg-amber-500/80" />
                <span className="size-2.5 sm:size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-1 sm:ml-2 font-mono text-[11px] sm:text-xs font-semibold text-slate-300 truncate max-w-[170px] sm:max-w-none">
                  mithlesh@workstation:~$
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={isExpanded ? "Collapse terminal window" : "Maximize terminal window"}
                  className="hidden sm:inline text-slate-400 hover:text-white"
                >
                  {isExpanded ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close terminal window"
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Quick Command Ribbon */}
            <div className="flex items-center gap-1.5 sm:gap-2 border-b border-white/5 bg-black/40 px-3 sm:px-4 py-1.5 text-[10px] sm:text-[11px] overflow-x-auto no-scrollbar">
              <span className="text-slate-500 shrink-0 text-[10px] sm:text-[11px]">Run:</span>
              {["projects", "skills", "git log", "calc sqrt(144)+2^3", "whoami", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => executeCommand(cmd)}
                  className="shrink-0 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300 hover:border-accent hover:text-white"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Output Area */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto p-4 text-xs text-slate-300"
            >
              {terminalLogs.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-accent">
                    <span className="text-slate-500">➜</span>
                    <span className="font-semibold text-emerald-400">~</span>
                    <span className="font-semibold text-white">{item.command}</span>
                  </div>
                  <div className="pl-4">{item.output}</div>
                </div>
              ))}
            </div>

            {/* Command Input Prompt */}
            <div className="flex items-center gap-2 border-t border-white/10 bg-slate-900/90 px-4 py-3 text-xs">
              <span className="text-slate-500">➜</span>
              <span className="font-semibold text-emerald-400">~</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type command ('help', 'projects', 'skills')..."
                className="flex-1 bg-transparent text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => executeCommand(inputVal)}
                aria-label="Submit command"
                className="text-accent hover:text-white"
              >
                <CornerDownLeft className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
