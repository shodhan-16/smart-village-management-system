import { useEffect, useState } from "react";
import { SECTION_ORDER, type SectionId } from "../data/content";

/**
 * Watches the main story sections and returns the id of the section
 * currently intersecting the middle band of the viewport.
 */
export function useActiveSection(): { active: SectionId; index: number } {
  const [active, setActive] = useState<SectionId>("identity");
  const index = SECTION_ORDER.indexOf(active);

  useEffect(() => {
    const sections = SECTION_ORDER.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            if (SECTION_ORDER.includes(id)) setActive(id);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return { active, index };
}
