import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const CORNERS = [
  "left-0 top-0 border-l-2 border-t-2",
  "right-0 top-0 border-r-2 border-t-2",
  "left-0 bottom-0 border-l-2 border-b-2",
  "right-0 bottom-0 border-r-2 border-b-2",
];

/** HUD corner brackets that pop in — used on chapter heads and modals. */
export function HudCorners({ className = "", inset = "-inset-3" }: { className?: string; inset?: string }) {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${inset} hidden sm:block ${className}`}>
      {CORNERS.map((cls, i) => (
        <motion.span
          key={cls}
          initial={reduced ? false : { opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 + i * 0.07, duration: 0.4, ease: "easeOut" }}
          className={`absolute h-3 w-3 border-electric/60 ${cls}`}
        />
      ))}
    </div>
  );
}
