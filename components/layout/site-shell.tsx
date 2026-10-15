"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** The homepage owns its full layout; industry pages use the shared site chrome. */
export function SiteShell({ children, header, footer, frame }: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  frame: ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  if (isHome) return <>{children}</>;
  return <>
    {header}
    <main id="main">{children}</main>
    {footer}
    {!pathname.startsWith("/industries/") && frame}
  </>;
}
