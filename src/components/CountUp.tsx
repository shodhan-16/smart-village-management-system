import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
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

  useEffect(() => {
    if (!inView || reduced) return;
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);

  return (
    <div ref={ref} className="text-center sm:text-left">
      <p className="font-display text-3xl font-bold tracking-tight text-frost sm:text-4xl">
        {prefix}
        {String(display).padStart(2, "0")}
      </p>
      <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.26em] text-steel">{label}</p>
    </div>
  );
}
