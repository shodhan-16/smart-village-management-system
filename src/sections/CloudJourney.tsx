import { motion } from "framer-motion";
import { ArrowDown, CloudCog, Activity, Layers, Lock, Database, Server, Eye, Cpu } from "lucide-react";
import { cloudServices, cloudStages } from "../data/content";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { EASE } from "../lib/motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const serviceMeta: Record<string, { icon: typeof Server; role: string; desc: string }> = {
  ec2: { icon: Server, role: "COMPUTE", desc: "Elastic virtual servers running on Linux." },
  vpc: { icon: Layers, role: "NETWORK", desc: "Isolated private networks, subnets and routing." },
  iam: { icon: Lock, role: "ACCESS", desc: "Identity and permissions — the security boundary." },
  s3: { icon: CloudCog, role: "STORAGE", desc: "Durable object storage for files and assets." },
  rds: { icon: Database, role: "DATABASE", desc: "Managed relational databases with MySQL." },
  cw: { icon: Eye, role: "OBSERVABILITY", desc: "Metrics, logs and monitoring for reliability." },
};

function StagePipeline() {
  return (
    <div className="relative">
      <div className="absolute bottom-4 left-[15px] top-4 w-px bg-white/10" aria-hidden="true">
        <motion.div
          className="w-full origin-top bg-gradient-to-b from-electric via-cyanflare to-violetflare"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 2, ease: EASE }}
          style={{ height: "100%" }}
        />
      </div>

      <ol className="space-y-8">
        {cloudStages.map((stage, i) => (
          <motion.li
            key={stage.label}
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.14 }}
            className="group relative pl-12"
          >
            <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-electric/40 bg-void font-mono text-[0.6rem] font-bold text-electric transition-shadow duration-300 group-hover:shadow-glow">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="rounded-lg border border-transparent p-3 -m-3 transition-all duration-300 group-hover:border-line group-hover:bg-white/[0.02]">
              <p className="flex flex-wrap items-baseline gap-x-3 font-display text-xl font-bold tracking-tight text-frost sm:text-2xl">
                {stage.label}
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-steel/60">
                  // {stage.code}
                </span>
              </p>
              <p className="mt-1.5 max-w-md text-[0.82rem] leading-relaxed text-steel">{stage.desc}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function InfraMap() {
  const reduced = useReducedMotion();

  return (
    <div className="panel relative overflow-hidden p-6 sm:p-8">
      <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-electric/50" />
      <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-electric/50" />
      <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-electric/50" />
      <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-electric/50" />

      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-steel">
          <Activity size={12} className="text-electric" /> INFRASTRUCTURE MAP
        </p>
        <p className="font-mono text-[0.58rem] tracking-[0.18em] text-signal">NODES: 6/6 ONLINE</p>
      </div>

      <div className="mt-8">
        {cloudServices.map((service, i) => {
          const meta = serviceMeta[service.code];
          const Icon = meta.icon;
          const last = i === cloudServices.length - 1;
          return (
            <div key={service.code}>
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.16 }}
                className="group flex items-center gap-4 rounded-lg border border-line bg-void/70 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-electric/45 hover:bg-electric/[0.04] hover:shadow-[0_12px_32px_-20px_rgba(77,141,255,0.5)]"
              >
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-electric/25 bg-electric/[0.08] text-electric transition-transform duration-500 group-hover:scale-110">
                  <span className="absolute inset-0 rounded-md border border-electric/20 animate-pulse-dot motion-reduce:animate-none" style={{ animationDelay: `${i * 0.45}s` }} />
                  <Icon size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <p className="font-mono text-sm font-semibold tracking-[0.18em] text-frost">{service.name}</p>
                    <p className="font-mono text-[0.52rem] uppercase tracking-[0.28em] text-electric/80">{meta.role}</p>
                  </div>
                  <p className="mt-0.5 truncate text-[0.72rem] text-steel">{meta.desc}</p>
                </div>
                <div className="flex items-center gap-1 font-mono text-[0.55rem] text-steel/60">
                  <Cpu size={11} />
                  <span className="hidden sm:inline">SERVICE</span>
                </div>
              </motion.div>

              {!last && (
                <div className="relative flex h-9 items-center justify-center" aria-hidden="true">
                  <motion.span
                    className="absolute h-7 w-px bg-gradient-to-b from-electric/50 to-electric/20"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.16 * (i + 1) + 0.1, ease: EASE }}
                  />
                  <ArrowDown size={12} className="relative text-electric/70" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Traveling signal along the chain */}
      {!reduced && (
        <div className="absolute bottom-8 left-[46px] top-[92px] w-px" aria-hidden="true">
          <motion.span
            className="absolute -left-[2px] h-1 w-[5px] rounded-full bg-cyanflare shadow-glow-cyan"
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
          />
        </div>
      )}

      <div className="mt-7 flex items-center justify-between border-t border-line pt-4 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-steel/70">
        <span>aws-core.stack</span>
        <span className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-signal motion-safe:animate-blink" /> SYNCED
        </span>
      </div>
    </div>
  );
}

export function CloudJourney() {
  return (
    <section id="cloud" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="CLOUD JOURNEY"
          title="Watching the architecture get built."
          description="From first concepts to engineered systems — the path I'm walking, and the core services I work with."
        />

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <StagePipeline />
          </Reveal>
          <Reveal delay={0.15}>
            <InfraMap />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
