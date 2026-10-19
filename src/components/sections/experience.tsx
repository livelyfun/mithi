import { GraduationCap } from "lucide-react";
import { educationList, competencyGroups, developerLogs } from "@/lib/site";
import SectionShell from "@/components/section-shell";
import Reveal from "@/components/reveal";

const TYPE_STYLES: Record<string, string> = {
  Architecture: "bg-[#c9b8f0]/15 text-[#7c6bb0] dark:text-[#c9b8f0]",
  Feature: "bg-[#7AD0AC]/15 text-[#4faf8d] dark:text-[#7AD0AC]",
  Performance: "bg-[#f0d28c]/15 text-[#a4842f] dark:text-[#f0d28c]",
  "CI/CD": "bg-[#8395CD]/15 text-[#5a6ca8] dark:text-[#8395CD]",
};

export default function Experience() {
  return (
    <SectionShell
      id="experience"
      index="04"
      label="Experience"
      title="Learning in public — studies, strengths, and engineering logs."
      side="right"
      accent="#c9b8f0"
    >
      <div className="space-y-3">
        {educationList.map((edu, i) => (
          <Reveal key={edu.institution + edu.degree} delay={0.04 * i}>
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-4">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#c9b8f0]/12 text-[#9b86d4] dark:text-[#c9b8f0]">
                <GraduationCap className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {edu.degree}
                </p>
                <p className="mt-0.5 text-[12.5px] text-muted">
                  {edu.institution} · {edu.location}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[10.5px] text-muted">
                  <span>{edu.period}</span>
                  {edu.score ? (
                    <span className="rounded-full bg-card/80 px-2 py-px">
                      {edu.score}
                    </span>
                  ) : null}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.05}>
        <div className="mt-6">
          <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            Core traits
          </h3>
          <div className="mt-3 space-y-3">
            {competencyGroups.map((group) => (
              <div key={group.category}>
                <p className="text-[12px] font-semibold text-foreground">
                  {group.category}
                </p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-card/60 px-2.5 py-0.5 text-[11.5px] text-foreground-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-7 border-t border-border pt-6">
          <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            Engineering log
          </h3>
          <ul className="mt-3 space-y-3">
            {developerLogs.map((log) => (
              <li key={log.id} className="rounded-2xl border border-border bg-background/40 p-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-px font-mono text-[10px] font-semibold ${
                      TYPE_STYLES[log.type] ?? TYPE_STYLES.Feature
                    }`}
                  >
                    {log.type}
                  </span>
                  <span className="font-mono text-[10.5px] text-muted">
                    {log.date} · {log.project}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] font-semibold leading-snug text-foreground">
                  {log.title}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted">
                  {log.summary}
                </p>
                <p className="mt-1.5 font-mono text-[10.5px] text-[#9b86d4] dark:text-[#c9b8f0]">
                  {log.diffStats}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </SectionShell>
  );
}
