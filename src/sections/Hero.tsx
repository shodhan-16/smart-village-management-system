import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Cloud,
  Database,
  FileText,
  FolderGit2,
  Shield,
  Server,
  SkipForward,
} from "lucide-react";
import { bootLines, heroMeta, identity, links, statusLines } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { EASE } from "../lib/motion";
import { scrollTo } from "../lib/scroll";

/* ------------------------------------------------------------------ */
/*  Boot sequence                                                      */
/* ------------------------------------------------------------------ */

function BootSequence({ done, onDone, onSkip }: { done: boolean; onDone: () => void; onSkip: () => void }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (done || reduced) {
      onDone();
      return;
    }
    const timers = bootLines.map((_, i) => window.setTimeout(() => setVisible(i + 1), 350 + i * 600));
    const accessTimer = window.setTimeout(() => setVisible(bootLines.length + 1), 350 + bootLines.length * 600 + 250);
    const doneTimer = window.setTimeout(onDone, 350 + bootLines.length * 600 + 1250);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(accessTimer);
      clearTimeout(doneTimer);
    };
  }, [done, reduced, onDone]);

  if (done) return null;

  return (
    <motion.div
      key="boot"
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-void"
      exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
      transition={{ duration: 0.7, ease: EASE }}
      aria-hidden="true"
    >
      <div className="w-[min(92vw,34rem)]">
        <p className="mb-8 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.4em] text-steel/70">
          <span className="h-1.5 w-1.5 rounded-full bg-electric" />
          SHODHAN.OS <span className="text-electric">v1.0</span>
        </p>

        <div className="min-h-[7rem] font-mono text-[0.8rem] leading-loose text-mist sm:text-sm">
          {bootLines.slice(0, visible).map((line) => (
            <p key={line} className="flex items-center gap-2">
              <span className="text-electric/80">{line.includes("access") ? "✔" : "▸"}</span>
              <span className={line.includes("access") ? "text-frost" : undefined}>{line}</span>
              <span className="inline-block h-3.5 w-1.5 animate-blink bg-electric align-middle" />
            </p>
          ))}
          {visible > bootLines.length && (
            <p className="mt-4 text-base font-semibold tracking-[0.5em] text-frost text-glow sm:text-xl">
              ACCESS GRANTED<span className="animate-blink text-electric">_</span>
            </p>
          )}
        </div>

        {/* Progress beam */}
        <div className="mt-8 h-px w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-electric to-cyanflare"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min((visible / (bootLines.length + 1)) * 100, 100)}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>

        <button
          type="button"
          onClick={onSkip}
          className="mt-6 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-steel/60 transition-colors hover:text-mist"
        >
          <SkipForward size={12} /> SKIP INTRO
        </button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Command center (desktop visual)                                    */
/* ------------------------------------------------------------------ */

