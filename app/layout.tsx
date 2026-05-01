import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import { MarbleBackground } from "@/components/MarbleBackground";
import { MotionProvider } from "@/components/motion-provider";
import { SiteShell } from "@/components/site-shell";
import { absoluteUrl, bgTheme, siteDescription, siteLocale, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Best Quality WPC Doors, Frames & Boards`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "WPC doors",
    "WPC frames",
    "WPC boards",
    "PVC boards",
    "CNC doors",
    "best quality WPC",
    "Eco Aashirwad",
    "EcoAashirwad",
    "WPC door Hyderabad",
    "waterproof doors",
    "termite proof doors",
    "WPC manufacturer India",
    "premium WPC",
    "WPC door shutters",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/brand-symbol-square.png",
    shortcut: "/brand-symbol-square.png",
    apple: "/brand-symbol-square.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: `${siteName} | Best Quality WPC Doors, Frames & Boards by Eco Aashirwad`,
    description: siteDescription,
    locale: siteLocale,
    images: [
      {
        url: absoluteUrl("/images/home/collage.png"),
        width: 1200,
        height: 630,
        alt: `${siteName} doors, frames, and boards collage`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Best Quality WPC Doors, Frames & Boards by Eco Aashirwad`,
    description: siteDescription,
    images: [absoluteUrl("/images/home/collage.png")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cabinetGrotesk.variable} ${gambetta.variable}`} data-bg={bgTheme}>
      <body>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <MarbleBackground theme={bgTheme} />
        <MotionProvider>
          <SiteShell>{children}</SiteShell>
        </MotionProvider>
      </body>
    </html>
  );
}
