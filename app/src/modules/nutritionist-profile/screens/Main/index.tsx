import ParallaxScrollView from "@/components/design-system/ParallaxScrollView";

import { Colors } from "@/constants/Colors";

import { PatientList } from "./components/PatientList";
import { ProfileHeader } from "./components/ProfileHeader";

export function NutritionistProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.primary,
        dark: Colors.dark.primary,
      }}
      headerHeight={300}
      headerImage={<ProfileHeader />}
    >
      <PatientList />
    </ParallaxScrollView>
  );
}
