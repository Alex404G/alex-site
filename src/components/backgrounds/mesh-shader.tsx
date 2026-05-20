"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  /** Override colors. Default = void + signature. */
  colors?: string[];
  speed?: number;
  opacity?: number;
  distortion?: number;
  swirl?: number;
};

/**
 * Mesh gradient shader — single bloom signature per scene.
 * Pauses when prefers-reduced-motion.
 */
export function MeshShader({
  className,
  colors = ["#02030A", "#3D5CFF", "#5B6BFF", "#8B5CF6", "#B845E8"],
  speed = 0.22,
  opacity = 1,
  distortion = 0.85,
  swirl = 0.4,
}: Props) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      className={className}
      style={{ opacity, position: "relative" }}
      aria-hidden
    >
      <MeshGradient
        colors={colors}
        speed={reduced ? 0 : speed}
        distortion={distortion}
        swirl={swirl}
        grainOverlay={0.18}
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      />
      {/* Soft secondary blur layer for that silky moodboard feel */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(91,107,255,0.18), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(184,69,232,0.16), transparent 55%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
