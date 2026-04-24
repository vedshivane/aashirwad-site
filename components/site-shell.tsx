import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="relative isolate overflow-x-clip">
      <div className="site-ambient-stage" />
      <div className="site-graphic site-graphic-lines" />
      <div className="site-graphic site-graphic-circles" />
      <div className="site-graphic site-graphic-keys" />
      <div className="site-glow site-glow-left" />
      <div className="site-glow site-glow-right" />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
