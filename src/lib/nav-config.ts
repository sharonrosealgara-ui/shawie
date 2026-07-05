import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Wallet,
  PiggyBank,
  Receipt,
  Target,
  CalendarDays,
  FileBarChart,
  BarChart3,
  Briefcase,
  FolderKanban,
  Building2,
  Share2,
  Bot,
  GraduationCap,
  Sparkles,
  MessageCircleQuestion,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/", icon: LayoutDashboard }],
  },
  {
    label: "Finance",
    items: [
      { label: "Monthly Budget", href: "/finance/budget", icon: Wallet },
      { label: "Expense Tracker", href: "/finance/expenses", icon: Receipt },
      { label: "Savings Goals", href: "/finance/savings-goals", icon: PiggyBank },
      { label: "Bills", href: "/finance/bills", icon: FileBarChart },
      { label: "Calendar", href: "/finance/calendar", icon: CalendarDays },
      { label: "Reports", href: "/finance/reports", icon: FileBarChart },
      { label: "Analytics", href: "/finance/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Growth",
    items: [
      { label: "Career", href: "/career", icon: Briefcase },
      { label: "Projects", href: "/projects", icon: FolderKanban },
      { label: "Businesses", href: "/businesses", icon: Building2 },
      { label: "Social Planner", href: "/social-planner", icon: Share2 },
      { label: "Automation Center", href: "/automation-center", icon: Bot },
      { label: "Learning", href: "/learning", icon: GraduationCap },
      { label: "Dream Goals", href: "/dream-goals", icon: Target },
    ],
  },
  {
    label: "Assistant",
    items: [
      { label: "AI Assistant", href: "/ai-assistant", icon: MessageCircleQuestion },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export const APP_NAME = "AI Life OS";
export const APP_SUBTITLE = "My Personal Finance, Productivity & Automation Dashboard";
export { Sparkles };
