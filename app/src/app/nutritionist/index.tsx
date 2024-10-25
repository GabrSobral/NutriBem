import { ProfileProvider } from "@/modules/profile/contexts/context";
import { NutritionistProfileScreen } from "@/modules/nutritionist-profile/screens/Main";

export default function NutriHomeScreenTab() {
  return (
    <ProfileProvider>
      <NutritionistProfileScreen />
    </ProfileProvider>
  );
}
