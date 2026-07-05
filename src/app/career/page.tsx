"use client";

import { useState } from "react";
import { Plus, Trash2, Briefcase, Award, FileText, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useCareerStore } from "@/store/career-store";
import { formatCurrency, formatDate } from "@/lib/format";

const APPLICATION_STATUSES = ["applied", "interviewing", "offer", "rejected", "accepted"] as const;

function EmptyRow({ label }: { label: string }) {
  return <p className="py-4 text-center text-sm text-muted-foreground">{label}</p>;
}

function ApplicationsTab() {
  const applications = useCareerStore((s) => s.applications);
  const addApplication = useCareerStore((s) => s.addApplication);
  const updateApplication = useCareerStore((s) => s.updateApplication);
  const removeApplication = useCareerStore((s) => s.removeApplication);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Job Applications</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="max-w-48" />
          <Input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} className="max-w-48" />
          <Button
            onClick={() => {
              if (!company.trim() || !role.trim()) return;
              addApplication({ company, role, status: "applied", appliedDate: new Date().toISOString() });
              setCompany("");
              setRole("");
            }}
          >
            <Plus /> Add
          </Button>
        </div>
        {applications.length === 0 && <EmptyRow label="No applications yet." />}
        {applications.map((app) => (
          <div key={app.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/60 p-3">
            <div>
              <p className="text-sm font-medium">
                {app.role} @ {app.company}
              </p>
              <p className="text-xs text-muted-foreground">Applied {formatDate(app.appliedDate)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={app.status} onValueChange={(v) => updateApplication(app.id, { status: v as typeof app.status })}>
                <SelectTrigger className="h-8 w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {APPLICATION_STATUSES.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removeApplication(app.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function InterviewsTab() {
  const interviews = useCareerStore((s) => s.interviews);
  const addInterview = useCareerStore((s) => s.addInterview);
  const removeInterview = useCareerStore((s) => s.removeInterview);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Interviews</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="max-w-40" />
          <Input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} className="max-w-40" />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="max-w-40" />
          <Button
            onClick={() => {
              if (!company.trim() || !role.trim()) return;
              addInterview({ company, role, date, stage: "Screening" });
              setCompany("");
              setRole("");
            }}
          >
            <Plus /> Add
          </Button>
        </div>
        {interviews.length === 0 && <EmptyRow label="No interviews scheduled." />}
        {interviews.map((interview) => (
          <div key={interview.id} className="flex items-center justify-between gap-2 rounded-lg border border-border/60 p-3">
            <div>
              <p className="text-sm font-medium">
                {interview.role} @ {interview.company}
              </p>
              <p className="text-xs text-muted-foreground">{formatDate(interview.date)} · {interview.stage}</p>
            </div>
            <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removeInterview(interview.id)}>
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ClientsTab() {
  const clients = useCareerStore((s) => s.clients);
  const addClient = useCareerStore((s) => s.addClient);
  const removeClient = useCareerStore((s) => s.removeClient);
  const [name, setName] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Clients</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Input placeholder="Client name" value={name} onChange={(e) => setName(e.target.value)} className="max-w-56" />
          <Button
            onClick={() => {
              if (!name.trim()) return;
              addClient({ name, status: "lead" });
              setName("");
            }}
          >
            <Plus /> Add
          </Button>
        </div>
        {clients.length === 0 && <EmptyRow label="No clients yet." />}
        {clients.map((client) => (
          <div key={client.id} className="flex items-center justify-between gap-2 rounded-lg border border-border/60 p-3">
            <div>
              <p className="text-sm font-medium">{client.name}</p>
              {client.company && <p className="text-xs text-muted-foreground">{client.company}</p>}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {client.status}
              </Badge>
              {client.value != null && <span className="text-sm font-medium">{formatCurrency(client.value)}</span>}
              <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removeClient(client.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SkillsIncomeTab() {
  const skills = useCareerStore((s) => s.skills);
  const addSkill = useCareerStore((s) => s.addSkill);
  const removeSkill = useCareerStore((s) => s.removeSkill);
  const incomeSources = useCareerStore((s) => s.incomeSources);
  const addIncomeSource = useCareerStore((s) => s.addIncomeSource);
  const removeIncomeSource = useCareerStore((s) => s.removeIncomeSource);
  const [skillName, setSkillName] = useState("");
  const [incomeName, setIncomeName] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Skills</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Input placeholder="Skill name" value={skillName} onChange={(e) => setSkillName(e.target.value)} />
            <Button
              onClick={() => {
                if (!skillName.trim()) return;
                addSkill({ name: skillName, level: 30 });
                setSkillName("");
              }}
            >
              <Plus />
            </Button>
          </div>
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} />
              </div>
              <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removeSkill(skill.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Income Sources</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Input placeholder="Source" value={incomeName} onChange={(e) => setIncomeName(e.target.value)} className="max-w-40" />
            <Input placeholder="Amount" type="number" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} className="max-w-32" />
            <Button
              onClick={() => {
                const amount = parseFloat(incomeAmount);
                if (!incomeName.trim() || Number.isNaN(amount)) return;
                addIncomeSource({ name: incomeName, amount, frequency: "monthly" });
                setIncomeName("");
                setIncomeAmount("");
              }}
            >
              <Plus /> Add
            </Button>
          </div>
          {incomeSources.map((source) => (
            <div key={source.id} className="flex items-center justify-between rounded-lg border border-border/60 p-3">
              <div>
                <p className="text-sm font-medium">{source.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{source.frequency}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{formatCurrency(source.amount)}</span>
                <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removeIncomeSource(source.id)}>
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function DocumentsTab() {
  const certificates = useCareerStore((s) => s.certificates);
  const addCertificate = useCareerStore((s) => s.addCertificate);
  const removeCertificate = useCareerStore((s) => s.removeCertificate);
  const resumes = useCareerStore((s) => s.resumes);
  const addResume = useCareerStore((s) => s.addResume);
  const removeResume = useCareerStore((s) => s.removeResume);
  const coverLetters = useCareerStore((s) => s.coverLetters);
  const addCoverLetter = useCareerStore((s) => s.addCoverLetter);
  const removeCoverLetter = useCareerStore((s) => s.removeCoverLetter);
  const portfolioItems = useCareerStore((s) => s.portfolioItems);
  const addPortfolioItem = useCareerStore((s) => s.addPortfolioItem);
  const removePortfolioItem = useCareerStore((s) => s.removePortfolioItem);

  const [certName, setCertName] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [letterName, setLetterName] = useState("");
  const [portfolioTitle, setPortfolioTitle] = useState("");

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Award className="size-4" /> Certificates
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input placeholder="Certificate name" value={certName} onChange={(e) => setCertName(e.target.value)} />
            <Button
              onClick={() => {
                if (!certName.trim()) return;
                addCertificate({ name: certName, issuer: "—", dateEarned: new Date().toISOString() });
                setCertName("");
              }}
            >
              <Plus />
            </Button>
          </div>
          {certificates.length === 0 && <EmptyRow label="No certificates yet." />}
          {certificates.map((c) => (
            <div key={c.id} className="flex items-center justify-between text-sm">
              <span>{c.name}</span>
              <Button variant="ghost" size="icon" className="size-6 text-destructive" onClick={() => removeCertificate(c.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <FileText className="size-4" /> Resume Versions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input placeholder="Resume name" value={resumeName} onChange={(e) => setResumeName(e.target.value)} />
            <Button
              onClick={() => {
                if (!resumeName.trim()) return;
                addResume({ name: resumeName, updatedDate: new Date().toISOString() });
                setResumeName("");
              }}
            >
              <Plus />
            </Button>
          </div>
          {resumes.length === 0 && <EmptyRow label="No resume versions yet." />}
          {resumes.map((r) => (
            <div key={r.id} className="flex items-center justify-between text-sm">
              <span>{r.name}</span>
              <Button variant="ghost" size="icon" className="size-6 text-destructive" onClick={() => removeResume(r.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <FileText className="size-4" /> Cover Letters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input placeholder="Cover letter name" value={letterName} onChange={(e) => setLetterName(e.target.value)} />
            <Button
              onClick={() => {
                if (!letterName.trim()) return;
                addCoverLetter({ name: letterName, updatedDate: new Date().toISOString() });
                setLetterName("");
              }}
            >
              <Plus />
            </Button>
          </div>
          {coverLetters.length === 0 && <EmptyRow label="No cover letters yet." />}
          {coverLetters.map((l) => (
            <div key={l.id} className="flex items-center justify-between text-sm">
              <span>{l.name}</span>
              <Button variant="ghost" size="icon" className="size-6 text-destructive" onClick={() => removeCoverLetter(l.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <ImageIcon className="size-4" /> Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input placeholder="Project title" value={portfolioTitle} onChange={(e) => setPortfolioTitle(e.target.value)} />
            <Button
              onClick={() => {
                if (!portfolioTitle.trim()) return;
                addPortfolioItem({ title: portfolioTitle });
                setPortfolioTitle("");
              }}
            >
              <Plus />
            </Button>
          </div>
          {portfolioItems.length === 0 && <EmptyRow label="No portfolio items yet." />}
          {portfolioItems.map((p) => (
            <div key={p.id} className="flex items-center justify-between text-sm">
              <span>{p.title}</span>
              <Button variant="ghost" size="icon" className="size-6 text-destructive" onClick={() => removePortfolioItem(p.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function GoalsTab() {
  const goals = useCareerStore((s) => s.goals);
  const addGoal = useCareerStore((s) => s.addGoal);
  const updateGoal = useCareerStore((s) => s.updateGoal);
  const removeGoal = useCareerStore((s) => s.removeGoal);
  const [title, setTitle] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Career Goals</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-2">
          <Input placeholder="New career goal" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button
            onClick={() => {
              if (!title.trim()) return;
              addGoal({ title, progress: 0, done: false });
              setTitle("");
              toast.success("Goal added");
            }}
          >
            <Plus /> Add
          </Button>
        </div>
        {goals.map((goal) => (
          <div key={goal.id} className="rounded-lg border border-border/60 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{goal.title}</p>
              <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removeGoal(goal.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <Progress value={goal.progress} className="flex-1" />
              <Input
                type="number"
                className="h-7 w-16"
                value={goal.progress}
                onChange={(e) => updateGoal(goal.id, { progress: Math.min(100, Math.max(0, Number(e.target.value))) })}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function CareerPage() {
  return (
    <div>
      <PageHeader title="Career" description="Manage applications, clients, skills, and career goals." />
      <Tabs defaultValue="applications">
        <TabsList className="mb-4 flex-wrap h-auto">
          <TabsTrigger value="applications">
            <Briefcase className="size-3.5" /> Applications
          </TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="skills">Skills & Income</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        <TabsContent value="applications">
          <ApplicationsTab />
        </TabsContent>
        <TabsContent value="interviews">
          <InterviewsTab />
        </TabsContent>
        <TabsContent value="clients">
          <ClientsTab />
        </TabsContent>
        <TabsContent value="skills">
          <SkillsIncomeTab />
        </TabsContent>
        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>
        <TabsContent value="goals">
          <GoalsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
