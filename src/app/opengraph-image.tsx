import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Find Your Match - Connect with people";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f43f5e 0%, #a855f7 50%, #6366f1 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            background: "rgba(255,255,255,0.2)",
            borderRadius: 60,
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 60, color: "white"}}>✨</span>
        </div>
        
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Find Your Match
        </h1>
        
        <p
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          Connect with people. Find your perfect match.
        </p>
      </div>
    ),
    { ...size }
  );
}
