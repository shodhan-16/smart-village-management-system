import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { philosophyQuote, philosophyWords } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { EASE } from "../lib/motion";

function WordSequencer() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % philosophyWords.length), 1500);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  return (
    <div className="flex flex-col items-center" ref={ref}>
      {reduced ? (
        <div className="space-y-2 text-center">
          {philosophyWords.map((w) => (
            <p key={w} className="font-display text-4xl font-bold tracking-tight text-frost sm:text-6xl">
              {w}
            </p>
          ))}
        </div>
      ) : (
        <>
          <div className="relative flex h-24 w-full items-center justify-center sm:h-32">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 34, filter: "blur(6px)", textShadow: "0 0 0 transparent" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  textShadow: [
                    "0 0 0 transparent",
                    "2px 0 rgba(255,80,140,0.5), -2px 0 rgba(62,224,255,0.5)",
                    "0 0 24px rgba(77,141,255,0.35), 0 0 80px rgba(77,141,255,0.15)",
                  ],
                }}
                exit={{ opacity: 0, y: -34, filter: "blur(6px)" }}
                transition={{ duration: 0.65, ease: EASE }}
                className="font-display text-5xl font-bold tracking-tight text-frost text-glow sm:text-7xl"
              >
                {philosophyWords[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Sequence ticks */}
          <div className="mt-6 flex gap-2">
            {philosophyWords.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show word ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index ? "w-8 bg-electric" : "w-4 bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Philosophy() {
  return (
    <section id="philosophy" aria-label="Engineering philosophy" className="relative overflow-hidden py-28 sm:py-40">
      {/* Ambient center glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[30rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(77,141,255,0.09), transparent 70%)" }}
      />

      <div className="shell relative flex flex-col items-center text-center">
        <p className="mono-label mb-12 flex items-center gap-3">
          <span className="status-dot" /> CYCLE 07 — ENGINEERING PHILOSOPHY
        </p>

        <WordSequencer />

        <div className="mx-auto mt-16 h-px w-24 bg-gradient-to-r from-transparent via-electric/50 to-transparent" />

        <blockquote className="mx-auto mt-12 max-w-3xl">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight text-mist sm:text-4xl">
            “{philosophyQuote}”
          </p>
          <footer className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-steel/70">
            — SHODHAN · CLOUD ENGINEER IN PROGRESS
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
