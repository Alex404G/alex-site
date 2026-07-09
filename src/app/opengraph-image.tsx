import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Alexandre GIL — Création de sites web & visibilité en ligne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Satoshi self-hostée pour la carte de partage : le premier contact (WhatsApp,
  // LinkedIn, SMS) doit porter la même voix typographique que le site.
  const satoshiBold = await readFile(join(process.cwd(), "src/app/satoshi-700.woff"));
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
          fontFamily: "Satoshi",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
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
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              background: "linear-gradient(135deg, #FFC178, #FF6F61)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            letterSpacing: "-0.04em",
          }}
        >
          <span style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.04 }}>Une présence en ligne</span>
          <span style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.04, color: "#FF8A4D" }}>
            qui travaille pour vous.
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#9CA3B8", marginTop: 36 }}>
          Création de sites web &amp; visibilité en ligne
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Satoshi",
          data: satoshiBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
