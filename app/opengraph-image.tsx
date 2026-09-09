import { ImageResponse } from "next/og";

export const alt = "DevFixHub - Developer Tools, Tutorials & Error Fixes";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #042f2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          color: "#f8fafc",
          padding: "48px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#0d9488",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "32px",
              fontWeight: 900,
            }}
          >
            &gt;_
          </div>
          <div style={{ display: "flex", fontSize: "52px", fontWeight: 800, letterSpacing: "-0.03em" }}>
            <span>DevFix</span>
            <span style={{ color: "#2dd4bf" }}>Hub</span>
          </div>
        </div>

        <div
          style={{
            fontSize: "36px",
            fontWeight: 800,
            textAlign: "center",
            maxWidth: "920px",
            lineHeight: 1.25,
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          Fix Errors. Build Better Software.
        </div>

        <div
          style={{
            fontSize: "22px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          50+ Troubleshooting Guides • 10 Free In-Browser Tools • 30 Practical Tutorials
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
            color: "#2dd4bf",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          devfixhub.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
