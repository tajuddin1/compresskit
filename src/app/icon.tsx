import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d9488",
          borderRadius: 8,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
          <path
            d="M34 12a16.5 16.5 0 1 0 0 24"
            stroke="white"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M27.5 17.5 21 24l6.5 6.5"
            stroke="white"
            strokeWidth="4.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M34.5 20.5 30 24l4.5 3.5"
            stroke="white"
            strokeWidth="4.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
