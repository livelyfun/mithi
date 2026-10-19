import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProgressRail from "@/components/progress-rail";
import Preloader from "@/components/preloader";
import StudioCanvas from "@/components/studio/studio-canvas";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <StudioCanvas />
      <ProgressRail />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
