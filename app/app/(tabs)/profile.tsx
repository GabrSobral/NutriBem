import { ProfileProvider } from "@/modules/profile/contexts/context";
import ProfileScreen from "@/modules/profile/screens/Main";

export default function TabProfileScreen() {
  return (
    <ProfileProvider>
      <ProfileScreen />
    </ProfileProvider>
  );
}
