"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui-store";
import { useSettingsStore } from "@/store/settings-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Topbar() {
  const { setMobileNavOpen } = useUIStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const notificationsEnabled = useSettingsStore((s) => s.settings.notificationsEnabled);

  useEffect(() => setMounted(true), []);

  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 px-4 backdrop-blur md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileNavOpen(true)}>
        <Menu className="size-5" />
      </Button>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {notificationsEnabled && (
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>
        )}
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        )}
        <Avatar className="size-8">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">SR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
