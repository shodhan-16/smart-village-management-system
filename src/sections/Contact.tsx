import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, FileText, Github, Linkedin, Mail, Send } from "lucide-react";
import { emailHref, identity, links } from "../data/content";
import { MagneticButton } from "../components/MagneticButton";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { EASE } from "../lib/motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

function ConnectionTerminal() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const command = "> initiate_connection()";

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setTyped(command);
      setDone(true);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(command.slice(0, i));
      if (i >= command.length) {
        window.clearInterval(id);
        window.setTimeout(() => setDone(true), 350);
      }
    }, 55);
    return () => window.clearInterval(id);
  }, [inView, reduced, command]);

  return (
    <div ref={ref} className="panel relative overflow-hidden p-6 sm:p-8">
      <div className="flex items-center gap-2 border-b border-line pb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
        <span className="ml-3 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-steel/70">
          connection_channel.sh
        </span>
      </div>

      <div className="min-h-[7.5rem] pt-5 font-mono text-[0.78rem] leading-loose text-mist sm:text-sm">
        <p>
          <span className="text-electric/70">akash@shodhan:</span>
          <span className="text-cyanflare/70">~</span>
          <span className="text-frost">$</span> {typed}
          {!done && <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-blink bg-electric align-middle" />}
        </p>
        {done && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-2 flex items-center gap-2 text-signal"
          >
            <span className="status-dot" />
            Connection request ready. Awaiting handshake.
            <span className="animate-blink text-electric">▌</span>
          </motion.p>
        )}
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="08"
          eyebrow="LET'S BUILD SOMETHING"
          title="Ready to connect?"
          description={identity.tagline}
        />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="max-w-xl text-lg leading-relaxed text-mist/90 sm:text-xl">
                I'm currently focused on growing as a <span className="text-electric">Cloud Engineer</span> and
                building practical projects that solve real problems. If that's the kind of engineer your team
                needs — let's talk.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Linkedin, label: "LINKEDIN", href: links.linkedin, hint: "linkedin.com/in/your-handle" },
                { icon: Github, label: "GITHUB", href: links.github, hint: "github.com/your-handle" },
                { icon: Mail, label: "EMAIL", href: emailHref, hint: links.email || "you@example.com" },
                { icon: FileText, label: "DOWNLOAD RESUME", href: links.resume, hint: "PDF · always updated" },
              ].map(({ icon: Icon, label, href, hint }) => (
                <MagneticButton asChild key={label}>
                  <a
                    href={href || "#contact"}
                    target={href && (label === "LINKEDIN" || label === "GITHUB") ? "_blank" : undefined}
                    rel={href && (label === "LINKEDIN" || label === "GITHUB") ? "noreferrer noopener" : undefined}
                    onClick={(e) => {
                      if (!href) e.preventDefault();
                    }}
                    className="group flex items-center justify-between rounded-lg border border-line bg-panel/60 px-5 py-4 transition-all duration-500 hover:border-electric/50 hover:shadow-glow"
                  >
                    <span>
                      <span className="flex items-center gap-2.5 font-mono text-[0.66rem] font-semibold tracking-[0.22em] text-frost">
                        <Icon size={15} className="text-electric" />
                        {label}
                        {!href && (
                          <span className="rounded bg-amber-400/10 px-1.5 py-0.5 text-[0.5rem] tracking-[0.14em] text-amber-300/80">
                            PENDING
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block pl-[27px] font-mono text-[0.55rem] tracking-[0.12em] text-steel/60">
                        {hint}
                      </span>
                    </span>
                    <ArrowUpRight size={14} className="text-steel transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" />
                  </a>
                </MagneticButton>
              ))}
            </div>

            <Reveal delay={2}>
              <p className="mt-8 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-steel/70">
                <span className="status-dot" /> AVAILABLE FOR INTERNSHIPS · GRADUATE ROLES · COLLABORATIONS
              </p>
            </Reveal>
          </div>

          <Reveal delay={1}>
            <ConnectionTerminal />
            <div className="mt-6 flex items-center justify-between rounded-lg border border-line bg-white/[0.02] px-5 py-4">
              <div>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.25em] text-steel/70">COORDINATES</p>
                <p className="mt-1 font-mono text-[0.68rem] tracking-[0.14em] text-mist">Karnataka, India</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.25em] text-steel/70">TIMEZONE</p>
                <p className="mt-1 font-mono text-[0.68rem] tracking-[0.14em] text-mist">UTC+5:30 (IST)</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Final send-off */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-20 flex flex-col items-center gap-6 text-center"
        >
          <p className="font-display text-3xl font-bold tracking-tight text-frost sm:text-5xl">
            Let's build something <span className="text-electric text-glow">reliable.</span>
          </p>
          <button type="button" onClick={() => (links.email ? (window.location.href = emailHref) : undefined)} className="cta-primary">
            <Send size={15} />
            {links.email ? "SEND A MESSAGE" : "EMAIL — ADD IN src/data/content.ts"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
