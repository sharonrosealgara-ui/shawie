import { generateId } from "@/lib/id";
import type {
  BudgetCategory,
  SavingsGoal,
  Bill,
  Expense,
  JobApplication,
  Interview,
  Client,
  Certificate,
  ResumeVersion,
  CareerGoal,
  Skill,
  IncomeSource,
  Project,
  Business,
  SocialPost,
  ContentIdea,
  AutomationCard,
  LearningTrack,
  Settings,
} from "@/types";

export const MONTHLY_SALARY = 25000;

export const DEFAULT_SETTINGS: Settings = {
  monthlySalary: MONTHLY_SALARY,
  currency: "PHP",
  themeColor: "violet",
  statusColors: {
    pending: "#f59e0b",
    paid: "#3b82f6",
    done: "#22c55e",
  },
  notificationsEnabled: true,
  cardAccent: "violet",
};

export const SEED_BUDGET_CATEGORIES: BudgetCategory[] = [
  // Fixed Expenses = 9,700
  { id: generateId(), group: "Fixed Expenses", category: "Tithes (10%)", amount: 2500, dueDate: "05", priority: "high", status: "pending", spent: 0, notes: "10% of monthly salary" },
  { id: generateId(), group: "Fixed Expenses", category: "Dental Payment", amount: 3000, dueDate: "10", priority: "high", status: "pending", spent: 0 },
  { id: generateId(), group: "Fixed Expenses", category: "Claude Pro", amount: 1400, dueDate: "15", priority: "medium", status: "pending", spent: 0 },
  { id: generateId(), group: "Fixed Expenses", category: "PayLater", amount: 1300, dueDate: "20", priority: "high", status: "pending", spent: 0 },
  { id: generateId(), group: "Fixed Expenses", category: "Insurance", amount: 1500, dueDate: "25", priority: "high", status: "pending", spent: 0 },
  // Savings = 9,600
  { id: generateId(), group: "Savings", category: "General Savings", amount: 2000, priority: "medium", status: "pending", spent: 0 },
  { id: generateId(), group: "Savings", category: "Emergency Fund", amount: 1500, priority: "high", status: "pending", spent: 0 },
  { id: generateId(), group: "Savings", category: "Travel Savings", amount: 1200, priority: "low", status: "pending", spent: 0 },
  { id: generateId(), group: "Savings", category: "Church Anniversary Fund (June)", amount: 1200, priority: "medium", status: "pending", spent: 0 },
  { id: generateId(), group: "Savings", category: "Sister Wedding Fund (Next June)", amount: 1700, priority: "medium", status: "pending", spent: 0 },
  { id: generateId(), group: "Savings", category: "Future House Savings", amount: 2000, priority: "medium", status: "pending", spent: 0 },
  // Lifestyle = 5,700
  { id: generateId(), group: "Lifestyle", category: "Needs", amount: 3700, priority: "medium", status: "pending", spent: 0 },
  { id: generateId(), group: "Lifestyle", category: "Wants", amount: 2000, priority: "low", status: "pending", spent: 0 },
];

function nextJune(): string {
  const now = new Date();
  const year = now.getMonth() >= 5 ? now.getFullYear() + 1 : now.getFullYear();
  return `${year}-06-15`;
}

export const SEED_SAVINGS_GOALS: SavingsGoal[] = [
  { id: generateId(), name: "General Savings", targetAmount: 50000, currentAmount: 8500, monthlyContribution: 2000, category: "savings", milestones: [
    { id: generateId(), label: "First ₱10,000", amount: 10000, reached: false },
    { id: generateId(), label: "Halfway", amount: 25000, reached: false },
  ] },
  { id: generateId(), name: "Emergency Fund", targetAmount: 75000, currentAmount: 15000, monthlyContribution: 1500, category: "savings", milestones: [
    { id: generateId(), label: "1 month of expenses", amount: 25000, reached: false },
    { id: generateId(), label: "3 months of expenses", amount: 75000, reached: false },
  ] },
  { id: generateId(), name: "Travel Savings", targetAmount: 30000, currentAmount: 6000, monthlyContribution: 1200, category: "savings", milestones: [
    { id: generateId(), label: "Flight booked", amount: 12000, reached: false },
  ] },
  { id: generateId(), name: "Church Anniversary Fund", targetAmount: 14400, currentAmount: 2400, monthlyContribution: 1200, targetDate: nextJune(), category: "savings", milestones: [] },
  { id: generateId(), name: "Sister Wedding Fund", targetAmount: 20400, currentAmount: 3400, monthlyContribution: 1700, targetDate: nextJune(), category: "savings", milestones: [] },
  { id: generateId(), name: "Future House Savings", targetAmount: 500000, currentAmount: 24000, monthlyContribution: 2000, category: "savings", milestones: [
    { id: generateId(), label: "Down payment fund", amount: 150000, reached: false },
  ] },
  // Dream-only extras
  { id: generateId(), name: "Retirement", targetAmount: 1000000, currentAmount: 20000, monthlyContribution: 500, category: "dream", milestones: [] },
  { id: generateId(), name: "New Laptop", targetAmount: 65000, currentAmount: 10000, monthlyContribution: 0, category: "dream", milestones: [] },
  { id: generateId(), name: "Family Fund", targetAmount: 40000, currentAmount: 5000, monthlyContribution: 0, category: "dream", milestones: [] },
  { id: generateId(), name: "US Visa", targetAmount: 35000, currentAmount: 0, monthlyContribution: 0, category: "dream", milestones: [] },
];

