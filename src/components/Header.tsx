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
      className="group flex items-center gap-2.5 font-display text-[1.05rem] font-bold tracking-tight text-frost"
      aria-label="Back to top"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-electric/30 bg-electric/10 font-mono text-[0.7rem] font-bold text-electric transition-all duration-300 group-hover:border-electric/60 group-hover:shadow-glow">
        S
      </span>
      <span>
        SHODHAN<span className="text-electric">.</span>
      </span>
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
    window.setTimeout(() => scrollTo(id), 80);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line/80 bg-void/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
          <Logo />

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-md px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? "bg-white/[0.05] text-frost" : "text-steel hover:bg-white/[0.03] hover:text-mist"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-px h-px bg-electric"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 rounded-full border border-signal/20 bg-signal/[0.06] px-3 py-1.5 font-mono text-[0.56rem] tracking-[0.18em] text-signal md:flex">
              <span className="status-dot" />
              AVAILABLE FOR OPPORTUNITIES
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-mist transition-colors hover:border-electric/40 lg:hidden"
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
            className="fixed inset-0 z-40 flex flex-col bg-void/95 pt-24 backdrop-blur-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav aria-label="Mobile" className="shell flex flex-1 flex-col gap-1">
              <p className="mb-5 flex items-center gap-2 border-b border-line pb-4 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-signal">
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
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.045, duration: 0.4 }}
                    className={`flex items-center justify-between border-b border-line/70 py-4 text-left font-display text-xl font-semibold tracking-tight ${
                      isActive ? "text-frost" : "text-mist/80"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-[0.62rem] tracking-[0.26em] text-electric">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </span>
                    {isActive && <span className="status-dot" />}
                  </motion.button>
                );
              })}
            </nav>
            <div className="shell pb-10 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-steel">
              {links.github ? "CONNECTION: LINKED" : "CONNECTION: PENDING — ADD LINKS IN src/data/content.ts"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
