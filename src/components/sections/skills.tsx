import { skillCategories } from "@/lib/site";
import SectionShell from "@/components/section-shell";
import Reveal from "@/components/reveal";

export default function Skills() {
  return (
    <SectionShell
      id="skills"
      index="02"
      label="Skills"
      title="Tools I actually use — no filler."
      subtitle="Verified hands-on skills from shipped projects and current daily work."
      side="right"
      accent="#8395CD"
    >
      <div className="space-y-5">
        {skillCategories.map((cat, ci) => (
          <Reveal key={cat.title} delay={0.04 * ci}>
            <div className="rounded-2xl border border-border bg-background/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {cat.title}
                </h3>
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
                  {cat.badge}
                </span>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className={
                      item.highlight
                        ? "rounded-full border border-[#8395CD]/40 bg-[#8395CD]/10 px-3 py-1 text-[12px] font-medium text-foreground"
                        : "rounded-full border border-border bg-card/60 px-3 py-1 text-[12px] text-foreground-muted"
                    }
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
