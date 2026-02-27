import "./globals.css";
import Providers from "./providers";
import type { Metadata } from "next";
import { AuthProvider } from "@/context/auth";

export const metadata: Metadata = {
  title: "BUFF SALON",
  description: "Luxury salon booking & beauty platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
