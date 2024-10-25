import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export function RoleVerificationLayer() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"" | "user" | "nutri">("");

  useEffect(() => {
    const fetchUserRole = async () => {
      setTimeout(() => {
        setRole("nutri");
        setLoading(false);
      }, 2000);
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (role === "user") {
      router.replace("/user/(tabs)");
    } else if (role === "nutri") {
      router.replace("/nutritionist");
    }
  }, [role, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "ios",
        animationDuration: 100,
      }}
    >
      <Stack.Screen name="user/(tabs)" />

      {/* <Stack.Screen name="auth/index" />
      <Stack.Screen name="auth/sign-in/index" />
      <Stack.Screen name="auth/sign-up/index" /> */}

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
