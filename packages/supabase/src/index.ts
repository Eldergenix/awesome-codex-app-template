import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function requiredEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function createPublicSupabaseClient(url: string, anonKey: string): SupabaseClient {
  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

export const supportedOAuthProviders = ["google", "discord", "apple"] as const;
export type SupportedOAuthProvider = (typeof supportedOAuthProviders)[number];
