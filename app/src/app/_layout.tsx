import "react-native-reanimated";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { AuthProvider } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";

import { HomeProvider } from "@/modules/home/contexts/context";
import { NutritionistProvider } from "@/modules/nutritionist/contexts/nutri";
import { RoleVerificationLayer } from "@/components/application/RoleVerificationLayer";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <HomeProvider>
          <NutritionistProvider>
            <RoleVerificationLayer />
          </NutritionistProvider>
        </HomeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
