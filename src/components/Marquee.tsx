type Props = { items: string[]; speed?: number };

/** Infinite horizontal ticker of technical keywords. Pauses on hover. */
export function Marquee({ items, speed = 30 }: Props) {
  const row = [...items, ...items, ...items];
  return (
    <div
      aria-hidden="true"
      className="group relative overflow-hidden border-y border-line/70 py-5"
    >
      <div
        className="flex w-max items-center gap-10 whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-steel/80">
            {item}
            <span className="h-1 w-1 rounded-full bg-electric/60" />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}
