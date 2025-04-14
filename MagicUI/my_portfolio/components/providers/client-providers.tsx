"use client";

import { LenisProvider } from "@/components/providers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ReactNode } from "react";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LenisProvider>
        <ThemeToggle />
        {children}
      </LenisProvider>
    </ThemeProvider>
  );
}
