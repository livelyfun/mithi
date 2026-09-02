"use client";

import { useState, type FormEvent } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  Phone,
  MapPin,
  Copy,
  Check,
} from "lucide-react";
import Section from "@/components/section";
import Reveal from "@/components/reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { profile } from "@/lib/site";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleCopyEmail() {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <Section
      id="contact"
      eyebrow="Get In Touch"
      title="Let&apos;s Connect &amp; Collaborate"
      subtitle="Currently open to full-time junior/entry-level developer opportunities, internships, and collaborations."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Direct Links & Info (Col 1-5) */}
        <div className="lg:col-span-5">
          <Reveal>
            <h3 className="font-display text-xl font-bold text-foreground">
              Contact Information
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Feel free to send an email, message on LinkedIn, or fill out the form. I typically respond within 24 hours.
            </p>

            <div className="mt-6 space-y-3">
              {/* Direct Email Card with 1-click Copy */}
              <div className="surface flex items-center justify-between rounded-2xl p-4 border border-border shadow-xs">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 truncate text-foreground hover:text-accent transition-colors"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Mail className="size-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-[11px] font-mono uppercase text-muted">
                      Email
                    </p>
                    <p className="text-sm font-semibold truncate">
                      {profile.email}
                    </p>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted transition-colors hover:text-foreground hover:border-accent/40"
                >
                  {copied ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <a
                href={`tel:${profile.phoneRaw}`}
                className="surface flex items-center gap-3 rounded-2xl p-4 border border-border shadow-xs text-foreground hover:text-accent transition-colors"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Phone className="size-4" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase text-muted">
                    Phone / WhatsApp
                  </p>
                  <p className="text-sm font-semibold">{profile.phone}</p>
                </div>
              </a>

              {/* Location Card */}
              <div className="surface flex items-center gap-3 rounded-2xl p-4 border border-border shadow-xs">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase text-muted">
                    Location
                  </p>
                  <p className="text-sm font-semibold">{profile.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 border-t border-border pt-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                Social Profiles
              </p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-2 text-xs font-medium text-foreground transition-all duration-200 hover:border-accent/40 hover:text-accent"
                >
                  <GitHubIcon className="size-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-2 text-xs font-medium text-foreground transition-all duration-200 hover:border-accent/40 hover:text-accent"
                >
                  <LinkedInIcon className="size-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Contact Form (Col 6-12) */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="surface rounded-3xl p-6 sm:p-8 border border-border shadow-soft">
              {formSubmitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500 shadow-glow">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <h4 className="mt-4 font-display text-xl font-bold text-foreground">
                    Message Sent Successfully!
                  </h4>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                    Thank you, {formData.name || "there"}. I have received your note and will reply as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="btn-ghost mt-6 px-6 py-2.5 text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-foreground uppercase tracking-wider font-mono mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Alex Sharma"
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-foreground uppercase tracking-wider font-mono mb-1.5"
                    >
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="e.g. alex@company.com"
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-foreground uppercase tracking-wider font-mono mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Hi Mithlesh, I came across your portfolio and wanted to discuss a full-stack opportunity..."
                      className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary group mt-2 w-full py-3.5 text-sm font-semibold"
                  >
                    <span>Send Message</span>
                    <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
