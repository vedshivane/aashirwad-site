import React from "react";

interface SectionHeadingProps {
  eyebrow: string | React.ReactNode;
  title: string | React.ReactNode;
  body?: string | React.ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignClass}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {body ? <p className="body-copy text-[var(--ink-muted)]">{body}</p> : null}
    </div>
  );
}
