import { motion } from "framer-motion";
import { pillars } from "../data/content";
import { SectionHeading } from "../components/SectionHeading";
import { EASE } from "../lib/motion";

export function WhatIBuild() {
  return (
    <section id="build" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="07"
          eyebrow="WHAT I BUILD"
          title="Four domains. One direction."
          description="The kind of systems I practice building — and the standards I hold them to."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel/60 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-violetflare/45 hover:shadow-glow"
              >
                <span className="absolute right-4 top-4 font-mono text-[0.55rem] tracking-[0.28em] text-steel/50">
                  {pillar.tag}
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-violetflare/25 bg-violetflare/[0.07] text-violetflare transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-frost">{pillar.title}</h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-steel">{pillar.desc}</p>

                <div className="mt-auto flex items-center gap-2 pt-6">
                  <span className="h-px w-8 bg-violetflare/40 transition-all duration-500 group-hover:w-14 group-hover:bg-violetflare" />
                  <span className="font-mono text-[0.5rem] uppercase tracking-[0.3em] text-steel/50">
                    ACTIVE
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
