"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import { ColorDisclaimer } from "./color-disclaimer";

type FinishOption = {
  name: string;
  hex: string;
  outer: string;
  side: string;
  sizes: string[];
};

type ProfileOption = {
  name: "Moulding" | "Square";
  finishes: FinishOption[];
};

type FrameRange = {
  name: string;
  note: string;
  profiles: ProfileOption[];
};

const FRAME_RANGES: FrameRange[] = [
  {
    name: "EcoAashirwad WPC",
    note: "High-density frame",
    profiles: [
      {
        name: "Moulding",
        finishes: [
          {
            name: "Coffee Black",
            hex: "#4d2b23",
            outer: "#5e362c",
            side: "#3b201a",
            sizes: ['4" x 2 1/2"'],
          },
          {
            name: "Sandalwood Ivory",
            hex: "#e8cfac",
            outer: "#f2dec2",
            side: "#c7a884",
            sizes: ['3" x 2"', '4" x 2 1/2"'],
          },
          {
            name: "EcoTeak",
            hex: "#b4733b",
            outer: "#c4824b",
            side: "#945c2c",
            sizes: ['3" x 2"', '4" x 2 1/2"'],
          },
        ],
      },
      {
        name: "Square",
        finishes: [
          {
            name: "Coffee Black",
            hex: "#4d2b23",
            outer: "#5e362c",
            side: "#3b201a",
            sizes: ['4" x 2 1/2"', '5" x 2 1/2"'],
          },
          {
            name: "Sandalwood Ivory",
            hex: "#e8cfac",
            outer: "#f2dec2",
            side: "#c7a884",
            sizes: ['4" x 2 1/2"', '5" x 2 1/2"'],
          },
        ],
      },
    ],
  },
  {
    name: "EcoAashirwad Solaris",
    note: "Highbond flagship",
    profiles: [
      {
        name: "Square",
        finishes: [
          {
            name: "EcoTeak",
            hex: "#b4733b",
            outer: "#c4824b",
            side: "#945c2c",
            sizes: ['4" x 2 1/2"', '5" x 2 1/2"'],
          },
        ],
      },
    ],
  },
];

const FRAME_LENGTHS = ["6 ft", "6.5 ft", "7 ft", "8 ft", "10 ft"];

