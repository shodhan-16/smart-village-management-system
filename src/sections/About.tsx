import { motion } from "framer-motion";
import { ArrowRight, Cpu, Target } from "lucide-react";
import { aboutCard, aboutParagraphs, certifications, cloudServices, identity, projects } from "../data/content";
import { CountUp } from "../components/CountUp";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { EASE } from "../lib/motion";

function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="panel relative overflow-hidden p-6 sm:p-8"
    >
      {/* Corner brackets */}
      <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-electric/50" />
      <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-electric/50" />
      <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-electric/50" />
      <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-electric/50" />

      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-steel">
          PROFILE <span className="text-electric">// 001</span>
        </p>
        <span className="flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-signal">
          <span className="status-dot" /> ACTIVE
        </span>
      </div>

      {/* Monogram */}
      <div className="mt-8 flex items-center gap-5">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
          <div className="absolute inset-0 rounded-xl border border-electric/30 animate-spin-slower" />
          <div className="absolute inset-1.5 rounded-lg border border-electric/15 animate-spin-slow" />
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-electric/25 to-cyanflare/10 font-display text-2xl font-bold text-frost shadow-glow">
            S
          </div>
        </div>
        <div>
          <p className="font-display text-2xl font-bold tracking-tight text-frost">{identity.name}</p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-electric">
            {identity.role}
          </p>
          <p className="mt-1.5 text-xs text-steel">{identity.location}</p>
        </div>
      </div>

      {/* Data rows */}
      <dl className="mt-8 space-y-3 border-t border-line pt-6">
        {[
          ["EDUCATION", identity.education],
          ["INSTITUTE", identity.college],
          ["PHASE", identity.years],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-6">
            <dt className="shrink-0 font-mono text-[0.58rem] uppercase tracking-[0.26em] text-steel/70">{k}</dt>
            <dd className="text-right font-mono text-[0.72rem] tracking-wide text-mist">{v}</dd>
          </div>
        ))}
      </dl>

      {/* Current focus */}
      <div className="mt-8 rounded-lg border border-electric/20 bg-electric/[0.06] p-4">
        <p className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.28em] text-electric">
          <Target size={12} /> CURRENT FOCUS
        </p>
        <p className="mt-2 font-display text-xl font-semibold tracking-tight text-frost">{aboutCard.focus}</p>
      </div>

      {/* Mindset pipeline */}
      <div className="mt-8">
        <p className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.26em] text-steel">
          <Cpu size={12} className="text-electric/80" /> ENGINEERING MINDSET
        </p>
        <div className="mt-4 flex items-center gap-2">
          {aboutCard.mindset.map((step, i) => (
            <div key={step} className="flex flex-1 items-center gap-2">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.18, duration: 0.45, ease: EASE }}
                className="flex h-9 flex-1 items-center justify-center rounded border border-white/10 bg-white/[0.03] font-mono text-[0.52rem] tracking-[0.14em] text-mist transition-colors hover:border-electric/50 hover:text-frost"
              >
                {step}
              </motion.span>
              {i < aboutCard.mindset.length - 1 && (
                <ArrowRight size={11} className="shrink-0 text-electric/60" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="mt-8 border-t border-line pt-6">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-steel">CURRENT MISSION</p>
        <p className="mt-2.5 text-sm leading-relaxed text-mist/90">{aboutCard.mission}</p>
      </div>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="WHO IS SHODHAN?"
          title="An engineer in progress, building toward the cloud."
          description="A quick system readout before the journey begins."
        />

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="max-w-2xl font-display text-[1.6rem] font-semibold leading-snug tracking-tight text-frost sm:text-[2rem]">
                I'm <span className="text-electric">Shodhan</span>, an Information Science &amp;
                Engineering student focused on building my career in{" "}
                <span className="text-electric">Cloud Engineering</span>.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line/70">
              <div className="bg-void/90 p-5">
                <CountUp value={projects.length} label="PROJECTS SHIPPED" />
              </div>
              <div className="bg-void/90 p-5">
                <CountUp value={certifications.length} label="CERTIFICATIONS" />
              </div>
              <div className="bg-void/90 p-5">
                <CountUp value={cloudServices.length} label="CORE AWS SERVICES" />
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {aboutParagraphs.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.5}>
                  <div className="card group h-full p-5 hover:-translate-y-0.5">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.26em] text-electric/90">
                      {String(i + 1).padStart(2, "0")} / {item.title}
                    </p>
                    <p className="mt-2.5 text-[0.85rem] leading-relaxed text-steel transition-colors duration-300 group-hover:text-mist">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <ProfileCard />
        </div>
      </div>
    </section>
  );
}
