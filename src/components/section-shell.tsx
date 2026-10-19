"use client";

import type { ReactNode } from "react";
import Reveal from "./reveal";
import { cn } from "@/lib/utils";

export interface SectionShellProps {
  id: string;
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  side?: "left" | "right";
  accent?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Studio section: full-viewport row with a large curved-corner content card
 * alternating left/right so the 3D room stays visible on the open side.
 */
export default function SectionShell({
  id,
  index,
  label,
  title,
  subtitle,
  side = "left",
  accent = "#e5a1aa",
  children,
  className,
}: SectionShellProps) {
  const align = side === "left" ? "items-start" : "items-end";
  const cardAlign = side === "left" ? "mr-auto" : "ml-auto";

  return (
    <section
      id={id}
      className={cn(
        "relative flex min-h-[100svh] items-center py-28 sm:py-32",
        className
      )}
    >
      <div className={cn("mx-auto flex w-full max-w-6xl px-4 sm:px-6", align)}>
        <Reveal
          direction={side === "left" ? "left" : "right"}
          className={cn("w-full max-w-[34rem]", cardAlign)}
        >
          <div className="mb-4 flex items-end gap-3 sm:mb-5">
            <span
              className="font-display text-5xl font-bold leading-none tracking-tight sm:text-6xl"
              style={{
                color: "transparent",
                WebkitTextStroke: `1.5px ${accent}`,
              }}
              aria-hidden="true"
            >
              {index}
            </span>
            <span
              className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: accent }}
            >
              {label}
            </span>
          </div>

          <div className="section-card rounded-[42px] p-7 sm:rounded-[52px] sm:p-9">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-[2.4rem] sm:leading-[1.12]">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {subtitle}
              </p>
            ) : null}
            <div className="mt-6 sm:mt-7">{children}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
