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
          color: "#09090b",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 28,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M34 12a16.5 16.5 0 1 0 0 24"
              stroke="#0d9488"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M27.5 17.5 21 24l6.5 6.5"
              stroke="#0d9488"
              strokeWidth="4.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M34.5 20.5 30 24l4.5 3.5"
              stroke="#0d9488"
              strokeWidth="4.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: -1.5,
            }}
          >
            <span style={{ color: "#09090b" }}>Compress</span>
            <span style={{ color: "#0d9488" }}>Kit</span>
          </div>
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
