import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SECTION_META, SECTION_ORDER } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollTo } from "../lib/scroll";

/**
 * Scroll chrome: a segmented XP-style progress beam plus the vertical
 * 01 / 09 level-select rail and a mobile mini-indicator.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  const { active, index } = useActiveSection();

  const railLength = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const railScaleY = useSpring(railLength, { stiffness: 120, damping: 28 });

  return (
    <>
      {/* Top segmented XP beam */}
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-white/[0.06]" aria-hidden="true">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric via-cyanflare/80 to-violetflare/70"
          style={{ scaleX }}
        />
        {/* Level segment ticks */}
        <div className="absolute inset-0 flex">
          {SECTION_ORDER.map((id, i) => (
            <span
              key={id}
              className={`h-full flex-1 border-r border-void/70 ${i === SECTION_ORDER.length - 1 ? "border-r-0" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop level-select rail */}
      <nav
        aria-label="Story progress"
        className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-0 xl:flex"
      >
        <div className="relative mb-6 ml-2 flex h-40 w-px">
          <span className="absolute inset-y-0 left-0 w-px bg-white/10" />
          <motion.span className="absolute left-0 top-0 w-px bg-electric" style={{ height: railScaleY }} />
        </div>
        <ul className="flex flex-col gap-1">
          {SECTION_ORDER.map((id, i) => {
            const meta = SECTION_META[id];
            const isActive = active === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex items-center gap-2.5 rounded-md px-2 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.24em] transition-all duration-300 ${
                    isActive ? "bg-white/[0.05] text-electric" : "text-steel/60 hover:bg-white/[0.03] hover:text-mist"
                  }`}
                >
                  <span className={`text-[0.52rem] ${isActive ? "text-electric" : "text-steel/40"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative h-1 w-1 rounded-full transition-all duration-300">
                    {isActive ? (
                      <span className="status-dot absolute inset-0 !bg-transparent [&::after]:bg-electric" />
                    ) : (
                      <span className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/40" />
                    )}
                  </span>
                  {meta.nav}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile indicator */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-lg border border-line bg-void/80 px-3 py-2 font-mono text-[0.6rem] tracking-[0.25em] text-steel backdrop-blur-sm sm:bottom-7 sm:right-7 xl:hidden">
        <span className="text-frost">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-steel/60">/ {String(SECTION_ORDER.length).padStart(2, "0")}</span>
      </div>
    </>
  );
}
