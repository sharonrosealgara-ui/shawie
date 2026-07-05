import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "@/components/ui/sonner";
import { StoreHydrator } from "@/components/store-hydrator";

export const metadata: Metadata = {
  title: "AI Life OS",
  description: "My Personal Finance, Productivity & Automation Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <StoreHydrator />
          <AppShell>{children}</AppShell>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
