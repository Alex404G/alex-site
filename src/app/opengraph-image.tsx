import { ImageResponse } from "next/og";

export const alt = "Alexandre GIL — Création de sites web & visibilité en ligne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#02030A",
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(255,154,77,0.38), transparent 55%), radial-gradient(circle at 92% 92%, rgba(240,71,107,0.32), transparent 55%)",
          color: "#F4F6FB",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#FF9A4D",
          }}
        >
          Alexandre Gil
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 28 }}>
          <span style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.04 }}>Votre site,</span>
          <span style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.04, color: "#FF8A4D" }}>
            votre visibilité.
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#9CA3B8", marginTop: 34 }}>
          Création de sites web &amp; visibilité en ligne
        </div>
      </div>
    ),
    { ...size },
  );
}
