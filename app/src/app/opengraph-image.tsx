import { ImageResponse } from "next/og";

export const alt = "Dongjin Kim — AI & Infrastructure Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori (the engine behind next/og) can't parse the bundled Geist .ttf
// (GSUB lookupType 6 substFormat 1), so we let it fall back to its built-in
// sans-serif. Font face still says "Geist"/"Geist Mono" for site continuity,
// but Satori substitutes its default — close enough for an OG card.

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 20% 0%, #111827 0%, #0a0a0a 60%)",
          padding: 72,
          color: "#ededed",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "Geist Mono",
            fontSize: 28,
            color: "#94a3b8",
          }}
        >
          <span style={{ color: "#3b82f6" }}>$</span>
          <span style={{ marginLeft: 12 }}>djkimlab.com</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            Dongjin Kim
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 36,
              color: "#cbd5e1",
              lineHeight: 1.25,
              maxWidth: 980,
            }}
          >
            AI & ML Engineer · 8 live production systems from
            investment ops to medical AI to LLM agents.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "Geist Mono",
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex", gap: 18 }}>
            <span
              style={{
                padding: "8px 14px",
                border: "1px solid #1e293b",
                borderRadius: 999,
                color: "#cbd5e1",
              }}
            >
              M.S. CS · Georgia Tech
            </span>
            <span
              style={{
                padding: "8px 14px",
                border: "1px solid #1e293b",
                borderRadius: 999,
                color: "#cbd5e1",
              }}
            >
              CKA Certified
            </span>
            <span
              style={{
                padding: "8px 14px",
                border: "1px solid #1e293b",
                borderRadius: 999,
                color: "#cbd5e1",
              }}
            >
              Toronto, ON
            </span>
          </div>
          <div style={{ color: "#3b82f6" }}>Portfolio + Wiki ↗</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
