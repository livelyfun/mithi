import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-foreground text-center">
      <div className="max-w-md space-y-4">
        <span className="font-mono text-sm font-semibold text-accent px-3 py-1 rounded-full border border-accent/30 bg-accent/10">
          404 · Page Not Found
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
          Lost in Space
        </h1>
        <p className="text-foreground-muted text-sm sm:text-base">
          The requested coordinate or project node does not exist in this workstation.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
          >
            <ArrowLeft className="size-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
