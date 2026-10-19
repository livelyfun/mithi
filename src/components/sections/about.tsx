import { about } from "@/lib/site";
import SectionShell from "@/components/section-shell";
import Reveal from "@/components/reveal";

const DOTS = ["#e5a1aa", "#8395CD", "#7AD0AC", "#c9b8f0", "#f0d28c"];

export default function About() {
  return (
    <SectionShell
      id="about"
      index="01"
      label="About"
      title="A developer who ships, breaks, understands, and improves."
      subtitle={about.headline}
      side="left"
      accent="#e5a1aa"
    >
      <div className="space-y-4">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={0.05 * i}>
            <p className="text-[15px] leading-relaxed text-foreground-muted">
              {p}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="mt-7 space-y-3">
        {about.focusAreas.map((area, i) => (
          <Reveal key={area.title} delay={0.04 * i}>
            <div className="flex items-start gap-3">
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full"
                style={{ backgroundColor: DOTS[i % DOTS.length] }}
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {area.title}
                </p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-muted">
                  {area.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {about.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={0.05 * i} className="h-full">
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-background/40 px-3 py-4 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-xl font-bold text-foreground">
                {stat.value}
              </dd>
              <p className="mt-1 text-[11px] leading-tight text-muted">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </dl>
    </SectionShell>
  );
}
