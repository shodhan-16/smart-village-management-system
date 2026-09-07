import { motion } from "framer-motion";
import { CalendarDays, GraduationCap, MapPin } from "lucide-react";
import { educationTimeline } from "../data/content";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { EASE } from "../lib/motion";

const focusTags = ["Data Structures", "Databases", "OS", "Networking", "Software Engineering"];

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="EDUCATION"
          title="The foundation is loading."
          description="One timeline. Four years. Building the engineering base that every cloud system stands on."
        />

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Meta column */}
          <Reveal className="order-2 lg:order-1">
            <div className="panel space-y-5 p-6 sm:p-8">
              <div>
                <p className="mono-label">TIMELINE STATUS</p>
                <p className="mt-2 font-display text-xl font-semibold text-frost">IN PROGRESS</p>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-electric to-transparent"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-steel/70">
                ACADEMIC SESSION: 2026 — 2027 · IN PROGRESS
              </p>

              <div className="space-y-2 border-t border-line pt-5">
                <p className="mono-label">CURRENT FOCUS AREAS</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {focusTags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="border-t border-line pt-5 font-mono text-[0.6rem] uppercase tracking-[0.25em] leading-relaxed text-steel/80">
                NEXT PHASE → GRADUATE CORE ENGINEERING, SPECIALIZE IN CLOUD INFRASTRUCTURE
              </p>
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="relative order-1 pl-9 sm:pl-12 lg:order-2">
            {/* Rail */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10 sm:left-[17px]" aria-hidden="true">
              <motion.div
                className="w-full origin-top bg-gradient-to-b from-electric via-cyanflare/80 to-violetflare/70"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.6, ease: EASE }}
                style={{ height: "100%" }}
              />
            </div>

            {educationTimeline.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.degree}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                  className="relative"
                >
                  {/* Node */}
                  <span className="absolute -left-9 top-7 flex h-8 w-8 items-center justify-center rounded-full border border-electric/40 bg-void sm:-left-11 sm:h-10 sm:w-10">
                    <span className="absolute inset-0 rounded-full border border-electric/30 animate-pulse-dot motion-reduce:animate-none" />
                    <Icon size={16} className="text-electric" />
                  </span>

                  <div className="group panel relative overflow-hidden p-6 transition-all duration-500 hover:border-electric/40 hover:shadow-glow sm:p-8">
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric/[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-2 rounded border border-electric/30 bg-electric/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-electric">
                        <CalendarDays size={11} /> {item.period}
                      </span>
                      <span className="rounded border border-signal/30 bg-signal/10 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-signal">
                        ● {item.status}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-frost sm:text-3xl">
                      {item.degree}
                    </h3>
                    <p className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-steel">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap size={12} className="text-electric/80" /> {item.place}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-electric/80" /> {item.city}
                      </span>
                    </p>

                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-steel">{item.note}</p>

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                      {focusTags.map((tag, idx) => (
                        <span key={tag} className="chip">
                          {String(idx + 1).padStart(2, "0")}·{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
