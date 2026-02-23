"use client";

import { ReactNode } from "react";
import { Toaster as SonnerToaster } from "sonner";

import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/auth";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <SonnerToaster richColors position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}
