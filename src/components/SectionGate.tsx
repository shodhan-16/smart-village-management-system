import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { EASE } from "../lib/motion";

/**
 * Level gate between chapters — a thin frontier line with a beam
 * sweeping across once the player reaches it.
 */
export function SectionGate() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden="true" className="shell relative">
      <div className="relative h-px w-full bg-white/[0.05]">
        {!reduced && (
          <motion.span
            className="absolute left-0 top-1/2 h-[2px] w-28 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-electric/70 to-transparent"
            initial={{ x: "-140%" }}
            whileInView={{ x: "1100%" }}
            viewport={{ once: true, amount: 0.95 }}
            transition={{ duration: 1.25, ease: EASE }}
          />
        )}
        <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-electric/60" />
      </div>
    </div>
  );
}
