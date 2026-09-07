import { ArrowUpRight, Github, Linkedin, Mail, FileText } from "lucide-react";
import { links, emailHref } from "../data/content";

const socials = [
  { icon: Github, label: "GitHub", href: links.github, external: true },
  { icon: Linkedin, label: "LinkedIn", href: links.linkedin, external: true },
  { icon: Mail, label: "Email", href: emailHref, external: false },
  { icon: FileText, label: "Resume", href: links.resume, external: false },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line/80">
      <div className="shell flex flex-col gap-10 py-14">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight text-frost">
              SHODHAN<span className="text-electric">.</span>
            </p>
            <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-steel">
              Cloud Engineer
            </p>
            <p className="mt-4 max-w-xs text-[0.8rem] leading-relaxed text-steel/80">
              Building reliable cloud-powered systems from Karnataka, India.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {socials.map(({ icon: Icon, label, href, external }) => (
              <li key={label}>
                <a
                  href={href || "#contact"}
                  onClick={(e) => {
                    if (!href) e.preventDefault();
                  }}
                  target={external && href ? "_blank" : undefined}
                  rel={external && href ? "noreferrer noopener" : undefined}
                  className="group flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-steel transition-colors hover:text-frost"
                >
                  <Icon size={14} className="text-steel/70 transition-colors group-hover:text-electric" />
                  {label}
                  <ArrowUpRight size={12} className="opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-line/70 pt-6 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-steel/70 sm:flex-row">
          <p>© 2026 Shodhan. Built with curiosity, code & cloud.</p>
          <p className="flex items-center gap-2">
            <span className="status-dot" />
            SYSTEM STATUS: <span className="text-signal">OPERATIONAL</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
