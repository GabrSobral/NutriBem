import ParallaxScrollView from "@/components/design-system/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { ProfileHeader } from "./components/ProfileHeader";

export function NutriProfile() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.primary,
        dark: Colors.dark.primary,
      }}
      headerHeight={300}
      headerImage={<ProfileHeader />}
    ></ParallaxScrollView>
  );
}
