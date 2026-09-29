"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollProgressBar from "@/components/scroll-progress-bar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import DevUpdatesSection from "@/components/sections/dev-updates";
import Experience from "@/components/sections/experience";
import ResumeSection from "@/components/sections/resume";
import Contact from "@/components/sections/contact";
import DevTerminal from "@/components/dev-terminal";
import ProjectModal from "@/components/project-modal";
import GlobalBackgroundScene from "@/components/three/global-background-scene";
import { projects, type Project } from "@/lib/site";

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const handleSelectProjectId = (id: string) => {
    const found = projects.find((p) => p.id === id);
    if (found) {
      setActiveProject(found);
    }
  };

  return (
    <>
      {/* Full-Page Interactive 3D WebGL Constellation Scene */}
      <GlobalBackgroundScene />

      {/* Top Viewport Framer Motion Scroll Progress Bar */}
      <ScrollProgressBar />

      <Navbar />
      <main className="relative z-10">
        <Hero
          onSelectProject={handleSelectProjectId}
          onOpenProjectModal={(p) => setActiveProject(p)}
        />
        <About />
        <Skills />
        <Projects
          onInspectProject={(p) => setActiveProject(p)}
        />
        <DevUpdatesSection />
        <Experience />
        <ResumeSection />
        <Contact />
      </main>
      <Footer />

      {/* Interactive Developer CLI Shell */}
      <DevTerminal onInspectProject={(p) => setActiveProject(p)} />

      {/* Global 3D Project Workbench Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
