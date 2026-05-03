import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { baseSystemPrompt, defaultAiModel } from "@repo/ai";
import { aiPromptSchema } from "@repo/validation";

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const input = aiPromptSchema.parse(body);
  const result = streamText({
    model: openai(defaultAiModel),
    system: baseSystemPrompt,
    prompt: input.prompt,
  });
  return result.toUIMessageStreamResponse();
}
