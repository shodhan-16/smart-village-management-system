import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Props = {
  value: number;
  label: string;
  prefix?: string;
};

/** Animated number counter that counts up when scrolled into view. */
export function CountUp({ value, label, prefix = "" }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(reduced ? value : 0);
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (!inView || reduced) return;
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p >= 1) setDone(true);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);

  return (
    <div ref={ref} className="relative text-center sm:text-left">
      <motion.p
        animate={reduced ? undefined : done ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="font-display text-3xl font-bold tracking-tight text-frost sm:text-4xl"
      >
        {prefix}
        {String(display).padStart(2, "0")}
      </motion.p>
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-1.5 left-1/2 h-px w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-electric to-transparent sm:left-2 sm:translate-x-0"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={done ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.26em] text-steel">{label}</p>
    </div>
  );
}
