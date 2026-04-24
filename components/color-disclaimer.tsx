import React from "react";

interface ColorDisclaimerProps {
  className?: string;
}

export function ColorDisclaimer({ className }: ColorDisclaimerProps) {
  return (
    <div className={`mt-6 flex items-start gap-2 text-[0.85rem] text-[#4a3937] ${className ?? ""}`}>
      <span className="text-[var(--accent-red)] font-bold">*</span>
      <p>
        Colour can be different with different sizes. It is practically impossible to get the exact same output across different batch productions.
      </p>
    </div>
  );
}
