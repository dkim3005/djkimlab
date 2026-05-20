import { ImageResponse } from "next/og";
import { getAllProjectSlugs, getProjectDetail } from "@/lib/projects";

export const alt = "djkimlab project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

// Same color buckets the landing-page card thumbnails use.
function paletteFor(category: string) {
  switch (category) {
    case "Investment Ops":
    case "Quant Finance":
      return { accent: "#3b82f6", glow: "rgba(59,130,246,0.30)", label: "Production" };
    case "Medical AI":
    case "Vision & HCI":
      return { accent: "#06b6d4", glow: "rgba(6,182,212,0.30)", label: "Perception" };
    case "Reinforcement Learning":
    case "Agentic AI":
      return { accent: "#8b5cf6", glow: "rgba(139,92,246,0.30)", label: "Learning" };
    case "NLP & Speech":
    case "LLM & RAG":
      return { accent: "#10b981", glow: "rgba(16,185,129,0.30)", label: "Language" };
    default:
      return { accent: "#94a3b8", glow: "rgba(148,163,184,0.30)", label: "Coursework" };
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProjectDetail(slug);
  if (!p) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            color: "#ededed",
            fontSize: 48,
          }}
        >
          djkimlab project
        </div>
      ),
      { ...size },
    );
  }

  const colors = paletteFor(p.category);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `radial-gradient(circle at 0% 0%, ${colors.glow} 0%, #0a0a0a 55%)`,
          padding: 72,
          color: "#ededed",
        }}
      >
        {/* top: site mark + category */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: colors.accent }}>$</span>
            <span style={{ marginLeft: 12 }}>djkimlab.com/projects/{p.slug}</span>
          </div>
          <div
            style={{
              padding: "8px 16px",
              border: `1px solid ${colors.accent}`,
              borderRadius: 999,
              color: colors.accent,
              fontSize: 20,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {p.category}
          </div>
        </div>

        {/* middle: title + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.05,
            }}
          >
            {p.title}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 30,
              color: "#cbd5e1",
              lineHeight: 1.3,
              maxWidth: 1000,
            }}
          >
            {p.tagline}
          </div>
        </div>

        {/* bottom: metric + cta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              color: colors.accent,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {p.metric ?? `${colors.label} · case study`}
          </div>
          <div style={{ color: "#94a3b8" }}>read more ↗</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
