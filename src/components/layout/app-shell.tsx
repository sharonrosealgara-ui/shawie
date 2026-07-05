"use client";

import type { ReactNode } from "react";
import { Sidebar, MobileSidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full">
      <Sidebar />
      <MobileSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
