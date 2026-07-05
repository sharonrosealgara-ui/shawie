"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProjectDialog, type ProjectFormValues } from "@/components/projects/project-dialog";
import { useProjectStore } from "@/store/project-store";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const COLUMNS: { key: Project["status"]; label: string }[] = [
  { key: "planning", label: "Planning" },
  { key: "in-progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "archived", label: "Archived" },
];

const PRIORITY_CLASS: Record<string, string> = {
  low: "bg-secondary text-secondary-foreground",
  medium: "bg-accent text-accent-foreground",
  high: "bg-destructive/15 text-destructive",
};

export default function ProjectsPage() {
  const projects = useProjectStore((s) => s.projects);
  const addProject = useProjectStore((s) => s.addProject);
  const updateProject = useProjectStore((s) => s.updateProject);
  const removeProject = useProjectStore((s) => s.removeProject);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  function handleSubmit(values: ProjectFormValues) {
    if (editing) {
      updateProject(editing.id, values);
      toast.success("Project updated");
    } else {
      addProject(values);
      toast.success("Project added");
    }
  }

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Track every project from idea to completion."
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus /> Add Project
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((col) => {
          const items = projects.filter((p) => p.status === col.key);
          return (
            <div key={col.key}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">{col.label}</h2>
                <Badge variant="outline">{items.length}</Badge>
              </div>
              <div className="flex flex-col gap-3">
                {items.map((project) => (
                  <Card key={project.id} className="gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold">{project.name}</p>
                      <Badge className={cn("border-0", PRIORITY_CLASS[project.priority])}>{project.priority}</Badge>
                    </div>
                    {project.description && <p className="text-xs text-muted-foreground">{project.description}</p>}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                    {project.deadline && (
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarClock className="size-3.5" /> {formatDate(project.deadline)}
                      </p>
                    )}
                    <div className="flex justify-end gap-1 border-t border-border/60 pt-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => {
                          setEditing(project);
                          setDialogOpen(true);
                        }}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-destructive"
                        onClick={() => {
                          removeProject(project.id);
                          toast("Project deleted");
                        }}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </Card>
                ))}
                {items.length === 0 && (
                  <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                    No projects here.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ProjectDialog open={dialogOpen} onOpenChange={setDialogOpen} initialValue={editing} onSubmit={handleSubmit} />
    </div>
  );
}
