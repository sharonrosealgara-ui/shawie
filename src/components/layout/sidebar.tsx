"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight, Sparkles, X } from "lucide-react";
import { NAV_GROUPS, APP_NAME } from "@/lib/nav-config";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function NavLinks({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-2 py-4">
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          {!collapsed && (
            <p className="px-3 pb-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              {group.label}
            </p>
          )}
          {group.items.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        "bg-sidebar border-sidebar-border sticky top-0 hidden h-dvh shrink-0 flex-col border-r transition-all duration-200 md:flex",
        sidebarCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">{APP_NAME}</p>
            <p className="truncate text-[10px] text-muted-foreground">Personal OS</p>
          </div>
        )}
      </div>

      <NavLinks collapsed={sidebarCollapsed} />

      <div className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center gap-2 text-sidebar-foreground/70"
          onClick={toggleSidebar}
        >
          {sidebarCollapsed ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />}
          {!sidebarCollapsed && "Collapse"}
        </Button>
      </div>
    </aside>
  );
}

export function MobileSidebar() {
  const { mobileNavOpen, setMobileNavOpen } = useUIStore();

  if (!mobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} />
      <aside className="bg-sidebar relative flex h-full w-72 flex-col shadow-xl">
        <div className="flex h-16 items-center justify-between gap-2 border-b border-sidebar-border px-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </div>
            <p className="truncate text-sm font-semibold text-sidebar-foreground">{APP_NAME}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setMobileNavOpen(false)}>
            <X className="size-4" />
          </Button>
        </div>
        <NavLinks collapsed={false} onNavigate={() => setMobileNavOpen(false)} />
      </aside>
    </div>
  );
}
