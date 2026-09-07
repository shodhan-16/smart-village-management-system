import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
  Target,
  Terminal,
  Wrench,
  X,
  FileCode2,
} from "lucide-react";
import type { Project } from "../data/content";
import { projectStatusColor } from "../data/content";
import { EASE } from "../lib/motion";
import { useLockBody } from "../hooks/useLockBody";
import { HudCorners } from "./HudCorners";

function ArchDiagram({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0);
  const node = project.architecture[selected];

  return (
    <div>
      <ol className="space-y-2">
        {project.architecture.map((step, i) => {
          const isActive = selected === i;
          return (
            <li key={step.node}>
              <motion.button
                type="button"
                onClick={() => setSelected(i)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.12, duration: 0.5, ease: EASE }}
                className={`group flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left transition-all duration-300 ${
                  isActive
                    ? "border-electric/70 bg-electric/[0.1] shadow-glow"
                    : "border-line bg-void/60 hover:border-electric/40"
                }`}
              >
                <span
                  className={`font-mono text-[0.6rem] font-bold tracking-[0.2em] ${
                    isActive ? "text-electric" : "text-steel/60"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-mono text-[0.72rem] font-semibold tracking-[0.16em] ${
                    isActive ? "text-frost" : "text-mist/80"
                  }`}
                >
                  {step.node}
                </span>
                {isActive && <span className="ml-auto animate-blink text-electric">▌</span>}
              </motion.button>
              {i < project.architecture.length - 1 && (
                <div className="flex justify-center py-1" aria-hidden="true">
                  <motion.span
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.3 }}
                    className="h-4 w-px bg-electric/50"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={node.node}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-5 rounded-md border border-line bg-white/[0.02] p-4"
        >
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-electric">
            NODE {String(selected + 1).padStart(2, "0")} — {node.node}
          </p>
          <p className="mt-1.5 text-[0.82rem] leading-relaxed text-mist/90">{node.detail}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StudyBlock({
  label,
  index,
  children,
}: {
  label: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      aria-label={label}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-[0.62rem] font-semibold tracking-[0.3em] text-electric">{index}</span>
        <span className="mono-label">{label}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      {children}
    </motion.section>
  );
}

export function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  useLockBody(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const accent = projectStatusColor[project.accent];

  return (
    <motion.div
      className="fixed inset-0 z-[70] overflow-y-auto bg-void/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mx-auto my-6 w-[min(96vw,56rem)] sm:my-12">
        <motion.article
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_32px_80px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(77,141,255,0.06)]"
        >
          {/* HUD corners */}
          <HudCorners inset="-inset-2" />
          {/* scan sweep on open */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-transparent via-electric/[0.09] to-transparent"
            initial={{ x: "-140%" }}
            animate={{ x: "1400%" }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          {/* Top accent */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-electric/60 to-transparent" />
          {/* Top HUD */}
          <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
            <p className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.26em] text-steel">
              <Terminal size={13} className="text-electric" />
              MISSION SELECTED <span className="text-electric">// {project.codename}</span>
              <span className="ml-2 flex items-end gap-1" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1 w-1 rounded-full bg-electric/80"
                    style={{ animation: `tickBounce 1s ${i * 0.16}s ease-in-out infinite` }}
                  />
                ))}
              </span>
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              autoFocus
              className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-steel transition-colors hover:border-electric/60 hover:text-frost"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-12 p-5 sm:p-8 lg:p-10">
            {/* Header */}
            <div>
              <p className={`font-mono text-[0.62rem] uppercase tracking-[0.3em] ${accent}`}>
                PROJECT {project.index} · {project.badge}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-frost sm:text-5xl">
                {project.name}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-steel sm:text-base">{project.tagline}</p>
            </div>

            <StudyBlock label="PROJECT OVERVIEW" index="01">
              <div className="flex flex-wrap gap-3">
                <span className="chip">STATUS: {project.status}</span>
                {project.stack.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </StudyBlock>

            <StudyBlock label="PROBLEM" index="02">
              <p className="max-w-2xl text-sm leading-relaxed text-mist/90">{project.problem}</p>
            </StudyBlock>

            <StudyBlock label="ARCHITECTURE" index="03">
              <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
                <div>
                  <p className="text-[0.82rem] leading-relaxed text-steel">{project.solution}</p>
                  <p className="mt-4 flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.28em] text-steel/70">
                    <Layers size={12} className="text-electric" /> SELECT A NODE TO INSPECT
                  </p>
                </div>
                <ArchDiagram project={project} />
              </div>
            </StudyBlock>

            <StudyBlock label="TECHNOLOGY" index="04">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="chip border-electric/30 bg-electric/[0.06] text-mist hover:border-electric/60"
                  >
                    <FileCode2 size={11} className="mr-1.5 text-electric" /> {t}
                  </motion.span>
                ))}
              </div>
            </StudyBlock>

            <StudyBlock label="IMPLEMENTATION" index="05">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {project.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-start gap-2.5 rounded-md border border-line bg-white/[0.02] px-3.5 py-2.5 text-[0.78rem] text-mist/90"
                  >
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-signal/80" />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </StudyBlock>

            <StudyBlock label="RESULT" index="06">
              <div className="rounded-lg border border-line bg-white/[0.02] p-5">
                <p className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-electric">
                  <Target size={12} /> MISSION OUTCOME
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mist/90">
                  {project.name} is a working end-to-end build — designed, implemented and understood from the
                  database up. It demonstrates exactly what I'm hiring for: an engineer who takes a problem,
                  architectures a solution, and ships it.
                </p>
              </div>
            </StudyBlock>

            {/* Footer actions */}
            <div className="flex flex-wrap items-center gap-4 border-t border-line pt-6">
              <a
                href={project.github || "#contact"}
                target={project.github ? "_blank" : undefined}
                rel={project.github ? "noreferrer noopener" : undefined}
                onClick={(e) => {
                  if (!project.github) e.preventDefault();
                }}
                className="cta-ghost"
              >
                <Github size={15} />
                {project.github ? "VIEW SOURCE" : "GITHUB — LINK PENDING"}
              </a>
              <a
                href={project.demo || "#contact"}
                target={project.demo ? "_blank" : undefined}
                rel={project.demo ? "noreferrer noopener" : undefined}
                onClick={(e) => {
                  if (!project.demo) e.preventDefault();
                }}
                className="cta-primary"
              >
                {project.demo ? "LIVE DEMO" : "DEMO — LINK PENDING"}
                {project.demo ? <ExternalLink size={14} /> : <ArrowRight size={14} />}
              </a>
              <button type="button" onClick={onClose} className="ml-auto flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-steel transition-colors hover:text-frost">
                <Wrench size={13} /> CLOSE
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
