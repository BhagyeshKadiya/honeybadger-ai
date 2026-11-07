import { ImageResponse } from "next/og";
import { JAW_PATH, LEFT_BOLT_PATH, RIGHT_BOLT_PATH } from "@/components/brand/BadgerMark";

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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="440" height="440" fill="none">
          <path d={LEFT_BOLT_PATH} fill="#1DF2E2" />
          <path d={RIGHT_BOLT_PATH} fill="#1DF2E2" />
          <path d={JAW_PATH} fill="#0FB8AA" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
