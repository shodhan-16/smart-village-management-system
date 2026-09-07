import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
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
import { heroMeta, identity, links, statusLines } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { EASE } from "../lib/motion";
import { scrollTo } from "../lib/scroll";

/* ------------------------------------------------------------------ */
/*  Intro — AAA-game style loader that zooms into the world            */
/* ------------------------------------------------------------------ */

const PHASES = [
  "INITIALIZING CLOUD CORE",
  "LOADING AWS MODULES",
  "COMPILING SKILL MATRIX",
  "SYNCING PROJECT FILES",
  "DEPLOYING INTERFACE",
];

const LOG_LINES = [
  "> booting shodhan.os v1.0",
  "> region mapped: in-south-1",
  "> iam policies ............... ok",
  "> ec2 instances .............. ready",
  "> s3 buckets ................. linked",
  "> skill matrix ............... compiled",
  "> project files .............. synced",
  "> interface .................. deployed",
  "> access.granted = true",
];

const LOG_AT = [2, 10, 22, 36, 50, 62, 76, 88, 100];

const TIPS = [
  "Cloud engineers design for failure — availability is a feature.",
  "IAM is the security boundary of every AWS account.",
  "Version control is a discipline, not a tool.",
  "Every system starts as a problem worth solving.",
  "Skills are proven by shipped projects, not lists.",
];

function phaseForPct(pct: number) {
  if (pct < 20) return 0;
  if (pct < 42) return 1;
  if (pct < 62) return 2;
  if (pct < 85) return 3;
  return 4;
}

