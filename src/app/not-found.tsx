import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-foreground">
      <div className="section-card max-w-md rounded-[42px] p-10">
        <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-sm font-semibold text-accent">
          404 · Page Not Found
        </span>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Lost in the studio
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-foreground-muted sm:text-base">
          This room doesn&apos;t exist — the page you asked for was never
          built into the house.
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            <ArrowLeft className="size-4" />
            <span>Return to the studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
