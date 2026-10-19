import { ArrowUpRight, FileDown, Mail, MapPin, Phone } from "lucide-react";
import { profile, socials } from "@/lib/site";
import SectionShell from "@/components/section-shell";
import Reveal from "@/components/reveal";
import {
  GitHubIcon,
  LinkedInIcon,
  XTwitterIcon,
} from "@/components/icons";

function SocialIcon({ label }: { label: string }) {
  if (label === "GitHub") return <GitHubIcon className="size-4" />;
  if (label === "LinkedIn") return <LinkedInIcon className="size-4" />;
  if (label === "X") return <XTwitterIcon className="size-4" />;
  if (label === "Email") return <Mail className="size-4" />;
  return <Phone className="size-4" />;
}

export default function Contact() {
  return (
    <SectionShell
      id="contact"
      index="05"
      label="Contact"
      title="Let's build something great together."
      subtitle="Open to full-stack, backend, and AI engineering roles and collaborations."
      side="left"
      accent="#f0d28c"
    >
      <Reveal>
        <a
          href={`mailto:${profile.email}`}
          className="btn-primary group flex w-full justify-between gap-3 px-6 py-4 text-left"
        >
          <span className="truncate text-sm">{profile.email}</span>
          <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-3 flex items-center gap-3">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost flex-1 px-5 py-3 text-sm"
          >
            <FileDown className="size-4" aria-hidden="true" />
            Download CV
          </a>
          <span className="btn-ghost flex-1 cursor-default px-5 py-3 text-sm">
            <MapPin className="size-4" aria-hidden="true" />
            {profile.location}
          </span>
        </div>
      </Reveal>

      <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {socials.map((social, i) => (
          <Reveal key={social.label} delay={0.04 * i} className="h-full">
            <a
              href={social.href}
              target={social.href.startsWith("mailto:") || social.href.startsWith("tel:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex h-full items-center gap-3 rounded-2xl border border-border bg-background/40 px-4 py-3 transition-colors duration-200 hover:border-[#f0d28c]/50 hover:bg-background/70"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#f0d28c]/12 text-[#a4842f] dark:text-[#f0d28c]">
                <SocialIcon label={social.label} />
              </span>
              <span className="min-w-0">
                <span className="block text-[12.5px] font-semibold text-foreground">
                  {social.label}
                </span>
                <span className="block truncate font-mono text-[11px] text-muted">
                  {social.handle}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </SectionShell>
  );
}
