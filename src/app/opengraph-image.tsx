import { ImageResponse } from "next/og";

export const alt = "CompressKit — Free online image compression";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #f0fdfa 0%, #ffffff 55%, #ecfeff 100%)",
          color: "#0f172a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#0f766e",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>CompressKit</div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 760,
            lineHeight: 1.1,
            letterSpacing: -1.5,
            maxWidth: 900,
          }}
        >
          Compress images without losing quality
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#64748b",
            maxWidth: 800,
          }}
        >
          Free, private, browser-based JPG, PNG and WebP tools
        </div>
      </div>
    ),
    size,
  );
}
