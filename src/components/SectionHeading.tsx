import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

/** Consistent animated section header: INDEX / EYEBROW on a hairline, then title. */
export function SectionHeading({ index, eyebrow, title, description, align = "left" }: Props) {
  const centered = align === "center";
  return (
    <div className={`mb-14 flex flex-col gap-6 sm:mb-20 ${centered ? "items-center text-center" : ""}`}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className={`flex w-full items-center gap-4 ${centered ? "justify-center" : ""}`}
      >
        <span className="section-number">{index}</span>
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
