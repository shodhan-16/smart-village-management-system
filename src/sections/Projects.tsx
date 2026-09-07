import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ExternalLink, FileSearch, Github } from "lucide-react";
import { projects, type Project } from "../data/content";
import { CaseStudy } from "../components/CaseStudy";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { EASE } from "../lib/motion";

const ACCENT: Record<
  Project["accent"],
  { border: string; text: string; glow: string; bar: string; dot: string }
> = {
  blue: {
    border: "hover:border-electric/50",
    text: "text-electric",
    glow: "bg-electric/[0.08]",
    bar: "from-electric to-cyanflare",
    dot: "bg-electric",
  },
  cyan: {
    border: "hover:border-cyanflare/50",
    text: "text-cyanflare",
    glow: "bg-cyanflare/[0.06]",
    bar: "from-cyanflare to-electric",
    dot: "bg-cyanflare",
  },
  violet: {
    border: "hover:border-violetflare/50",
    text: "text-violetflare",
    glow: "bg-violetflare/[0.07]",
    bar: "from-violetflare to-electric",
    dot: "bg-violetflare",
  },
};

function ProjectCard({
  project,
  featured,
  onOpen,
}: {
  project: Project;
  featured: boolean;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();
  const accent = ACCENT[project.accent];
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sRotateX = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const sRotateY = useSpring(rotateY, { stiffness: 180, damping: 20 });

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE }}
      style={reduced ? undefined : { rotateX: sRotateX, rotateY: sRotateY, transformPerspective: 1100 }}
      onMouseMove={(e) => {
        if (reduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * 4.5);
        rotateX.set(-py * 4.5);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      className={`group relative h-full overflow-hidden rounded-2xl border border-line bg-panel/70 p-6 transition-colors duration-500 sm:p-8 ${accent.border} ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Accent wash */}
      <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl transition-opacity duration-500 ${accent.glow} opacity-60 group-hover:opacity-100`} />
      {/* Animated scanline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(125,180,255,0.05), transparent)",
          animation: "scan 4s linear infinite",
        }}
      />

      <div className={`relative flex h-full flex-col ${featured ? "lg:flex-row lg:gap-12" : ""}`}>
        <div className={featured ? "flex-1" : ""}>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`font-mono text-[0.62rem] font-bold tracking-[0.3em] ${accent.text}`}>
              PROJECT {project.index}
            </span>
            <span className="chip">{project.codename}</span>
            <span className="chip border-electric/25 bg-electric/[0.06]">{project.badge}</span>
            <span className="ml-auto font-mono text-[0.55rem] uppercase tracking-[0.22em] text-steel/70">
              {project.status}
            </span>
          </div>

          <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-frost sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-steel">{project.tagline}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <li key={t} className="chip hover:border-electric/40 hover:text-frost">
                {t}
              </li>
            ))}
          </ul>

          {featured && (
            <ul className="mt-5 grid max-w-xl gap-2 sm:grid-cols-2">
              {project.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2 text-[0.75rem] leading-snug text-mist/85">
                  <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${accent.dot}`} />
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Architecture preview for the flagship */}
        {featured && (
          <div className="mt-8 hidden shrink-0 lg:mt-0 lg:flex lg:w-[38%] lg:flex-col">
            <ol className="space-y-1.5">
              {project.architecture.slice(0, 6).map((step, i) => (
                <li key={step.node} className="flex items-center gap-2">
                  <span className="font-mono text-[0.52rem] text-steel/60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 rounded border border-line/80 bg-void/60 px-2.5 py-1.5 font-mono text-[0.58rem] tracking-[0.14em] text-mist/85">
                    {step.node}
                  </span>
                  {i < 5 && <ArrowRight size={10} className="text-electric/50" />}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6 lg:mt-auto lg:pt-6">
          <button type="button" onClick={onOpen} className="cta-primary group/btn !px-5 !py-3">
            <FileSearch size={14} />
            OPEN CASE FILE
            <ArrowRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
          <a
            href={project.github || "#contact"}
            target={project.github ? "_blank" : undefined}
            rel={project.github ? "noreferrer noopener" : undefined}
            onClick={(e) => {
              if (!project.github) e.preventDefault();
            }}
            aria-label={project.github ? `${project.name} on GitHub` : `${project.name} GitHub link pending`}
            title={project.github ? "View source on GitHub" : "Add your repo URL in src/data/content.ts"}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-steel transition-all duration-300 hover:border-electric/60 hover:text-frost hover:shadow-glow"
          >
            <Github size={16} />
          </a>
          <a
            href={project.demo || "#contact"}
            target={project.demo ? "_blank" : undefined}
            rel={project.demo ? "noreferrer noopener" : undefined}
            onClick={(e) => {
              if (!project.demo) e.preventDefault();
            }}
            aria-label={project.demo ? `${project.name} live demo` : `${project.name} demo link pending`}
            title={project.demo ? "Open live demo" : "Add your demo URL in src/data/content.ts"}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-steel transition-all duration-300 hover:border-cyanflare/60 hover:text-cyanflare hover:shadow-glow-cyan"
          >
            <ExternalLink size={16} />
          </a>
          <span className="ml-auto hidden font-mono text-[0.55rem] uppercase tracking-[0.25em] text-steel/60 sm:block">
            CLICK TO DECRYPT_
          </span>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className={`absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r ${accent.bar} opacity-40 transition-opacity duration-500 group-hover:opacity-100`} />
    </motion.article>
  );
}

export function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="05"
          eyebrow="PROJECTS"
          title="Three missions. One standard: shipped."
          description="Each project is treated like a real deployment — problem first, architecture second, working software always."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Reveal key={project.id} className={project.index === "01" ? "lg:col-span-2" : undefined}>
              <ProjectCard
                project={project}
                featured={project.index === "01"}
                onOpen={() => setOpenProject(project)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openProject && (
          <CaseStudy project={openProject} onClose={() => setOpenProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
