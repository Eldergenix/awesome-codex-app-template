"use client";

import { supportedOAuthProviders, type SupportedOAuthProvider } from "@repo/supabase";
import { createBrowserSupabaseClient } from "../lib/supabase/client";

export function AuthButtons() {
  async function signIn(provider: SupportedOAuthProvider) {
    const supabase = createBrowserSupabaseClient();
    const redirectTo = `${window.location.origin}/auth/callback`;
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
  }

  return (
    <section className="rounded-xl border border-border p-6">
      <h2 className="text-xl font-medium">Authentication</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {supportedOAuthProviders.map((provider) => (
          <button
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground"
            key={provider}
            onClick={() => void signIn(provider)}
            type="button"
          >
            Continue with {provider}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Telegram and Web3 auth use server-verified custom flows in the API service.
      </p>
    </section>
  );
}
