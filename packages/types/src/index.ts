export type AppPlatform = "web" | "mobile" | "macos" | "api" | "mcp";

export interface AuditMetadata {
  requestId: string;
  actorId?: string;
  platform: AppPlatform;
}

export interface AuthenticatedUser {
  id: string;
  email?: string;
  provider?: "email" | "google" | "discord" | "apple" | "telegram" | "web3";
}
