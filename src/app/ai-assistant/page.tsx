"use client";

import { useEffect, useState } from "react";
import { Sparkles, Send, TrendingUp, AlertTriangle, Info } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAIAssistantContext } from "@/lib/ai/build-context";
import { getAIAssistantService } from "@/lib/ai/service";
import { generateId } from "@/lib/id";
import { cn } from "@/lib/utils";
import type { AIInsight } from "@/lib/ai/types";

const TONE_ICON = { positive: TrendingUp, neutral: Info, warning: AlertTriangle } as const;
const TONE_CLASS = {
  positive: "text-success bg-success/10",
  neutral: "text-primary bg-primary/10",
  warning: "text-warning bg-warning/10",
} as const;

const SUGGESTED_QUESTIONS = [
  "Can I afford ₱1,500?",
  "How much should I save this month?",
  "Am I overspending on Wants?",
  "Am I on track for my travel savings?",
];

interface ChatEntry {
  id: string;
  question: string;
  answer: string;
}

export default function AIAssistantPage() {
  const context = useAIAssistantContext();
  const service = getAIAssistantService();

  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [chat, setChat] = useState<ChatEntry[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    service.getInsights(context).then(setInsights);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(context)]);

  async function handleAsk(q: string) {
    if (!q.trim()) return;
    setLoading(true);
    const answer = await service.ask(q, context);
    setChat((prev) => [...prev, { id: generateId(), question: q, answer }]);
    setQuestion("");
    setLoading(false);
  }

  return (
    <div>
      <PageHeader
        title="AI Assistant"
        description={`Personalized financial insights, powered by ${service.name}. Ready to plug into Claude, GPT, or Gemini later.`}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {insights.map((insight) => {
          const Icon = TONE_ICON[insight.tone];
          return (
            <Card key={insight.id} className="gap-2">
              <div className="flex items-center gap-2">
                <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", TONE_CLASS[insight.tone])}>
                  <Icon className="size-4" />
                </div>
                <p className="text-sm font-medium">{insight.question}</p>
              </div>
              <p className="text-sm text-muted-foreground">{insight.answer}</p>
            </Card>
          );
        })}
      </div>

      <Card className="gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <p className="text-sm font-semibold">Ask me anything about your finances</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <Badge
              key={q}
              variant="outline"
              className="cursor-pointer hover:bg-accent"
              onClick={() => handleAsk(q)}
            >
              {q}
            </Badge>
          ))}
        </div>

        <CardContent className="flex max-h-96 flex-col gap-3 overflow-y-auto px-0">
          {chat.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Ask a question like &ldquo;How long until I reach my house savings goal?&rdquo; or &ldquo;What is my Financial
              Health Score?&rdquo;
            </p>
          )}
          {chat.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-2">
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2 text-sm text-primary-foreground">
                {entry.question}
              </div>
              <div className="mr-auto max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-2 text-sm text-secondary-foreground">
                {entry.answer}
              </div>
            </div>
          ))}
        </CardContent>

        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(question);
          }}
        >
          <Input
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !question.trim()}>
            <Send className="size-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
