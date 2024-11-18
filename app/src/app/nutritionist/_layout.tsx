import { Stack } from "expo-router";

import { DietPlanProvider } from "@/modules/nutritionist-profile/contexts/diet-plan/context";
import { NutritionistProfileProvider } from "@/modules/nutritionist-profile/contexts/profile/context";

export default function Layout() {
  return (
    <NutritionistProfileProvider>
      <DietPlanProvider>
        <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
          <Stack.Screen name="patient-detail" />
          <Stack.Screen name="diet-plan/index" />
          <Stack.Screen name="diet-plan/edit-diet-plan" />
          <Stack.Screen name="diet-plan/diet-plan-meal" />
          <Stack.Screen name="diet-plan/add-food-diet-plan" />
          <Stack.Screen name="meal-detail" />
          <Stack.Screen name="qr-code" />
        </Stack>
      </DietPlanProvider>
    </NutritionistProfileProvider>
  );
}
