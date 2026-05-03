export const defaultAiModel = process.env.AI_MODEL ?? "gpt-5.5-pro";

export const baseSystemPrompt = `You are an enterprise product assistant. Be precise, protect secrets, and prefer verifiable answers.`;

export function requireServerAiKey(): void {
  if (!process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY) {
    throw new Error("No server-side AI provider key configured.");
  }
}
