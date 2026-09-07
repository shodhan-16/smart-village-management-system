import { Background } from "./components/Background";
import { CursorGlow } from "./components/CursorGlow";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HudFrame } from "./components/HudFrame";
import { ScrollProgress } from "./components/ScrollProgress";
import { Marquee } from "./components/Marquee";
import { SectionGate } from "./components/SectionGate";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Education } from "./sections/Education";
import { Skills } from "./sections/Skills";
import { CloudJourney } from "./sections/CloudJourney";
import { Projects } from "./sections/Projects";
import { Certifications } from "./sections/Certifications";
import { WhatIBuild } from "./sections/WhatIBuild";
import { Philosophy } from "./sections/Philosophy";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    <div className="noise relative min-h-screen overflow-x-clip">
      <Background />
      <CursorGlow />
      <HudFrame />
      <Header />
      <ScrollProgress />

      <main className="relative z-10">
        <Hero />
        <SectionGate />
        <Marquee
          items={[
            "CLOUD COMPUTING",
            "AWS",
            "LINUX",
            "SQL",
            "REST APIS",
            "JAVASCRIPT",
            "REACT",
            "NODE.JS",
            "GIT",
            "IAM",
            "EC2",
            "S3",
            "VPC",
          ]}
        />
        <SectionGate />
        <About />
        <SectionGate />
        <Education />
        <SectionGate />
        <Skills />
        <SectionGate />
        <CloudJourney />
        <SectionGate />
        <Projects />
        <SectionGate />
        <Certifications />
        <SectionGate />
        <WhatIBuild />
        <SectionGate />
        <Philosophy />
        <SectionGate />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