function CommandCenter() {
  return (
    <div className="relative mx-auto w-[min(94vw,27rem)] select-none">
      {/* Outer glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-electric/10 blur-3xl" />

      {/* Rotating rings */}
      <div className="relative aspect-square">
        <div className="absolute inset-0 rounded-full border border-electric/15" />
        <div
          className="absolute inset-[7%] rounded-full border border-dashed border-electric/25"
          style={{ animation: "spin 26s linear infinite" }}
        />
        <div
          className="absolute inset-[16%] rounded-full border border-white/10"
          style={{ animation: "spin 40s linear infinite reverse" }}
        />
        <div className="absolute inset-[25%] rounded-full border border-violetflare/15" />

        {/* Tick marks */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="1.6"
              x2="50"
              y2={i % 6 === 0 ? "4.6" : "3.4"}
              stroke={i % 6 === 0 ? "rgba(125,180,255,0.55)" : "rgba(139,150,173,0.3)"}
              strokeWidth="0.35"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}
        </svg>

        {/* Center core */}
        <div className="absolute inset-[32%] flex flex-col items-center justify-center rounded-full border border-electric/40 bg-void/90 shadow-glow backdrop-blur">
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="font-display text-4xl font-bold text-frost sm:text-5xl"
          >
            S
          </motion.span>
          <span className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.4em] text-electric">
            CORE
          </span>
        </div>

        {/* Orbiting nodes + labels */}
        {[
          { icon: Cloud, label: "EC2", cls: "top-[2%] left-1/2 -translate-x-1/2" },
          { icon: Server, label: "S3", cls: "top-1/2 right-[2%] -translate-y-1/2" },
          { icon: Shield, label: "IAM", cls: "bottom-[2%] left-1/2 -translate-x-1/2" },
          { icon: Database, label: "RDS", cls: "top-1/2 left-[2%] -translate-y-1/2" },
        ].map(({ icon: Icon, label, cls }) => (
          <div key={label} className={`absolute ${cls}`}>
            <div
              className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/30"
              style={{ animation: "spin 16s linear infinite reverse" }}
            />
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-electric/40 bg-panel text-electric shadow-glow">
              <Icon size={18} />
            </div>
            <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 font-mono text-[0.55rem] tracking-[0.3em] text-steel">
              {label}
            </span>
          </div>
        ))}

        {/* HUD corner brackets */}
        <span className="absolute -left-1 -top-1 h-4 w-4 border-l-2 border-t-2 border-electric/60" />
        <span className="absolute -right-1 -top-1 h-4 w-4 border-r-2 border-t-2 border-electric/60" />
        <span className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-electric/60" />
        <span className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-electric/60" />
      </div>

      {/* Telemetry card */}
      <div className="panel relative mt-8 grid grid-cols-2 gap-px overflow-hidden bg-line/60">
        {statusLines.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-void/90 p-3.5">
            <p className="flex items-center gap-1.5 font-mono text-[0.52rem] uppercase tracking-[0.3em] text-steel/70">
              <Icon size={11} className="text-electric/80" /> {label}
            </p>
            <p className="mt-1.5 font-mono text-[0.68rem] tracking-[0.14em] text-frost">{value}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-steel/60">
        shodhan.system · command center
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  const reduced = useReducedMotion();
  const [bootDone, setBootDone] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const letters = identity.firstName.split("");

  // Reduced motion: skip the boot ceremony entirely.
  useEffect(() => {
    if (reduced) setBootDone(true);
  }, [reduced]);

  return (
    <section
      id="identity"
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col overflow-hidden pt-24"
    >
      {/* Perspective grid floor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42vh] opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(77,141,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(77,141,255,0.16) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          transform: "perspective(900px) rotateX(62deg) scale(1.4)",
          transformOrigin: "bottom",
          maskImage: "linear-gradient(to top, black 30%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 90%)",
        }}
      />

      <AnimatePresence>
        {!bootDone && (
          <BootSequence
            key="boot"
            done={bootDone}
            onDone={() => setBootDone(true)}
            onSkip={() => setBootDone(true)}
          />
        )}
      </AnimatePresence>

      <motion.div
        style={reduced ? undefined : { y: titleY, opacity: fade }}
        className="shell relative z-10 flex flex-1 flex-col items-center gap-14 py-10 lg:flex-row lg:items-center lg:gap-20 lg:py-0"
      >
        {/* Identity block */}
        <motion.div
          initial="hidden"
          animate={bootDone ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
          className="min-w-0 flex-1"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
            className="mono-label mb-6 flex items-center gap-3"
          >
            <span className="status-dot" />
            IDENTITY VERIFIED · SYSTEM ONLINE
          </motion.p>

          <h1 aria-label={identity.name} className="overflow-hidden">
            <span className="block font-display text-[clamp(3.6rem,13vw,9rem)] font-bold leading-[0.92] tracking-tighter text-frost">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  className="inline-block text-glow"
                  initial={{ y: "118%", opacity: 0, rotateX: -35 }}
                  animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.05 }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <span className="h-px w-10 bg-electric/70" aria-hidden="true" />
            <p className="font-mono text-[clamp(0.8rem,2.4vw,1.05rem)] font-semibold uppercase tracking-[0.35em] text-electric">
              {identity.role}
            </p>
            <span className="rounded border border-electric/30 bg-electric/5 px-2 py-0.5 font-mono text-[0.55rem] tracking-[0.25em] text-electric/90">
              EST. 2023
            </span>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-steel sm:text-base"
          >
            {identity.tagline}
          </motion.p>

          {/* Meta chips */}
          <motion.ul
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            className="mt-8 flex max-w-xl flex-wrap gap-2"
            aria-label="Technical focus areas"
          >
            {heroMeta.map((item) => (
              <motion.li
                key={item}
                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                className="chip hover:border-electric/50 hover:text-frost"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button type="button" onClick={() => scrollTo("about")} className="cta-primary group">
              EXPLORE MY JOURNEY
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button type="button" onClick={() => scrollTo("projects")} className="cta-ghost group">
              <FolderGit2 size={15} className="text-electric" />
              VIEW PROJECTS
            </button>
            <a
              href={links.resume}
              download
              className="group flex items-center gap-2 px-2 py-2 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-steel transition-colors hover:text-frost"
            >
              <FileText size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              RESUME <span className="text-electric/70">· PDF</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Command center */}
        <motion.div
          style={reduced ? undefined : { y: panelY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={bootDone ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.55 }}
          className="hidden w-full max-w-lg lg:block"
        >
          <CommandCenter />
        </motion.div>
      </motion.div>

      {/* Bottom HUD */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={bootDone ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="shell relative z-10 hidden items-center justify-between gap-6 border-t border-line/70 py-4 font-mono text-[0.56rem] uppercase tracking-[0.28em] text-steel/70 md:flex"
      >
        <span className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-electric" /> KARNATAKA · INDIA
        </span>
        <span>PHASE: <span className="text-frost">LEARNING → BUILDING</span></span>
        <span className="flex items-center gap-2">
          STATUS: <span className="text-signal">OPERATIONAL</span>
          <span className="animate-blink text-electric">▌</span>
        </span>
      </motion.div>
    </section>
  );
}
