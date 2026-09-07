/** Fixed game HUD frame + global CRT scanlines. Desktop only, purely decorative. */
export function HudFrame() {
  return (
    <>
      <div aria-hidden="true" className="hud-frame hidden lg:block">
        <span className="tl" />
        <span className="tr" />
        <span className="bl" />
        <span className="br" />
      </div>
      <div aria-hidden="true" className="scanlines hidden md:block" />
    </>
  );
}
