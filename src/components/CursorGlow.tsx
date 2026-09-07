import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

/** Soft cursor-following glow. Desktop hover devices only; harmless on touch. */
export function CursorGlow() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 180, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 28, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    if (!mq.matches) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 320);
      y.set(e.clientY - 320);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[640px] w-[640px] rounded-full mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgba(77,141,255,0.075) 0%, rgba(62,224,255,0.03) 38%, transparent 68%)",
      }}
    />
  );
}
