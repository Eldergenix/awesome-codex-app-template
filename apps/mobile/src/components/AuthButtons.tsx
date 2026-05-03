import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Pressable, Text, View } from "react-native";
import { supportedOAuthProviders, type SupportedOAuthProvider } from "@repo/supabase";
import { supabase } from "../lib/supabase";

WebBrowser.maybeCompleteAuthSession();

export function AuthButtons() {
  async function signIn(provider: SupportedOAuthProvider) {
    const redirectTo = Linking.createURL("auth/callback");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo, skipBrowserRedirect: true },
    });
    if (error) throw error;
    if (data.url) {
      await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
    }
  }

  return (
    <View className="gap-3 rounded-xl border border-border p-5">
      <Text className="text-xl font-medium text-foreground">Authentication</Text>
      {supportedOAuthProviders.map((provider) => (
        <Pressable
          accessibilityRole="button"
          className="rounded-lg bg-primary px-4 py-3"
          key={provider}
          onPress={() => void signIn(provider)}
        >
          <Text className="text-center font-medium text-primary-foreground">Continue with {provider}</Text>
        </Pressable>
      ))}
      <Text className="text-sm text-muted-foreground">
        Telegram and Web3 flows are server-verified custom auth paths.
      </Text>
    </View>
  );
}
