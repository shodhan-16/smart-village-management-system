import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

/** Consistent animated section header: [INDEX — EYEBROW] + title. */
export function SectionHeading({ index, eyebrow, title, description, align = "left" }: Props) {
  const centered = align === "center";
  return (
    <div className={`mb-12 flex flex-col gap-4 sm:mb-16 ${centered ? "items-center text-center" : ""}`}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="flex items-center gap-3"
      >
        <span className="section-number">{index}</span>
        <span className="h-px w-10 bg-electric/50" aria-hidden="true" />
        <span className="mono-label">{eyebrow}</span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-frost sm:text-5xl lg:text-6xl"
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
          className={`max-w-xl text-sm leading-relaxed text-steel sm:text-base ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