function IntroOverlay({
  onReveal,
  onDone,
}: {
  /** Fired the moment the zoom starts, so the hero can reveal behind it. */
  onReveal: () => void;
  /** Fired once the zoom transition has finished — unmounts the overlay. */
  onDone: () => void;
}) {
  const progress = useMotionValue(0);
  const [pct, setPct] = useState(0);
  const [granted, setGranted] = useState(false);
  const [opening, setOpening] = useState(false);
  const [tip, setTip] = useState(0);
  const skipped = useRef(false);

  const R = 54;
  const CIRC = 2 * Math.PI * R;
  const dashOffset = useTransform(progress, (v) => CIRC * (1 - v / 100));

  useMotionValueEvent(progress, "change", (v) => setPct(Math.round(v)));

  // Progress advances in chunks with plateaus — like a real game load.
  useEffect(() => {
    const controls = animate(progress, [0, 18, 18, 42, 42, 66, 66, 88, 100], {
      duration: 3.6,
      times: [0, 0.2, 0.32, 0.46, 0.58, 0.7, 0.82, 0.92, 1],
      ease: "linear",
      onComplete: () => setGranted(true),
    });
    return () => controls.stop();
  }, [progress]);

  const beginExit = useCallback(() => {
    if (skipped.current) return;
    skipped.current = true;
    setOpening(true);
    onReveal();
  }, [onReveal]);

  // Beat of "ACCESS GRANTED", then zoom through.
  useEffect(() => {
    if (!granted) return;
    const t = window.setTimeout(beginExit, skipped.current ? 260 : 420);
    return () => window.clearTimeout(t);
  }, [granted, beginExit]);

  // Any key (Space / Enter / Escape / letters) or tap skips, like a game.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab" || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Zoom finished → hand control back to the page.
  useEffect(() => {
    if (!opening) return;
    const t = window.setTimeout(onDone, 1150);
    return () => window.clearTimeout(t);
  }, [opening, onDone]);

  // Cycling game tips while loading.
  useEffect(() => {
    if (opening) return;
    const id = window.setInterval(() => setTip((t) => (t + 1) % TIPS.length), 2400);
    return () => window.clearInterval(id);
  }, [opening]);

  const skip = () => {
    if (skipped.current) return;
    progress.set(100);
    setGranted(true);
  };

  const phase = phaseForPct(pct);
  const logCount = LOG_AT.filter((at) => pct >= at).length;

  return (
    <motion.div
      className="absolute inset-0 z-30 select-none overflow-hidden bg-void"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-label="Loading Shodhan's digital world"
      onPointerDown={skip}
    >
      {/* Ambient scene behind the loader */}
      <div className="grid-floor absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 600px at 50% 44%, rgba(77,141,255,0.1), transparent 65%)",
        }}
      />
      {/* Scanlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 4px)",
          animation: "scanmove 9s linear infinite",
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Top HUD */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 font-mono text-[0.56rem] uppercase tracking-[0.3em] text-steel/70 sm:px-8">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-electric" />
          SHODHAN.OS <span className="text-electric/70">v1.0</span>
          <span className="hidden text-steel/50 sm:inline">· BUILD 2026.09.07</span>
        </span>
        <span className="text-steel/50">
          NODE: <span className="text-mist">IN-SOUTH-1</span>
        </span>
      </div>

      {/* Light burst — explodes from center as the loader zooms through */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[130vmax] w-[130vmax] rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={opening ? { scale: 1, opacity: [0, 0.6, 0] } : { scale: 0, opacity: 0 }}
        transition={opening ? { duration: 1.05, ease: EASE, times: [0, 0.35, 1] } : { duration: 0.01 }}
        style={{
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(125,180,255,0.45) 0%, rgba(62,224,255,0.16) 42%, transparent 72%)",
        }}
      />

      {/* Motion-streak ghosts during the zoom */}
      {opening && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[150vmax] bg-gradient-to-r from-transparent via-cyanflare/50 to-transparent blur-[2px]"
            style={{ transform: "translate(-50%, -50%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[95vmax] bg-gradient-to-r from-transparent via-violetflare/40 to-transparent"
            style={{ transform: "translate(-50%, -50%) rotate(-14deg)" }}
          />
        </>
      )}

      {/* Loader — zooms toward the viewer with motion blur */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        animate={
          opening
            ? { scale: 4.4, opacity: 0, filter: "blur(16px)" }
            : { scale: 1, opacity: 1, filter: "blur(0px)" }
        }
        transition={opening ? { duration: 1.05, ease: EASE } : { duration: 0.01 }}
      >
        {/* Mini camera shake on ACCESS GRANTED */}
        <motion.div
          animate={granted && !opening ? { x: [0, -7, 7, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="relative h-44 w-44 sm:h-52 sm:w-52">
            {/* Tick marks — mechanical dial */}
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {Array.from({ length: 48 }).map((_, i) => (
                <line
                  key={i}
                  x1="60"
                  y1="2.2"
                  x2="60"
                  y2={i % 4 === 0 ? "7.2" : "4.6"}
                  stroke={i % 4 === 0 ? "rgba(125,180,255,0.55)" : "rgba(139,150,173,0.3)"}
                  strokeWidth="0.8"
                  transform={`rotate(${i * 7.5} 60 60)`}
                />
              ))}
            </svg>

            {/* Track + rotating dashed rings + progress arc */}
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
              <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
              <circle
                cx="60"
                cy="60"
                r={R - 9}
                fill="none"
                stroke="rgba(77,141,255,0.2)"
                strokeWidth="1"
                strokeDasharray="2 6"
                style={{ animation: "spin 9s linear infinite" }}
              />
              <circle
                cx="60"
                cy="60"
                r={R - 16}
                fill="none"
                stroke="rgba(167,139,250,0.16)"
                strokeWidth="1"
                strokeDasharray="1 9"
                style={{ animation: "spin 14s linear infinite reverse" }}
              />
              <motion.circle
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke="#7db4ff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                style={{
                  strokeDashoffset: dashOffset,
                  filter: "drop-shadow(0 0 7px rgba(77,141,255,0.95))",
                }}
              />
            </svg>

            {/* Percentage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-5xl font-bold tabular-nums tracking-tight text-frost text-glow sm:text-6xl">
                {pct}
                <span className="align-top text-xl text-electric sm:text-2xl">%</span>
              </span>
            </div>
          </div>

          {/* Phase text */}
          <p className="mt-8 h-5 font-mono text-[0.66rem] uppercase tracking-[0.46em] text-mist">
            [ {granted ? <span className="text-signal">ACCESS GRANTED</span> : PHASES[phase]} ]
            <span className="ml-1.5 animate-blink text-electric">▌</span>
          </p>

          {/* Boot log — appears line by line as progress passes checkpoints */}
          <div className="mt-6 hidden h-40 w-[22rem] flex-col justify-start gap-0.5 overflow-hidden font-mono text-[0.6rem] leading-relaxed tracking-[0.08em] text-steel/80 sm:flex">
            {LOG_LINES.slice(0, logCount).map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={i === logCount - 1 ? "text-electric/90" : undefined}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Game tip */}
        <div className="fixed bottom-24 left-0 right-0 px-6">
          <p className="mx-auto max-w-2xl text-center font-mono text-[0.58rem] uppercase tracking-[0.24em] text-steel/70">
            <span className="text-electric">TIP{String(tip + 1).padStart(2, "0")}:</span> {TIPS[tip]}
          </p>
        </div>

        {/* Press any key */}
        {!opening && (
          <motion.p
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="fixed bottom-12 left-0 right-0 flex items-center justify-center gap-2 px-6 font-mono text-[0.56rem] uppercase tracking-[0.34em] text-steel/70"
          >
            <SkipForward size={12} />
            PRESS ANY KEY · TAP TO SKIP
          </motion.p>
        )}
      </motion.div>

      {/* ACCESS GRANTED glitch flicker as the zoom begins */}
      {opening && (
        <motion.div
          key="granted"
          className="pointer-events-none absolute inset-0 z-[6] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 0], scale: [0.9, 1, 1.06] }}
          transition={{ duration: 0.8, times: [0, 0.3, 1], ease: "easeInOut" }}
        >
          <p
            className="font-mono text-lg font-bold tracking-[0.5em] text-frost"
            style={{
              textShadow:
                "0 0 24px rgba(77,141,255,0.9), 2px 0 rgba(255,60,120,0.5), -2px 0 rgba(62,224,255,0.5)",
            }}
          >
            ACCESS GRANTED<span className="animate-blink text-electric">_</span>
          </p>
        </motion.div>
      )}

      {/* Bottom copyright bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/5 px-5 py-3 font-mono text-[0.5rem] uppercase tracking-[0.28em] text-steel/50 sm:px-8">
        <span>© 2026 SHODHAN · ALL SYSTEMS RESERVED</span>
        <span className="hidden sm:inline">CLOUD CORE // 100%</span>
      </div>

      {/* Animated scanlines keyframe */}
      <style>{`@keyframes scanmove { from { background-position: 0 0; } to { background-position: 0 80px; } }`}</style>
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
            <p className="flex items-center gap-1.5 font-mono text-[0.52rem] uppercase tracking-[0.26em] text-steel/70">
              <Icon size={11} className="text-electric/80" /> {label}
            </p>
            <p className="mt-1.5 font-mono text-[0.68rem] tracking-[0.12em] text-frost">{value}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center font-mono text-[0.55rem] uppercase tracking-[0.36em] text-steel/60">
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
  const [revealed, setRevealed] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const letters = identity.firstName.split("");

  const onReveal = useCallback(() => setRevealed(true), []);
  const onIntroDone = useCallback(() => setIntroDone(true), []);

  // Reduced motion: skip the intro ceremony entirely.
  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      setIntroDone(true);
    }
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
        {!introDone && <IntroOverlay onReveal={onReveal} onDone={onIntroDone} />}
      </AnimatePresence>

      <motion.div
        style={reduced ? undefined : { y: titleY, opacity: fade }}
        className="shell relative z-10 flex flex-1 flex-col items-center gap-14 py-10 lg:flex-row lg:items-center lg:gap-20 lg:py-0"
      >
        {/* Identity block */}
        <motion.div
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
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
            className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3"
          >
            <p className="font-mono text-[clamp(0.78rem,2.2vw,1rem)] font-semibold uppercase tracking-[0.32em] text-electric">
              {identity.role}
            </p>
            <span className="h-4 w-px bg-line" aria-hidden="true" />
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-steel">
              Karnataka, India
            </p>
            <span className="h-4 w-px bg-line" aria-hidden="true" />
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-steel">
              BE · Info Science <span className="text-steel/60">2023—27</span>
            </p>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-steel sm:text-base"
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
                className="chip"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            className="mt-10 flex flex-wrap items-center gap-3.5"
          >
            <button type="button" onClick={() => scrollTo("about")} className="cta-primary group">
              EXPLORE MY JOURNEY
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button type="button" onClick={() => scrollTo("projects")} className="cta-ghost group">
              <FolderGit2 size={15} />
              VIEW PROJECTS
            </button>
            <a
              href={links.resume}
              download
              className="cta-link px-2"
            >
              RESUME
              <FileText size={13} />
            </a>
          </motion.div>
        </motion.div>

        {/* Command center */}
        <motion.div
          style={reduced ? undefined : { y: panelY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={revealed ? { opacity: 1, scale: 1 } : {}}
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
        animate={revealed ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="shell relative z-10 hidden items-center justify-between gap-6 border-t border-line/70 py-4 font-mono text-[0.55rem] uppercase tracking-[0.24em] text-steel/70 md:flex"
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
