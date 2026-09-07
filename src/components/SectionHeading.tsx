import { motion } from "framer-motion";
import { fadeUp, EASE } from "../lib/motion";
import { HudCorners } from "./HudCorners";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

/**
 * Chapter header with HUD motion: corner brackets pop in, a scanline
 * sweeps across, and the index number glitches like a game UI.
 */
export function SectionHeading({ index, eyebrow, title, description, align = "left" }: Props) {
  const centered = align === "center";
  return (
    <div
      className={`relative mb-14 flex flex-col gap-6 sm:mb-20 ${centered ? "items-center text-center" : ""}`}
    >
      <HudCorners />

      {/* Scanline sweep across the header on entry */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-x-2 inset-y-0 overflow-hidden">
        <motion.span
          className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-transparent via-electric/[0.08] to-transparent"
          initial={{ x: "-120%" }}
          whileInView={{ x: "1000%" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.15, ease: EASE, delay: 0.1 }}
        />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className={`flex w-full items-center gap-4 ${centered ? "justify-center" : ""}`}
      >
        {/* Glitch flicker on the chapter index */}
        <motion.span
          className="section-number"
          initial={{ textShadow: "0 0 0 transparent" }}
          whileInView={{
            textShadow: [
              "0 0 0 transparent",
              "1.5px 0 rgba(255,80,140,0.55), -1.5px 0 rgba(62,224,255,0.55)",
              "0 0 0 transparent",
            ],
          }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, times: [0, 0.5, 1], delay: 0.2 }}
        >
          {index}
        </motion.span>
        <span className="mono-label whitespace-nowrap">{eyebrow}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" aria-hidden="true" />
      </motion.div>

      <motion.h2
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="display-xl max-w-3xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className={`body-sm max-w-xl ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
