import ParallaxScrollView from "@/components/design-system/ParallaxScrollView";

import { Colors } from "@/constants/Colors";

import { FoodPlans } from "./components/FoodPlans";
import { SavedRecipes } from "./components/SavedRecipes";
import { ProfileHeader } from "./components/ProfileHeader";
import { Link } from "expo-router";

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.primary,
        dark: Colors.dark.primary,
      }}
      headerHeight={300}
      headerImage={<ProfileHeader />}
    >
      <FoodPlans />
      <SavedRecipes />

      <Link href="/auth">Settings</Link>
    </ParallaxScrollView>
  );
}
