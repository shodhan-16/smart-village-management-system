import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
  hue: number;
};

type Stream = {
  x: number;
  y: number;
  len: number;
  speed: number;
  alpha: number;
  phase: number;
};

/**
 * Fixed cinematic background: animated grid, drifting particles,
 * faint data streams and slow-moving ambient light. GPU-light (canvas 2D)
 * and fully disabled for prefers-reduced-motion.
 */
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let streams: Stream[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const seed = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(isMobile ? 34 : 68, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => {
        const hue = Math.random() > 0.72 ? 160 : Math.random() > 0.4 ? 250 : 215;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.6 + Math.random() * 1.5,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.1 - 0.05,
          phase: Math.random() * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.008,
          hue,
        };
      });

      streams = Array.from({ length: isMobile ? 5 : 9 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        len: 80 + Math.random() * 160,
        speed: 0.25 + Math.random() * 0.5,
        alpha: 0.025 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      // Drifting particles with twinkle
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * p.speed * 60 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 92%, 74%, ${0.2 * twinkle})`;
        ctx.fill();
      }

      // Faint vertical data streams
      for (const s of streams) {
        s.y += s.speed;
        if (s.y - s.len > height) {
          s.y = -s.len;
          s.x = Math.random() * width;
        }
        const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.len);
        grad.addColorStop(0, `rgba(125,180,255,0)`);
        grad.addColorStop(0.5, `rgba(125,180,255,${s.alpha})`);
        grad.addColorStop(1, `rgba(62,224,255,0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y + s.len);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    const onResize = () => seed();
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };

    seed();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Animated grid floor */}
      <div className="grid-floor absolute inset-0 animate-grid-pan opacity-70 motion-reduce:animate-none" />

      {/* Ambient orbs */}
      <div
        className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-60 blur-[130px] motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(77,141,255,0.14), rgba(77,141,255,0.045) 55%, transparent 100%)",
          animation: "float 13s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-20rem] right-[-16rem] h-[46rem] w-[46rem] rounded-full opacity-50 blur-[140px] motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(167,139,250,0.11), rgba(62,224,255,0.04) 55%, transparent 100%)",
          animation: "float 17s ease-in-out infinite reverse",
        }}
      />

      {/* Particles + data streams */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Subtle sweeping scanline */}
      <div
        className="absolute inset-x-0 h-24 opacity-[0.05]"
        style={{
          background: "linear-gradient(to bottom, transparent, #7db4ff, transparent)",
          animation: "scan 11s linear infinite",
        }}
      />
      <style>{`@keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }`}</style>
    </div>
  );
}
