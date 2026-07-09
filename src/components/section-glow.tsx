// Séparateur lumineux entre sections : une ligne dégradée + un halo doux.
// Casse le fond noir plat sans ajouter d'effet animé (zéro coût runtime).
const RGBA: Record<"warm" | "visi" | "sig", string> = {
  warm: "255, 154, 77",
  visi: "95, 227, 161",
  sig: "139, 92, 246",
};

export function SectionGlow({ theme = "warm" }: { theme?: "warm" | "visi" | "sig" }) {
  const rgba = RGBA[theme];
  return (
    <div aria-hidden className="relative mx-auto h-px w-full max-w-4xl px-6">
      <div
        className="absolute inset-x-6 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${rgba}, 0.35), transparent)`,
        }}
      />
      <div
        className="absolute left-1/2 top-0 h-28 w-[70%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(ellipse at center, rgba(${rgba}, 0.1), transparent 70%)`,
          filter: "blur(24px)",
        }}
      />
    </div>
  );
}
