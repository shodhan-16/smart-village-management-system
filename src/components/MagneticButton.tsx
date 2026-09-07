import { motion, useMotionValue, useSpring } from "framer-motion";
import { type ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Props = {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
};

/** Subtle magnetic hover — content leans toward the cursor, then springs back. */
export function MagneticButton({ children, className, asChild = false }: Props) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  if (asChild) {
    return (
      <motion.span
        style={reduced ? undefined : { x: sx, y: sy }}
        onMouseMove={(e) => {
          if (reduced) return;
          const rect = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - rect.left - rect.width / 2) * 0.14);
          y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        className={`inline-block ${className ?? ""}`}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div
      style={reduced ? undefined : { x: sx, y: sy }}
      onMouseMove={(e) => {
        if (reduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.1);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
