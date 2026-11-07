import { ImageResponse } from "next/og";
import { SITE } from "./constants";
import { JAW_PATH, LEFT_BOLT_PATH, RIGHT_BOLT_PATH } from "@/components/brand/BadgerMark";

export const OG_SIZE = { width: 1200, height: 630 };

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
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="60" height="60" fill="none">
            <path d={LEFT_BOLT_PATH} fill="#1DF2E2" />
            <path d={RIGHT_BOLT_PATH} fill="#1DF2E2" />
            <path d={JAW_PATH} fill="#0FB8AA" />
          </svg>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 6, color: "#FFFFFF" }}>HONEYBADGER.AI</div>
        </div>

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

        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 20, color: "#9AA4A6", letterSpacing: 1 }}>
          <span style={{ color: "#1DF2E2" }}>●</span> honeybadgerai.in · Naroli, DNH · Serving India &amp; Worldwide
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
