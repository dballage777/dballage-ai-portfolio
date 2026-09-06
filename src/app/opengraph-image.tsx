import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0d11",
          color: "#e9edf2",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              border: "2px solid #2c3743",
              color: "#2dd4bf",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {"{ }"}
          </div>
          <div style={{ fontSize: 26, fontWeight: 600 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 15,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#8b95a2",
            }}
          >
            {site.role}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0 16px",
              fontSize: 60,
              fontWeight: 600,
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            <span>I turn messy problems into</span>
            <span style={{ color: "#2dd4bf" }}>tested, repeatable</span>
            <span>AI workflows.</span>
          </div>
        </div>

        <div style={{ fontSize: 22, color: "#8b95a2" }}>
          Prompt systems · AI workflow design · Evaluation
        </div>
      </div>
    ),
    { ...size },
  );
}
