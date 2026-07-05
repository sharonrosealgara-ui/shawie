import type { AIAssistantService } from "@/lib/ai/types";
import { LocalRuleBasedAssistant } from "@/lib/ai/rule-based-assistant";

/**
 * Swap this factory to return a different AIAssistantService implementation
 * (e.g. one backed by the Claude, OpenAI, or Gemini API) once a backend/API
 * route is available to hold the API key. UI code only depends on the
 * AIAssistantService interface, so no other files need to change.
 */
export function getAIAssistantService(): AIAssistantService {
  return new LocalRuleBasedAssistant();
}
