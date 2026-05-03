import { AuthButtons } from "../src/components/AuthButtons";
import { Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <View className="flex-1 gap-6 bg-background px-6 py-16">
      <View className="rounded-xl border border-border bg-muted p-6">
        <Text className="text-sm text-muted-foreground">Enterprise mono-repo template</Text>
        <Text className="mt-3 text-3xl font-semibold text-foreground">Mobile app ready</Text>
        <Text className="mt-3 text-muted-foreground">
          Expo 55, React Native 0.83, TanStack Query, NativeWind 5, and Supabase Auth are scaffolded.
        </Text>
      </View>
      <AuthButtons />
    </View>
  );
}