export const SEED_BILLS: Bill[] = [
  { id: generateId(), name: "Claude Pro", amount: 1400, dueDay: 15, status: "pending", reminderDaysBefore: 3, category: "Subscription" },
  { id: generateId(), name: "Dental", amount: 3000, dueDay: 10, status: "pending", reminderDaysBefore: 5, category: "Health" },
  { id: generateId(), name: "Insurance", amount: 1500, dueDay: 25, status: "pending", reminderDaysBefore: 5, category: "Insurance" },
  { id: generateId(), name: "PayLater", amount: 1300, dueDay: 20, status: "pending", reminderDaysBefore: 3, category: "Credit" },
];

export const SEED_EXPENSES: Expense[] = [
  { id: generateId(), description: "Groceries", category: "Needs", amount: 850, date: new Date().toISOString(), status: "paid", recurring: false },
  { id: generateId(), description: "Coffee with friends", category: "Wants", amount: 250, date: new Date().toISOString(), status: "paid", recurring: false },
];

export const SEED_JOB_APPLICATIONS: JobApplication[] = [
  { id: generateId(), company: "Acme Corp", role: "Frontend Developer", status: "interviewing", appliedDate: new Date().toISOString() },
];
export const SEED_INTERVIEWS: Interview[] = [];
export const SEED_CLIENTS: Client[] = [
  { id: generateId(), name: "Maria Santos", company: "BrewBloom Coffee", status: "active", value: 5000 },
];
export const SEED_CERTIFICATES: Certificate[] = [];
export const SEED_RESUMES: ResumeVersion[] = [
  { id: generateId(), name: "General Resume v1", updatedDate: new Date().toISOString() },
];
export const SEED_CAREER_GOALS: CareerGoal[] = [
  { id: generateId(), title: "Land a remote developer role", progress: 40, done: false },
];
export const SEED_SKILLS: Skill[] = [
  { id: generateId(), name: "React", level: 75 },
  { id: generateId(), name: "Next.js", level: 65 },
  { id: generateId(), name: "AI Automation", level: 55 },
];
export const SEED_INCOME_SOURCES: IncomeSource[] = [
  { id: generateId(), name: "Day Job Salary", amount: 25000, frequency: "monthly" },
];

export const SEED_PROJECTS: Project[] = [
  { id: generateId(), name: "AI Life OS", description: "Personal life operating system", status: "in-progress", priority: "high", progress: 60 },
  { id: generateId(), name: "Portfolio Website", status: "planning", priority: "medium", progress: 10 },
];

export const SEED_BUSINESSES: Business[] = [
  { id: generateId(), name: "BrewBloom Coffee", tagline: "Artisan coffee, brewed with love", income: 12000, expenses: 6500, tasks: [], projects: [], documents: [], revenueHistory: monthSeries() },
  { id: generateId(), name: "Shawie Bakes & Events", tagline: "Custom cakes & event styling", income: 8000, expenses: 4200, tasks: [], projects: [], documents: [], revenueHistory: monthSeries() },
  { id: generateId(), name: "AI Automation Agency", tagline: "Automating businesses with AI", income: 15000, expenses: 3000, tasks: [], projects: [], documents: [], revenueHistory: monthSeries() },
  { id: generateId(), name: "Teaching Services", tagline: "Tutoring & online courses", income: 6000, expenses: 500, tasks: [], projects: [], documents: [], revenueHistory: monthSeries() },
];

function monthSeries() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month) => ({
    month,
    revenue: Math.round(4000 + Math.random() * 8000),
    expenses: Math.round(1000 + Math.random() * 3000),
  }));
}

export const SEED_SOCIAL_POSTS: SocialPost[] = [];
export const SEED_CONTENT_IDEAS: ContentIdea[] = [
  { id: generateId(), title: "Behind the scenes of BrewBloom roasting", platform: "Instagram" },
];

export const SEED_AUTOMATIONS: AutomationCard[] = [
  { id: generateId(), name: "Gmail Automation", description: "Auto-sort and label incoming client emails.", status: "inactive", logs: [] },
  { id: generateId(), name: "Facebook Automation", description: "Auto-post scheduled content to Facebook Page.", status: "inactive", logs: [] },
  { id: generateId(), name: "Messenger Bot", description: "Auto-reply to common customer questions.", status: "inactive", logs: [] },
  { id: generateId(), name: "Instagram Automation", description: "Auto-publish Reels & carousel posts.", status: "inactive", logs: [] },
  { id: generateId(), name: "Google Calendar Automation", description: "Sync bill due dates & bookings to calendar.", status: "inactive", logs: [] },
  { id: generateId(), name: "Google Drive Automation", description: "Auto-backup financial reports monthly.", status: "inactive", logs: [] },
  { id: generateId(), name: "Claude Projects", description: "AI-assisted project & content generation.", status: "inactive", logs: [] },
  { id: generateId(), name: "ChatGPT Projects", description: "AI-assisted brainstorming & drafts.", status: "inactive", logs: [] },
];

export const SEED_LEARNING_TRACKS: LearningTrack[] = [
  { name: "Claude Code", progress: 55, certificates: [], projects: [], id: generateId() },
  { name: "React", progress: 70, certificates: [], projects: [], id: generateId() },
  { name: "Next.js", progress: 65, certificates: [], projects: [], id: generateId() },
  { name: "AI Automation", progress: 40, certificates: [], projects: [], id: generateId() },
  { name: "Web Development", progress: 60, certificates: [], projects: [], id: generateId() },
  { name: "Marketing", progress: 30, certificates: [], projects: [], id: generateId() },
  { name: "Canva", progress: 80, certificates: [], projects: [], id: generateId() },
  { name: "Teaching", progress: 50, certificates: [], projects: [], id: generateId() },
];
