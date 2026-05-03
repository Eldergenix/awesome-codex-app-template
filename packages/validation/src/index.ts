import { z } from "zod";

export const emailSchema = z.string().email();

export const authProviderSchema = z.enum(["email", "google", "discord", "apple", "telegram", "web3"]);

export const aiPromptSchema = z.object({
  prompt: z.string().min(1).max(8000),
  context: z.string().max(16000).optional(),
});

export const telegramLoginSchema = z.object({
  id: z.string().min(1),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  photo_url: z.string().url().optional(),
  auth_date: z.string().regex(/^\d+$/),
  hash: z.string().min(32),
});

export type AiPromptInput = z.infer<typeof aiPromptSchema>;
export type TelegramLoginInput = z.infer<typeof telegramLoginSchema>;
