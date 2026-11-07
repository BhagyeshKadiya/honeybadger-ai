import { ImageResponse } from "next/og";
import { SITE } from "./constants";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Branded OG card (1200x630):
 * Pure black (#000000) background, centered badger mark + HONEYBADGER.AI wordmark,
 * radial turquoise glow (#1DF2E2), and tagline / title.
 */
export function renderOg({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "56px 72px",
          background: "#000000",
          backgroundImage:
            "radial-gradient(60% 60% at 50% 0%, rgba(29, 242, 226, 0.25), transparent), radial-gradient(45% 45% at 50% 100%, rgba(15, 184, 170, 0.16), transparent)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        {/* Centered Logo Lockup (Mark + Wordmark) */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="56" height="56" fill="none">
            <path
              d="M20 12 L48 30 L38 56 L53 102 L44 106 L12 56 L24 40 L16 16 Z M100 12 L72 30 L82 56 L67 102 L76 106 L108 56 L96 40 L104 16 Z"
              fill="#1DF2E2"
            />
            <path d="M25 22 L42 33 L32 54 L22 40 Z M95 22 L78 33 L88 54 L98 40 Z" fill="#000000" />
            <path
              d="M46 34 L55 52 L46 70 L56 98 L60 98 L64 98 L74 70 L65 52 L74 34 L63 44 L60 36 L57 44 Z"
              fill="#0FB8AA"
            />
            <polygon points="50,104 70,104 66,112 54,112" fill="#1DF2E2" />
          </svg>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 6, color: "#FFFFFF" }}>HONEYBADGER.AI</div>
        </div>

        {/* Center Title / Tagline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, maxWidth: 980 }}>
          {eyebrow ? (
            <div style={{ fontSize: 20, color: "#1DF2E2", textTransform: "uppercase", letterSpacing: 5, fontWeight: 600 }}>
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              fontSize: title.length > 60 ? 52 : 64,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: "#FFFFFF",
            }}
          >
            {title}
          </div>
          {title !== SITE.tagline ? (
            <div style={{ fontSize: 22, color: "#9AA4A6" }}>{SITE.tagline}</div>
          ) : null}
        </div>

        {/* Footer Strip */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 20, color: "#9AA4A6", letterSpacing: 1 }}>
          <span style={{ color: "#1DF2E2" }}>●</span> honeybadgerai.in · Naroli, DNH · Serving India &amp; Worldwide
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
