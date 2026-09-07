import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, links } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollTo } from "../lib/scroll";
import { useLockBody } from "../hooks/useLockBody";

function Logo() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-frost"
      aria-label="Back to top"
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-md border border-electric/40 bg-electric/10 font-mono text-[0.7rem] font-bold text-electric transition-all duration-300 group-hover:shadow-glow">
        S
      </span>
      SHODHAN<span className="text-electric">.</span>
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { active } = useActiveSection();
  useLockBody(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    // Close menu before scrolling so the section lands correctly.
    window.setTimeout(() => scrollTo(id), 80);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-line bg-void/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Logo />

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-md px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.24em] transition-colors duration-300 ${
                    isActive ? "text-frost" : "text-steel hover:text-mist"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-electric shadow-glow"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 font-mono text-[0.6rem] tracking-[0.22em] text-signal/90 md:flex">
              <span className="status-dot" />
              AVAILABLE FOR OPPORTUNITIES
            </span>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white/[0.03] text-mist transition-colors hover:border-electric/50 lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-void/95 pt-24 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav aria-label="Mobile" className="shell flex flex-1 flex-col gap-1">
              <p className="mb-5 flex items-center gap-2 border-b border-line pb-4 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-signal">
                <span className="status-dot" />
                AVAILABLE FOR OPPORTUNITIES
              </p>
              {NAV_ITEMS.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                    className={`flex items-center justify-between border-b border-line/70 py-4 text-left font-display text-2xl font-semibold tracking-tight ${
                      isActive ? "text-frost" : "text-mist/80"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-[0.65rem] tracking-[0.3em] text-electric">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </span>
                    {isActive && <span className="status-dot" />}
                  </motion.button>
                );
              })}
            </nav>
            <div className="shell pb-10 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-steel">
              {links.github ? "CONNECTION: LINKED" : "CONNECTION: PENDING — ADD LINKS IN src/data/content.ts"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
