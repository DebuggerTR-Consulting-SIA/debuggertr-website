import { ImageResponse } from "next/og";

// Branded 1200x630 social share card used site-wide (Open Graph + Twitter),
// replacing the tiny 300x80 logo that previously rendered as og:image.
export const alt =
  "DebuggerTR Consulting — SAP EWM & ABAP Consulting from Riga, Latvia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a1628 0%, #12233f 55%, #0a1628 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 32,
            letterSpacing: 3,
            color: "#4FC3F7",
            fontWeight: 600,
          }}
        >
          DEBUGGERTR CONSULTING
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.05,
          }}
        >
          SAP EWM & ABAP
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#4FC3F7",
          }}
        >
          Consulting
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 32,
            color: "#cbd5e1",
          }}
        >
          Implementation · S/4HANA Migration · ABAP Development
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 28,
            color: "#94a3b8",
          }}
        >
          Riga, Latvia · Serving Europe
        </div>
      </div>
    ),
    { ...size },
  );
}
