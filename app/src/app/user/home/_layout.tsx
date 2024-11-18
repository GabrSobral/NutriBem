import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="add-meal" options={{ headerShown: false }} />
      <Stack.Screen name="add-food" options={{ headerShown: false }} />
    </Stack>
  );
}
