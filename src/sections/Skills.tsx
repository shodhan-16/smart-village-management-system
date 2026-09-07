import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillCategories, type SkillCategory } from "../data/content";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { EASE } from "../lib/motion";

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const [active, setActive] = useState<{ name: string; desc: string } | null>(null);
  const Icon = category.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.1 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel/60 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-electric/45 hover:shadow-glow"
    >
      {/* Connection lines — fade in on hover */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        viewBox="0 0 320 240"
        preserveAspectRatio="none"
      >
        <g stroke="#4d8dff" strokeWidth="0.6" opacity="0.18">
          <path d="M30 60 L160 120 L290 70" fill="none" />
          <path d="M30 120 L160 120 L290 150" fill="none" />
          <path d="M60 200 L160 120 L250 30" fill="none" />
          <path d="M30 180 L160 120 L290 190" fill="none" />
        </g>
        <g fill="#7db4ff" opacity="0.4">
          {[
            [30, 60],
            [30, 120],
            [60, 200],
            [30, 180],
            [290, 70],
            [290, 150],
            [250, 30],
            [290, 190],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />
          ))}
        </g>
      </svg>

      <div className="relative flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-electric/25 bg-electric/[0.08] text-electric transition-all duration-500 group-hover:scale-110 group-hover:border-electric/60 group-hover:shadow-glow group-hover:rotate-[-6deg]">
          <Icon size={22} />
        </div>
        <span className="font-mono text-[0.58rem] tracking-[0.3em] text-steel/60">
          {String(index + 1).padStart(2, "0")} / 05
        </span>
      </div>

      <h3 className="relative mt-5 font-display text-2xl font-bold tracking-tight text-frost">{category.label}</h3>
      <p className="relative mt-2 min-h-[3rem] text-[0.8rem] leading-relaxed text-steel">{category.tagline}</p>

      {/* Skill chips (buttons so descriptions are keyboard/touch accessible) */}
      <ul className="relative mt-5 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li key={skill.name}>
            <button
              type="button"
              onMouseEnter={() => setActive(skill)}
              onFocus={() => setActive(skill)}
              onClick={() => setActive(skill)}
              className={`rounded-md border px-2.5 py-1.5 font-mono text-[0.66rem] tracking-wider transition-all duration-300 ${
                active?.name === skill.name
                  ? "border-electric/70 bg-electric/15 text-frost shadow-glow"
                  : "border-line bg-white/[0.03] text-steel hover:border-electric/50 hover:text-mist"
              }`}
            >
              {skill.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Live description */}
      <div className="relative mt-auto pt-5">
        <div className="h-[52px] overflow-hidden rounded-md border border-line/70 bg-void/60 px-3.5">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.p
                key={active.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex h-full items-center text-[0.72rem] leading-snug text-mist/90"
              >
                <span className="mr-2 shrink-0 font-mono text-[0.6rem] font-semibold tracking-[0.2em] text-electric">
                  {active.name}
                </span>
                {active.desc}
              </motion.p>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex h-full items-center font-mono text-[0.6rem] uppercase tracking-[0.25em] text-steel/60"
              >
                HOVER A SKILL FOR DETAILS_
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="SKILL MATRIX"
          title="The toolkit is loading."
          description="Hover or tap any capability to read the readout. Every skill here is being used in real builds."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <Reveal
              key={cat.id}
              className={
                i === 3
                  ? "xl:col-span-2"
                  : i === 4
                    ? "sm:col-span-2 xl:col-span-1"
                    : undefined
              }
            >
              <SkillCard category={cat} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
