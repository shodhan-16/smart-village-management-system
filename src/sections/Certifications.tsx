import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { certifications } from "../data/content";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { EASE } from "../lib/motion";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="06"
          eyebrow="CERTIFICATIONS & ACHIEVEMENTS"
          title="Credentials. Proof of progress."
          description="Every badge below represents a deliberate block of study — not a decoration."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <Reveal key={cert.name} delay={i * 0.8} className="h-full">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel/60 p-6 transition-colors duration-500 hover:border-electric/45 hover:shadow-glow sm:p-7"
                >
                  <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-electric/[0.06] blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-electric/25 bg-electric/[0.08] text-electric transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon size={22} />
                    </div>
                    <span className="flex items-center gap-1.5 rounded border border-signal/25 bg-signal/[0.07] px-2 py-1 font-mono text-[0.52rem] uppercase tracking-[0.2em] text-signal">
                      <BadgeCheck size={11} /> VERIFIED
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold leading-snug tracking-tight text-frost">
                    {cert.name}
                  </h3>
                  <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-steel">
                    {cert.issuer}
                  </p>
                  <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-steel/60">
                    {cert.date}
                  </p>

                  <div className="mt-auto pt-6">
                    <a
                      href={cert.credential || "#contact"}
                      target={cert.credential ? "_blank" : undefined}
                      rel={cert.credential ? "noreferrer noopener" : undefined}
                      onClick={(e) => {
                        if (!cert.credential) e.preventDefault();
                      }}
                      className="inline-flex items-center gap-2 rounded-md border border-line px-3.5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist transition-all duration-300 hover:border-electric/60 hover:text-frost hover:shadow-glow"
                    >
                      {cert.credential ? "VIEW CREDENTIAL" : "CREDENTIAL — LINK PENDING"}
                      <ExternalLink size={12} className="text-electric" />
                    </a>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
