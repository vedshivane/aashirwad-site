import React from "react";
import { BrandText } from "@/components/brand-text";

export function parseBrandText(text: string): React.ReactNode {
  if (!text.includes("ECOAashirwad")) {
    return text;
  }

  const parts = text.split("ECOAashirwad");
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <BrandText />}
        </React.Fragment>
      ))}
    </>
  );
}
