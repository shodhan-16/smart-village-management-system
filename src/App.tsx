import { Background } from "./components/Background";
import { CursorGlow } from "./components/CursorGlow";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ScrollProgress } from "./components/ScrollProgress";
import { Marquee } from "./components/Marquee";
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
      <Header />
      <ScrollProgress />

      <main className="relative z-10">
        <Hero />
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
        <About />
        <Education />
        <Skills />
        <CloudJourney />
        <Projects />
        <Certifications />
        <WhatIBuild />
        <Philosophy />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