export function FrameVisualizer() {
  const [rangeIndex, setRangeIndex] = useState(0);
  const [profileName, setProfileName] = useState<ProfileOption["name"]>("Moulding");
  const [finishIndex, setFinishIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);

  const activeRange = FRAME_RANGES[rangeIndex];

  const profiles = activeRange.profiles;
  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.name === profileName) ?? profiles[0],
    [profileName, profiles],
  );
  const finishes = activeProfile.finishes;
  const activeFinish = finishes[finishIndex] ?? finishes[0];
  const activeSize = activeFinish.sizes[sizeIndex] ?? activeFinish.sizes[0];

  const handleRangeChange = (index: number) => {
    const nextRange = FRAME_RANGES[index];
    const nextProfile = nextRange.profiles[0];
    setRangeIndex(index);
    setProfileName(nextProfile.name);
    setFinishIndex(0);
    setSizeIndex(0);
  };

  const handleProfileChange = (nextProfileName: ProfileOption["name"]) => {
    const nextProfile =
      activeRange.profiles.find((profile) => profile.name === nextProfileName) ??
      activeRange.profiles[0];
    setProfileName(nextProfile.name);
    setFinishIndex(0);
    setSizeIndex(0);
  };

  const handleFinishChange = (index: number) => {
    setFinishIndex(index);
    setSizeIndex(0);
  };

  return (
    <div className="surface-panel mt-12 mb-4 overflow-hidden">
      <div className="flex flex-col items-stretch justify-between gap-12 p-4 lg:flex-row lg:items-stretch lg:p-8">
        <div className="relative flex min-h-[440px] w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-slate-50/70 p-6 shadow-inner lg:min-h-[680px] lg:self-stretch">
          <div className="absolute left-8 top-6 z-20 opacity-70">
            <h4 className="mb-2 font-display text-[2rem] leading-none tracking-tight text-[var(--ink-strong)] md:text-[2.6rem]">
              Cross Section
              <br />
              Profile
            </h4>
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink-subtle)] md:text-[0.85rem]">
              {activeRange.name} · {activeProfile.name}
            </p>
          </div>

          <div
            className="absolute inset-0 opacity-[0.4] bg-[radial-gradient(circle_at_center,_#d7d1c8_1px,_transparent_1.5px)]"
            style={{ backgroundSize: "16px 16px" }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeRange.name}-${activeProfile.name}-${activeFinish.name}-${activeSize}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="flex h-full w-full items-center justify-center pt-20 pb-10 md:pt-24 md:pb-12"
            >
              {activeProfile.name === "Square" ? (
                <CrossSection3DSquare
                  hex={activeFinish.hex}
                  side={activeFinish.side}
                  outer={activeFinish.outer}
                  sizeLabel={activeSize}
                />
              ) : (
                <CrossSection3DMoulding
                  hex={activeFinish.hex}
                  side={activeFinish.side}
                  outer={activeFinish.outer}
                  sizeLabel={activeSize}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full shrink-0 lg:w-[420px] xl:w-[460px]">
          <h3 className="mb-3 font-display text-[1.8rem] tracking-tight text-[var(--ink-strong)] xl:text-[2.2rem]">
            Frame Configuration
          </h3>
          <p className="mb-8 text-[1rem] leading-7 text-[var(--ink-muted)]">
            Graphic cross-sections now follow the current handwritten frame sheet, including
            range-specific sizes and finishes.
          </p>

          <div className="grid gap-8">
            <section>
              <h4 className="mb-4 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                Frame Range
              </h4>
              <div className="grid gap-3">
                {FRAME_RANGES.map((range, index) => {
                  const isSelected = rangeIndex === index;
                  return (
                    <button
                      key={range.name}
                      onClick={() => handleRangeChange(index)}
                      className={`w-full rounded-xl border p-4 text-left transition-all ${
                        isSelected
                          ? "scale-[1.02] border-[var(--accent-red)] bg-white shadow-md"
                          : "border-[var(--line-soft)] bg-[var(--surface-ground)] hover:bg-white/60"
                      }`}
                    >
                      <span className="block text-[1rem] font-medium text-[var(--ink-strong)]">
                        {range.name}
                      </span>
                      <span className="mt-1 block text-[0.85rem] uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
                        {range.note}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <h4 className="mb-4 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                Profile
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                {activeRange.profiles.map((profile) => {
                  const isSelected = activeProfile.name === profile.name;
                  return (
                    <button
                      key={profile.name}
                      onClick={() => handleProfileChange(profile.name)}
                      className={`flex min-h-[4rem] items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                        isSelected
                          ? "relative z-10 scale-[1.02] border-[var(--accent-red)] bg-white shadow-md"
                          : "border-[var(--line-soft)] bg-[var(--surface-ground)] hover:bg-white/60"
                      }`}
                    >
                      <div
                        className={`flex shrink-0 items-center justify-center p-1 ${
                          isSelected ? "text-[var(--accent-red)]" : "text-[var(--ink-subtle)]"
                        }`}
                      >
                        {profile.name === "Square" ? <SquareIcon /> : <MouldingIcon />}
                      </div>
                      <span className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-strong)]">
                        {profile.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <h4 className="mb-4 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                Finish Options
              </h4>
              <div className="space-y-3.5" role="radiogroup" aria-label="Frame finish color">
                {finishes.map((finish, index) => {
                  const isSelected = finishIndex === index;
                  return (
                    <button
                      key={finish.name}
                      onClick={() => handleFinishChange(index)}
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`Select ${finish.name} finish`}
                      className={`flex min-h-[4.5rem] w-full items-center justify-between rounded-xl border p-4 transition-all ${
                        isSelected
                          ? "scale-[1.02] border-[var(--accent-red)] bg-white shadow-md"
                          : "border-[var(--line-soft)] hover:bg-white/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="h-11 w-11 shrink-0 rounded-full border"
                          style={{
                            backgroundColor: finish.hex,
                            borderColor: finish.side,
                          }}
                        />
                        <div>
                          <span className="block text-[1.05rem] font-medium text-[var(--ink-strong)]">
                            {finish.name}
                          </span>
                          <span className="block text-[0.82rem] text-[var(--ink-subtle)]">
                            {finish.sizes.join(", ")}
                          </span>
                        </div>
                      </div>
                      {isSelected ? (
                        <motion.div
                          layoutId="frame-active-dot"
                          className="h-2 w-2 rounded-full bg-[var(--accent-red)]"
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <h4 className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                Available Sizes
              </h4>
              <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Frame sizes">
                {activeFinish.sizes.map((size, index) => (
                  <button
                    key={size}
                    onClick={() => setSizeIndex(index)}
                    role="radio"
                    aria-checked={sizeIndex === index}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-bold transition-all ${
                      sizeIndex === index
                        ? "border-[var(--accent-red)] bg-[var(--accent-red)] text-white shadow-sm"
                        : "border-[var(--line-soft)] bg-white text-[var(--ink-muted)] hover:border-[var(--ink-subtle)]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-ground)] p-5">
              <h4 className="text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                Standard Frame Lengths
              </h4>
              <p className="mt-3 text-[1rem] leading-7 text-[var(--ink-muted)]">
                {FRAME_LENGTHS.join(", ")}
              </p>
              <p className="mt-2 text-[0.9rem] text-[var(--ink-subtle)]">
                Enquire for other size needs.
              </p>
            </section>

            <ColorDisclaimer className="text-[0.8rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SquareIcon() {
  return (
    <svg width="32" height="24" viewBox="0 0 100 60" fill="currentColor" aria-hidden="true">
      <path d="M0 0 V60 H100 V30 H60 V0 Z" />
    </svg>
  );
}

function MouldingIcon() {
  return (
    <svg width="40" height="24" viewBox="0 0 100 60" fill="currentColor" aria-hidden="true">
      <path d="M0 60 H100 V32 H64 V0 H14 Q4 0 4 10 V16 H0 Z" />
      <path d="M12 60 V50 H24 V60 Z" />
      <path d="M42 60 V50 H54 V60 Z" />
    </svg>
  );
}

function CrossSection3DSquare({
  hex,
  side,
  outer,
  sizeLabel,
}: {
  hex: string;
  side: string;
  outer: string;
  sizeLabel: string;
}) {
  const { width, depth, widthText, depthText } = parseSizeLabel(sizeLabel, 4, 2.5);
  const widthScale = width / 4;
  const depthScale = depth / 2.5;
  const x0 = 30;
  const yTop = 85;
  const upperWidth = 75 * widthScale;
  const depthOffset = 60 * depthScale;
  const shoulderY = 115;
  const topY = yTop - depthOffset;
  const frontWidth = upperWidth + depthOffset;
  const widthEnd = x0 + frontWidth;
  const depthFaceX = x0 + upperWidth;
  const farRightX = widthEnd + depthOffset;
  const frontShadeId = `sq-front-${hex.replace("#", "")}`;
  const topShadeId = `sq-top-${hex.replace("#", "")}`;
  const sideShadeId = `sq-side-${hex.replace("#", "")}`;

  return (
    <svg
      viewBox="0 0 280 240"
      className="h-auto w-[94%] max-w-[560px] overflow-visible drop-shadow-[0_24px_30px_rgba(0,0,0,0.18)]"
    >
      <defs>
        <linearGradient id={frontShadeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={topShadeId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id={sideShadeId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <g>
        <path d={`M${x0} ${yTop} L${depthFaceX} ${yTop} L${widthEnd} ${topY} L${x0 + depthOffset} ${topY} Z`} fill={outer} />
        <path d={`M${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY} L${farRightX} ${shoulderY - depthOffset} L${widthEnd} ${shoulderY - depthOffset} Z`} fill={outer} />
        <path d={`M${x0} ${yTop} L${depthFaceX} ${yTop} L${widthEnd} ${topY} L${x0 + depthOffset} ${topY} Z`} fill={`url(#${topShadeId})`} />
        <path d={`M${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY} L${farRightX} ${shoulderY - depthOffset} L${widthEnd} ${shoulderY - depthOffset} Z`} fill={`url(#${topShadeId})`} />

        <path d={`M${depthFaceX} ${yTop} L${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY - depthOffset} L${widthEnd} ${topY} Z`} fill={side} />
        <path d={`M${widthEnd} ${shoulderY} L${widthEnd} 175 L${farRightX} 115 L${farRightX} ${shoulderY - depthOffset} Z`} fill={side} />
        <path d={`M${depthFaceX} ${yTop} L${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY - depthOffset} L${widthEnd} ${topY} Z`} fill={`url(#${sideShadeId})`} />
        <path d={`M${widthEnd} ${shoulderY} L${widthEnd} 175 L${farRightX} 115 L${farRightX} ${shoulderY - depthOffset} Z`} fill={`url(#${sideShadeId})`} />

        <path d={`M${x0} ${yTop} L${depthFaceX} ${yTop} L${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY} L${widthEnd} 175 L${x0} 175 Z`} fill={hex} />
        <path
          d={`M${x0} ${yTop} L${depthFaceX} ${yTop} L${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY} L${widthEnd} 175 L${x0} 175 Z`}
          fill={`url(#${frontShadeId})`}
        />

        <path
          d={`M${x0} ${yTop} L${depthFaceX} ${yTop} L${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY} L${widthEnd} 175`}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d={`M${x0} ${yTop} L${depthFaceX} ${yTop} L${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY} L${widthEnd} 175 L${x0} 175 Z`}
          fill="none"
          stroke={side}
          strokeOpacity="0.82"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>

      <DimensionGuides
        widthLabel={widthText}
        depthLabel={depthText}
        widthStart={x0}
        widthEnd={widthEnd}
        depthTop={shoulderY - depthOffset}
        depthBottom={shoulderY}
        depthLineX={farRightX + 10}
        widthTextX={(x0 + widthEnd) / 2}
        depthTextX={farRightX + 20}
      />
    </svg>
  );
}

function CrossSection3DMoulding({
  hex,
  side,
  outer,
  sizeLabel,
}: {
  hex: string;
  side: string;
  outer: string;
  sizeLabel: string;
}) {
  const { width, depth, widthText, depthText } = parseSizeLabel(sizeLabel, 4, 2.5);
  const widthScale = width / 4;
  const depthScale = depth / 2.5;
  const x0 = 18;
  const yTop = 86;
  const upperWidth = 88 * widthScale;
  const depthOffset = 60 * depthScale;
  const shoulderY = 118;
  const topY = yTop - depthOffset;
  const frontWidth = upperWidth + depthOffset + 4 * widthScale;
  const widthEnd = x0 + frontWidth;
  const depthFaceX = x0 + upperWidth;
  const farRightX = widthEnd + depthOffset;
  const notchWidth = 16 * widthScale;
  const notchDepth = 15;
  const notchGap = 34 * widthScale;
  const firstNotchX = x0 + 18 * widthScale;
  const secondNotchX = firstNotchX + notchWidth + notchGap;
  const frontPath = [
    `M ${x0} 175`,
    `L ${firstNotchX} 175`,
    `L ${firstNotchX} ${175 - notchDepth}`,
    `L ${firstNotchX + notchWidth} ${175 - notchDepth}`,
    `L ${firstNotchX + notchWidth} 175`,
    `L ${secondNotchX} 175`,
    `L ${secondNotchX} ${175 - notchDepth}`,
    `L ${secondNotchX + notchWidth} ${175 - notchDepth}`,
    `L ${secondNotchX + notchWidth} 175`,
    `L ${widthEnd} 175`,
    `L ${widthEnd} ${shoulderY}`,
    `L ${depthFaceX} ${shoulderY}`,
    `L ${depthFaceX} ${yTop}`,
    `L ${x0 + 18 * widthScale} ${yTop}`,
    `Q ${x0} ${yTop} ${x0} ${yTop + 12}`,
    "Z",
  ].join(" ");
  const frontShadeId = `md-front-${hex.replace("#", "")}`;
  const topShadeId = `md-top-${hex.replace("#", "")}`;
  const sideShadeId = `md-side-${hex.replace("#", "")}`;

  return (
    <svg
      viewBox="0 0 340 240"
      className="h-auto w-[94%] max-w-[620px] overflow-visible drop-shadow-[0_24px_30px_rgba(0,0,0,0.18)]"
    >
      <defs>
        <linearGradient id={frontShadeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={topShadeId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id={sideShadeId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <g>
        <path d={`M${x0 + 8 * widthScale} ${yTop} L${depthFaceX} ${yTop} L${widthEnd} ${topY} L${x0 + depthOffset + 8 * widthScale} ${topY} Z`} fill={outer} />
        <path d={`M${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY} L${farRightX} ${shoulderY - depthOffset} L${widthEnd} ${shoulderY - depthOffset} Z`} fill={outer} />
        <path d={`M${x0 + 8 * widthScale} ${yTop} L${depthFaceX} ${yTop} L${widthEnd} ${topY} L${x0 + depthOffset + 8 * widthScale} ${topY} Z`} fill={`url(#${topShadeId})`} />
        <path d={`M${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY} L${farRightX} ${shoulderY - depthOffset} L${widthEnd} ${shoulderY - depthOffset} Z`} fill={`url(#${topShadeId})`} />

        <path d={`M${depthFaceX} ${yTop} L${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY - depthOffset} L${widthEnd} ${topY} Z`} fill={side} />
        <path d={`M${widthEnd} ${shoulderY} L${widthEnd} 175 L${farRightX} 115 L${farRightX} ${shoulderY - depthOffset} Z`} fill={side} />
        <path d={`M${depthFaceX} ${yTop} L${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY - depthOffset} L${widthEnd} ${topY} Z`} fill={`url(#${sideShadeId})`} />
        <path d={`M${widthEnd} ${shoulderY} L${widthEnd} 175 L${farRightX} 115 L${farRightX} ${shoulderY - depthOffset} Z`} fill={`url(#${sideShadeId})`} />

        <path d={frontPath} fill={hex} />
        <path d={frontPath} fill={`url(#${frontShadeId})`} />

        <path
          d={`M${x0 + 18 * widthScale} ${yTop} L${depthFaceX} ${yTop} L${depthFaceX} ${shoulderY} L${widthEnd} ${shoulderY} L${widthEnd} 175`}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d={frontPath}
          fill="none"
          stroke={side}
          strokeOpacity="0.82"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>

      <DimensionGuides
        widthLabel={widthText}
        depthLabel={depthText}
        widthStart={x0}
        widthEnd={widthEnd}
        depthTop={shoulderY - depthOffset}
        depthBottom={shoulderY}
        depthLineX={farRightX + 10}
        widthTextX={(x0 + widthEnd) / 2}
        depthTextX={farRightX + 18}
      />
    </svg>
  );
}

function parseSizeLabel(sizeLabel: string, fallbackWidth: number, fallbackDepth: number) {
  const dimensions = sizeLabel.split("x").map((dimension) => dimension.trim().replace(/"/g, ""));
  const widthText = dimensions[0] || `${fallbackWidth}`;
  const depthText = dimensions[1] || formatInches(fallbackDepth);

  return {
    width: parseInches(widthText) || fallbackWidth,
    depth: parseInches(depthText) || fallbackDepth,
    widthText,
    depthText,
  };
}

function parseInches(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return 0;
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length === 2) {
    return Number(parts[0]) + parseFraction(parts[1]);
  }

  if (trimmed.includes("/")) {
    return parseFraction(trimmed);
  }

  return Number(trimmed);
}

function parseFraction(value: string) {
  const [numerator, denominator] = value.split("/").map(Number);
  if (!numerator || !denominator) {
    return 0;
  }

  return numerator / denominator;
}

function formatInches(value: number) {
  if (Number.isInteger(value)) {
    return `${value}`;
  }

  const whole = Math.floor(value);
  const fraction = value - whole;
  if (Math.abs(fraction - 0.5) < 0.001) {
    return `${whole} 1/2`;
  }

  return `${value}`;
}

function DimensionGuides({
  widthLabel,
  depthLabel,
  widthStart,
  widthEnd,
  depthTop,
  depthBottom,
  depthLineX,
  widthTextX,
  depthTextX,
}: {
  widthLabel: string;
  depthLabel: string;
  widthStart: number;
  widthEnd: number;
  depthTop: number;
  depthBottom: number;
  depthLineX: number;
  widthTextX: number;
  depthTextX: number;
}) {
  return (
    <g
      className="text-[var(--ink-subtle)] opacity-60"
      style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: "bold" }}
    >
      <g stroke="currentColor" strokeWidth="0.8">
        <path d={`M${widthStart} 185 V200 M${widthEnd} 185 V200`} />
        <path d={`M${widthStart + 5} 195 H${widthEnd - 5}`} strokeDasharray="2 2" />
      </g>
      <text x={widthTextX} y="212" textAnchor="middle" fill="currentColor">
        {`${widthLabel}"`}
      </text>

      <g stroke="currentColor" strokeWidth="0.8">
        <path
          d={`M${depthLineX - 10} ${depthTop} H${depthLineX + 5} M${depthLineX - 10} ${depthBottom} H${depthLineX + 5}`}
        />
        <path d={`M${depthLineX} ${depthTop + 5} V${depthBottom - 5}`} strokeDasharray="2 2" />
      </g>
      <text x={depthTextX} y="85" textAnchor="start" fill="currentColor" dy="4">
        {`${depthLabel}"`}
      </text>
    </g>
  );
}
