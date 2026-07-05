"use client";

import { useState } from "react";
import { Play, Pencil, ScrollText, Zap } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAutomationStore } from "@/store/automation-store";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AutomationCard } from "@/types";

const STATUS_CLASS: Record<AutomationCard["status"], string> = {
  active: "bg-success/15 text-success border-success/30",
  inactive: "bg-secondary text-secondary-foreground border-transparent",
  error: "bg-destructive/15 text-destructive border-destructive/30",
};

export default function AutomationCenterPage() {
  const automations = useAutomationStore((s) => s.automations);
  const runAutomation = useAutomationStore((s) => s.runAutomation);
  const toggleStatus = useAutomationStore((s) => s.toggleStatus);
  const updateAutomation = useAutomationStore((s) => s.updateAutomation);

  const [editing, setEditing] = useState<AutomationCard | null>(null);
  const [description, setDescription] = useState("");
  const [logsFor, setLogsFor] = useState<AutomationCard | null>(null);

  return (
    <div>
      <PageHeader
        title="Automation Center"
        description="Connect and orchestrate your AI-powered automations. Each card is a future API integration point."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {automations.map((automation) => (
          <Card key={automation.id} className="gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Zap className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{automation.name}</p>
                  <Badge className={cn("border mt-0.5", STATUS_CLASS[automation.status])}>{automation.status}</Badge>
                </div>
              </div>
              <Switch checked={automation.status === "active"} onCheckedChange={() => toggleStatus(automation.id)} />
            </div>

            <CardDescription>{automation.description}</CardDescription>

            <p className="text-xs text-muted-foreground">
              Last run: {automation.lastRun ? formatDate(automation.lastRun) : "Never"}
            </p>

            <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
              <Button size="sm" onClick={() => runAutomation(automation.id)}>
                <Play className="size-3.5" /> Run
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditing(automation);
                  setDescription(automation.description);
                }}
              >
                <Pencil className="size-3.5" /> Edit
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setLogsFor(automation)}>
                <ScrollText className="size-3.5" /> Logs ({automation.logs.length})
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editing?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Label htmlFor="automation-description">Description</Label>
            <Textarea id="automation-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            <Label htmlFor="automation-key">API Key (future integration)</Label>
            <Input id="automation-key" placeholder="Connect an API key once a backend is available" disabled />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (editing) {
                  updateAutomation(editing.id, { description });
                  toast.success("Automation updated");
                }
                setEditing(null);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!logsFor} onOpenChange={(open) => !open && setLogsFor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{logsFor?.name} Logs</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-64">
            <div className="flex flex-col gap-2 pr-3">
              {logsFor?.logs.length === 0 && <p className="text-sm text-muted-foreground">No logs yet. Run this automation to generate one.</p>}
              {logsFor?.logs.map((log) => (
                <div key={log.id} className="rounded-lg border border-border/60 p-2 text-xs">
                  <p className="text-muted-foreground">{formatDate(log.timestamp, { hour: "numeric", minute: "numeric" })}</p>
                  <p>{log.message}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
