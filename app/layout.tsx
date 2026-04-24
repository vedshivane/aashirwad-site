import type { Metadata } from "next";
import localFont from "next/font/local";

import { MotionProvider } from "@/components/motion-provider";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const cabinetGrotesk = localFont({
  src: [
    { path: "./fonts/cabinet-grotesk-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cabinet-grotesk-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cabinet-grotesk-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
});

const gambetta = localFont({
  src: [
    { path: "./fonts/gambetta-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/gambetta-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/gambetta-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-gambetta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EcoAashirwad | Highest Quality WPC",
    template: "%s | EcoAashirwad | Highest Quality WPC",
  },
  description: "WPC doors, frames, and boards built around strength, density, and resin.",
  icons: {
    icon: "/brand-symbol-square.png",
    shortcut: "/brand-symbol-square.png",
    apple: "/brand-symbol-square.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cabinetGrotesk.variable} ${gambetta.variable}`}>
      <body>
        <MotionProvider>
          <SiteShell>{children}</SiteShell>
        </MotionProvider>
      </body>
    </html>
  );
}
