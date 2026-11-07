import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
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
          background: "#000000",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="420" height="420" fill="none">
          <path
            d="M20 12 L48 30 L38 56 L53 102 L44 106 L12 56 L24 40 L16 16 Z M100 12 L72 30 L82 56 L67 102 L76 106 L108 56 L96 40 L104 16 Z"
            fill="#1DF2E2"
          />
          <path d="M25 22 L42 33 L32 54 L22 40 Z M95 22 L78 33 L88 54 L98 40 Z" fill="#000000" />
          <path
            d="M46 34 L55 52 L46 70 L56 98 L60 98 L64 98 L74 70 L65 52 L74 34 L63 44 L60 36 L57 44 Z"
            fill="#0FB8AA"
          />
          <polygon points="39,57 46,64 43,68 36,61" fill="#1DF2E2" />
          <polygon points="81,57 74,64 77,68 84,61" fill="#1DF2E2" />
          <polygon points="50,104 70,104 66,112 54,112" fill="#1DF2E2" />
        </svg>
      </div>
    ),
    { ...size },
  );
}

