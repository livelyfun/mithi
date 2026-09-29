import type { ReactNode } from "react";
import Reveal from "./reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Consistent refined section shell: id anchor, eyebrow label, gradient title,
 * optional subtitle, and a shared vertical rhythm.
 */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-32", className)}>
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            {eyebrow ? (
              <span className="eyebrow">
                <span className="h-px w-8 bg-accent/50" />
                {eyebrow}
                <span className="h-px w-8 bg-accent/50" />
              </span>
            ) : null}
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span className="text-gradient-soft">{title}</span>
            </h2>
            {subtitle ? (
              <p className="mt-4 text-lg leading-relaxed text-muted">
                {subtitle}
              </p>
            ) : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
