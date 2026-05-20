/**
 * Subtle radial darken — center darker, edges brighter (lets orbs/bloom shine on the sides).
 * Fixed position, sits between background orbs (-z-30) and content (z-0).
 */
export function CenterVignette() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20"
      style={{
        background:
          "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(2,3,10,0.55) 0%, rgba(2,3,10,0.32) 35%, rgba(2,3,10,0.10) 60%, transparent 85%)",
      }}
    />
  );
}
